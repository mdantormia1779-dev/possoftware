/**
 * Isolated thermal receipt printer.
 * Prints directly via an ephemeral iframe so modal backdrops,
 * page scroll, and app UI never leak into the print dialog.
 */
export function printReceipt(receiptElement: HTMLElement | null): void {
  if (!receiptElement || typeof window === "undefined") {
    window.print();
    return;
  }

  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "none";
  iframe.style.zIndex = "-9999";
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) {
    window.print();
    return;
  }

  const content = receiptElement.innerHTML;

  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>POS Receipt</title>
        <style>
          @page {
            size: 80mm auto;
            margin: 0;
          }
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          body {
            width: 80mm;
            max-width: 80mm;
            margin: 0 auto;
            padding: 8px 10px;
            background: #ffffff !important;
            color: #000000 !important;
            font-family: 'Courier New', Courier, 'Lucida Console', monospace;
            font-size: 11px;
            line-height: 1.25;
          }
          table { width: 100%; border-collapse: collapse; }
          th, td { padding: 3px 0; vertical-align: top; }
        </style>
      </head>
      <body>
        ${content}
      </body>
    </html>
  `);
  doc.close();

  setTimeout(() => {
    iframe.contentWindow?.focus();
    iframe.contentWindow?.print();
    setTimeout(() => {
      if (document.body.contains(iframe)) {
        document.body.removeChild(iframe);
      }
    }, 1000);
  }, 200);
}
