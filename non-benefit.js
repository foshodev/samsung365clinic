/**
 * 삼성365의원 비급여 항목 안내 모달 스크립트
 */

const nonBenefitData = {
    vaccinations: [
        { name: '수두', price: '40,000원' },
        { name: 'MMR', price: '40,000원' },
        { name: '성인 A형간염', price: '80,000원' },
        { name: '소아 A형간염', price: '50,000원' },
        { name: '성인 B형간염', price: '30,000원' },
        { name: '소아 B형간염', price: '20,000원' },
        { name: '폐렴구균', price: '150,000원' },
        { name: '대상포진(조스타박스) - 1회당', price: '150,000원' },
        { name: '대상포진(싱그릭스) - 1회당', price: '270,000원' },
        { name: 'Tdap', price: '50,000원' },
        { name: '수막구균', price: '130,000원' },
        { name: '일본뇌염(만 3세 이하)', price: '60,000원' },
        { name: '일본뇌염(만 3세 이상)', price: '60,000원' },
        { name: '독감예방접종(4가)', price: '40,000원' },
        { name: '가다실(4가)', price: '150,000원' }
    ],
    items: [
        { name: '독감검사', price: '40,000원' },
        { name: '코로나검사', price: '30,000원' },
        { name: '호기 산화질소 측정', price: '50,000원' },
        { name: '티로신주사', price: '110,000원' },
        { name: '레이저 손발톱 진균증 치료', price: '100,000원' },
        { name: '증식치료(1부위 기준)', price: '100,000원 ~ 200,000원', note: '치료부위와 면적당 상이' }
    ],
    certificates: [
        { name: '진료확인서', price: '3,000원' },
        { name: '등원진단서', price: '5,000원' },
        { name: '소견서', price: '5,000원' },
        { name: '차트복사(장당)', price: '1,000원' },
        { name: '건강진단서', price: '10,000원' }
    ]
};

function createNonBenefitModal() {
    // 이미 모달이 존재하면 삭제
    const existingModal = document.getElementById('non-benefit-modal');
    if (existingModal) existingModal.remove();

    const modalHtml = `
        <div id="non-benefit-modal" class="fixed inset-0 z-[10000] flex items-center justify-center px-4 md:px-6 opacity-0 pointer-events-none transition-opacity duration-300">
            <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" onclick="closeNonBenefitModal()"></div>
            <div class="relative bg-white w-full max-w-2xl max-h-[85vh] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col transform translate-y-4 transition-transform duration-300">
                
                <!-- Header -->
                <div class="flex justify-between items-center px-8 py-6 border-b border-gray-100 bg-white sticky top-0 z-10">
                    <h2 class="text-xl md:text-2xl font-extrabold text-gray-900">비급여 항목 안내</h2>
                    <button onclick="closeNonBenefitModal()" class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                <!-- Content -->
                <div class="flex-1 overflow-y-auto p-6 md:p-8 space-y-10 custom-scrollbar">
                    
                    <!-- 예방접종 -->
                    <div>
                        <h3 class="text-lg font-bold text-brand-accent mb-4 flex items-center gap-2">
                            <span class="w-1 h-5 bg-brand-accent rounded-full"></span>
                            예방접종 가격
                        </h3>
                        <div class="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                            <table class="w-full text-left text-sm md:text-base border-collapse">
                                <tbody>
                                    ${nonBenefitData.vaccinations.map(v => `
                                        <tr class="border-b border-gray-200/50 last:border-none">
                                            <td class="py-3.5 px-5 text-gray-600 font-medium">${v.name}</td>
                                            <td class="py-3.5 px-5 text-right font-bold text-gray-900">${v.price}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- 비급여 항목 -->
                    <div>
                        <h3 class="text-lg font-bold text-brand-accent mb-4 flex items-center gap-2">
                            <span class="w-1 h-5 bg-brand-accent rounded-full"></span>
                            비급여 검사 및 치료
                        </h3>
                        <div class="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                            <table class="w-full text-left text-sm md:text-base border-collapse">
                                <tbody>
                                    ${nonBenefitData.items.map(v => `
                                        <tr class="border-b border-gray-200/50 last:border-none">
                                            <td class="py-3.5 px-5 text-gray-600 font-medium">
                                                ${v.name}
                                                ${v.note ? `<br><span class="text-[11px] text-gray-400 font-normal">${v.note}</span>` : ''}
                                            </td>
                                            <td class="py-3.5 px-5 text-right font-bold text-gray-900">${v.price}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- 증명서 발급 -->
                    <div>
                        <h3 class="text-lg font-bold text-brand-accent mb-4 flex items-center gap-2">
                            <span class="w-1 h-5 bg-brand-accent rounded-full"></span>
                            증명서 발급 금액
                        </h3>
                        <div class="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                            <table class="w-full text-left text-sm md:text-base border-collapse">
                                <tbody>
                                    ${nonBenefitData.certificates.map(v => `
                                        <tr class="border-b border-gray-200/50 last:border-none">
                                            <td class="py-3.5 px-5 text-gray-600 font-medium">${v.name}</td>
                                            <td class="py-3.5 px-5 text-right font-bold text-gray-900">${v.price}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Footer Note -->
                    <div class="text-[12px] text-gray-400 leading-relaxed text-center pb-4">
                        <p>※ 상기 비용은 삼성365의원에 준한 것이며, 기관에 따라 다를 수 있습니다.</p>
                        <p class="font-bold mt-1">《삼성365의원》</p>
                    </div>
                </div>
            </div>
        </div>
        <style>
            #non-benefit-modal.active { opacity: 1; pointer-events: auto; }
            #non-benefit-modal.active > div:last-child { transform: translate-y-0; }
            .custom-scrollbar::-webkit-scrollbar { width: 6px; }
            .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 10px; }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #D1D5DB; }
        </style>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function openNonBenefitModal() {
    if (!document.getElementById('non-benefit-modal')) {
        createNonBenefitModal();
    }
    
    // 약간의 지연을 주어 애니메이션이 작동하게 함
    setTimeout(() => {
        document.getElementById('non-benefit-modal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }, 10);
}

function closeNonBenefitModal() {
    const modal = document.getElementById('non-benefit-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// 자동 바인딩: "비급여 항목" 텍스트를 포함한 푸터 링크를 찾아 이벤트를 연결합니다.
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('footer a');
    links.forEach(link => {
        if (link.textContent.includes('비급여 항목')) {
            link.setAttribute('href', 'javascript:void(0)');
            link.setAttribute('onclick', 'openNonBenefitModal()');
        }
    });
});
