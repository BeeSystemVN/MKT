import os
import shutil
import json
import re

base_dir = r"e:\MKT"

# Read index.html for layout
with open(os.path.join(base_dir, "index.html"), "r", encoding="utf-8") as f:
    index_html = f.read()

nav_end_tag = "</nav>"
nav_end_idx = index_html.find(nav_end_tag) + len(nav_end_tag)
top_html = index_html[:nav_end_idx]

top_html = top_html.replace("<title>BeeCare – Quản lý viện dưỡng lão thông minh</title>", "<title>Tin Tức & Sự Kiện | BeeCare</title>")
top_html = top_html.replace('class="nav-menu-item active"', 'class="nav-menu-item"')
top_html = top_html.replace('href="news.html" class="nav-menu-item"', 'href="news.html" class="nav-menu-item active"')
top_html = top_html.replace('href="news.html" class="mobile-nav-link"', 'href="news.html" class="mobile-nav-link active"')
top_html = top_html.replace('href="index.html" class="mobile-nav-link active"', 'href="index.html" class="mobile-nav-link"')

footer_start_str = "<!-- ===================== MOBILE QUICK-ACTION STICKY BAR ===================== -->"
footer_start_idx = index_html.find(footer_start_str)
bottom_html = index_html[footer_start_idx:]

