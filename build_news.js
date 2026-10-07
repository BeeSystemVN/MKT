const fs = require('fs');
const path = require('path');

// 1. Copy images
const srcNewsDir = path.join(__dirname, 'bee-web-v2-temp', 'public', 'news');
const destNewsDir = path.join(__dirname, 'assets', 'news');

if (!fs.existsSync(destNewsDir)) {
  fs.mkdirSync(destNewsDir, { recursive: true });
}

if (fs.existsSync(srcNewsDir)) {
  const files = fs.readdirSync(srcNewsDir);
  for (const file of files) {
    fs.copyFileSync(path.join(srcNewsDir, file), path.join(destNewsDir, file));
  }
  console.log(`Copied ${files.length} images to assets/news`);
}

// 2. Read index.html for layout
const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');

// Find navbar end
const navEndTag = '</nav>';
const navEndIndex = indexHtml.indexOf(navEndTag) + navEndTag.length;
let topHtml = indexHtml.substring(0, navEndIndex);

// Replace title and active states
topHtml = topHtml.replace('<title>BeeCare – Quản lý viện dưỡng lão thông minh</title>', '<title>Tin Tức & Sự Kiện | BeeCare</title>');
topHtml = topHtml.replace('class="nav-menu-item active"', 'class="nav-menu-item"');
topHtml = topHtml.replace('href="news.html" class="nav-menu-item"', 'href="news.html" class="nav-menu-item active"');
topHtml = topHtml.replace('href="news.html" class="mobile-nav-link"', 'href="news.html" class="mobile-nav-link active"');
topHtml = topHtml.replace('href="index.html" class="mobile-nav-link active"', 'href="index.html" class="mobile-nav-link"');

// Find footer start
const footerStartStr = '  <!-- ===================== MOBILE QUICK-ACTION STICKY BAR ===================== -->';
const footerStartIndex = indexHtml.indexOf(footerStartStr);
let bottomHtml = indexHtml.substring(footerStartIndex);

// Read newsData.js to get articles
const newsDataPath = path.join(__dirname, 'bee-web-v2-temp', 'src', 'data', 'newsData.js');
const newsDataContent = fs.readFileSync(newsDataPath, 'utf-8');

// A very naive eval or extraction of the data (since it's an ES module, we can regex it or parse it)
// We will just hardcode the articles to generate HTML since there are only 3 articles.
const articles = [
  {
    id: 'haniki-lan-toa-yeu-thuong-tai-ban-nhang-cao-bang',
    category: 'Thiện Nguyện & Cộng Đồng',
    title: 'HANIKI Lan Tỏa Yêu Thương Đầu Năm 2026 Tại Bản Nhảng, Cao Bằng',
    date: '09/01/2026',
    readTime: '6 phút đọc',
    image: 'assets/news/thien-nguyen-cao-bang-banner.jpg',
    excerpt: 'Nhân dịp đầu năm mới 2026, với tinh thần sẻ chia và trách nhiệm đối với cộng đồng, Công ty TNHH HANIKI đã đồng hành và tài trợ cho chương trình thiện nguyện được tổ chức tại Bản Nhảng, xã Thị Hoa, huyện Hạ Lang, tỉnh Cao Bằng.'
  },
  {
    id: 'trai-nghiem-tet-nhat-ban-haniki',
    category: 'Văn Hóa Doanh Nghiệp',
    title: 'Trải Nghiệm Tết Nhật Bản Tại HANIKI Cùng WeXpats Nihongo',
    date: '25/01/2026',
    readTime: '5 phút đọc',
    image: 'assets/news/tet-nhat-ban-bee-system.jpg',
    excerpt: 'Tập thể nhân sự của HANIKI háo hức khám phá Tết Nhật Bản (Shougatsu) – viết thư pháp Shodou, nấu mì trường thọ Toshikoshi Soba và tìm hiểu phong tục truyền thống cùng Sensei WeXpats Nihongo.'
  },
  {
    id: 'hanh-trinh-kham-pha-van-hoa-nhat-ban-haniki',
    category: 'Văn Hóa Doanh Nghiệp',
    title: 'Hành Trình Khám Phá Văn Hóa Nhật Bản Cùng HANIKI & WeXpats Nihongo',
    date: '10/01/2026',
    readTime: '4 phút đọc',
    image: 'assets/news/van-hoa-nhat-ban-yukata.jpg',
    excerpt: 'Học viên tiếng Nhật HANIKI cùng các Sensei từ WeXpats Nihongo trải nghiệm mặc trang phục Yukata truyền thống, làm cơm nắm Onigiri và rộn rã tiếng cười cùng trò chơi dân gian Fukuwarai.'
  }
];

