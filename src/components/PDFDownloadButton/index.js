import React from 'react';
import { useDoc } from '@docusaurus/theme-common/internal';

const PDFDownloadButton = () => {
  const { metadata } = useDoc();
  
  const downloadPDF = async () => {
    try {
      // 동적으로 html2pdf 라이브러리 로드
      const html2pdf = (await import('html2pdf.js')).default;
      
      // PDF로 변환할 요소 선택 (문서의 메인 컨텐츠)
      const element = document.querySelector('article');
      
      if (!element) {
        console.error('문서 컨텐츠를 찾을 수 없습니다.');
        return;
      }

      // 파일명 생성 (문서 제목 기반)
      const filename = metadata.title 
        ? `${metadata.title.replace(/[^a-z0-9]/gi, '_')}.pdf`
        : 'document.pdf';

      // PDF 옵션 설정
      const opt = {
        margin: [0.5, 0.5, 0.5, 0.5], // 상, 우, 하, 좌 마진 (인치)
        filename: filename,
        image: { 
          type: 'jpeg', 
          quality: 0.98 
        },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          letterRendering: true
        },
        jsPDF: { 
          unit: 'in', 
          format: 'a4', 
          orientation: 'portrait' 
        }
      };

      // PDF 생성 및 다운로드
      await html2pdf().set(opt).from(element).save();
      
    } catch (error) {
      console.error('PDF 생성 중 오류가 발생했습니다:', error);
      alert('PDF 생성에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ 
      display: 'flex', 
      gap: '8px', 
      marginBottom: '16px', 
      justifyContent: 'flex-end' 
    }}>
      <button 
        onClick={downloadPDF}
        className="button button--secondary button--sm"
        title="현재 페이지를 PDF로 다운로드"
      >
        📄 PDF 다운로드
      </button>
      <button 
        onClick={handlePrint}
        className="button button--secondary button--sm"
        title="현재 페이지 프린트"
      >
        🖨️ 프린트
      </button>
    </div>
  );
};

export default PDFDownloadButton;