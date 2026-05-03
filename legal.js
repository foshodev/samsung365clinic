/**
 * 삼성365의원 개인정보처리방침 및 이용약관 모달 스크립트
 */

const legalContent = {
    privacy: `
        <div class="space-y-6 text-gray-600 leading-relaxed text-sm md:text-base">
            <p>삼성365의원(이하 '본원')은 고객님의 개인정보를 중요시하며, 「개인정보 보호법」 등 관련 법령을 준수하고 있습니다.</p>
            
            <section>
                <h4 class="font-bold text-gray-900 mb-2">제1조 (개인정보의 수집 및 이용 목적)</h4>
                <p>본원은 회원 가입 및 관리, 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 서비스 부정 이용 방지 등의 목적을 위하여 개인정보를 처리합니다.</p>
            </section>

            <section>
                <h4 class="font-bold text-gray-900 mb-2">제2조 (처리하는 개인정보 항목)</h4>
                <p>필수 항목: 이메일 주소, 비밀번호</p>
                <p>자동 수집 항목: IP 주소, 쿠키, 방문 일시, 서비스 이용 기록, 브라우저 종류 및 OS</p>
            </section>

            <section>
                <h4 class="font-bold text-gray-900 mb-2">제3조 (개인정보의 처리 및 보유 기간)</h4>
                <p>회원 탈퇴 시 즉시 삭제를 원칙으로 합니다.</p>
            </section>

            <section>
                <h4 class="font-bold text-gray-900 mb-2">제4조 (개인정보 처리 업무의 위탁)</h4>
                <p>수탁자: Supabase, Inc. / Cloudflare, Inc. / GitHub, Inc.</p>
                <p>업무 내용: 데이터베이스 저장 및 관리, 웹사이트 호스팅, 보안 및 인프라 관리</p>
            </section>

            <section>
                <h4 class="font-bold text-gray-900 mb-2">제5조 (정보주체의 권리·의무 및 행사방법)</h4>
                <p>이용자는 언제든지 자신의 개인정보를 조회, 수정하거나 회원 탈퇴를 통해 동의를 철회할 수 있습니다.</p>
            </section>

            <section>
                <h4 class="font-bold text-gray-900 mb-2">제6조 (개인정보 보호책임자)</h4>
                <p>책임자: 유명환 대표원장</p>
                <p>연락처: 02-356-1275</p>
            </section>
            
            <p class="text-xs text-gray-400 mt-8 italic">시행 일자: 2024년 5월 1일</p>
        </div>
    `,
    terms: `
        <div class="space-y-6 text-gray-600 leading-relaxed text-sm md:text-base">
            <section>
                <h4 class="font-bold text-gray-900 mb-2">제1조 (목적)</h4>
                <p>본 약관은 삼성365의원(이하 '본원')이 운영하는 홈페이지에서 제공하는 인터넷 관련 서비스의 이용 조건 및 절차를 규정함을 목적으로 합니다.</p>
            </section>

            <section>
                <h4 class="font-bold text-gray-900 mb-2">제2조 (서비스의 내용)</h4>
                <p>본원은 의료 정보 제공, 병원 안내, 비급여 항목 고지 등의 서비스를 제공합니다. 본 사이트는 게시된 내용의 확인만 가능하며, 별도의 게시물 작성 기능은 제공하지 않습니다.</p>
            </section>

            <section>
                <h4 class="font-bold text-gray-900 mb-2">제3조 (회원가입 및 탈퇴)</h4>
                <p>이용자는 본원이 정한 양식에 따라 회원가입을 신청할 수 있으며, 언제든지 탈퇴를 요청할 수 있습니다. 본원은 요청 즉시 이를 처리합니다.</p>
            </section>

            <section>
                <h4 class="font-bold text-gray-900 mb-2">제4조 (이용자의 의무)</h4>
                <p>허위 내용 등록, 타인 정보 도용, 시스템 해킹 시도 등 본원의 업무를 방해하거나 명예를 손상시키는 행위를 금지합니다.</p>
            </section>

            <section>
                <h4 class="font-bold text-gray-900 mb-2">제5조 (면책조항 및 경고)</h4>
                <p class="text-brand-accent font-bold">홈페이지에서 제공되는 의료 정보는 참고용이며, 실제 진료를 대신할 수 없습니다. 정확한 진단과 치료를 위해서는 반드시 내원하여 전문의와 상담하시기 바랍니다.</p>
            </section>
            
            <p class="text-xs text-gray-400 mt-8 italic">시행 일자: 2024년 5월 1일</p>
        </div>
    `
};

function createLegalModal(type) {
    const title = type === 'privacy' ? '개인정보처리방침' : '이용약관';
    const content = legalContent[type];
    
    const existingModal = document.getElementById('legal-modal');
    if (existingModal) existingModal.remove();

    const modalHtml = `
        <div id="legal-modal" class="fixed inset-0 z-[10001] flex items-center justify-center px-4 md:px-6 opacity-0 pointer-events-none transition-opacity duration-300">
            <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" onclick="closeLegalModal()"></div>
            <div class="relative bg-white w-full max-w-2xl max-h-[80vh] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col transform translate-y-4 transition-transform duration-300">
                <div class="flex justify-between items-center px-8 py-6 border-b border-gray-100 bg-white sticky top-0">
                    <h2 class="text-xl font-extrabold text-gray-900">${title}</h2>
                    <button onclick="closeLegalModal()" class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>
                <div class="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    ${content}
                </div>
                <div class="p-6 border-t border-gray-50 text-center">
                    <button onclick="closeLegalModal()" class="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-brand-accent transition-all">확인</button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    setTimeout(() => {
        const modal = document.getElementById('legal-modal');
        modal.classList.add('active-legal');
        document.body.style.overflow = 'hidden';
    }, 10);
}

function closeLegalModal() {
    const modal = document.getElementById('legal-modal');
    if (modal) {
        modal.classList.remove('active-legal');
        document.body.style.overflow = 'auto';
    }
}

// 스타일 추가
const style = document.createElement('style');
style.textContent = `
    #legal-modal.active-legal { opacity: 1; pointer-events: auto; }
    #legal-modal.active-legal > div:last-child { transform: translate-y-0; }
`;
document.head.appendChild(style);

// 자동 바인딩
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('footer a');
    links.forEach(link => {
        if (link.textContent.includes('개인정보처리방침')) {
            link.setAttribute('href', 'javascript:void(0)');
            link.setAttribute('onclick', 'createLegalModal("privacy")');
        } else if (link.textContent.includes('이용약관')) {
            link.setAttribute('href', 'javascript:void(0)');
            link.setAttribute('onclick', 'createLegalModal("terms")');
        }
    });
});
