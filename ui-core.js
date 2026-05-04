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
    let scrollY = 0;
    
    if (menuBtn && mobileMenu && header) {
        const hamburgerIcon = document.getElementById('hamburger-icon');
        const closeIcon = document.getElementById('close-icon');

        const toggleMenu = (open) => {
            isMenuOpen = open;
            if (isMenuOpen) {
                // Open Menu
                mobileMenu.classList.remove('translate-x-full', 'invisible');
                mobileMenu.classList.add('translate-x-0');
                
                hamburgerIcon?.classList.add('hidden');
                closeIcon?.classList.remove('hidden');
                
                header.style.backgroundColor = 'rgba(255, 255, 255, 1)';
                
                // Prevent background scrolling
                scrollY = window.scrollY;
                document.body.style.position = 'fixed';
                document.body.style.top = `-${scrollY}px`;
                document.body.style.width = '100%';
            } else {
                // Close Menu
                mobileMenu.classList.add('translate-x-full', 'invisible');
                mobileMenu.classList.remove('translate-x-0');
                
                hamburgerIcon?.classList.remove('hidden');
                closeIcon?.classList.add('hidden');
                
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                
                // Restore background scrolling
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';
                window.scrollTo(0, scrollY);
            }
        };

        menuBtn.addEventListener('click', () => toggleMenu(!isMenuOpen));

        // Close mobile menu when a link is clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => toggleMenu(false));
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
