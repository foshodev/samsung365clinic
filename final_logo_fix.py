import os
import re

def process_html(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    changed = False
    
    # 1. Header Logo - Robust replacement
    # Look for the logo inside the header (first occurrence usually)
    # We find the <img> with samsung365_logo.png that is NOT filtered with brightness-0
    def header_logo_sub(match):
        img_tag = match.group(0)
        # Check if it's NOT the footer logo
        if 'brightness-0' not in img_tag:
            # Replace height classes
            img_tag = re.sub(r'class="[^"]*?"', 'class="h-14 md:h-16 w-auto object-contain"', img_tag)
            return img_tag
        return img_tag

    new_content = re.sub(r'<img[^>]*?src="samsung365_logo\.png"[^>]*?>', header_logo_sub, content)
    if new_content != content:
        content = new_content
        changed = True

    # 2. Mobile Menu Logo - Robust replacement
    if 'id="mobile-menu"' in content and 'samsung365_logo.png' not in content.split('id="mobile-menu"')[1][:500]:
        # Insert logo after the mobile-menu div starts
        mobile_menu_pattern = re.compile(r'(<div[^>]*?id="mobile-menu"[^>]*?>)', re.IGNORECASE | re.DOTALL)
        content = mobile_menu_pattern.sub(r'\1\n            <div class="flex justify-start items-center mb-4 pb-6 border-b border-gray-50">\n                <img src="samsung365_logo.png" alt="삼성365의원" class="h-10 w-auto">\n            </div>', content)
        changed = True

    # 3. Community Login Gate
    if filename == 'community.html' and 'w-16 h-16 bg-brand-light' in content:
        login_gate_pattern = re.compile(r'<div class="w-16 h-16 bg-brand-light rounded-2xl flex items-center justify-center mx-auto mb-8 transform rotate-3">.*?</div>', re.DOTALL)
        content = login_gate_pattern.sub('<div class="mb-10 flex justify-center"><img src="samsung365_logo.png" alt="삼성365의원" class="h-16 w-auto object-contain"></div>', content)
        changed = True

    if changed:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed {filename}")

for filename in os.listdir('.'):
    if filename.endswith('.html'):
        process_html(filename)
