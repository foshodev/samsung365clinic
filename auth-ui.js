// Auth UI Management
document.addEventListener('DOMContentLoaded', async () => {
    const authArea = document.getElementById('auth-area');
    const mobileAuthArea = document.getElementById('mobile-auth-area');

    if (!window.supabaseClient) return;

    const { data: { session } } = await window.supabaseClient.auth.getSession();

    const updateHeader = (userSession) => {
        const loginHtml = `
            <a href="login.html?returnTo=${encodeURIComponent(window.location.href)}" class="text-[14px] font-semibold text-gray-700 hover:text-brand-accent transition-colors flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-100 hover:bg-brand-light">
                <span>로그인</span>
            </a>
        `;

        const loggedInHtml = `
            <div class="relative group">
                <button class="w-10 h-10 rounded-full bg-brand-light flex items-center justify-center border border-brand-accent/20 hover:border-brand-accent transition-all cursor-pointer">
                    <span class="text-lg">👤</span>
                </button>
                <div class="absolute right-0 top-12 w-32 bg-white rounded-xl shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[100]">
                    <button onclick="handleLogout()" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors font-medium">로그아웃</button>
                </div>
            </div>
        `;

        if (authArea) authArea.innerHTML = userSession ? loggedInHtml : loginHtml;
        if (mobileAuthArea) mobileAuthArea.innerHTML = userSession ? loggedInHtml : loginHtml;
    };

    updateHeader(session);



    // Toast notification utility
    const showToast = (message) => {
        const existing = document.getElementById('__toast');
        if (existing) existing.remove();
        const toast = document.createElement('div');
        toast.id = '__toast';
        toast.style.cssText = `
            position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%) translateY(0);
            background: #111827; color: #fff; padding: 12px 24px;
            border-radius: 100px; font-size: 14px; font-weight: 500;
            box-shadow: 0 8px 32px rgba(0,0,0,0.18); z-index: 9999;
            opacity: 1; transition: opacity 0.4s ease, transform 0.4s ease;
            white-space: nowrap; letter-spacing: -0.01em;
        `;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(-50%) translateY(8px)'; }, 1800);
        setTimeout(() => toast.remove(), 2300);
    };

    // Logout Function
    window.handleLogout = async () => {
        await window.supabaseClient.auth.signOut();
        showToast('로그아웃되었습니다.');
        setTimeout(() => window.location.reload(), 1200);
    };
});
