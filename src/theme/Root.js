import React, { useEffect } from 'react';

export default function Root({children}) {
  useEffect(() => {
    // Netlify Identity 위젯 로드
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

  return <>{children}</>;
}