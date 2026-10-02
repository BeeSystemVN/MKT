import re

with open(r'e:\MKT\assets\script.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace vi
content = content.replace('preloader_text: "Đang tải mô hình thiết bị 3D và dữ liệu ứng dụng..."', 'preloader_text: "Công Nghệ Tận Tâm, Nâng Tầm Dưỡng Lão"')
# Replace en
content = content.replace('preloader_text: "Loading 3D device models and app data..."', 'preloader_text: "Dedicated Technology, Elevating Nursing Care"')
# Replace ja
content = content.replace('preloader_text: "3Dデバイスモデルとアプリデータを読み込んでいます..."', 'preloader_text: "献身的なテクノロジー、介護の向上"')

with open(r'e:\MKT\assets\script.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated preloader_text in script.js')
