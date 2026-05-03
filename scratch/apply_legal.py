import os

def update_html_files_legal():
    files = [f for f in os.listdir('.') if f.endswith('.html')]
    script_tag = '<script src="legal.js"></script>'
    
    for filename in files:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if script_tag in content:
            print(f"Skipping {filename} - already updated.")
            continue
            
        if '</body>' in content:
            new_content = content.replace('</body>', f'    {script_tag}\n</body>')
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filename} successfully with legal.js.")
        else:
            print(f"Could not find </body> tag in {filename}.")

if __name__ == "__main__":
    update_html_files_legal()
