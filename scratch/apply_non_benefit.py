import os

def update_html_files():
    # 현재 디렉토리의 모든 HTML 파일 찾기
    files = [f for f in os.listdir('.') if f.endswith('.html')]
    script_tag = '<script src="non-benefit.js"></script>'
    
    for filename in files:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 이미 스크립트가 포함되어 있는지 확인
        if script_tag in content:
            print(f"Skipping {filename} - already updated.")
            continue
            
        # </body> 태그 바로 앞에 스크립트 삽입
        if '</body>' in content:
            new_content = content.replace('</body>', f'    {script_tag}\n</body>')
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filename} successfully.")
        else:
            print(f"Could not find </body> tag in {filename}.")

if __name__ == "__main__":
    update_html_files()
