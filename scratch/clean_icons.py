import re

with open(r"e:\MKT\build_company.py", "r", encoding="utf-8") as f:
    content = f.read()

# Remove lucide icons inside section-badge
content = re.sub(r'<i data-lucide="[^"]+" class="w-4 h-4"><\/i>\s*', '', content)
# Remove globe-2 from hero badge
content = re.sub(r'<i data-lucide="globe-2" class="w-4 h-4 text-teal-300"><\/i>\s*', '', content)
# Remove quote from executive card
content = re.sub(r'<div class="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4">\s*<i data-lucide="quote" class="w-6 h-6 text-teal-600"><\/i>\s*<\/div>\s*', '', content)
# Remove vm-icon-box completely from vm-card
content = re.sub(r'<div class="vm-icon-box[^>]*>\s*<i data-lucide="[^"]+" class="w-7 h-7"><\/i>\s*<\/div>\s*', '', content)

with open(r"e:\MKT\build_company.py", "w", encoding="utf-8") as f:
    f.write(content)

print("Icons removed.")
