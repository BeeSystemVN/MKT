# HỆ THỐNG MÀU SẮC DỰ ÁN BEACARE (DESIGN SYSTEM COLOR PALETTE)

> **Dự án:** BeeCare — Hệ sinh thái quản lý viện dưỡng lão thông minh  
> **Tài liệu:** Bảng tổng hợp mã màu chuẩn, biến CSS và class Tailwind CSS  
> **Cập nhật lần cuối:** 2026-10-03  

---

## 1. BẢNG TỔNG HỢP MÃ MÀU TOÀN DIỆN

| Nhóm màu | Tên biến CSS | Mã HEX | Mã RGB | Tailwind Class | Ngữ cảnh & Ứng dụng thực tế |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Primary** | `--primary` | `#265397` | `rgb(38, 83, 151)` | `bg-primary` / `text-primary` | Màu nhận diện thương hiệu cốt lõi, nút CTA chính, tiêu đề quan trọng |
| | `--primary-hover` | `#204780` | `rgb(32, 71, 128)` | `hover:bg-primary-hover` | Trạng thái rê chuột (hover) của nút chính, tab active |
| | `--primary-dark` | `#193662` | `rgb(25, 54, 98)` | `bg-primary-dark` | Thanh tác vụ, viền đậm, trạng thái nhấn (active) |
| | `--primary-light` | `#EEF1F7` | `rgb(238, 241, 247)` | `bg-primary-light` | Nền nhãn (badge) xanh nhạt, nền hover nhẹ cho menu item |
| **Secondary & Accent** | `--secondary` | `#0284C7` | `rgb(2, 132, 199)` | `bg-secondary` / `text-secondary` | Xanh Sky, nút phụ, liên kết, điểm kết thúc của dải Gradient |
| | `--secondary-hover` | `#0369A1` | `rgb(3, 105, 161)` | `hover:bg-secondary-hover` | Trạng thái hover cho nút phụ |
| | `--accent` | `#06B6D4` | `rgb(6, 182, 212)` | `bg-accent` / `text-accent` | Điểm nhấn công nghệ y tế (Cyan), icon nổi bật, biểu đồ realtime |
| **Backgrounds (Nền)** | `--bg-body` | `#FBF7F3` | `rgb(251, 247, 243)` | `bg-bg-body` | Nền toàn trang (trắng ngà ấm, tạo cảm giác thân thiện, giảm mỏi mắt) |
| | `--bg-card-subtle` | `#F4F6FA` | `rgb(244, 246, 250)` | `bg-bg-card` | Nền thẻ phụ (card feature, khối phụ trợ, khung preview) |
| | `--white` | `#FFFFFF` | `rgb(255, 255, 255)` | `bg-white` / `text-white` | Nền thẻ chính, header, container, card trắng nổi bật |
| **Typography & Neutral** | `--navy-950` | `#0C1E37` | `rgb(12, 30, 55)` | `bg-navy-950` / `text-navy-950` | Nền Footer, nền khối tối chuyên sâu |
| | `--navy-900` | `#0F172A` | `rgb(15, 23, 42)` | `text-navy-900` | Màu chữ chính toàn trang (Heading & Body text chuẩn) |
| | `--navy-800` | `#1E293B` | `rgb(30, 41, 59)` | `text-navy-800` | Tiêu đề cấp 2, sub-heading, text quan trọng |
| | `--gray-600` | `#475569` | `rgb(71, 85, 105)` | `text-gray-600` | Văn bản mô tả, đoạn văn thông thường |
| | `--gray-500` | `#64748B` | `rgb(100, 116, 139)` | `text-gray-500` | Chú thích, phụ đề, nhãn phụ (label) |
| | `--gray-400` | `#94A3B8` | `rgb(148, 163, 184)` | `text-gray-400` | Icon phụ, placeholder, thanh cuộn hover |
| | `--border-color` / `gray-200` | `#E5E1D8` | `rgb(229, 225, 216)` | `border-gray-200` | Viền ngăn cách (Border tone ấm, tiệp màu với nền `#FBF7F3`) |
| | `--gray-100` | `#F1EFE9` | `rgb(241, 239, 233)` | `bg-gray-100` | Nền ô nhập liệu (input), đường line phụ |
| **Semantic & Y tế** | `--success` | `#10B981` | `rgb(16, 185, 129)` | `text-success` / `bg-success` | Trạng thái bình thường, an toàn, ổn định (kèm bg: `#ECFDF5`) |
| | `--warning` | `#F59E0B` | `rgb(245, 158, 11)` | `text-warning` / `bg-warning` | Cần lưu ý, nhắc nhở lịch uống thuốc (kèm bg: `#FFFBEB`) |
| | `--danger` | `#EF4444` | `rgb(239, 68, 68)` | `text-danger` / `bg-danger` | Báo động khẩn cấp SOS, chỉ số sinh tồn nguy hiểm (kèm bg: `#FEF2F2`) |

