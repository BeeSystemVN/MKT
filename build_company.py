import os

base_dir = r"e:\MKT"

with open(os.path.join(base_dir, "index.html"), "r", encoding="utf-8") as f:
    index_html = f.read()

nav_end_tag = "</nav>"
nav_end_idx = index_html.find(nav_end_tag) + len(nav_end_tag)
top_html = index_html[:nav_end_idx]

top_html = top_html.replace("<title>BeeCare – Quản lý viện dưỡng lão thông minh</title>", "<title>Về Chúng Tôi | HANIKI & BeeCare</title>")
top_html = top_html.replace('class="nav-menu-item active"', 'class="nav-menu-item"')
top_html = top_html.replace('href="company.html" class="nav-menu-item"', 'href="company.html" class="nav-menu-item active"')
top_html = top_html.replace('href="company.html" class="mobile-nav-link"', 'href="company.html" class="mobile-nav-link active"')
top_html = top_html.replace('href="index.html" class="mobile-nav-link active"', 'href="index.html" class="mobile-nav-link"')

footer_start_str = "<!-- ===================== MOBILE QUICK-ACTION STICKY BAR ===================== -->"
footer_start_idx = index_html.find(footer_start_str)
bottom_html = index_html[footer_start_idx:]

custom_styles = """
<style>
/* ===================== ELITE COMPANY PAGE STYLES ===================== */
.company-hero {
    background: linear-gradient(145deg, #091528 0%, #0d273d 45%, #064e3b 100%);
    position: relative;
    overflow: hidden;
    padding-top: 140px;
    padding-bottom: 90px;
    color: white;
    text-align: center;
}
.company-hero::before {
    content: ''; position: absolute;
    top: -25%; left: -15%; width: 750px; height: 750px;
    background: radial-gradient(circle, rgba(13,148,136,0.18) 0%, transparent 65%);
    border-radius: 50%; pointer-events: none;
}
.company-hero::after {
    content: ''; position: absolute;
    bottom: -20%; right: -15%; width: 650px; height: 650px;
    background: radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 65%);
    border-radius: 50%; pointer-events: none;
}

.hero-backdrop-card {
    position: relative;
    max-width: 1140px;
    margin: 40px auto 0;
    border-radius: 28px;
    overflow: hidden;
    box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.45);
    border: 1px solid rgba(255, 255, 255, 0.15);
    background: #0f172a;
}
.hero-backdrop-card img {
    width: 100%;
    height: auto;
    max-height: 480px;
    object-fit: cover;
    object-position: center;
    display: block;
    image-rendering: -webkit-optimize-contrast;
}
.hero-backdrop-caption {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    padding: 30px 32px 24px;
    background: linear-gradient(to top, rgba(9,21,40,0.92) 0%, rgba(9,21,40,0.5) 60%, transparent 100%);
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
    gap: 16px;
}

/* Key Stats Bar */
.stats-container {
    max-width: 1140px;
    margin: -35px auto 80px;
    position: relative;
    z-index: 20;
    padding: 0 16px;
}
.stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    background: #ffffff;
    border-radius: 24px;
    padding: 32px 24px;
    box-shadow: 0 20px 45px -10px rgba(15,23,42,0.08);
    border: 1px solid rgba(226,232,240,0.9);
    gap: 20px;
}
@media (max-width: 1023px) {
    .stats-grid { grid-template-columns: repeat(2, 1fr); padding: 24px 20px; }
}
@media (max-width: 639px) {
    .stats-grid { grid-template-columns: 1fr; padding: 20px 16px; gap: 16px; }
}
.stat-card {
    text-align: center;
    padding: 10px 14px;
    border-right: 1px solid #f1f5f9;
}
.stat-card:last-child {
    border-right: none;
}
@media (max-width: 1023px) {
    .stat-card:nth-child(2) { border-right: none; }
}
@media (max-width: 639px) {
    .stat-card { border-right: none; border-bottom: 1px solid #f1f5f9; padding-bottom: 16px; }
    .stat-card:last-child { border-bottom: none; padding-bottom: 0; }
}
.stat-number {
    font-size: 38px;
    font-weight: 800;
    line-height: 1;
    margin-bottom: 8px;
    font-feature-settings: "cv02", "cv03", "cv04", "cv11";
}
.stat-label {
    font-size: 14px;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 4px;
}
.stat-desc {
    font-size: 12px;
    color: #64748b;
    line-height: 1.4;
}

/* Sections Common */
.section-wrapper {
    max-width: 1140px;
    margin: 0 auto 90px;
    padding: 0 20px;
    position: relative;
    z-index: 10;
}
@media (max-width: 639px) {
    .section-wrapper { margin-bottom: 60px; padding: 0 16px; }
}

.section-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px;
    border-radius: 9999px;
    background: rgba(13,148,136,0.1);
    color: #0d9488;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 12px;
}
.section-heading {
    font-size: 32px;
    font-weight: 800;
    color: #0f172a;
    line-height: 1.3;
    letter-spacing: -0.02em;
    margin-bottom: 16px;
}
@media (max-width: 768px) {
    .section-heading { font-size: 26px; }
}
.section-subtext {
    font-size: 15px;
    color: #64748b;
    line-height: 1.7;
}

/* Executive Leadership Message */
.executive-card {
    background: #ffffff;
    border-radius: 30px;
    padding: 50px;
    box-shadow: 0 20px 45px -10px rgba(15,23,42,0.06);
    border: 1px solid #e2e8f0;
    display: grid;
    grid-template-columns: 420px 1fr;
    gap: 50px;
    align-items: center;
}
@media (max-width: 1023px) {
    .executive-card { grid-template-columns: 1fr; padding: 36px 24px; gap: 32px; }
}
.executive-photo-wrap {
    position: relative;
    border-radius: 22px;
    overflow: hidden;
    box-shadow: 0 16px 36px -8px rgba(15,23,42,0.18);
    background: #0f172a;
    aspect-ratio: 4 / 3.4;
}
.executive-photo-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
    display: block;
    image-rendering: -webkit-optimize-contrast;
    transition: transform 0.6s ease;
}
.executive-photo-wrap:hover img {
    transform: scale(1.03);
}
.executive-photo-badge {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    padding: 20px 22px;
    background: linear-gradient(to top, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.3) 70%, transparent 100%);
    color: white;
}

/* Vision & Mission Cards */
.vision-mission-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
}
@media (max-width: 900px) {
    .vision-mission-grid { grid-template-columns: 1fr; gap: 20px; }
}
.vm-card {
    background: #ffffff;
    border-radius: 26px;
    padding: 40px 34px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 10px 30px -6px rgba(15,23,42,0.04);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.vm-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px -10px rgba(15,23,42,0.08);
}
.vm-icon-box {
    width: 56px;
    height: 56px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
}

/* Japanese Kaigo Standard Section */
.tech-standard-card {
    background: #ffffff;
    border-radius: 30px;
    padding: 50px;
    box-shadow: 0 20px 45px -10px rgba(15,23,42,0.06);
    border: 1px solid #e2e8f0;
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 50px;
    align-items: center;
}
@media (max-width: 1023px) {
    .tech-standard-card { grid-template-columns: 1fr; padding: 36px 24px; gap: 32px; }
}
.tech-img-wrap {
    border-radius: 22px;
    overflow: hidden;
    box-shadow: 0 16px 36px -10px rgba(0,0,0,0.12);
    border: 1px solid #cbd5e1;
    background: #f8fafc;
}
.tech-img-wrap img {
    width: 100%;
    height: auto;
    display: block;
    image-rendering: -webkit-optimize-contrast;
    transition: transform 0.5s ease;
}
.tech-img-wrap:hover img {
    transform: scale(1.02);
}

/* Core Values Bento */
.values-grid-4 {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
}
@media (max-width: 1023px) {
    .values-grid-4 { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 639px) {
    .values-grid-4 { grid-template-columns: 1fr; }
}
.value-card-elite {
    background: #ffffff;
    border-radius: 24px;
    padding: 32px 24px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 6px 20px -4px rgba(15,23,42,0.03);
    transition: all 0.35s ease;
    display: flex;
    flex-direction: column;
}
.value-card-elite:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 35px -8px rgba(15,23,42,0.09);
    border-color: #cbd5e1;
}

/* Development Milestones Timeline */
.timeline-card-container {
    background: #ffffff;
    border-radius: 30px;
    padding: 50px 40px;
    box-shadow: 0 15px 40px -10px rgba(15,23,42,0.05);
    border: 1px solid #e2e8f0;
}
@media (max-width: 768px) {
    .timeline-card-container { padding: 32px 20px; }
}
.timeline-track {
    position: relative;
    margin-top: 30px;
}
.timeline-track::before {
    content: '';
    position: absolute;
    left: 28px;
    top: 20px;
    bottom: 20px;
    width: 2px;
    background: #e2e8f0;
}
.timeline-row {
    display: flex;
    gap: 28px;
    margin-bottom: 36px;
    position: relative;
}
.timeline-row:last-child {
    margin-bottom: 0;
}
.timeline-dot {
    width: 58px;
    height: 58px;
    border-radius: 50%;
    background: #0f172a;
    color: #ffffff;
    font-weight: 800;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    z-index: 2;
    box-shadow: 0 0 0 7px #f8fafc;
}
.timeline-content-box {
    background: #f8fafc;
    border-radius: 20px;
    padding: 24px 28px;
    border: 1px solid #e2e8f0;
    flex: 1;
}

/* Workplace Gallery Grid */
.gallery-grid-2x2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 28px;
}
@media (max-width: 768px) {
    .gallery-grid-2x2 { grid-template-columns: 1fr; gap: 20px; }
}
.gallery-item-card {
    background: #ffffff;
    border-radius: 24px;
    overflow: hidden;
    border: 1px solid #e2e8f0;
    box-shadow: 0 8px 25px -5px rgba(15,23,42,0.05);
    transition: all 0.35s ease;
}
.gallery-item-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px -10px rgba(15,23,42,0.1);
}
.gallery-thumb-wrap {
    position: relative;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    background: #f1f5f9;
}
.gallery-thumb-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
    image-rendering: -webkit-optimize-contrast;
    transition: transform 0.6s ease;
}
.gallery-item-card:hover .gallery-thumb-wrap img {
    transform: scale(1.04);
}

/* Legal & Map Section */
.corporate-card {
    background: #ffffff;
    border-radius: 30px;
    padding: 48px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 15px 40px -10px rgba(15,23,42,0.06);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    align-items: center;
}
@media (max-width: 1023px) {
    .corporate-card { grid-template-columns: 1fr; padding: 32px 20px; gap: 28px; }
}
.map-embed-wrap {
    height: 380px;
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid #cbd5e1;
    position: relative;
    box-shadow: 0 6px 20px rgba(0,0,0,0.06);
}
@media (max-width: 768px) {
    .map-embed-wrap { height: 280px; }
}

/* Strategic Partners Strip */
.partners-strip {
    background: #ffffff;
    border-radius: 24px;
    padding: 32px 24px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 6px 20px -5px rgba(15,23,42,0.04);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 36px;
}
.partner-logo-item {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    filter: grayscale(100%);
    opacity: 0.7;
    transition: all 0.3s ease;
}
.partner-logo-item:hover {
    filter: grayscale(0%);
    opacity: 1;
    transform: scale(1.05);
}
.partner-logo-item img {
    max-height: 100%;
    width: auto;
    object-fit: contain;
}

/* Call To Action Banner */
.company-cta-banner {
    background: linear-gradient(135deg, #0d9488 0%, #0284c7 50%, #0f172a 100%);
    border-radius: 30px;
    padding: 56px 40px;
    color: white;
    text-align: center;
    box-shadow: 0 25px 50px -12px rgba(13,148,136,0.3);
    position: relative;
    overflow: hidden;
}
</style>
"""