articles = [
  {
    "id": "haniki-lan-toa-yeu-thuong-tai-ban-nhang-cao-bang",
    "category": "Thiện Nguyện & Cộng Đồng",
    "title": "HANIKI Lan Tỏa Yêu Thương Đầu Năm 2026 Tại Bản Nhảng, Cao Bằng",
    "date": "09/01/2026",
    "readTime": "6 phút đọc",
    "image": "assets/news/thien-nguyen-cao-bang-banner.jpg",
    "excerpt": "Nhân dịp đầu năm mới 2026, với tinh thần sẻ chia và trách nhiệm đối với cộng đồng, Công ty TNHH HANIKI đã đồng hành và tài trợ cho chương trình thiện nguyện được tổ chức tại Bản Nhảng.",
    "content": [
        "Nhân dịp đầu năm mới 2026, với tinh thần sẻ chia và trách nhiệm đối với cộng đồng, Công ty TNHH HANIKI đã đồng hành và tài trợ cho chương trình thiện nguyện được tổ chức tại Bản Nhảng, xã Thị Hoa, huyện Hạ Lang, tỉnh Cao Bằng – một địa phương vùng cao còn nhiều khó khăn về điều kiện sinh hoạt và hạ tầng cơ bản.",
        "Chương trình do Trường Đại học Khoa học Xã hội và Nhân văn tổ chức, với sự tham gia và hỗ trợ tích cực từ các đơn vị đồng hành. Trong đó, HANIKI cùng với Viện Dưỡng lão Diên Hồng giữ vai trò là nhà tài trợ chính, phối hợp triển khai nhiều hoạt động thiết thực, mang lại giá trị lâu dài cho cộng đồng dân cư trong bản.",
        "**1. Những hỗ trợ thiết thực – Gieo hy vọng bền lâu:**",
        "Trong khuôn khổ chương trình, HANIKI đã trực tiếp tài trợ và triển khai các hạng mục hỗ trợ cụ thể:",
        "- Lắp đặt 20 đèn chiếu sáng đường tại các trục đường chính trong bản, góp phần cải thiện điều kiện đi lại, đảm bảo an toàn cho bà con vào ban đêm và nâng cao chất lượng đời sống sinh hoạt.",
        "[IMG: assets/news/lap-dat-den-chieu-sang.jpg]",
        "- Trao tặng 50 phần quà Tết cho các hộ gia đình có hoàn cảnh khó khăn, trị giá 700.000 đồng mỗi phần, gồm các nhu yếu phẩm thiết yếu, giúp bà con đón năm mới ấm áp và đủ đầy hơn.",
        "[IMG: assets/news/trao-qua-tet-ho-kho-khan.jpg]",
        "- Trao tặng 2 máy lọc nước cho Ủy ban Nhân dân xã Thị Hoa, góp phần cải thiện nguồn nước sinh hoạt, phục vụ tốt hơn cho công tác hành chính và các hoạt động cộng đồng tại địa phương.",
        "- Tổ chức \"Phiên chợ 0 đồng\", nơi người dân trong bản có thể tự do lựa chọn các mặt hàng cần thiết cho gia đình mà không phải chi trả, tạo nên không khí sẻ chia, gần gũi và đầy tính nhân văn.",
        "[IMG: assets/news/phien-cho-0-dong.jpg]",
        "Những hoạt động trên không chỉ mang ý nghĩa hỗ trợ trước mắt, mà còn thể hiện mong muốn của HANIKI trong việc góp phần cải thiện điều kiện sống, tiếp thêm niềm tin và động lực cho bà con vùng cao trong hành trình vươn lên.",
        "**2. Gắn kết cộng đồng – Ấm áp nghĩa tình:**",
        "[IMG: assets/news/lua-trai-ban-nhang.jpg]",
        "Điểm nhấn xúc động của chương trình là đêm lửa trại giao lưu cùng bà con nhân dân trong bản. Trong ánh lửa bập bùng giữa núi rừng Cao Bằng, đại diện HANIKI, các đơn vị tổ chức và người dân địa phương đã cùng nhau trò chuyện, ca hát và chia sẻ những câu chuyện đời thường giản dị nhưng ấm áp. Khoảnh khắc ấy đã xóa nhòa khoảng cách, thắt chặt tình cảm và để lại nhiều kỷ niệm khó quên trong lòng những người tham gia.",
        "**3. Trách nhiệm xã hội – Giá trị cốt lõi của HANIKI:**",
        "Đại diện HANIKI chia sẻ: \"Chúng tôi tin rằng mỗi doanh nghiệp không chỉ tạo ra giá trị kinh tế mà còn cần lan tỏa giá trị nhân văn cho xã hội. Hoạt động thiện nguyện tại Bản Nhảng là minh chứng cho cam kết lâu dài của HANIKI trong việc đồng hành cùng cộng đồng, đặc biệt là những vùng còn nhiều khó khăn.\"",
        "Sự phối hợp giữa HANIKI, Trường Đại học Khoa học Xã hội và Nhân văn và Viện Dưỡng lão Diên Hồng đã tạo nên một chương trình thiện nguyện trọn vẹn, mang tính kết nối đa chiều giữa giáo dục – doanh nghiệp – tổ chức xã hội.",
        "**4. Hành trình sẻ chia sẽ còn tiếp nối:**",
        "Chương trình thiện nguyện đầu năm 2026 tại Bản Nhảng không chỉ là một hoạt động mang tính thời điểm, mà còn là một phần trong chuỗi chương trình vì cộng đồng mà HANIKI kiên định theo đuổi. Trong thời gian tới, HANIKI sẽ tiếp tục triển khai nhiều hoạt động xã hội ý nghĩa hơn nữa, hướng tới mục tiêu phát triển bền vững gắn liền với trách nhiệm cộng đồng."
    ]
  },
  {
    "id": "trai-nghiem-tet-nhat-ban-haniki",
    "category": "Văn Hóa Doanh Nghiệp",
    "title": "Trải Nghiệm Tết Nhật Bản Tại HANIKI Cùng WeXpats",
    "date": "25/01/2026",
    "readTime": "5 phút đọc",
    "image": "assets/news/tet-nhat-ban-bee-system.jpg",
    "excerpt": "Tập thể nhân sự của HANIKI háo hức khám phá Tết Nhật Bản (Shougatsu) – viết thư pháp Shodou, nấu mì trường thọ Toshikoshi Soba...",
    "content": [
        "Khi mùa xuân gõ cửa, đại gia đình HANIKI lại cùng nhau khám phá và trải nghiệm tinh hoa văn hóa Tết Nhật Bản (Shougatsu) ngay tại văn phòng - một hành trình học hỏi, gắn kết và tràn đầy niềm vui.",
        "**1. Không khí Tết Nhật Bản tràn ngập tại HANIKI:**",
        "[IMG: assets/news/tet-shougatsu-khong-khi.jpg]",
        "Vừa qua, các thành viên của HANIKI đã có cơ hội tham gia buổi ngoại khóa đặc biệt về chủ đề \"Tết Nhật Bản - Shougatsu\" cùng các Sensei đến từ Trung tâm Tiếng Nhật WeXpats Nihongo. Buổi trải nghiệm diễn ra trong không khí ấm áp, sôi nổi và giàu ý nghĩa, giúp các thành viên hiểu sâu hơn về văn hóa Nhật Bản, đồng thời tăng thêm tinh thần đoàn kết và sự gắn bó trong đại gia đình HANIKI.",
        "**2. Khám phá văn hóa Tết Nhật Bản (Shougatsu):**",
        "Mở đầu buổi học, các thành viên được Sensei giới thiệu về truyền thống đón Tết của người Nhật Bản - dịp lễ quan trọng nhất trong năm. Mọi người cùng tìm hiểu về các phong tục đặc sắc như:",
        "- Viếng đền và chùa đầu năm để cầu bình an.",
        "- Trang trí nhà cửa bằng Kadomatsu và Shimekazari để đón lộc vào nhà.",
        "- Gửi thiệp chúc mừng năm mới và tặng bao lì xì (Otoshidama) cho trẻ em.",
        "Những câu chuyện thú vị và sinh động từ các Sensei đã giúp mọi người cảm nhận được sự tỉ mỉ, tinh tế và sâu sắc trong văn hóa đón Tết của người Nhật.",
        "**3. Trải nghiệm viết thư pháp (Shodou) - Nét đẹp truyền thống đầu năm:**",
        "[IMG: assets/news/viet-thu-phap-shodou.jpg]",
        "Tiếp theo, nhân sự HANIKI được trực tiếp thực hành nghệ thuật viết thư pháp Nhật Bản (Shodou). Dưới sự hướng dẫn của Sensei, từng nét bút uyển chuyển trên giấy thể hiện tinh thần kiên nhẫn, tĩnh tâm và tôn trọng truyền thống - những giá trị cốt lõi trong văn hóa Nhật. Mỗi thành viên chọn cho mình một chữ mang ý nghĩa may mắn như \"福\" (phúc), \"夢\" (giấc mơ) hay \"愛\" (tình yêu), để gửi gắm lời chúc cho năm mới.",
        "**4. Làm và thưởng thức mì Toshikoshi Soba - Món ăn ý nghĩa đêm giao thừa:**",
        "[IMG: assets/news/nau-mi-toshikoshi-soba.jpg]",
        "Điểm nhấn của buổi ngoại khóa là hoạt động nấu và thưởng thức món Toshikoshi Soba, món mì truyền thống mà người Nhật ăn vào đêm giao thừa. Mì Soba tượng trưng cho sức khỏe, sự trường thọ và may mắn, được ví như sợi dây nối dài hạnh phúc từ năm cũ sang năm mới. Các thành viên HANIKI đã cùng nhau chuẩn bị, chế biến và thưởng thức món mì thơm ngon này trong tiếng cười và niềm hân hoan chào đón một năm mới sắp đến.",
        "**5. Học hỏi - Gắn kết - Lan tỏa tinh thần HANIKI:**",
        "Buổi trải nghiệm không chỉ mang đến kiến thức bổ ích về văn hóa Nhật Bản, mà còn là dịp để mọi người giao lưu, học hỏi và gắn bó hơn trong môi trường làm việc. HANIKI luôn hướng đến việc xây dựng văn hóa doanh nghiệp tích cực, nơi mỗi nhân sự được rèn luyện kỹ năng, trau dồi ngôn ngữ, và khám phá những giá trị văn hóa mới.",
        "\"Mỗi trải nghiệm là một hành trình học hỏi. Mỗi cá nhân là một mảnh ghép quan trọng tạo nên sức mạnh và thành công của HANIKI.\""
    ]
  },
  {
    "id": "hanh-trinh-kham-pha-van-hoa-nhat-ban-haniki",
    "category": "Văn Hóa Doanh Nghiệp",
    "title": "Hành Trình Khám Phá Văn Hóa Nhật Bản Cùng HANIKI",
    "date": "10/01/2026",
    "readTime": "4 phút đọc",
    "image": "assets/news/van-hoa-nhat-ban-yukata.jpg",
    "excerpt": "Học viên tiếng Nhật HANIKI cùng các Sensei từ WeXpats Nihongo trải nghiệm mặc trang phục Yukata truyền thống, làm cơm nắm Onigiri.",
    "content": [
        "Tập thể cán bộ nhân viên của HANIKI - học viên các lớp tiếng Nhật từ Sơ cấp đến Thượng cấp - đã có một ngày trải nghiệm đầy màu sắc khi cùng nhau khám phá văn hóa Nhật Bản bên cạnh các Sensei đáng mến đến từ Trung tâm tiếng Nhật WeXpats Nihongo.",
        "Chương trình được tổ chức với mong muốn không chỉ dừng lại ở việc học tiếng Nhật qua sách vở, mà còn giúp đội ngũ HANIKI trực tiếp cảm nhận tinh thần, lối sống và giá trị truyền thống Nhật Bản thông qua những hoạt động trải nghiệm thực tế. Không khí buổi học tràn ngập sự hào hứng, tiếng cười và tinh thần gắn kết - đúng với định hướng phát triển bền vững cùng đội ngũ.",
        "**1. Mặc Yukata - Trải nghiệm trang phục truyền thống:**",
        "[IMG: assets/news/mac-trang-phuc-yukata.jpg]",
        "Mở đầu chương trình là hoạt động mặc Yukata - trang phục truyền thống mùa hè của Nhật Bản. Lần đầu khoác lên mình những bộ Yukata rực rỡ sắc màu, các thành viên HANIKI không giấu được sự thích thú khi cảm nhận được vẻ đẹp tinh tế và thanh lịch trong văn hóa Nhật. Các Sensei tận tình hướng dẫn từng bước: từ cách mặc áo, thắt đai đến chọn phụ kiện. Hoạt động này giúp nhân sự hiểu thêm về ý nghĩa của Yukata - biểu trưng cho sự giản dị, thuần khiết và sự hòa hợp với thiên nhiên.",
        "**2. Làm Onigiri - Nếm vị Nhật ngay tại HANIKI:**",
        "[IMG: assets/news/lam-com-nam-onigiri.jpg]",
        "Tiếp nối chương trình là phần trải nghiệm làm Onigiri - món cơm nắm truyền thống của Nhật Bản. Các Sensei hướng dẫn tỉ mỉ từ khâu nấu cơm, nêm gia vị, tạo hình cho đến thêm nhân bên trong. Dưới bàn tay khéo léo của các thành viên, những chiếc Onigiri xinh xắn, hấp dẫn lần lượt ra đời - không chỉ ngon miệng mà còn tràn đầy tinh thần sáng tạo. Thông qua hoạt động này, mọi người hiểu rằng văn hóa Nhật không chỉ nằm trong ngôn ngữ hay phong tục, mà còn thể hiện trong từng bữa ăn - nơi chứa đựng sự trân trọng, chăm chút và biết ơn đối với thực phẩm.",
        "**3. Fukuwarai - Tiếng cười từ trò chơi truyền thống Nhật:**",
        "[IMG: assets/news/tro-choi-fukuwarai.jpg]",
        "Khép lại hành trình là trò chơi dân gian Fukuwarai - trò ghép mặt truyền thống thường được chơi vào dịp năm mới tại Nhật Bản. Các thành viên bịt mắt và lần lượt ghép mắt, mũi, miệng lên khuôn mặt giấy. Những \"tác phẩm\" ngộ nghĩnh ra đời trong tiếng cười không ngớt, mang đến bầu không khí vui tươi, ấm áp. Fukuwarai không chỉ là trò chơi giải trí, mà còn thể hiện tinh thần lạc quan và hài hòa trong văn hóa Nhật - nơi niềm vui đến từ những điều giản dị nhất.",
        "**4. HANIKI - Không chỉ là nơi làm việc, mà là nơi cùng trưởng thành:**",
        "Tại HANIKI, văn hóa doanh nghiệp không chỉ nằm trong công việc mà còn trong từng hoạt động gắn kết con người. Công ty không chỉ đào tạo kỹ năng chuyên môn, mà còn tạo môi trường để mỗi nhân sự học hỏi không ngừng, phát triển bản thân và sống tích cực. Chính những trải nghiệm văn hóa thực tế này là nền tảng cho một môi trường làm việc hạnh phúc, sáng tạo và đoàn kết vững mạnh."
    ]
  }
]