// Generate News Content HTML based on NewsPage.jsx layout
let mainContent = `
  <main class="pt-28 pb-20 md:pt-36 md:pb-28 bg-[#FBF7F3] min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Page Header Badge -->
      <div class="text-center max-w-3xl mx-auto mb-8" data-aos="fade-up">
        <div class="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-4 py-1.5 rounded-full text-sm font-semibold border border-teal-100 mb-6">
          <i data-lucide="newspaper" class="w-4 h-4 text-teal-600"></i>
          <span>Tin Tức & Sự Kiện</span>
        </div>
        <h1 class="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 font-heading tracking-tight">Cập nhật những <span class="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-amber-500">hoạt động mới nhất</span></h1>
        <p class="text-slate-600 text-lg">Đồng hành cùng BeeCare trên chặng đường mang lại giá trị cho cộng đồng.</p>
      </div>

      <!-- Categories & Search Bar (Static for UI) -->
      <div class="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm mb-12 flex flex-col md:flex-row items-center justify-between gap-4" data-aos="fade-up" data-aos-delay="100">
        <div class="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button class="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all bg-teal-600 text-white shadow-md">Tất cả bài viết</button>
          <button class="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-100">Thiện nguyện & Cộng đồng</button>
          <button class="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-100">Văn hóa doanh nghiệp</button>
        </div>
        <div class="relative w-full md:w-72">
          <input type="text" placeholder="Tìm kiếm bài viết..." class="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-[#FBF7F3] focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all" />
          <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"></i>
        </div>
      </div>

      <!-- Featured Article (First article) -->
      <div class="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md mb-12 grid grid-cols-1 lg:grid-cols-12 group cursor-pointer" data-aos="fade-up" data-aos-delay="150" onclick="window.location.href='blog-detail.html?id=${articles[0].id}'">
        <div class="lg:col-span-7 h-72 sm:h-96 overflow-hidden bg-slate-100">
          <img src="${articles[0].image}" alt="${articles[0].title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
        </div>
        <div class="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-100 px-3 py-1 rounded-full inline-block mb-4">
              Bài viết tiêu điểm
            </span>
            <div class="flex items-center gap-3 text-xs text-slate-500 mb-3">
              <span class="flex items-center gap-1"><i data-lucide="calendar" class="w-3.5 h-3.5"></i> ${articles[0].date}</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug mb-4 group-hover:text-teal-600 transition-colors font-heading">
              ${articles[0].title}
            </h2>
            <p class="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-6">
              ${articles[0].excerpt}
            </p>
          </div>
          <button class="inline-flex justify-center items-center gap-2 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-xl py-3.5 px-6 text-sm font-bold shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:-translate-y-0.5 transition-all w-full md:w-auto">
            <span>Đọc bài viết tiêu điểm</span>
            <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </button>
        </div>
      </div>

      <!-- Articles Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
`;

for (let i = 1; i < articles.length; i++) {
  const art = articles[i];
  mainContent += `
        <article class="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between group cursor-pointer" data-aos="fade-up" data-aos-delay="\${150 + i * 50}" onclick="window.location.href='blog-detail.html?id=\${art.id}'">
          <div>
            <div class="relative h-56 overflow-hidden bg-slate-100">
              <img src="\${art.image}" alt="\${art.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
              <span class="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-teal-700 text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                \${art.category}
              </span>
            </div>
            <div class="p-6">
              <div class="flex items-center gap-4 text-xs text-slate-500 mb-3">
                <span class="flex items-center gap-1"><i data-lucide="calendar" class="w-3.5 h-3.5"></i> \${art.date}</span>
              </div>
              <h3 class="text-lg font-bold text-slate-900 leading-snug mb-3 group-hover:text-teal-600 transition-colors font-heading">
                \${art.title}
              </h3>
              <p class="text-sm text-slate-600 leading-relaxed line-clamp-3">
                \${art.excerpt}
              </p>
            </div>
          </div>
          <div class="px-6 pb-6 pt-2 mt-auto">
            <div class="inline-flex items-center gap-1.5 text-teal-600 font-bold text-sm group/btn w-full">
              <span>Đọc tiếp</span>
              <i data-lucide="arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform"></i>
            </div>
          </div>
        </article>
  `;
}

mainContent += `
      </div>
    </div>
  </main>
`;

const finalHtml = topHtml + mainContent + bottomHtml;
fs.writeFileSync(path.join(__dirname, 'news.html'), finalHtml);
console.log('news.html generated successfully.');
