import os
import re

file_path = r"e:\MKT\build_company.py"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

replacements = {
    'class="hero-tag" data-aos="fade-up">': 'class="hero-tag" data-aos="fade-up" data-i18n="company_hero_badge">',
    'class="hero-title" data-aos="fade-up" data-aos-delay="100">': 'class="hero-title" data-aos="fade-up" data-aos-delay="100" data-i18n="company_hero_title">',
    'class="hero-desc" data-aos="fade-up" data-aos-delay="200">': 'class="hero-desc" data-aos="fade-up" data-aos-delay="200" data-i18n="company_hero_desc">',
    '<span>Đặt lịch tư vấn &amp; khảo sát tại viện</span>': '<span data-i18n="company_hero_cta_survey">Đặt lịch tư vấn &amp; khảo sát tại viện</span>',
    '<span>Xem bảng giá các gói</span>': '<span data-i18n="company_hero_cta_pricing">Xem bảng giá các gói</span>',
    
    '<div class="stat-number text-teal-600">6+</div>': '<div class="stat-number text-teal-600" data-i18n="company_stat1_num">3</div>',
    '<div class="stat-label">Năm kinh nghiệm Kaigo</div>': '<div class="stat-label" data-i18n="company_stat1_title">Nền tảng đồng bộ</div>',
    '<div class="stat-desc">Nghiên cứu &amp; phát triển phần mềm y tế dưỡng lão chuẩn Nhật Bản</div>': '<div class="stat-desc" data-i18n="company_stat1_desc">Web Admin, App Điều Dưỡng & App Người Thân</div>',
    
    '<div class="stat-number text-sky-600">30+</div>': '<div class="stat-number text-sky-600" data-i18n="company_stat2_num">100%</div>',
    '<div class="stat-label">Kỹ sư &amp; chuyên gia</div>': '<div class="stat-label" data-i18n="company_stat2_title">Quy trình số hóa</div>',
    '<div class="stat-desc">Đội ngũ công nghệ chuyên môn cao tại trụ sở Handico Tower Hà Nội</div>': '<div class="stat-desc" data-i18n="company_stat2_desc">Sinh hiệu, đơn thuốc & phân ca trực</div>',
    
    '<div class="stat-number text-emerald-600">1.000+</div>': '<div class="stat-number text-emerald-600" data-i18n="company_stat3_num">R&D</div>',
    '<div class="stat-label">Người cao tuổi an tâm</div>': '<div class="stat-label" data-i18n="company_stat3_title">Đội ngũ kỹ sư tại Hà Nội</div>',
    '<div class="stat-desc">Được chăm sóc và theo dõi sức khỏe an toàn hàng ngày trên hệ thống</div>': '<div class="stat-desc" data-i18n="company_stat3_desc">Nghiên cứu & phát triển phần mềm y tế</div>',
    
    '<div class="stat-number text-amber-500">200+</div>': '<div class="stat-number text-amber-500" data-i18n="company_stat4_num">24/7</div>',
    '<div class="stat-label">Gia đình gắn kết</div>': '<div class="stat-label" data-i18n="company_stat4_title">Hỗ trợ kỹ thuật chuyên sâu</div>',
    '<div class="stat-desc">Đồng hành cùng cha mẹ mọi lúc mọi nơi qua ứng dụng di động BeeCare Family</div>': '<div class="stat-desc" data-i18n="company_stat4_desc">Đồng hành liên tục cùng đơn vị vận hành</div>',

    '<span>Định Hướng Chiến Lược</span>': '<span data-i18n="company_vm_badge">Định Hướng Chiến Lược</span>',
    '<h2 class="section-heading">Tầm Nhìn &amp; Sứ Mệnh Phụng Sự</h2>': '<h2 class="section-heading" data-i18n="company_vm_title">Tầm Nhìn &amp; Sứ Mệnh Phụng Sự</h2>',
    '<p class="section-subtext">Kim chỉ nam soi sáng mọi quyết định nghiên cứu sản phẩm và hợp tác cùng các viện dưỡng lão.</p>': '<p class="section-subtext" data-i18n="company_vm_desc">Kim chỉ nam soi sáng mọi quyết định nghiên cứu sản phẩm và hợp tác cùng các viện dưỡng lão.</p>',

    '<div class="vm-title">Sứ Mệnh</div>': '<div class="vm-title" data-i18n="company_mission_title">Sứ Mệnh</div>',
    '<div class="vm-desc">Giúp nhân viên điều dưỡng giảm bớt gánh nặng sổ sách hành chính để toàn tâm chăm sóc người cao tuổi bằng sự ân cần. Đồng thời tạo cầu nối thông tin kịp thời, minh bạch giúp người thân an tâm gửi gắm cha mẹ.</div>': '<div class="vm-desc" data-i18n="company_mission_desc">Giúp nhân viên điều dưỡng giảm bớt gánh nặng sổ sách hành chính để toàn tâm chăm sóc người cao tuổi bằng sự ân cần. Đồng thời tạo cầu nối thông tin kịp thời, minh bạch giúp người thân an tâm gửi gắm cha mẹ.</div>',
    '<li>Minh bạch hóa lịch trình sinh hoạt, y lệnh dùng thuốc và thông tin viện phí</li>': '<li data-i18n="company_mission_item1">Minh bạch hóa lịch trình sinh hoạt, y lệnh dùng thuốc và thông tin viện phí</li>',
    '<li>Nâng cao năng suất và hỗ trợ nhân viên điều dưỡng thao tác thuận tiện ngay tại giường</li>': '<li data-i18n="company_mission_item2">Nâng cao năng suất và hỗ trợ nhân viên điều dưỡng thao tác thuận tiện ngay tại giường</li>',

    '<div class="vm-title">Tầm Nhìn</div>': '<div class="vm-title" data-i18n="company_vision_title">Tầm Nhìn</div>',
    '<div class="vm-desc">Xây dựng phần mềm quản lý viện dưỡng lão tin cậy, thiết thực và dễ sử dụng hàng đầu tại Việt Nam; giúp các cơ sở dưỡng lão tối ưu hóa vận hành, kiểm soát chặt chẽ thông tin và nâng cao chất lượng phục vụ người cao tuổi.</div>': '<div class="vm-desc" data-i18n="company_vision_desc">Xây dựng phần mềm quản lý viện dưỡng lão tin cậy, thiết thực và dễ sử dụng hàng đầu tại Việt Nam; giúp các cơ sở dưỡng lão tối ưu hóa vận hành, kiểm soát chặt chẽ thông tin và nâng cao chất lượng phục vụ người cao tuổi.</div>',
    '<li>Hạn chế ghi chép thủ công, số hóa biểu đồ theo dõi sinh hiệu và bàn giao ca trực</li>': '<li data-i18n="company_vision_item1">Hạn chế ghi chép thủ công, số hóa biểu đồ theo dõi sinh hiệu và bàn giao ca trực</li>',
    '<li>Hỗ trợ nhắc lịch chăm sóc, cảnh báo y tế sớm và quản lý chi phí minh bạch</li>': '<li data-i18n="company_vision_item2">Hỗ trợ nhắc lịch chăm sóc, cảnh báo y tế sớm và quản lý chi phí minh bạch</li>',

    '<span>Giá trị cốt lõi</span>': '<span data-i18n="company_cv_badge">Giá trị cốt lõi</span>',
    '<h2 class="section-heading text-center">Nguyên tắc định hình sản phẩm</h2>': '<h2 class="section-heading text-center" data-i18n="company_cv_title">Nguyên tắc định hình sản phẩm</h2>',
    '<p class="section-subtext text-center">Mỗi tính năng đều xuất phát từ sự thấu hiểu sâu sắc người dùng và y đức.</p>': '<p class="section-subtext text-center" data-i18n="company_cv_desc">Mỗi tính năng đều xuất phát từ sự thấu hiểu sâu sắc người dùng và y đức.</p>',

    '<div class="cv-title">Thấu cảm &amp; nhân văn</div>': '<div class="cv-title" data-i18n="company_cv1_title">Thấu cảm &amp; nhân văn</div>',
    '<div class="cv-desc">Lắng nghe nhu cầu thực tế của người cao tuổi, gia đình và nhân viên điều dưỡng để xây dựng tính năng thiết thực nhất.</div>': '<div class="cv-desc" data-i18n="company_cv1_desc">Lắng nghe nhu cầu thực tế của người cao tuổi, gia đình và nhân viên điều dưỡng để xây dựng tính năng thiết thực nhất.</div>',
    '<div class="cv-title">Minh bạch &amp; chính xác</div>': '<div class="cv-title" data-i18n="company_cv2_title">Minh bạch &amp; chính xác</div>',
    '<div class="cv-desc">Mọi chỉ số sinh hiệu, lịch dùng thuốc và chi phí đều được ghi nhận rõ ràng, trung thực và tức thì.</div>': '<div class="cv-desc" data-i18n="company_cv2_desc">Mọi chỉ số sinh hiệu, lịch dùng thuốc và chi phí đều được ghi nhận rõ ràng, trung thực và tức thì.</div>',
    '<div class="cv-title">Ổn định &amp; bảo mật</div>': '<div class="cv-title" data-i18n="company_cv3_title">Ổn định &amp; bảo mật</div>',
    '<div class="cv-desc">Hạ tầng máy chủ tin cậy, lưu trữ an toàn hồ sơ sức khỏe và đảm bảo vận hành liên tục 24/7.</div>': '<div class="cv-desc" data-i18n="company_cv3_desc">Hạ tầng máy chủ tin cậy, lưu trữ an toàn hồ sơ sức khỏe và đảm bảo vận hành liên tục 24/7.</div>',
    '<div class="cv-title">Đồng hành tận tâm</div>': '<div class="cv-title" data-i18n="company_cv4_title">Đồng hành tận tâm</div>',
    '<div class="cv-desc">Hỗ trợ đào tạo tại chỗ, hướng dẫn chi tiết và luôn sẵn sàng hỗ trợ kỹ thuật khi viện cần.</div>': '<div class="cv-desc" data-i18n="company_cv4_desc">Hỗ trợ đào tạo tại chỗ, hướng dẫn chi tiết và luôn sẵn sàng hỗ trợ kỹ thuật khi viện cần.</div>',

    '<span>Không gian làm việc &amp; Đội ngũ</span>': '<span data-i18n="company_work_badge">Không gian làm việc &amp; Đội ngũ</span>',
    '<h2 class="section-heading text-center">Môi trường nghiên cứu năng động &amp; thực tế</h2>': '<h2 class="section-heading text-center" data-i18n="company_work_title">Môi trường nghiên cứu năng động &amp; thực tế</h2>',
    '<p class="section-subtext text-center">Hình ảnh thực tế hoạt động nghiên cứu phát triển và văn hóa doanh nghiệp tại HANIKI</p>': '<p class="section-subtext text-center" data-i18n="company_work_desc">Hình ảnh thực tế hoạt động nghiên cứu phát triển và văn hóa doanh nghiệp tại HANIKI</p>',

    '<div class="gallery-badge text-sky-400">Đội ngũ kỹ sư</div>': '<div class="gallery-badge text-sky-400" data-i18n="company_photo1_badge">Đội ngũ kỹ sư</div>',
    '<div class="gallery-title">Tập thể nhân sự HANIKI</div>': '<div class="gallery-title" data-i18n="company_photo1_title">Tập thể nhân sự HANIKI</div>',
    '<div class="gallery-desc">Đội ngũ kỹ sư công nghệ nhiệt huyết tại trụ sở Hà Nội.</div>': '<div class="gallery-desc" data-i18n="company_photo1_desc">Đội ngũ kỹ sư công nghệ nhiệt huyết tại trụ sở Hà Nội.</div>',

    '<div class="gallery-badge text-emerald-400">R&amp;D &amp; Thiết kế</div>': '<div class="gallery-badge text-emerald-400" data-i18n="company_photo2_badge">R&amp;D &amp; Thiết kế</div>',
    '<div class="gallery-title">Họp kỹ thuật &amp; Phân tích tính năng</div>': '<div class="gallery-title" data-i18n="company_photo2_title">Họp kỹ thuật &amp; Phân tích tính năng</div>',
    '<div class="gallery-desc">Thảo luận tối ưu trải nghiệm người dùng và quy trình thao tác điều dưỡng.</div>': '<div class="gallery-desc" data-i18n="company_photo2_desc">Thảo luận tối ưu trải nghiệm người dùng và quy trình thao tác điều dưỡng.</div>',

    '<div class="gallery-badge text-amber-400">Kiểm thử hệ thống</div>': '<div class="gallery-badge text-amber-400" data-i18n="company_photo3_badge">Kiểm thử hệ thống</div>',
    '<div class="gallery-title">Đào tạo &amp; Thử nghiệm giải pháp</div>': '<div class="gallery-title" data-i18n="company_photo3_title">Đào tạo &amp; Thử nghiệm giải pháp</div>',
    '<div class="gallery-desc">Kiểm thử các luồng dữ liệu đồng bộ giữa Cổng quản trị và Ứng dụng di động.</div>': '<div class="gallery-desc" data-i18n="company_photo3_desc">Kiểm thử các luồng dữ liệu đồng bộ giữa Cổng quản trị và Ứng dụng di động.</div>',

    '<div class="gallery-badge text-indigo-400">Môi trường làm việc</div>': '<div class="gallery-badge text-indigo-400" data-i18n="company_photo4_badge">Môi trường làm việc</div>',
    '<div class="gallery-title">Khu vực nghiên cứu phần mềm</div>': '<div class="gallery-title" data-i18n="company_photo4_title">Khu vực nghiên cứu phần mềm</div>',
    '<div class="gallery-desc">Không gian làm việc mở, năng động tại văn phòng Handico Phạm Hùng.</div>': '<div class="gallery-desc" data-i18n="company_photo4_desc">Không gian làm việc mở, năng động tại văn phòng Handico Phạm Hùng.</div>',

    '<div class="gallery-badge text-rose-400">Hạ tầng &amp; Bảo mật</div>': '<div class="gallery-badge text-rose-400" data-i18n="company_photo5_badge">Hạ tầng &amp; Bảo mật</div>',
    '<div class="gallery-title">Hạ tầng Cloud &amp; Giám sát hệ thống</div>': '<div class="gallery-title" data-i18n="company_photo5_title">Hạ tầng Cloud &amp; Giám sát hệ thống</div>',
    '<div class="gallery-desc">Đội ngũ kỹ thuật giám sát hệ thống, tối ưu độ ổn định và an toàn dữ liệu.</div>': '<div class="gallery-desc" data-i18n="company_photo5_desc">Đội ngũ kỹ thuật giám sát hệ thống, tối ưu độ ổn định và an toàn dữ liệu.</div>',

    '<div class="gallery-badge text-teal-400">Văn hóa doanh nghiệp</div>': '<div class="gallery-badge text-teal-400" data-i18n="company_photo6_badge">Văn hóa doanh nghiệp</div>',
    '<div class="gallery-title">Gắn kết &amp; Tinh thần phụng sự</div>': '<div class="gallery-title" data-i18n="company_photo6_title">Gắn kết &amp; Tinh thần phụng sự</div>',
    '<div class="gallery-desc">Môi trường làm việc thân thiện, tôn trọng và cùng nhau tiến bộ mỗi ngày.</div>': '<div class="gallery-desc" data-i18n="company_photo6_desc">Môi trường làm việc thân thiện, tôn trọng và cùng nhau tiến bộ mỗi ngày.</div>',

    '<span>Pháp nhân nghiên cứu &amp; vận hành</span>': '<span data-i18n="company_legal_badge">Pháp nhân nghiên cứu &amp; vận hành</span>',
    '<div class="corp-name">Công ty TNHH HANIKI</div>': '<div class="corp-name" data-i18n="company_legal_name">Công ty TNHH HANIKI</div>',
    '<div class="corp-sub">Đơn vị chủ quản phát triển hệ sinh thái y tế số BeeCare, đồng hành cùng các cơ sở dưỡng lão chuẩn hóa quy trình chăm sóc người cao tuổi tại Việt Nam.</div>': '<div class="corp-sub" data-i18n="company_legal_sub">Đơn vị chủ quản phát triển hệ sinh thái y tế số BeeCare, đồng hành cùng các cơ sở dưỡng lão chuẩn hóa quy trình chăm sóc người cao tuổi tại Việt Nam.</div>',
    
    '<div class="corp-label">Trụ sở điều hành</div>': '<div class="corp-label" data-i18n="company_legal_addr_label">Trụ sở điều hành</div>',
    '<div class="corp-val">Tầng 30, Tòa nhà Handico Tower, Đường Phạm Hùng, Phường Mễ Trì, Quận Nam Từ Liêm, TP. Hà Nội</div>': '<div class="corp-val" data-i18n="company_legal_addr_val">Tầng 30, Tòa nhà Handico Tower, Đường Phạm Hùng, Phường Mễ Trì, Quận Nam Từ Liêm, TP. Hà Nội</div>',
    
    '<div class="corp-label">Hotline tư vấn &amp; Hỗ trợ</div>': '<div class="corp-label" data-i18n="company_legal_hotline_label">Hotline tư vấn &amp; Hỗ trợ</div>',
    '<div class="corp-label">Email liên hệ chính thức</div>': '<div class="corp-label" data-i18n="company_legal_email_label">Email liên hệ chính thức</div>',
    
    '<div class="corp-label">Thời gian làm việc</div>': '<div class="corp-label" data-i18n="company_legal_hours_label">Thời gian làm việc</div>',
    '<div class="corp-val">Thứ Hai – Thứ Bảy: 8:00 – 18:00 (Hệ thống Cloud &amp; Kỹ thuật trực 24/7)</div>': '<div class="corp-val" data-i18n="company_legal_hours_val">Thứ Hai – Thứ Bảy: 8:00 – 18:00 (Hệ thống Cloud &amp; Kỹ thuật trực 24/7)</div>',
    
    '<div class="text-xs uppercase tracking-wider font-extrabold text-teal-600 mb-1">Trải nghiệm thực địa</div>': '<div class="text-xs uppercase tracking-wider font-extrabold text-teal-600 mb-1" data-i18n="company_demo_badge">Trải nghiệm thực địa</div>',
    '<h3 class="text-2xl font-extrabold text-slate-900 mb-3">Khảo sát &amp; Demo tại viện</h3>': '<h3 class="text-2xl font-extrabold text-slate-900 mb-3" data-i18n="company_demo_box_title">Khảo sát &amp; Demo tại viện</h3>',
    '<p class="text-slate-600 mb-6 text-[15px] leading-relaxed">Đội ngũ chuyên viên HANIKI trực tiếp đến tận cơ sở dưỡng lão để khảo sát luồng vận hành thực tế, tư vấn lộ trình số hóa và demo hệ thống BeeCare trực tiếp.</p>': '<p class="text-slate-600 mb-6 text-[15px] leading-relaxed" data-i18n="company_demo_box_desc">Đội ngũ chuyên viên HANIKI trực tiếp đến tận cơ sở dưỡng lão để khảo sát luồng vận hành thực tế, tư vấn lộ trình số hóa và demo hệ thống BeeCare trực tiếp.</p>',
    '<span>Đặt lịch khảo sát ngay</span>': '<span data-i18n="company_demo_box_btn">Đặt lịch khảo sát ngay</span>'
}

