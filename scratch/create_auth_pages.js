const fs = require('fs');

let loginHtml = fs.readFileSync('login.html', 'utf8');

// === forgot-password.html ===
let forgotHtml = loginHtml;
forgotHtml = forgotHtml.replace('<title>로그인 | 삼성365의원</title>', '<title>비밀번호 찾기 | 삼성365의원</title>');
forgotHtml = forgotHtml.replace('<h1 class="text-2xl font-bold text-brand-dark mb-2">회원 로그인</h1>', '<h1 class="text-2xl font-bold text-brand-dark mb-2">비밀번호 찾기</h1>');
forgotHtml = forgotHtml.replace(/<p class="text-sm text-gray-400 font-light leading-relaxed">[\s\S]*?로그인이 필요합니다.[\s\S]*?<\/p>/, '<p class="text-sm text-gray-400 font-light leading-relaxed">\n                    가입하신 이메일 주소를 입력하시면<br>비밀번호 재설정 링크를 보내드립니다.\n                </p>');

forgotHtml = forgotHtml.replace('id="login-form"', 'id="forgot-form"');
forgotHtml = forgotHtml.replace('id="login-email"', 'id="forgot-email"');
// Remove password input div
forgotHtml = forgotHtml.replace(/<div[^>]*>\s*<input type="password" id="login-password"[^>]*>\s*<\/div>/, '');
// Remove turnstile
forgotHtml = forgotHtml.replace(/<div class="cf-turnstile[^>]*><\/div>/, '');

forgotHtml = forgotHtml.replace('id="login-error"', 'id="forgot-message"');
forgotHtml = forgotHtml.replace('id="login-btn"', 'id="forgot-btn"');
forgotHtml = forgotHtml.replace(/로그인\s*<\/button>/, '재설정 링크 보내기\n                    </button>');

forgotHtml = forgotHtml.replace(/<div class="flex items-center justify-center gap-6 text-xs text-gray-400">[\s\S]*?<\/div>/, '<div class="flex items-center justify-center gap-6 text-xs text-gray-400">\n                    <a href="login.html" class="hover:text-brand-dark transition-colors">로그인으로 돌아가기</a>\n                </div>');

const forgotScript = `<script>
        document.addEventListener('DOMContentLoaded', () => {
            const forgotForm = document.getElementById('forgot-form');
            if (!forgotForm) return;

            forgotForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const email = document.getElementById('forgot-email').value;
                const messageEl = document.getElementById('forgot-message');
                const btn = document.getElementById('forgot-btn');

                messageEl.classList.add('hidden');
                btn.disabled = true;
                btn.textContent = '전송 중...';

                try {
                    const { error } = await window.supabaseClient.auth.resetPasswordForEmail(email, {
                        redirectTo: window.location.origin + window.location.pathname.replace('forgot-password.html', 'update-password.html'),
                    });

                    if (error) throw error;

                    messageEl.textContent = '비밀번호 재설정 링크가 이메일로 발송되었습니다. 이메일을 확인해주세요.';
                    messageEl.className = 'text-green-600 text-xs text-center font-medium mt-2 block';
                    messageEl.classList.remove('hidden');

                } catch (error) {
                    messageEl.textContent = '오류가 발생했습니다. 다시 시도해주세요.';
                    messageEl.className = 'text-red-500 text-xs text-center font-medium mt-2 block';
                    messageEl.classList.remove('hidden');
                } finally {
                    btn.disabled = false;
                    btn.textContent = '재설정 링크 보내기';
                }
            });
        });
    </script>
    <script src="auth-ui.js">`;

forgotHtml = forgotHtml.replace(/<script>\s*document\.addEventListener\('DOMContentLoaded', async \(\) => \{[\s\S]*?<script src="auth-ui\.js">/, forgotScript);

fs.writeFileSync('forgot-password.html', forgotHtml);


// === update-password.html ===
let updateHtml = loginHtml;
updateHtml = updateHtml.replace('<title>로그인 | 삼성365의원</title>', '<title>비밀번호 변경 | 삼성365의원</title>');
updateHtml = updateHtml.replace('<h1 class="text-2xl font-bold text-brand-dark mb-2">회원 로그인</h1>', '<h1 class="text-2xl font-bold text-brand-dark mb-2">비밀번호 변경</h1>');
updateHtml = updateHtml.replace(/<p class="text-sm text-gray-400 font-light leading-relaxed">[\s\S]*?로그인이 필요합니다.[\s\S]*?<\/p>/, '<p class="text-sm text-gray-400 font-light leading-relaxed">\n                    새로운 비밀번호를 입력해주세요.\n                </p>');

updateHtml = updateHtml.replace('id="login-form"', 'id="update-form"');
// Remove email input div
updateHtml = updateHtml.replace(/<div[^>]*>\s*<input type="email" id="login-email"[^>]*>\s*<\/div>/, '');

updateHtml = updateHtml.replace('id="login-password"', 'id="update-password"');
updateHtml = updateHtml.replace('placeholder="비밀번호"', 'placeholder="새 비밀번호"');

// Remove turnstile
updateHtml = updateHtml.replace(/<div class="cf-turnstile[^>]*><\/div>/, '');

updateHtml = updateHtml.replace('id="login-error"', 'id="update-message"');
updateHtml = updateHtml.replace('id="login-btn"', 'id="update-btn"');
updateHtml = updateHtml.replace(/로그인\s*<\/button>/, '비밀번호 변경\n                    </button>');

updateHtml = updateHtml.replace(/<div class="flex items-center justify-center gap-6 text-xs text-gray-400">[\s\S]*?<\/div>/, '');

const updateScript = `<script>
        document.addEventListener('DOMContentLoaded', async () => {
            const updateForm = document.getElementById('update-form');
            if (!updateForm) return;

            updateForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const password = document.getElementById('update-password').value;
                const messageEl = document.getElementById('update-message');
                const btn = document.getElementById('update-btn');

                messageEl.classList.add('hidden');
                btn.disabled = true;
                btn.textContent = '변경 중...';

                try {
                    const { error } = await window.supabaseClient.auth.updateUser({
                        password: password
                    });

                    if (error) throw error;

                    messageEl.textContent = '비밀번호가 성공적으로 변경되었습니다. 메인으로 이동합니다.';
                    messageEl.className = 'text-green-600 text-xs text-center font-medium mt-2 mb-2 block';
                    messageEl.classList.remove('hidden');

                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 2000);

                } catch (error) {
                    messageEl.textContent = '오류가 발생했습니다. 다시 로그인 후 시도해주세요.';
                    messageEl.className = 'text-red-500 text-xs text-center font-medium mt-2 mb-2 block';
                    messageEl.classList.remove('hidden');
                    btn.disabled = false;
                    btn.textContent = '비밀번호 변경';
                }
            });
        });
    </script>
    <script src="auth-ui.js">`;

updateHtml = updateHtml.replace(/<script>\s*document\.addEventListener\('DOMContentLoaded', async \(\) => \{[\s\S]*?<script src="auth-ui\.js">/, updateScript);

fs.writeFileSync('update-password.html', updateHtml);
console.log('Pages created successfully.');
