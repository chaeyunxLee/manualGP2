import React, { useEffect } from 'react';

export default function GoogleTranslateNavbarItem() {
  console.log('✅ GoogleTranslateNavbarItem loaded'); // 👈 이거 반드시 찍혀야 함

  useEffect(() => {
    console.log('✅ useEffect running');
    const googleTranslateElementInit = () => {
      console.log('✅ googleTranslateElementInit called');
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'ko',
          includedLanguages: 'en,ja,zh-CN',
          layout: window.google.translate.TranslateElement.SIMPLE,
        },
        'google_translate_element'
      );
    };

    if (!window.google || !window.google.translate) {
      const script = document.createElement('script');
      script.src =
        '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.head.appendChild(script);
      window.googleTranslateElementInit = googleTranslateElementInit;
    } else {
      googleTranslateElementInit();
    }
  }, []);

  return <div id="google_translate_element" style={{ marginLeft: '1rem' }} />;
}