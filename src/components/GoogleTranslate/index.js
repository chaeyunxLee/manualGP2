import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

function GoogleTranslate() {
  const [currentLang, setCurrentLang] = useState('ko');

  const languages = [
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'zh-CN', name: '中文', flag: '🇨🇳' }
  ];

  const translatePage = (langCode) => {
    if (window.google && window.google.translate) {
      const translateElement = window.google.translate.TranslateElement();
      const selectElement = document.querySelector('.goog-te-combo');
      if (selectElement) {
        selectElement.value = langCode;
        selectElement.dispatchEvent(new Event('change'));
        setCurrentLang(langCode);
      }
    }
  };

  useEffect(() => {
    const checkGoogleTranslate = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement({
          pageLanguage: 'ko',
          includedLanguages: 'en,ja,zh-CN,ko',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        }, 'google_translate_element');
      } else {
        setTimeout(checkGoogleTranslate, 100);
      }
    };
    
    checkGoogleTranslate();
  }, []);

  return null; 
}

export default GoogleTranslate;