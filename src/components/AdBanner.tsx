import { useEffect, useRef } from 'react';

export default function AdBanner() {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if the script is already added to avoid duplicates
    if (adRef.current && adRef.current.childNodes.length === 0) {
      const scriptConfig = document.createElement('script');
      scriptConfig.type = 'text/javascript';
      scriptConfig.innerHTML = `
        atOptions = {
          'key' : 'ee0103f1ab3f675a4e5ffe867cf8684d',
          'format' : 'iframe',
          'height' : 50,
          'width' : 320,
          'params' : {}
        };
      `;
      
      const scriptInvoke = document.createElement('script');
      scriptInvoke.type = 'text/javascript';
      scriptInvoke.src = 'https://www.highperformanceformat.com/ee0103f1ab3f675a4e5ffe867cf8684d/invoke.js';
      scriptInvoke.async = true;

      adRef.current.appendChild(scriptConfig);
      adRef.current.appendChild(scriptInvoke);
    }
  }, []);

  return (
    <div className="flex justify-center py-6 mt-auto border-t border-gray-100 dark:border-white/5">
      <div id="ad-container-ee0103f1ab3f675a4e5ffe867cf8684d" ref={adRef}></div>
    </div>
  );
}
