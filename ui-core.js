/**
 * UI Core Logic
 * Handles global UI interactions such as mobile menu toggle, header scroll effects, and AOS initialization.
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Logic
    const menuBtn = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const header = document.getElementById('header');
    
    let isMenuOpen = false;
    
    if (menuBtn && mobileMenu && header) {
        menuBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            if (isMenuOpen) {
                mobileMenu.classList.remove('hidden');
                menuBtn.textContent = 'CLOSE';
                header.style.backgroundColor = 'rgba(255, 255, 255, 1)';
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            } else {
                mobileMenu.classList.add('hidden');
                menuBtn.textContent = 'MENU';
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                document.body.style.overflow = 'auto';
            }
        });

        // Close mobile menu when a link is clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                isMenuOpen = false;
                mobileMenu.classList.add('hidden');
                menuBtn.textContent = 'MENU';
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                document.body.style.overflow = 'auto';
            });
        });

        // 2. Header Style Update on Scroll
        window.addEventListener('scroll', () => {
            if (!isMenuOpen) {
                if (window.scrollY > 50) {
                    header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
                    header.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.05)';
                } else {
                    header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                    header.style.boxShadow = 'none';
                }
            }
        });
    }

    // 3. AOS Initialization
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50
        });
    }
});
