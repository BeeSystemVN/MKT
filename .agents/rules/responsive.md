# Quy chuẩn Thiết Kế Responsive Toàn Diện (Responsive Design Standards)

## 1. Nguyên Tắc Cốt Lõi
- **Bắt buộc Responsive 100%:** Mọi trang web, thành phần giao diện, khung thiết bị (Mockup 3D) và bảng biểu phải hiển thị hoàn hảo trên tất cả các thiết bị:
  - **Mobile:** `< 640px` (iPhone, Android)
  - **Tablet:** `640px - 1023px` (iPad, máy tính bảng)
  - **Laptop phổ thông:** `1024px - 1279px` (13 - 15 inch màn hình laptop có tỷ lệ zoom Windows 125% - 150%)
  - **Desktop / Màn hình lớn:** `1280px+`

## 2. Thanh Điều Hướng (Header & Navigation)
- Thanh menu chính (Desktop Nav) phải hiển thị đầy đủ, cân đối từ mốc `lg` (`1024px+`), không được để xảy ra tình trạng khoảng trắng khổng lồ ở giữa logo và nút bấm.
- Nhóm các tính năng nhiều mục vào Dropdown menu thông minh để tiết kiệm diện tích ngang mà vẫn trực quan.
- Trên màn hình nhỏ (`< 1024px`), nút Hamburger Menu phải mở ra ngăn kéo (Drawer/Modal) đầy đủ các liên kết với thiết kế thân thiện cho ngón tay chạm (Touch targets >= 44x44px).

## 3. Khung Thiết Bị 3D & Hình Ảnh
- **Khung Laptop 3D:** Duy trì tỷ lệ chuẩn `16 / 9`, tự động co dãn theo chiều rộng container (`max-width: 100%`).
- **Khung Điện Thoại 3D:** Duy trì tỷ lệ chuẩn `467 / 985` (hoặc `9 / 19.5`), `width: 100%`, `max-width: 280px`. Trên màn hình mobile nhỏ, góc nghiêng 3D (`phone-tilt`) tự động chuyển về phẳng (`transform: none`) để tránh tràn màn hình.
- **Không tràn ngang (No Horizontal Scroll):** `body, html` và tất cả section phải đảm bảo `overflow-x: hidden`, không để bất kỳ phần tử nào gây vỡ chiều rộng màn hình.

## 4. Bố Cục Lưới (Fluid Grids & Typography)
- Lưới 4 cột trên Desktop (`lg:grid-cols-4`) phải tự động chuyển thành 2 cột trên Tablet (`sm:grid-cols-2`) và 1 cột trên Mobile (`grid-cols-1`).
- Sân khấu mô phỏng (Live Simulator) 3 thiết bị trên màn hình lớn hiển thị 3 cột ngang, trên màn hình nhỏ xếp chồng thẳng đứng kèm mũi tên chỉ luồng dữ liệu rõ ràng.
- Font chữ: Luôn sử dụng Google Font `Be Vietnam Pro` hỗ trợ 100% tiếng Việt, cỡ chữ co giãn mượt mà giữa các mốc màn hình (`text-xs sm:text-sm md:text-base`).
- Tuân thủ nguyên tắc viết hoa: Chỉ viết hoa chữ cái đầu (Sentence case), tuyệt đối không dùng UPPERCASE toàn bộ hay snake_case trong văn bản giao diện.