custom_styles = """
<style>
/* ===================== ELITE NEWS & BENTO GRID ===================== */
.news-hero {
    background: linear-gradient(135deg, #0f172a 0%, #115e59 50%, #0f172a 100%);
    position: relative;
    overflow: hidden;
    padding-top: 130px;
    padding-bottom: 70px;
    color: white;
}
.news-hero::before {
    content: ''; position: absolute;
    top: -20%; left: -5%; width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(45,212,191,0.15) 0%, transparent 60%);
    border-radius: 50%; pointer-events: none;
}
.news-hero::after {
    content: ''; position: absolute;
    bottom: -20%; right: -5%; width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 60%);
    border-radius: 50%; pointer-events: none;
}

.news-tab-filter {
    background: rgba(30,41,59,0.7);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 100px;
    padding: 6px;
    display: inline-flex; gap: 4px; flex-wrap: wrap;
    justify-content: center;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}
.news-tab-btn {
    padding: 10px 24px;
    border-radius: 100px;
    font-size: 14px; font-weight: 600;
    color: #cbd5e1;
    transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
    background: transparent;
}
.news-tab-btn:hover {
    color: #fff; background: rgba(255,255,255,0.08);
}
.news-tab-btn.active {
    background: #0d9488; color: #fff;
    box-shadow: 0 4px 12px rgba(13,148,136,0.3);
}

.news-search-box {
    position: relative;
    width: 100%; max-width: 480px;
    margin: 0 auto;
}
.news-search-input {
    width: 100%;
    background: rgba(15,23,42,0.4);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.15);
    padding: 16px 20px 16px 48px;
    border-radius: 100px;
    color: white; font-size: 15px;
    transition: all 0.3s ease;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
}
.news-search-input::placeholder { color: #94a3b8; }
.news-search-input:focus {
    outline: none; border-color: #2dd4bf;
    background: rgba(15,23,42,0.7);
}

.news-main-bg {
    background-color: #f8fafc;
    position: relative;
}
.news-main-bg::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 300px;
    background: linear-gradient(to bottom, #0f172a 0%, #f8fafc 100%);
}

.news-tab-filter-body {
    display: inline-flex; gap: 8px; flex-wrap: wrap;
    margin-bottom: 24px;
}
.news-tab-btn-body {
    padding: 8px 20px;
    border-radius: 100px;
    font-size: 13.5px; font-weight: 600;
    color: #475569;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    transition: all 0.25s ease;
    box-shadow: 0 2px 8px rgba(0,0,0,0.02);
}
.news-tab-btn-body:hover {
    color: #0f172a; border-color: #cbd5e1;
}
.news-tab-btn-body.active {
    background: #0f172a; color: #fff;
    border-color: #0f172a;
    box-shadow: 0 4px 12px rgba(15,23,42,0.2);
}

.bento-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 24px;
    position: relative; z-index: 10;
}

.bento-card {
    background: #ffffff;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    border: 1px solid rgba(226,232,240,0.6);
    box-shadow: 0 4px 16px -6px rgba(15,23,42,0.06);
    transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
    cursor: pointer;
    display: flex; flex-direction: column;
}
.bento-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 32px -10px rgba(15,23,42,0.1);
    border-color: #cbd5e1;
}

.bento-img-wrap {
    position: relative; overflow: hidden;
}
.bento-img {
    width: 100%; height: 100%; object-fit: cover;
    transition: transform 0.8s cubic-bezier(0.16,1,0.3,1);
}
.bento-card:hover .bento-img {
    transform: scale(1.03);
}
.bento-card-tag {
    position: absolute; top: 16px; left: 16px;
    background: rgba(255,255,255,0.95); backdrop-filter: blur(8px);
    color: #0f172a; font-size: 11px; font-weight: 700;
    padding: 6px 12px; border-radius: 100px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.06);
    text-transform: uppercase; letter-spacing: 0.5px;
}

.bento-body {
    padding: 24px 28px; display: flex; flex-direction: column; flex: 1;
}
.bento-meta {
    display: flex; gap: 16px; color: #64748b; font-size: 12.5px; font-weight: 600;
    margin-bottom: 10px;
}
.bento-title {
    font-size: 20px; font-weight: 700; color: #0f172a; line-height: 1.4;
    margin-bottom: 12px; font-family: 'Be Vietnam Pro', sans-serif;
    transition: color 0.3s ease;
}
.bento-card:hover .bento-title { color: #0d9488; }
.bento-excerpt {
    font-size: 14px; color: #475569; line-height: 1.6;
    display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
    margin-bottom: 20px; flex: 1;
}

/* Specific Sizes */
.bento-hero { grid-column: span 12; }
.bento-col-6 { grid-column: span 6; }
@media (max-width: 1023px) {
    .bento-hero, .bento-col-6 { grid-column: span 12; }
}
@media (min-width: 1024px) {
    .bento-hero { display: grid; grid-template-columns: 1.2fr 1fr; }
    .bento-hero .bento-img-wrap { height: 100%; min-height: 360px; }
    .bento-hero .bento-body { justify-content: center; padding: 40px; }
    .bento-hero .bento-title { font-size: 28px; }
}

.read-more-btn {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 13.5px; font-weight: 700; color: #0d9488;
    margin-top: auto;
}
.read-more-btn i {
    transition: transform 0.3s ease;
}
.bento-card:hover .read-more-btn i {
    transform: translateX(4px);
}

/* ===================== MODAL CHỈN CHU, TINH TẾ ===================== */
.sheet-overlay {
    position: fixed; inset: 0; background: rgba(15,23,42,0.85); backdrop-filter: blur(12px);
    z-index: 9999; opacity: 0; visibility: hidden;
    transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
    display: flex; align-items: center; justify-content: center;
}
.sheet-overlay.open { opacity: 1; visibility: visible; }

.sheet-modal {
    background: #ffffff;
    width: 90%; max-width: 800px;
    height: auto; max-height: 90vh;
    border-radius: 24px;
    transform: scale(0.95); opacity: 0;
    transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
    overflow-y: auto; overflow-x: hidden;
    position: relative;
    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}
.sheet-overlay.open .sheet-modal { transform: scale(1); opacity: 1; }

/* Tùy chỉnh thanh cuộn tinh tế */
.sheet-modal::-webkit-scrollbar {
    width: 6px;
}
.sheet-modal::-webkit-scrollbar-track {
    background: transparent;
    margin: 32px 0;
}
.sheet-modal::-webkit-scrollbar-thumb {
    background: rgba(148, 163, 184, 0.4);
    border-radius: 10px;
}
.sheet-modal::-webkit-scrollbar-thumb:hover {
    background: rgba(148, 163, 184, 0.7);
}

.sheet-drag-handle {
    width: 40px; height: 5px; border-radius: 100px;
    background: rgba(255,255,255,0.5);
    position: absolute; top: -14px; left: 50%; transform: translateX(-50%);
}

.sheet-close {
    position: sticky; top: 24px; float: right; margin-right: 24px; margin-bottom: -64px;
    width: 40px; height: 40px; border-radius: 50%;
    background: rgba(255,255,255,0.85); backdrop-filter: blur(12px);
    color: #334155; display: flex; align-items: center; justify-content: center;
    cursor: pointer; z-index: 100;
    box-shadow: 0 4px 16px rgba(0,0,0,0.1);
    transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
    border: 1px solid rgba(226,232,240,0.8);
}
.sheet-close:hover { background: #f8fafc; color: #ef4444; transform: scale(1.1) rotate(90deg); }

.sheet-cover {
    width: 100%; height: 380px; position: relative;
}
.sheet-cover img { width: 100%; height: 100%; object-fit: cover; }
.sheet-cover::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(to bottom, transparent 40%, #ffffff 100%);
}

.sheet-content {
    padding: 0 48px 80px 48px;
    max-width: 680px; margin: 0 auto;
    position: relative; z-index: 10;
    margin-top: -60px;
}
@media (max-width: 640px) {
    .sheet-cover { height: 260px; }
    .sheet-content { padding: 0 24px 60px 24px; margin-top: -40px; }
    .sheet-modal { border-radius: 24px 24px 0 0; }
}

.sheet-title {
    font-size: 32px; font-weight: 800; color: #0f172a; line-height: 1.35;
    font-family: 'Be Vietnam Pro', sans-serif; margin-bottom: 20px;
    letter-spacing: -0.3px;
}
.sheet-meta-bar {
    display: flex; gap: 24px; color: #64748b; font-size: 13.5px; font-weight: 600;
    padding-bottom: 24px; border-bottom: 1px solid #e2e8f0; margin-bottom: 32px;
}
.sheet-body {
    font-size: 16.5px; line-height: 1.8; color: #334155;
    text-align: justify;
}
.sheet-body p { margin-bottom: 20px; }
.sheet-body ul {
    list-style-type: disc; padding-left: 24px; margin-bottom: 20px;
}
.sheet-body li {
    margin-bottom: 8px;
}
.sheet-body strong {
    color: #0f172a;
    font-weight: 700;
}
</style>
"""

