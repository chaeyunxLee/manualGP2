// Google Translate 초기화 함수
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'ko', // 기본 언어 (한국어)
    includedLanguages: 'en,ja,ko,zh-CN,es,fr,de,pt,ru,ar,hi',// 지원할 언어들
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
    autoDisplay: false,
    gaTrack: true,
    multilanguagePage: true,
    gaTrack: true, // Google Analytics 추적 (선택사항)
  }, 'google_translate_element');
}

// 전역 함수로 등록
if (typeof window !== 'undefined') {
  window.googleTranslateElementInit = googleTranslateElementInit;
}

export default googleTranslateElementInit;