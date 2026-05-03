import os

files = [
    'index.html', 'info.html', 'staff.html', 'spine-neck.html', 'spine-back.html', 'spine-waist.html',
    'headache-pain.html', 'tmj-pain.html', 'shoulder-pain.html', 'elbow-pain.html', 'wrist-ankle-pain.html',
    'hip-joint-pain.html', 'knee-pain.html', 'digestive-pain.html', 'tinnitus-pain.html', 'panic-disorder.html',
    'injection-therapy.html', 'signup.html', 'admin.html'
]

replacements = [
    ('>커뮤니티</a>', '>치료 전/후</a>'),
    ('<span>커뮤니티</span>', '<span>치료 전/후</span>')
]

# Specially handle admin.html back button
admin_replacements = [
    ('커뮤니티로 돌아가기', '목록으로 돌아가기')
]

for filename in files:
    if not os.path.exists(filename):
        continue
    
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    for old, new in replacements:
        new_content = new_content.replace(old, new)
    
    if filename == 'admin.html':
        for old, new in admin_replacements:
            new_content = new_content.replace(old, new)
        # Also handle any status messages in admin.html
        new_content = new_content.replace('커뮤니티 페이지로 이동하시겠습니까?', '치료 전/후 페이지로 이동하시겠습니까?')

    if new_content != content:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filename}")
    else:
        print(f"No changes in {filename}")