top_html = top_html.replace("</head>", custom_styles + "</head>")

main_content = """
  <!-- Premium Dark Hero -->
  <section class="news-hero">
    <div class="max-w-4xl mx-auto px-4 text-center relative z-10" data-aos="fade-up">
      <!-- Tag Removed Gemini Icon, just sleek text -->
      <div class="inline-flex items-center justify-center bg-white/10 backdrop-blur-md text-teal-300 px-4 py-1.5 rounded-full text-xs font-bold border border-teal-500/20 mb-6 uppercase tracking-widest shadow-sm">
        Tin Tức & Hoạt Động
      </div>
      <h1 class="text-4xl md:text-5xl lg:text-5xl font-extrabold text-white mb-6 font-heading tracking-tight">
        Kết nối cộng đồng, <span class="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200">kiến tạo giá trị</span>
      </h1>
      <p class="text-slate-300 text-base md:text-lg font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
        Những câu chuyện, sự kiện và cột mốc đáng nhớ trên chặng đường phát triển hệ sinh thái y tế thông minh của BeeCare.
      </p>
      
      <!-- Search (More discreet) -->
      <div class="news-search-box mt-10">
          <input type="text" placeholder="Tìm kiếm bài viết..." class="news-search-input" />
          <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2"></i>
      </div>
    </div>
  </section>

  <!-- Bento Grid Main Content -->
  <main class="news-main-bg pb-24 pt-8 md:pt-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex justify-center items-center relative z-20">
       <div class="news-tab-filter-body">
          <button class="news-tab-btn-body active">Tất cả bài viết</button>
          <button class="news-tab-btn-body">Cộng đồng</button>
          <button class="news-tab-btn-body">Văn hóa</button>
       </div>
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bento-grid">
"""

