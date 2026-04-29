import sys
from PIL import Image

def convert_to_webp(source, destination):
    try:
        with Image.open(source) as img:
            img.save(destination, "WEBP", quality=80)
        print(f"Successfully converted {source} to {destination}")
    except Exception as e:
        print(f"Error converting {source}: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python convert_to_webp.py <source> <destination>")
    else:
        convert_to_webp(sys.argv[1], sys.argv[2])