for k, v in replacements.items():
    content = content.replace(k, v)

# Re-run for dynamic attributes on some others not completely matched
content = re.sub(r'<div class="text-xs uppercase tracking-wider text-teal-700 font-extrabold mb-1">\s*Thông Điệp Từ Ban Lãnh Đạo\s*</div>', '<div class="text-xs uppercase tracking-wider text-teal-700 font-extrabold mb-1" data-i18n="company_lead_badge">\n            Thông Điệp Từ Ban Lãnh Đạo\n          </div>', content)

content = re.sub(r'<h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug mb-4">\s*"Công Nghệ Tận Tâm, Nâng Tầm Dưỡng Lão"\s*</h2>', '<h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug mb-4" data-i18n="company_lead_title">\n            "Công Nghệ Tận Tâm, Nâng Tầm Dưỡng Lão"\n          </h2>', content)

content = re.sub(r'<blockquote class="text-slate-600 text-sm sm:text-base leading-relaxed italic border-l-4 border-teal-500 pl-4 my-5 bg-slate-50/70 p-3 rounded-r-xl">\s*"Mang công nghệ và chuẩn mực quản lý dưỡng lão khắt khe từ Nhật Bản về Việt Nam, sứ mệnh của HANIKI là xây dựng hệ sinh thái BeeCare thông minh, chuẩn y khoa và tràn đầy sự ấm áp — giúp các viện dưỡng lão vận hành an tâm và các gia đình trọn vẹn niềm tin."\s*</blockquote>', '<blockquote class="text-slate-600 text-sm sm:text-base leading-relaxed italic border-l-4 border-teal-500 pl-4 my-5 bg-slate-50/70 p-3 rounded-r-xl" data-i18n="company_ceo_quote">\n            "Mang công nghệ và chuẩn mực quản lý dưỡng lão khắt khe từ Nhật Bản về Việt Nam, sứ mệnh của HANIKI là xây dựng hệ sinh thái BeeCare thông minh, chuẩn y khoa và tràn đầy sự ấm áp — giúp các viện dưỡng lão vận hành an tâm và các gia đình trọn vẹn niềm tin."\n          </blockquote>', content)

content = re.sub(r'<div class="text-teal-300 text-xs sm:text-sm font-semibold">Tổng Giám Đốc – Người Sáng Lập HANIKI &amp; BeeCare</div>', '<div class="text-teal-300 text-xs sm:text-sm font-semibold" data-i18n="company_ceo_role">Tổng Giám Đốc – Người Sáng Lập HANIKI &amp; BeeCare</div>', content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