# Render Article 1 (Hero - span 12, 1fr 1fr layout on desktop)
art1 = articles[0]
main_content += f"""
        <article class="bento-card bento-hero" data-aos="fade-up" onclick="openSheetModal('{art1['id']}')">
          <div class="bento-img-wrap">
            <img src="{art1['image']}" alt="{art1['title']}" class="bento-img" />
            <span class="bento-card-tag">{art1['category']}</span>
          </div>
          <div class="bento-body">
            <div class="bento-meta">
              <span class="flex items-center gap-1.5"><i data-lucide="calendar" class="w-3.5 h-3.5 text-teal-600"></i> {art1['date']}</span>
              <span class="flex items-center gap-1.5"><i data-lucide="clock" class="w-3.5 h-3.5 text-amber-500"></i> {art1['readTime']}</span>
            </div>
            <h2 class="bento-title">{art1['title']}</h2>
            <p class="bento-excerpt">{art1['excerpt']}</p>
            <div class="read-more-btn mt-auto">
                <span>Đọc bài viết tiêu điểm</span>
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </div>
          </div>
        </article>
"""

# Render Article 2 (Col 6)
art2 = articles[1]
main_content += f"""
        <article class="bento-card bento-col-6" data-aos="fade-up" data-aos-delay="100" onclick="openSheetModal('{art2['id']}')">
          <div class="bento-img-wrap h-64 lg:h-64">
            <img src="{art2['image']}" alt="{art2['title']}" class="bento-img" />
            <span class="bento-card-tag">{art2['category']}</span>
          </div>
          <div class="bento-body">
            <div class="bento-meta">
              <span class="flex items-center gap-1.5"><i data-lucide="calendar" class="w-3.5 h-3.5 text-teal-600"></i> {art2['date']}</span>
              <span class="flex items-center gap-1.5"><i data-lucide="clock" class="w-3.5 h-3.5 text-amber-500"></i> {art2['readTime']}</span>
            </div>
            <h2 class="bento-title" style="font-size: 20px;">{art2['title']}</h2>
            <p class="bento-excerpt">{art2['excerpt']}</p>
            <div class="read-more-btn mt-auto">
                <span>Khám phá ngay</span>
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </div>
          </div>
        </article>
"""

