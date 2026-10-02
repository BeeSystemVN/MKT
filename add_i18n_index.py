import re
import json

file_path = r"e:\MKT\index.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

replacements = {
    '<span class="hero-title-lead">BeeCare – Hệ sinh thái y tế số</span>': '<span class="hero-title-lead" data-i18n="hero_title_lead">BeeCare – Hệ sinh thái y tế số</span>',
    '<span class="sm:hidden">Demo</span>': '<span class="sm:hidden" data-i18n="nav_demo_mobile">Demo</span>',
    'Đang tải mô hình thiết bị 3D và dữ liệu ứng dụng...': '<span data-i18n="preloader_text">Đang tải mô hình thiết bị 3D và dữ liệu ứng dụng...</span>',
    
    '<span>1. Viện dưỡng lão cần chuẩn bị thiết bị gì để bắt đầu?</span>': '<span data-i18n="idx_faq1_q">1. Viện dưỡng lão cần chuẩn bị thiết bị gì để bắt đầu?</span>',
    'Chỉ cần máy tính văn phòng có kết nối Internet để sử dụng cổng web và điện thoại thông minh thông thường để điều dưỡng cài đặt ứng dụng staff. Toàn bộ máy chủ và dữ liệu được vận hành an toàn trên đám mây.': '<span data-i18n="idx_faq1_a">Chỉ cần máy tính văn phòng có kết nối Internet để sử dụng cổng web và điện thoại thông minh thông thường để điều dưỡng cài đặt ứng dụng staff. Toàn bộ máy chủ và dữ liệu được vận hành an toàn trên đám mây.</span>',
    
    '<span>2. Người cao tuổi không dùng điện thoại thì hoạt động thế nào?</span>': '<span data-i18n="idx_faq2_q">2. Người cao tuổi không dùng điện thoại thì hoạt động thế nào?</span>',
    'Người cao tuổi không cần dùng điện thoại. Điều dưỡng viên tại viện sẽ chăm sóc và ghi nhận sinh hiệu cho các cụ trên app staff. Dữ liệu sẽ tự động gửi về điện thoại của con cái và người nhà để theo dõi.': '<span data-i18n="idx_faq2_a">Người cao tuổi không cần dùng điện thoại. Điều dưỡng viên tại viện sẽ chăm sóc và ghi nhận sinh hiệu cho các cụ trên app staff. Dữ liệu sẽ tự động gửi về điện thoại của con cái và người nhà để theo dõi.</span>',
    
    '<span>3. Thời gian đào tạo và triển khai mất bao lâu?</span>': '<span data-i18n="idx_faq3_q">3. Thời gian đào tạo và triển khai mất bao lâu?</span>',
    'Thông thường chỉ mất từ 3 đến 5 ngày làm việc để cài đặt sơ đồ phòng ốc, danh sách người cao tuổi và đào tạo điều dưỡng viên sử dụng thành thạo.': '<span data-i18n="idx_faq3_a">Thông thường chỉ mất từ 3 đến 5 ngày làm việc để cài đặt sơ đồ phòng ốc, danh sách người cao tuổi và đào tạo điều dưỡng viên sử dụng thành thạo.</span>',
    
    'Hỏi và đáp': '<span data-i18n="idx_faq_badge">Hỏi và đáp</span>',
    'Câu hỏi thường gặp về hệ sinh thái BeeCare': '<span data-i18n="idx_faq_title">Câu hỏi thường gặp về hệ sinh thái BeeCare</span>',
    
    'Đăng ký dùng thử': '<span data-i18n="idx_demo_badge">Đăng ký dùng thử</span>',
    'Đăng ký tư vấn và trải nghiệm bản demo': '<span data-i18n="idx_demo_title">Đăng ký tư vấn và trải nghiệm bản demo</span>',
    'Để lại thông tin để chuyên gia BeeCare liên hệ tư vấn và cấp tài khoản trải nghiệm hệ thống miễn phí.': '<span data-i18n="idx_demo_desc">Để lại thông tin để chuyên gia BeeCare liên hệ tư vấn và cấp tài khoản trải nghiệm hệ thống miễn phí.</span>',
    
    '<label class="block text-xs font-semibold text-slate-300 mb-1.5">Họ và tên *</label>': '<label class="block text-xs font-semibold text-slate-300 mb-1.5" data-i18n="idx_form_name">Họ và tên *</label>',
    'placeholder="Ví dụ: Nguyễn Văn An"': 'placeholder="Ví dụ: Nguyễn Văn An" data-i18n-placeholder="idx_form_name_ph"',
    
    '<label class="block text-xs font-semibold text-slate-300 mb-1.5">Số điện thoại *</label>': '<label class="block text-xs font-semibold text-slate-300 mb-1.5" data-i18n="idx_form_phone">Số điện thoại *</label>',
    'placeholder="Ví dụ: 0912 345 678"': 'placeholder="Ví dụ: 0912 345 678" data-i18n-placeholder="idx_form_phone_ph"',
    
    '<label class="block text-xs font-semibold text-slate-300 mb-1.5">Email liên hệ</label>': '<label class="block text-xs font-semibold text-slate-300 mb-1.5" data-i18n="idx_form_email">Email liên hệ</label>',
    
    '<label class="block text-xs font-semibold text-slate-300 mb-1.5">Đơn vị / Viện dưỡng lão</label>': '<label class="block text-xs font-semibold text-slate-300 mb-1.5" data-i18n="idx_form_unit">Đơn vị / Viện dưỡng lão</label>',
    'placeholder="Tên viện hoặc cơ sở y tế"': 'placeholder="Tên viện hoặc cơ sở y tế" data-i18n-placeholder="idx_form_unit_ph"',
    
    '<label class="block text-xs font-semibold text-slate-300 mb-1.5">Gói ứng dụng quan tâm</label>': '<label class="block text-xs font-semibold text-slate-300 mb-1.5" data-i18n="idx_form_pkg">Gói ứng dụng quan tâm</label>',
    '<option>Trọn bộ hệ sinh thái (Web portal + App người thân + App điều dưỡng)</option>': '<option data-i18n="idx_form_pkg1">Trọn bộ hệ sinh thái (Web portal + App người thân + App điều dưỡng)</option>',
    '<option>Cổng quản trị web portal (Dành cho viện dưỡng lão)</option>': '<option data-i18n="idx_form_pkg2">Cổng quản trị web portal (Dành cho viện dưỡng lão)</option>',
    '<option>Ứng dụng người thân và trợ lý AI</option>': '<option data-i18n="idx_form_pkg3">Ứng dụng người thân và trợ lý AI</option>',
    '<option>Ứng dụng điều dưỡng tác nghiệp tại giường</option>': '<option data-i18n="idx_form_pkg4">Ứng dụng điều dưỡng tác nghiệp tại giường</option>',
    
    'Gửi yêu cầu tư vấn và dùng thử demo': '<span data-i18n="idx_form_submit">Gửi yêu cầu tư vấn và dùng thử demo</span>',
    
    '<span>Gọi 1900 6868</span>': '<span data-i18n="idx_mobile_call">Gọi 1900 6868</span>',
    '<span>Đăng ký demo</span>': '<span data-i18n="nav_demo">Đăng ký demo</span>',
    
    '<div class="footer-tagline">Hệ sinh thái y tế thông minh</div>': '<div class="footer-tagline" data-i18n="footer_tagline">Hệ sinh thái y tế thông minh</div>',
    '<p class="footer-desc">Phần mềm quản lý viện dưỡng lão thông minh. Kết nối Web Portal, App Điều dưỡng & App Người thân với trợ lý AI tích hợp.</p>': '<p class="footer-desc" data-i18n="footer_desc">Phần mềm quản lý viện dưỡng lão thông minh. Kết nối Web Portal, App Điều dưỡng & App Người thân với trợ lý AI tích hợp.</p>',
    'Phát triển bởi CÔNG TY TNHH HANIKI': '<span data-i18n="footer_dev_by">Phát triển bởi CÔNG TY TNHH HANIKI</span>',
    'Tầng 30 Handico Tower, Mễ Trì, Nam Từ Liêm, Hà Nội': '<span data-i18n="footer_address">Tầng 30 Handico Tower, Mễ Trì, Nam Từ Liêm, Hà Nội</span>',
    
    '<div class="footer-col-title">Hệ sinh thái</div>': '<div class="footer-col-title" data-i18n="footer_col_eco">Hệ sinh thái</div>',
    'Cổng Web Admin': '<span data-i18n="footer_eco_web">Cổng Web Admin</span>',
    'App Điều dưỡng Staff': '<span data-i18n="footer_eco_staff">App Điều dưỡng Staff</span>',
    'App Người thân Family': '<span data-i18n="footer_eco_family">App Người thân Family</span>',
    
    '<div class="footer-col-title">Tính năng nổi bật</div>': '<div class="footer-col-title" data-i18n="footer_col_feat">Tính năng nổi bật</div>',
    'Quản lý hồ sơ EMR': '<span data-i18n="footer_feat1">Quản lý hồ sơ EMR</span>',
    'Đo sinh hiệu tại giường': '<span data-i18n="footer_feat2">Đo sinh hiệu tại giường</span>',
    'Trợ lý AI 24/7': '<span data-i18n="footer_feat3">Trợ lý AI 24/7</span>',
    'Thanh toán VietQR': '<span data-i18n="footer_feat4">Thanh toán VietQR</span>',
    
    '<div class="footer-col-title">Điều hướng</div>': '<div class="footer-col-title" data-i18n="footer_col_nav">Điều hướng</div>',
    'Về công ty': '<span data-i18n="nav_company">Về công ty</span>',
    'Tin tức & Sự kiện': '<span data-i18n="nav_news">Tin tức & Sự kiện</span>',
    'Liên hệ tư vấn': '<span data-i18n="nav_contact">Liên hệ tư vấn</span>',
    'Câu hỏi thường gặp': '<span data-i18n="nav_faq">Câu hỏi thường gặp</span>',
    
    '<div class="footer-col-title">Tư vấn & Hỗ trợ</div>': '<div class="footer-col-title" data-i18n="footer_col_support">Tư vấn & Hỗ trợ</div>',
    'Giờ hỗ trợ': '<span data-i18n="footer_support_hours">Giờ hỗ trợ</span>',
    'Thứ 2 – Thứ 7:': '<span data-i18n="footer_hours_days">Thứ 2 – Thứ 7:</span>',
    'Giám sát cloud:': '<span data-i18n="footer_hours_cloud">Giám sát cloud:</span>',
    'Đăng ký demo miễn phí': '<span data-i18n="footer_btn_demo">Đăng ký demo miễn phí</span>',
    'Đối tác chiến lược:': '<span data-i18n="footer_partner">Đối tác chiến lược:</span>',
    'Hệ thống Viện dưỡng lão Diên Hồng': '<span data-i18n="footer_partner_1">Hệ thống Viện dưỡng lão Diên Hồng</span>',
    'Chuẩn chăm sóc Kaigo Nhật Bản': '<span data-i18n="footer_partner_2">Chuẩn chăm sóc Kaigo Nhật Bản</span>',
    
    'Đồng hành cùng Viện dưỡng lão Diên Hồng.': '<span data-i18n="footer_coop">Đồng hành cùng Viện dưỡng lão Diên Hồng.</span>',
    'Điều khoản sử dụng': '<span data-i18n="footer_terms">Điều khoản sử dụng</span>',
    'Chính sách bảo mật': '<span data-i18n="footer_privacy">Chính sách bảo mật</span>',
    
    'Đóng lại (ESC)': '<span data-i18n="lightbox_close">Đóng lại (ESC)</span>',
    'Yêu cầu đã được gửi thành công!': '<span data-i18n="toast_success">Yêu cầu đã được gửi thành công!</span>'
}

for k, v in replacements.items():
    content = content.replace(k, v)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("done")
