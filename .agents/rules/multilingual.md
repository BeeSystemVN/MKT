# Quy Chuẩn Đa Ngôn Ngữ (Multilingual Standards: VI - EN - JA)

## 1. Phạm Vi Hỗ Trợ
- **3 Ngôn ngữ chính:**
  - Tiếng Việt (vi): Ngôn ngữ mặc định.
  - Tiếng Anh (en): Dành cho đối tác y tế quốc tế, nhà đầu tư.
  - Tiếng Nhật (ja): Dành cho đối tác mô hình viện dưỡng lão & Kaigo chuẩn Nhật Bản.

## 2. Quy Chuẩn Kỹ Thuật (i18n Implementation)
- **Cơ chế chuyển đổi tức thì (Client-side i18n):**
  - Lưu trạng thái ngôn ngữ vào localStorage ('beecare_lang').
  - Sử dụng data-i18n="key" trên các phần tử HTML để chuyển đổi tức thì không cần tải lại trang.
- **Font chữ tiếng Nhật:**
 - Bổ sung Google Font Noto Sans JP để hiển thị chữ Nhật (Kanji/Hiragana/Katakana) mượt mà, không lỗi font.
- **Bộ chọn ngôn ngữ (Language Switcher):**
 - Tích hợp tại thanh Header (VI | EN | JA) tinh tế, sang trọng.