# Render Article 3 (Col 6)
art3 = articles[2]
main_content += f"""
        <article class="bento-card bento-col-6" data-aos="fade-up" data-aos-delay="150" onclick="openSheetModal('{art3['id']}')">
          <div class="bento-img-wrap h-64 lg:h-64">
            <img src="{art3['image']}" alt="{art3['title']}" class="bento-img" />
            <span class="bento-card-tag">{art3['category']}</span>
          </div>
          <div class="bento-body">
            <div class="bento-meta">
              <span class="flex items-center gap-1.5"><i data-lucide="calendar" class="w-3.5 h-3.5 text-teal-600"></i> {art3['date']}</span>
              <span class="flex items-center gap-1.5"><i data-lucide="clock" class="w-3.5 h-3.5 text-amber-500"></i> {art3['readTime']}</span>
            </div>
            <h2 class="bento-title" style="font-size: 20px;">{art3['title']}</h2>
            <p class="bento-excerpt">{art3['excerpt']}</p>
            <div class="read-more-btn mt-auto">
                <span>Xem chi tiết</span>
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </div>
          </div>
        </article>
"""

main_content += """
      </div>
    </div>
  </main>

  <!-- iOS Premium Sheet Modal -->
  <div id="sheet-overlay" class="sheet-overlay">
      <div class="sheet-drag-handle"></div>
      <div class="sheet-modal">
          <div class="sheet-close" onclick="closeSheetModal()">
              <i data-lucide="x" class="w-5 h-5"></i>
          </div>
          <div id="sheet-content-wrap">
             <!-- Injected content via JS -->
          </div>
      </div>
  </div>
"""

