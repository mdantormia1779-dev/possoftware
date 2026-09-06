export interface PrintDocumentOptions {
  title?: string;
  size?: "a4" | "thermal-80mm" | "auto";
  customStyles?: string;
}

export function printDocument(
  element: HTMLElement | null,
  options: PrintDocumentOptions = {}
): void {
  if (!element || typeof window === "undefined") {
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

  const isThermal = options.size === "thermal-80mm";
  const title = options.title || (isThermal ? "POS Receipt" : "Document");

  const styleTags = Array.from(document.querySelectorAll("style, link[rel='stylesheet']"))
    .map((el) => el.outerHTML)
    .join("\n");

  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>${title}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
        ${styleTags}
        <style>
          @page {
            size: ${isThermal ? "80mm auto" : "auto"};
            margin: ${isThermal ? "0" : "12mm 15mm"};
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          html, body {
            background: #ffffff !important;
            color: #0f172a !important;
            margin: 0 !important;
            padding: ${isThermal ? "6px 8px" : "0"} !important;
            width: ${isThermal ? "80mm" : "100%"} !important;
            min-height: 0 !important;
            font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
            font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11', 'calt' 1, 'tnum' 1 !important;
          }
          .no-print { display: none !important; }
          ${options.customStyles || ""}
        </style>
      </head>
      <body class="bg-white text-slate-900">
        ${element.outerHTML}
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
  }, 250);
}
