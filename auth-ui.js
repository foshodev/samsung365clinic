// Auth UI Management
document.addEventListener('DOMContentLoaded', async () => {
    const authArea = document.getElementById('auth-area');
    const mobileAuthArea = document.getElementById('mobile-auth-area');

    if (!window.supabaseClient) return;

    const { data: { session } } = await window.supabaseClient.auth.getSession();

    const updateHeader = (userSession) => {
        const loginHtml = `
            <a href="community.html?returnTo=${encodeURIComponent(window.location.href)}" class="text-[14px] font-semibold text-gray-700 hover:text-brand-accent transition-colors flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-100 hover:bg-brand-light">
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

    // Handle Page-specific gating (Community Page)
    if (window.location.pathname.includes('community.html')) {
        const loginGate = document.getElementById('login-gate');
        const privateContent = document.getElementById('private-content');

        if (session) {
            if (loginGate) loginGate.classList.add('hidden');
            if (privateContent) privateContent.classList.remove('hidden');
        } else {
            if (loginGate) loginGate.classList.remove('hidden');
            if (privateContent) privateContent.classList.add('hidden');
        }
    }

    // Logout Function
    window.handleLogout = async () => {
        await window.supabaseClient.auth.signOut();
        alert('로그아웃 되었습니다.');
        window.location.reload();
    };
});