articles_json = json.dumps(articles, ensure_ascii=False)

modal_script = f"""
<!-- Premium Modal Script -->
<script>
    const newsData = {articles_json};
    
    document.addEventListener('DOMContentLoaded', () => {{
        const btns = document.querySelectorAll('.news-tab-btn-body');
        const cards = document.querySelectorAll('.bento-card');
        
        btns.forEach(btn => {{
            btn.addEventListener('click', function() {{
                btns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.textContent.trim().toLowerCase();
                cards.forEach(card => {{
                    const tag = card.querySelector('.bento-card-tag').textContent.trim().toLowerCase();
                    if (filter === 'tất cả bài viết' || tag.includes(filter)) {{
                        card.style.display = '';
                    }} else {{
                        card.style.display = 'none';
                    }}
                }});
            }});
        }});
    }});
    
    function parseContent(contentArray) {{
        let html = '';
        let inList = false;
        
        contentArray.forEach(p => {{
            // Process bold markers
            let formatted = p.replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>');
            
            // Process images
            if (formatted.startsWith('[IMG: ') && formatted.endsWith(']')) {{
                const url = formatted.substring(6, formatted.length - 1);
                html += `<div style="margin: 24px 0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);"><img src="${{url}}" style="width: 100%; height: auto; display: block;" alt="News image" /></div>`;
                return;
            }}
            
            // Check if it's a list item (starts with -)
            if (formatted.startsWith('- ')) {{
                if (!inList) {{
                    html += '<ul>';
                    inList = true;
                }}
                html += `<li>${{formatted.substring(2)}}</li>`;
            }} else {{
                if (inList) {{
                    html += '</ul>';
                    inList = false;
                }}
                // Check if it's a quote
                if (formatted.startsWith('"') && formatted.endsWith('"')) {{
                    html += `<p style="font-style: italic; color: #475569; border-left: 3px solid #0d9488; padding-left: 16px; margin-top: 24px;">${{formatted}}</p>`;
                }} else {{
                    html += `<p>${{formatted}}</p>`;
                }}
            }}
        }});
        if (inList) html += '</ul>';
        return html;
    }}

    function openSheetModal(id) {{
        const article = newsData.find(a => a.id === id);
        if(!article) return;
        
        const bodyHtml = parseContent(article.content);

        const container = document.getElementById('sheet-content-wrap');
        container.innerHTML = `
            <div class="sheet-cover">
                <img src="${{article.image}}" alt="${{article.title}}" />
            </div>
            <div class="sheet-content">
                <div class="inline-block px-4 py-1 bg-teal-50 text-teal-700 text-xs font-bold rounded-full mb-5 border border-teal-100 uppercase tracking-wide">
                    ${{article.category}}
                </div>
                <h2 class="sheet-title">${{article.title}}</h2>
                <div class="sheet-meta-bar">
                    <span class="flex items-center gap-1.5"><i data-lucide="calendar" class="w-4 h-4 text-slate-400"></i> ${{article.date}}</span>
                    <span class="flex items-center gap-1.5"><i data-lucide="clock" class="w-4 h-4 text-slate-400"></i> ${{article.readTime}}</span>
                </div>
                <div class="sheet-body">
                    ${{bodyHtml}}
                </div>
            </div>
        `;
        
        lucide.createIcons();
        
        document.getElementById('sheet-overlay').classList.add('open');
        document.body.style.overflow = 'hidden';
    }}

    function closeSheetModal() {{
        document.getElementById('sheet-overlay').classList.remove('open');
        document.body.style.overflow = '';
    }}

    document.getElementById('sheet-overlay').addEventListener('click', function(e) {{
        if(e.target === this || e.target.classList.contains('sheet-drag-handle')) {{
            closeSheetModal();
        }}
    }});
</script>
"""

bottom_html = bottom_html.replace("</body>", modal_script + "\n</body>")

with open(os.path.join(base_dir, "news.html"), "w", encoding="utf-8") as f:
    f.write(top_html + main_content + bottom_html)
