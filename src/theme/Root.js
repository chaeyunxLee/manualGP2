import React, { useEffect } from 'react';
import { useLocation } from '@docusaurus/router';

export default function Root({children}) {
  const location = useLocation();

  useEffect(() => {
    // 기존 Netlify Identity 위젯 로드
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js';
      document.head.appendChild(script);

      script.onload = () => {
        window.netlifyIdentity.on('init', user => {
          if (!user) {
            window.netlifyIdentity.on('login', () => {
              document.location.href = '/admin/';
            });
          }
        });
      };
    }
  }, []);

  // PDF 버튼 추가 기능
  useEffect(() => {
    // 문서 페이지가 아니면 버튼 추가하지 않음
    if (!location.pathname.startsWith('/docs/')) {
      return;
    }

    const addPDFButtons = () => {
      // 이미 버튼이 있으면 제거
      const existingContainer = document.getElementById('pdf-download-container');
      if (existingContainer) {
        existingContainer.remove();
      }

      // 문서 페이지의 요소들 찾기
      const article = document.querySelector('article');
      const titleElement = document.querySelector('h1') || 
                          document.querySelector('[class*="docTitle"]') ||
                          article?.querySelector('h1');
      
      if (!article || !titleElement) {
        return;
      }

      // 버튼 컨테이너 생성
      const buttonContainer = document.createElement('div');
      buttonContainer.id = 'pdf-download-container';
      buttonContainer.style.cssText = `
        display: flex;
        gap: 8px;
        margin: 16px 0;
        justify-content: flex-end;
        padding: 0;
      `;

      // PDF 다운로드 버튼 생성
      const pdfButton = document.createElement('button');
      pdfButton.className = 'button button--secondary button--sm';
      pdfButton.innerHTML = '📄 PDF 다운로드';
      pdfButton.title = '현재 페이지를 PDF로 다운로드';
      pdfButton.style.cssText = 'display: flex; align-items: center; gap: 4px;';
      
      pdfButton.onclick = async (event) => {
  try {
    // 버튼 상태 변경
    const button = event.target;
    const originalText = button.innerHTML;
    button.innerHTML = '⏳ PDF 생성 중...';
    button.disabled = true;

    // 현재 테마 상태 저장
    const htmlElement = document.documentElement;
    const currentTheme = htmlElement.getAttribute('data-theme');
    
    // 임시로 라이트모드로 변경
    htmlElement.setAttribute('data-theme', 'light');
    
    // DOM 업데이트를 위한 짧은 지연
    await new Promise(resolve => setTimeout(resolve, 100));

    // 동적으로 html2pdf 로드
    const html2pdf = (await import('html2pdf.js')).default;
    
    // 파일명 생성
    const pageTitle = document.title.replace(/[^a-z0-9가-힣\s]/gi, '').trim();
    const filename = pageTitle ? `${pageTitle}.pdf` : 'document.pdf';
    
    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: filename,
      image: { 
        type: 'jpeg', 
        quality: 0.98 
      },
      html2canvas: { 
        scale: 2, 
        useCORS: true,
        letterRendering: true,
        allowTaint: true,
        backgroundColor: '#ffffff' // 강제로 흰 배경 설정
      },
      jsPDF: { 
        unit: 'in', 
        format: 'a4', 
        orientation: 'portrait' 
      }
    };
    
    // PDF 생성 및 다운로드
    await html2pdf().set(opt).from(article).save();
    
    // 원래 테마로 복구
    if (currentTheme) {
      htmlElement.setAttribute('data-theme', currentTheme);
    } else {
      htmlElement.removeAttribute('data-theme');
    }
    
    // 버튼 상태 복구
    button.innerHTML = originalText;
    button.disabled = false;
    
  } catch (error) {
    console.error('PDF 생성 중 오류:', error);
    alert('PDF 생성에 실패했습니다. 다시 시도해주세요.');
    
    // 오류 시에도 테마 복구
    const htmlElement = document.documentElement;
    if (currentTheme) {
      htmlElement.setAttribute('data-theme', currentTheme);
    } else {
      htmlElement.removeAttribute('data-theme');
    }
    
    // 버튼 상태 복구
    event.target.innerHTML = '📄 PDF 다운로드';
    event.target.disabled = false;
  }
};

      // 프린트 버튼 생성
      const printButton = document.createElement('button');
      printButton.className = 'button button--secondary button--sm';
      printButton.innerHTML = '🖨️ 프린트';
      printButton.title = '현재 페이지 프린트';
      printButton.style.cssText = 'display: flex; align-items: center; gap: 4px;';
      printButton.onclick = () => {
        window.print();
      };

      // 버튼들을 컨테이너에 추가
      buttonContainer.appendChild(pdfButton);
      buttonContainer.appendChild(printButton);

      // 제목 다음에 버튼 삽입
      titleElement.parentNode.insertBefore(buttonContainer, titleElement.nextSibling);
    };

    // DOM이 완전히 로드된 후 버튼 추가
    const timer = setTimeout(addPDFButtons, 300);
    
    // cleanup function
    return () => {
      clearTimeout(timer);
    };
    
  }, [location.pathname]); // 페이지가 변경될 때마다 실행

  return <>{children}</>;
}