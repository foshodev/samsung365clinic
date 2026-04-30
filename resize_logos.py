import os
import re

# This pattern targets the specific logo img tag and captures its class attribute
# It's more flexible with spacing and attributes
logo_img_pattern = re.compile(r'(<img\s+src="samsung365_logo\.png"\s+alt="삼성365의원"\s+class=")([^"]*?)(")', re.IGNORECASE | re.DOTALL)

def update_classes(match):
    prefix = match.group(1)
    classes = match.group(2)
    suffix = match.group(3)
    
    # We want to replace any h-XX or md:h-XX with our new larger sizes
    # If it's a footer logo (has brightness-0), we keep its size smaller or different
    if "brightness-0" in classes:
        # Keep footer logo size at h-9 or similar
        return prefix + classes + suffix
    
    # For header and mobile menu logos, use the larger size
    # We replace existing height classes or add them if missing
    new_classes = classes
    # Remove existing height classes
    new_classes = re.sub(r'\bh-\d+\b', '', new_classes)
    new_classes = re.sub(r'\bmd:h-\d+\b', '', new_classes)
    # Add new larger classes
    new_classes = f"h-14 md:h-16 {new_classes.strip()}"
    # Clean up double spaces
    new_classes = re.sub(r'\s+', ' ', new_classes).strip()
    
    return prefix + new_classes + suffix

for filename in os.listdir('.'):
    if filename.endswith('.html'):
        try:
            with open(filename, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = logo_img_pattern.sub(update_classes, content)
            
            if new_content != content:
                with open(filename, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Successfully updated logo sizes in {filename}")
            else:
                print(f"No changes needed or logo not found in {filename}")
        except Exception as e:
            print(f"Error processing {filename}: {e}")