main_content = """
  <!-- ===================== 1. HERO SECTION ===================== -->
  <section class="company-hero">
    <div class="max-w-5xl mx-auto px-4 relative z-10" data-aos="fade-up">
      <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-teal-300 px-4 py-1.5 rounded-full text-xs font-bold border border-teal-500/20 mb-5 tracking-wide shadow-sm">
        <span>Kinh Nghiệm Chuẩn Nhật – Phát Triển Tại Thị Trường Việt Nam</span>
      </div>
      
      <!-- H1 Main Title: Strictly on 1 single line -->
      <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-white mb-5 font-heading tracking-tight leading-tight">
        HANIKI <span class="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-teal-100 to-sky-300">&amp;</span> Hành trình kiến tạo Hệ sinh thái BeeCare
      </h1>
      
      <p class="text-slate-200 text-sm sm:text-base md:text-lg font-normal max-w-3xl mx-auto mb-4 leading-relaxed">
        Kế thừa hơn <strong>6 năm kinh nghiệm thực chiến</strong> phát triển phần mềm điều dưỡng (<span class="text-teal-300 font-semibold">Kaigo</span>) chuẩn mực tại Nhật Bản, HANIKI mang đến <strong>Hệ sinh thái BeeCare</strong> thuần Việt, giúp các viện dưỡng lão số hóa toàn diện vận hành và gắn kết trọn vẹn niềm tin với gia đình.
      </p>

      <!-- Sảnh Đón Tiếp & Trụ Sở Nhận Diện Thương Hiệu (Lossless HD Image) -->
      <div class="hero-backdrop-card" data-aos="zoom-in" data-aos-delay="150">
        <img
          src="assets/company/backdrop-cong-ty.png"
          alt="Không gian nhận diện thương hiệu và sảnh đón tiếp CÔNG TY TNHH HANIKI"
          loading="eager"
        />
        <div class="hero-backdrop-caption">
          <div>
            <div class="text-xs uppercase tracking-widest text-teal-300 font-bold mb-1">Trụ Sở Điều Hành</div>
            <div class="text-white font-extrabold text-base sm:text-lg">CÔNG TY TNHH HANIKI – Tòa nhà Handico Tower, Phạm Hùng, Hà Nội</div>
          </div>
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-white font-semibold">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Hệ Sinh Thái Đang Vận Hành 24/7</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ===================== STATS BAR ===================== -->
  <div class="stats-container" data-aos="fade-up" data-aos-delay="200">
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-number text-teal-600" data-i18n="company_stat1_num">3</div>
        <div class="stat-label" data-i18n="company_stat1_title">Nền tảng đồng bộ</div>
        <div class="stat-desc" data-i18n="company_stat1_desc">Web Admin, App Điều Dưỡng & App Người Thân</div>
      </div>
      <div class="stat-card">
        <div class="stat-number text-sky-600" data-i18n="company_stat2_num">100%</div>
        <div class="stat-label" data-i18n="company_stat2_title">Quy trình số hóa</div>
        <div class="stat-desc" data-i18n="company_stat2_desc">Sinh hiệu, đơn thuốc & phân ca trực</div>
      </div>
      <div class="stat-card">
        <div class="stat-number text-emerald-600" data-i18n="company_stat3_num">R&D</div>
        <div class="stat-label" data-i18n="company_stat3_title">Đội ngũ kỹ sư tại Hà Nội</div>
        <div class="stat-desc" data-i18n="company_stat3_desc">Nghiên cứu & phát triển phần mềm y tế</div>
      </div>
      <div class="stat-card">
        <div class="stat-number text-amber-500" data-i18n="company_stat4_num">24/7</div>
        <div class="stat-label" data-i18n="company_stat4_title">Hỗ trợ kỹ thuật chuyên sâu</div>
        <div class="stat-desc" data-i18n="company_stat4_desc">Đồng hành liên tục cùng đơn vị vận hành</div>
      </div>
    </div>
  </div>

  <main style="background-color: #f8fafc; padding-bottom: 90px;">
    <!-- ===================== 2. THÔNG ĐIỆP TỪ BAN LÃNH ĐẠO ===================== -->
    <section class="section-wrapper" data-aos="fade-up">
      <div class="executive-card">
        <!-- Chân Dung Tổng Giám Đốc (Sharp & Elegant) -->
        <div class="executive-photo-wrap">
          <img
            src="assets/company/tong-giam-doc-mac-duy-hung.jpg"
            alt="Tổng Giám Đốc Mạc Duy Hưng – CÔNG TY TNHH HANIKI"
            loading="lazy"
          />
          <div class="executive-photo-badge">
            <div class="text-white font-extrabold text-lg sm:text-xl">Ông Mạc Duy Hưng</div>
            <div class="text-teal-300 text-xs sm:text-sm font-semibold" data-i18n="company_ceo_role">Tổng Giám Đốc – Người Sáng Lập HANIKI &amp; BeeCare</div>
          </div>
        </div>

        <!-- Lời Ngỏ & Tầm Nhìn Chiến Lược -->
        <div>
          <div class="text-xs uppercase tracking-wider text-teal-700 font-extrabold mb-1" data-i18n="company_lead_badge">
            Thông Điệp Từ Ban Lãnh Đạo
          </div>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug mb-4" data-i18n="company_lead_title">
            "Công Nghệ Tận Tâm, Nâng Tầm Dưỡng Lão"
          </h2>
          <blockquote class="text-slate-600 text-sm sm:text-base leading-relaxed italic border-l-4 border-teal-500 pl-4 my-5 bg-slate-50/70 p-3 rounded-r-xl" data-i18n="company_ceo_quote">
            "Mang công nghệ và chuẩn mực quản lý dưỡng lão khắt khe từ Nhật Bản về Việt Nam, sứ mệnh của HANIKI là xây dựng hệ sinh thái BeeCare thông minh, chuẩn y khoa và tràn đầy sự ấm áp — giúp các viện dưỡng lão vận hành an tâm và các gia đình trọn vẹn niềm tin."
          </blockquote>
          <div class="pt-2">
            <div class="text-base font-extrabold text-slate-900">Mạc Duy Hưng</div>
            <div class="text-xs text-slate-500 font-medium">Tổng Giám Đốc CÔNG TY TNHH HANIKI</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== 3. TẦM NHÌN & SỨ MỆNH ===================== -->
    <section class="section-wrapper" data-aos="fade-up">
      <div class="text-center max-w-2xl mx-auto mb-10">
        <div class="section-badge">
          <span data-i18n="company_vm_badge">Định Hướng Chiến Lược</span>
        </div>
        <h2 class="section-heading" data-i18n="company_vm_title">Tầm Nhìn &amp; Sứ Mệnh Phụng Sự</h2>
        <p class="section-subtext" data-i18n="company_vm_desc">Kim chỉ nam soi sáng mọi quyết định nghiên cứu sản phẩm và hợp tác cùng các viện dưỡng lão.</p>
      </div>

      <div class="vision-mission-grid">
        <!-- Sứ Mệnh -->
        <div class="vm-card">
          <div>
            <div class="text-xs font-bold text-teal-600 uppercase tracking-wider mb-2">Sứ Mệnh Phụng Sự</div>
            <h3 class="text-xl sm:text-2xl font-extrabold text-slate-900 mb-3">
              Số Hóa Toàn Diện &amp; Nâng Tầm Dưỡng Lão Việt
            </h3>
            <p class="text-slate-600 text-sm leading-relaxed mb-6">
              Ứng dụng công nghệ chuẩn Nhật để giải phóng nhân viên y tế khỏi sổ sách thủ công, trao quyền kiểm soát chuẩn xác cho ban quản lý viện và mang lại sự an tâm tuyệt đối cho các gia đình có người thân đang gửi gắm.
            </p>
          </div>
          <div class="space-y-2.5 pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-800 font-medium">
            <div class="flex items-center gap-2.5">
              <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-600 flex-shrink-0"></i>
              <span>Số hóa 100% hồ sơ chăm sóc và y lệnh tại giường</span>
            </div>
            <div class="flex items-center gap-2.5">
              <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-600 flex-shrink-0"></i>
              <span>Tối ưu hóa thời gian chăm sóc trực tiếp của điều dưỡng</span>
            </div>
            <div class="flex items-center gap-2.5">
              <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-600 flex-shrink-0"></i>
              <span>Gắn kết niềm tin bền chặt giữa viện và người nhà</span>
            </div>
          </div>
        </div>

        <!-- Tầm Nhìn -->
        <div class="vm-card">
          <div>
            <div class="text-xs font-bold text-sky-600 uppercase tracking-wider mb-2">Tầm Nhìn Chiến Lược</div>
            <h3 class="text-xl sm:text-2xl font-extrabold text-slate-900 mb-3">
              Doanh Nghiệp Số 1 Về Quản Lý Dưỡng Lão
            </h3>
            <p class="text-slate-600 text-sm leading-relaxed mb-6">
              Trở thành công ty công nghệ y tế lão khoa số 1 tại Việt Nam về giải pháp quản lý viện dưỡng lão và trung tâm chăm sóc ban ngày; kiên định là cầu nối chuyển giao công nghệ chuẩn mực giữa Nhật Bản và Việt Nam.
            </p>
          </div>
          <div class="space-y-2.5 pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-800 font-medium">
            <div class="flex items-center gap-2.5">
              <i data-lucide="check-circle-2" class="w-4 h-4 text-sky-600 flex-shrink-0"></i>
              <span>Tiên phong ứng dụng Cloud &amp; Realtime SignalR dưới 1s</span>
            </div>
            <div class="flex items-center gap-2.5">
              <i data-lucide="check-circle-2" class="w-4 h-4 text-sky-600 flex-shrink-0"></i>
              <span>Đồng hành cùng hệ thống viện dưỡng lão trên toàn quốc</span>
            </div>
            <div class="flex items-center gap-2.5">
              <i data-lucide="check-circle-2" class="w-4 h-4 text-sky-600 flex-shrink-0"></i>
              <span>Chuẩn hóa quy trình nghiệp vụ đạt chuẩn Kaigo quốc tế</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== 4. NĂNG LỰC CÔNG NGHỆ & CHUẨN NHẬT ===================== -->
    <section class="section-wrapper" data-aos="fade-up">
      <div class="tech-standard-card">
        <div>
          <div class="section-badge">
            <span>Năng Lực Công Nghệ Cốt Lõi</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Kế Thừa Chuẩn Mực Nhật Bản<br class="hidden sm:inline" />
            Tối Ưu Riêng Cho Viện Dưỡng Lão Việt
          </h2>
          <p class="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
            Được tôi luyện qua tiêu chuẩn y tế khắt khe của Nhật Bản, đội ngũ kỹ sư HANIKI đã bản địa hóa toàn bộ quy trình chăm sóc thành giải pháp thuần Việt: thao tác một chạm trên điện thoại, đồng bộ thời gian thực và an toàn dữ liệu y tế đa tầng.
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="flex items-center gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-xs sm:text-sm font-semibold text-slate-800">
              <i data-lucide="check-circle-2" class="w-4 h-4 text-teal-600 flex-shrink-0"></i>
              <span>Quy trình chuẩn Kaigo Nhật Bản</span>
            </div>
            <div class="flex items-center gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-xs sm:text-sm font-semibold text-slate-800">
              <i data-lucide="check-circle-2" class="w-4 h-4 text-teal-600 flex-shrink-0"></i>
              <span>100% Giao diện thuần Việt</span>
            </div>
            <div class="flex items-center gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-xs sm:text-sm font-semibold text-slate-800">
              <i data-lucide="check-circle-2" class="w-4 h-4 text-teal-600 flex-shrink-0"></i>
              <span>Đồng bộ Realtime &lt; 1 giây</span>
            </div>
            <div class="flex items-center gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-xs sm:text-sm font-semibold text-slate-800">
              <i data-lucide="check-circle-2" class="w-4 h-4 text-teal-600 flex-shrink-0"></i>
              <span>Bảo mật y tế đa tầng đạt chuẩn</span>
            </div>
          </div>
        </div>

        <!-- 3D Ecosystem Architecture Image (Sharp PNG) -->
        <div class="tech-img-wrap">
          <img
            src="assets/company/beecare-3d-ecosystem.png"
            alt="Kiến trúc hệ sinh thái công nghệ 3D BeeCare"
            loading="lazy"
          />
        </div>
      </div>
    </section>

    <!-- ===================== 5. 4 GIÁ TRỊ CỐT LÕI ===================== -->
    <section class="section-wrapper" data-aos="fade-up">
      <div class="text-center max-w-2xl mx-auto mb-10">
        <div class="section-badge">
          <span>Văn Hóa Doanh Nghiệp</span>
        </div>
        <h2 class="section-heading">4 Giá Trị Cốt Lõi Định Hình HANIKI</h2>
        <p class="section-subtext">Bốn nguyên tắc bất biến dẫn dắt mọi quyết định nghiên cứu và phụng sự khách hàng.</p>
      </div>

      <div class="values-grid-4">
        <div class="value-card-elite">
          <div class="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4 border border-rose-100">
            <i data-lucide="heart" class="w-6 h-6"></i>
          </div>
          <h3 class="text-base font-bold text-slate-900 mb-2">Lấy Gia Đình Làm Trung Tâm</h3>
          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Đồng hành và mang lại sự an tâm tuyệt đối cho người thân trong suốt hành trình chăm sóc cha mẹ tại viện.
          </p>
        </div>

        <div class="value-card-elite">
          <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 border border-emerald-100">
            <i data-lucide="shield-check" class="w-6 h-6"></i>
          </div>
          <h3 class="text-base font-bold text-slate-900 mb-2">Tin Cậy &amp; Minh Bạch</h3>
          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Mọi dữ liệu sinh hiệu, y lệnh thuốc và viện phí đều được đồng bộ thời gian thực (Realtime), minh bạch 100%.
          </p>
        </div>

        <div class="value-card-elite">
          <div class="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-4 border border-cyan-100">
            <i data-lucide="cpu" class="w-6 h-6"></i>
          </div>
          <h3 class="text-base font-bold text-slate-900 mb-2">Đột Phá Công Nghệ</h3>
          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Hạ tầng Cloud hiện đại, công nghệ SignalR đồng bộ dưới 1 giây và bảo mật dữ liệu y tế đa tầng.
          </p>
        </div>

        <div class="value-card-elite">
          <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 border border-blue-100">
            <i data-lucide="award" class="w-6 h-6"></i>
          </div>
          <h3 class="text-base font-bold text-slate-900 mb-2">Phụng Sự Tận Tâm</h3>
          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Tôn trọng và phụng dưỡng người cao tuổi chu đáo. Cam kết hỗ trợ kỹ thuật và vận hành 24/7 cùng viện dưỡng lão.
          </p>
        </div>
      </div>
    </section>

    <!-- ===================== 6. HÀNH TRÌNH PHÁT TRIỂN (TIMELINE) ===================== -->
    <section class="section-wrapper" data-aos="fade-up">
      <div class="timeline-card-container">
        <div class="text-center max-w-xl mx-auto mb-6">
          <div class="section-badge">
            <span>Dấu Ấn Trưởng Thành</span>
          </div>
          <h2 class="section-heading">Hành Trình Phát Triển</h2>
          <p class="section-subtext">Từ những ngày đầu khảo sát thực tế đến hệ sinh thái toàn diện hôm nay.</p>
        </div>

        <div class="timeline-track">
          <div class="timeline-row">
            <div class="timeline-dot">2023</div>
            <div class="timeline-content-box">
              <h4 class="text-base sm:text-lg font-bold text-slate-900 mb-1.5">Khởi nguồn ý tưởng &amp; Khảo sát thực địa</h4>
              <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Đội ngũ chuyên gia HANIKI trực tiếp khảo sát sâu rộng tại nhiều viện dưỡng lão và trung tâm chăm sóc người cao tuổi để thấu hiểu nỗi đau trong khâu ghi chép bệnh án và vận hành ca trực.
              </p>
            </div>
          </div>

          <div class="timeline-row">
            <div class="timeline-dot">2024</div>
            <div class="timeline-content-box">
              <h4 class="text-base sm:text-lg font-bold text-slate-900 mb-1.5">Phát triển nền tảng BeeCare Core</h4>
              <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Hoàn thành và ra mắt phiên bản BeeCare dành cho nhân viên y tế (Staff App) và hệ thống Web Quản Trị Trung Tâm (Web Portal), số hóa thành công 100% quy trình tiếp nhận, theo dõi sinh hiệu và lập y lệnh.
              </p>
            </div>
          </div>

          <div class="timeline-row">
            <div class="timeline-dot">2025</div>
            <div class="timeline-content-box">
              <h4 class="text-base sm:text-lg font-bold text-slate-900 mb-1.5">Ra mắt BeeCare Family &amp; Trợ Lý AI</h4>
              <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Mở rộng hệ sinh thái với ứng dụng di động BeeCare Family dành riêng cho người nhà, tích hợp trợ lý AI thông minh phân tích sức khỏe và hệ thống cảnh báo realtime, kết nối trọn vẹn viện dưỡng lão và gia đình.
              </p>
            </div>
          </div>

          <div class="timeline-row">
            <div class="timeline-dot">2026</div>
            <div class="timeline-content-box">
              <h4 class="text-base sm:text-lg font-bold text-slate-900 mb-1.5">Lan tỏa chuẩn mực &amp; Mở rộng hợp tác</h4>
              <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Triển khai giải pháp tại các hệ thống dưỡng lão hàng đầu cả nước (Diên Hồng, NozomiCare...). Đồng hành cùng các quỹ bảo trợ xã hội và dự án thiện nguyện nhằm phổ cập công nghệ chăm sóc người cao tuổi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== 7. KHÔNG GIAN & MÔI TRƯỜNG LÀM VIỆC ===================== -->
    <section class="section-wrapper" data-aos="fade-up">
      <div class="text-center max-w-2xl mx-auto mb-10">
        <div class="section-badge">
          <span>Môi Trường Làm Việc</span>
        </div>
        <h2 class="section-heading">Không Gian Nghiên Cứu &amp; Phát Triển</h2>
        <p class="section-subtext">Không gian sáng tạo, hiện đại và tràn đầy năng lượng tại trụ sở CÔNG TY TNHH HANIKI.</p>
      </div>

      <div class="gallery-grid-2x2">
        <div class="gallery-item-card">
          <div class="gallery-thumb-wrap">
            <img
              src="assets/company/hop-ky-thuat-san-pham.jpg"
              alt="Họp kỹ thuật nghiên cứu giải pháp phần mềm BeeCare"
              loading="lazy"
            />
          </div>
          <div class="p-5 sm:p-6">
            <h3 class="text-base sm:text-lg font-bold text-slate-900 mb-1">Nghiên Cứu &amp; Phát Triển</h3>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">Họp kỹ thuật phân tích luồng dữ liệu y tế và tối ưu hóa trải nghiệm điều dưỡng.</p>
          </div>
        </div>

        <div class="gallery-item-card">
          <div class="gallery-thumb-wrap">
            <img
              src="assets/company/dao-tao-demo-he-thong.jpg"
              alt="Đào tạo và kiểm thử hệ thống BeeCare"
              loading="lazy"
            />
          </div>
          <div class="p-5 sm:p-6">
            <h3 class="text-base sm:text-lg font-bold text-slate-900 mb-1">Đào Tạo &amp; Kiểm Thử</h3>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">Demo thực tế nghiệp vụ quản lý viện dưỡng lão và kiểm thử chức năng trước khi chuyển giao.</p>
          </div>
        </div>

        <div class="gallery-item-card">
          <div class="gallery-thumb-wrap">
            <img
              src="assets/company/van-phong-lap-trinh-1.jpg"
              alt="Không gian lập trình hiện đại"
              loading="lazy"
            />
          </div>
          <div class="p-5 sm:p-6">
            <h3 class="text-base sm:text-lg font-bold text-slate-900 mb-1">Không Gian Lập Trình Hiện Đại</h3>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">Khu vực làm việc mở với trang thiết bị cao cấp dành cho đội ngũ kỹ sư phần mềm.</p>
          </div>
        </div>

        <div class="gallery-item-card">
          <div class="gallery-thumb-wrap">
            <img
              src="assets/company/van-phong-lap-trinh-2.jpg"
              alt="Văn phòng năng động tại Tòa nhà Handico"
              loading="lazy"
            />
          </div>
          <div class="p-5 sm:p-6">
            <h3 class="text-base sm:text-lg font-bold text-slate-900 mb-1">Văn Phòng Năng Động – Handico Tower</h3>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">Môi trường làm việc trẻ trung, sáng tạo tại Tầng 30 Tòa nhà Handico Phạm Hùng, Hà Nội.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== 8. THÔNG TIN PHÁP NHÂN & BẢN ĐỒ ===================== -->
    <section class="section-wrapper" data-aos="fade-up">
      <div class="corporate-card">
        <!-- Thông tin liên hệ -->
        <div class="space-y-4">
          <div>
            <div class="section-badge mb-2">
              <span>Pháp Nhân Chính Thức</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              CÔNG TY TNHH HANIKI
            </h2>
            <p class="text-xs text-slate-500 mt-0.5">
              Đơn vị chủ quản và phát triển bản quyền hệ sinh thái BeeCare
            </p>
          </div>

          <div class="space-y-3.5 pt-2">
            <div class="flex items-start gap-3">
              <div class="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                </div>
              <div>
                <div class="text-[11px] text-slate-500 font-semibold uppercase">Trụ sở điều hành</div>
                <div class="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                  Tầng 30, Tòa nhà Handico, KĐT Mễ Trì Hạ, Đường Phạm Hùng, Quận Nam Từ Liêm, TP. Hà Nội
                </div>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                </div>
              <div>
                <div class="text-[11px] text-slate-500 font-semibold uppercase">Hotline tư vấn &amp; hỗ trợ 24/7</div>
                <div class="flex items-center gap-2 mt-0.5">
                  <a href="tel:0336123444" class="text-xs sm:text-sm font-bold text-slate-900 hover:text-teal-600 transition-colors font-mono">
                    0336 123 444
                  </a>
                  <span class="text-slate-300">•</span>
                  <a href="tel:0988123531" class="text-xs sm:text-sm font-bold text-slate-900 hover:text-teal-600 transition-colors font-mono">
                    0988 123 531
                  </a>
                </div>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                </div>
              <div>
                <div class="text-[11px] text-slate-500 font-semibold uppercase">Hòm thư điện tử</div>
                <div class="flex flex-wrap items-center gap-2 mt-0.5">
                  <a href="mailto:vuongnguyen@bee-system.vn" class="text-xs sm:text-sm font-bold text-slate-900 hover:text-teal-600 transition-colors font-mono">
                    vuongnguyen@bee-system.vn
                  </a>
                  <span class="text-slate-300">•</span>
                  <a href="mailto:trang.haniki@gmail.com" class="text-xs font-semibold text-slate-600 hover:text-teal-600 transition-colors font-mono">
                    trang.haniki@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                </div>
              <div>
                <div class="text-[11px] text-slate-500 font-semibold uppercase">Giờ làm việc văn phòng</div>
                <div class="text-xs sm:text-sm font-bold text-slate-900">
                  Thứ 2 – Thứ 7: 08:00 – 18:00 (Hệ thống Cloud &amp; Hotline trực 24/7/365)
                </div>
              </div>
            </div>
          </div>

          <div class="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-3">
            <a
              href="contact.html"
              class="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-bold inline-flex items-center gap-2 transition-all shadow-sm"
              style="min-height: 44px;"
            >
              <span>Gửi yêu cầu tư vấn</span>
            </a>
            <a
              href="https://beecare.vn"
              target="_blank"
              rel="noopener noreferrer"
              class="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold inline-flex items-center gap-2 transition-all border border-slate-200"
              style="min-height: 44px;"
            >
              <i data-lucide="sparkles" class="w-4 h-4 text-amber-500"></i>
              <span>Dùng thử phần mềm</span>
            </a>
          </div>
        </div>

        <!-- Google Maps Iframe -->
        <div class="map-embed-wrap">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.468766440816!2d105.77970541533202!3d21.016692893660525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab0d69594b35%3A0x56c7da1281efdc2f!2sHandico%20Tower!5e0!3m2!1svi!2svn!4v1710000000000!5m2!1svi!2svn"
            width="100%"
            height="100%"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Bản đồ văn phòng Tòa nhà Handico Tower - CÔNG TY TNHH HANIKI"
            class="w-full h-full"
          ></iframe>
          <a
            href="https://maps.app.goo.gl/ck1aXfgcijSMhmdc9"
            target="_blank"
            rel="noopener noreferrer"
            class="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 hover:bg-white text-slate-800 text-xs font-semibold rounded-lg shadow-md border border-slate-200 backdrop-blur-sm transition-all"
            style="min-height: 36px;"
          >
            <i data-lucide="external-link" class="w-3.5 h-3.5 text-teal-600"></i>
            <span>Mở trên Google Maps</span>
          </a>
        </div>
      </div>
    </section>

    <!-- ===================== 9. ĐỐI TÁC ĐỒNG HÀNH ===================== -->
    <section class="section-wrapper" data-aos="fade-up">
      <div class="text-center max-w-xl mx-auto mb-6">
        <div class="section-badge">
          <span>Mạng Lưới Đối Tác</span>
        </div>
        <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">Đối Tác Chiến Lược Đồng Hành</h2>
      </div>

      <div class="partners-strip">
        <div class="partner-logo-item" title="Dưỡng Lão Diên Hồng">
          <img src="assets/images/partners/dienhong-logo.png" alt="Dưỡng Lão Diên Hồng" />
        </div>
        <div class="partner-logo-item" title="Viện Dưỡng Lão NozomiCare">
          <img src="assets/images/partners/nozomicare-logo.png" alt="NozomiCare" />
        </div>
        <div class="partner-logo-item" title="Bee System Japan">
          <img src="assets/images/partners/beesystem-japan-logo.png" alt="Bee System Japan" />
        </div>
        <div class="partner-logo-item" title="Bee Infor Technology">
          <img src="assets/images/partners/bee-infor-logo.png" alt="Bee Infor" />
        </div>
      </div>
    </section>

    <!-- ===================== 10. CALL TO ACTION BANNER ===================== -->
    <section class="section-wrapper" data-aos="fade-up">
      <div class="company-cta-banner">
        <div class="max-w-2xl mx-auto relative z-10">
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 tracking-tight">
            Sẵn Sàng Nâng Tầm Quản Lý Viện Dưỡng Lão?
          </h2>
          <p class="text-teal-50 text-sm sm:text-base mb-8 leading-relaxed max-w-xl mx-auto">
            Đồng hành cùng HANIKI để số hóa toàn diện quy trình chăm sóc người cao tuổi, tối ưu chi phí vận hành và xây dựng niềm tin trọn vẹn với các gia đình.
          </p>
          <div class="flex flex-wrap items-center justify-center gap-4">
            <a
              href="contact.html"
              class="px-7 py-3 rounded-xl bg-white text-teal-800 font-bold text-sm hover:bg-teal-50 transition-all shadow-lg inline-flex items-center gap-2"
              style="min-height: 48px;"
            >
              <i data-lucide="phone-call" class="w-4 h-4 text-teal-600"></i>
              <span>Đặt lịch hẹn tư vấn &amp; Demo</span>
            </a>
            <a
              href="https://beecare.vn"
              target="_blank"
              rel="noopener noreferrer"
              class="px-7 py-3 rounded-xl bg-teal-900/60 hover:bg-teal-900 text-white font-semibold text-sm transition-all border border-white/20 inline-flex items-center gap-2"
              style="min-height: 48px;"
            >
              <i data-lucide="sparkles" class="w-4 h-4 text-amber-300"></i>
              <span>Trải nghiệm phần mềm</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>
  <script>
    document.addEventListener("DOMContentLoaded", function() {
      if (window.lucide) {
        window.lucide.createIcons();
      }
    });
  </script>
"""

# Re-inject scripts/styles properly
head_end_idx = top_html.find("</head>")
if head_end_idx != -1:
    top_html = top_html[:head_end_idx] + custom_styles + "\n" + top_html[head_end_idx:]

final_html = top_html + main_content + bottom_html

with open(os.path.join(base_dir, "company.html"), "w", encoding="utf-8") as f:
    f.write(final_html)

print("Successfully regenerated company.html with refined sections and high-definition sharp images!")