---

## 2. HIỆU ỨNG CHUYỂN MÀU (GRADIENTS) & SHADOWS

### 🌟 Gradients
- **Primary Gradient (Thương hiệu chính):**
  - CSS: `linear-gradient(135deg, #265397 0%, #0284C7 100%)`
  - Tailwind: `bg-primary-gradient`
  - Ứng dụng: Nút hành động nổi bật (Hero CTA, Đăng ký dùng thử), icon gradient nền.
- **Subtle Gradient (Nền chuyển tiếp nhẹ nhàng):**
  - CSS: `linear-gradient(180deg, #F4F6FA 0%, #FBF7F3 100%)`
  - Tailwind: `bg-primary-gradient-subtle`
  - Ứng dụng: Nền các section xen kẽ để tạo chiều sâu tự nhiên.

### 🌓 Đổ bóng chuyên biệt (Blue-tinted Shadows)
- **Glow Shadow:** `box-shadow: 0 0 25px rgba(38, 83, 151, 0.25);` (Tailwind: `shadow-glow`)
- **Card Hover:** `box-shadow: 0 20px 40px -10px rgba(38, 83, 151, 0.16);` (Tailwind: `shadow-card-hover`)

---

## 3. HƯỚNG DẪN SỬ DỤNG TRONG DỰ ÁN

### Cách 1: Sử dụng qua Tailwind CSS
```jsx
// Sử dụng màu nền và màu chữ
<button className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg shadow-md transition-colors">
  Đăng ký tư vấn
</button>

// Sử dụng màu nền ấm và viền
<div className="bg-bg-body border border-gray-200 p-6 rounded-xl">
  <h3 className="text-navy-900 font-bold text-lg">Quản lý hồ sơ sức khỏe</h3>
  <p className="text-gray-600 text-sm">Theo dõi chỉ số sinh tồn 24/7</p>
</div>

// Huy hiệu trạng thái (Badge)
<span className="bg-emerald-50 text-success text-xs font-semibold px-2.5 py-1 rounded-full">
  Ổn định
</span>
```

### Cách 2: Sử dụng qua biến CSS (CSS Variables)
```css
/* Trong file .css hoặc styled-components */
.custom-card {
  background-color: var(--white);
  border: 1px solid var(--border-color);
  color: var(--navy-900);
}

.custom-button {
  background: var(--primary-gradient);
  color: var(--white);
  transition: all var(--transition-normal);
}
```

### Cách 3: Sử dụng trực tiếp trong JS (Inline style / Chart / SVG)
```jsx
const statusColor = {
  normal: '#10B981',
  warning: '#F59E0B',
  critical: '#EF4444',
  brand: '#265397'
};

<svg stroke={statusColor.brand} fill="none" viewBox="0 0 24 24">
  {/* SVG Path */}
</svg>
```

---

## 4. NGUYÊN TẮC THIẾT KẾ MÀU SẮC TẠI BEACARE
1. **Ấm cúng & An tâm:** Nền trang `#FBF7F3` thay thế cho màu trắng tinh lạnh lẽo, mang lại không khí ấm áp như ở nhà cho các cơ sở dưỡng lão.
2. **Độ tin cậy & Chuẩn mực Y tế:** Sự kết hợp giữa Xanh Navy `#265397` và Sky Blue `#0284C7` biểu trưng cho sự tận tâm, chuyên nghiệp và chuẩn công nghệ cao.
3. **Phản xạ nhanh với cảnh báo:** Sử dụng bộ màu Semantic `#10B981` (Xanh lá), `#F59E0B` (Vàng cam) và `#EF4444` (Đỏ SOS) giúp đội ngũ điều dưỡng và người thân nhận biết ngay tình trạng người cao tuổi chỉ trong một cái liếc nhìn.
