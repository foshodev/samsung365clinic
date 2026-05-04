/**
 * Global Tailwind CSS Configuration
 * This file centralizes the Tailwind theme setup used across all pages.
 */
tailwind.config = {
    theme: {
        extend: {
            fontSize: {
                '4xl': ['2.25rem', { lineHeight: '1.4', letterSpacing: '-0.02em' }],
                '5xl': ['3rem', { lineHeight: '1.4', letterSpacing: '-0.02em' }],
                '6xl': ['3.75rem', { lineHeight: '1.4', letterSpacing: '-0.02em' }],
                '7xl': ['4.5rem', { lineHeight: '1.4', letterSpacing: '-0.02em' }],
            },
            fontFamily: {
                sans: ['Pretendard', 'sans-serif'],
            },
            colors: {
                brand: {
                    dark: '#111111',     // 진한 차콜/블랙으로 무게감
                    light: '#F8F9FA',    // 깨끗한 병원 느낌의 오프화이트
                    accent: '#0C4A9E',   // 신뢰감을 주는 딥 블루 (삼성 계열 색상 참고하여 프리미엄화)
                    gray: '#E9ECEF'      // 연한 경계선
                }
            },
            spacing: {
                '30': '7.5rem',  // 120px
                '40': '10rem',   // 160px
                '50': '12.5rem', // 200px
            }
        }
    }
};
