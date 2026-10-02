# BeeCare Marketing Website - Agent Guidelines & Rules

## 1. Yêu cầu Bắt Buộc: Thiết Kế Responsive Toàn Diện (Mobile, Tablet, Laptop, Desktop)
- **Tương thích mọi độ phân giải:**
  - Mobile: `< 640px`
  - Tablet: `640px - 1023px`
  - Laptop: `1024px - 1279px` (Đặc biệt lưu ý mốc này: không để menu bị biến mất hoặc xuất hiện khoảng trống kỳ lạ)
  - Desktop: `1280px+`
- **Không vỡ layout ngang:** Giữ `max-width: 100%`, `overflow-x: hidden`. Mọi khung thiết bị co giãn linh hoạt (Fluid Mockups).
- **Trải nghiệm cảm ứng (Touch-friendly):** Nút bấm và các phần tử tương tác trên thiết bị di động có vùng chạm tối thiểu `44px x 44px`.

## 2. Quy Chuẩn Kiểu Chữ & Ngôn Ngữ
- **Font chữ:** Bắt buộc dùng `Be Vietnam Pro` (fallback `Inter`), hỗ trợ 100% tiếng Việt không lỗi hiển thị hay nhảy font.
- **Quy tắc viết hoa:** Chỉ viết hoa chữ cái đầu (Sentence case). Không dùng snake_case, không dùng all-caps/uppercase trong tiêu đề hoặc nhãn thẻ.

## 3. Khung Thiết Bị 3D & Dữ Liệu Thực Tế
- Khung Laptop có tỷ lệ `16 / 9` với thanh trình duyệt macOS chân thực.
- Khung Điện thoại có tỷ lệ `467 / 985` (chuẩn ảnh app), không che khuất thanh điều hướng hay nội dung.
- Ưu tiên sử dụng ảnh có dữ liệu thật (Real data) như bệnh án EMR, danh sách người cao tuổi, biểu đồ sinh hiệu, ảnh suất ăn thật.

## 4. Yêu Cầu Đa Ngôn Ngữ (Multilingual: Tiếng Việt, Tiếng Anh, Tiếng Nhật)
- **Hỗ trợ 3 ngôn ngữ:** Tiếng Việt (`vi`), Tiếng Anh (`en`), Tiếng Nhật (`ja`).
- **Chuyển đổi ngôn ngữ tức thì (i18n):** Có bộ chọn ngôn ngữ (Language Switcher) trực quan trên thanh Header/Navbar. Khi chuyển đổi, toàn bộ nội dung (tiêu đề, mô tả, nút bấm, kịch bản tương tác, nhãn tab) chuyển đổi tức thì không cần tải lại trang.
- **Font chữ tiếng Nhật:** Bổ sung font hỗ trợ tiếng Nhật mượt mà (như `Noto Sans JP`) kết hợp cùng `Be Vietnam Pro` để tránh lỗi font chữ Hiragana/Katakana/Kanji.

