"use client";

type PrintQRButtonProps = {
  elementId: string;
};

export default function PrintQRButton({
  elementId,
}: PrintQRButtonProps) {
  const handlePrint = () => {
    const element = document.getElementById(elementId);

    if (!element) {
      alert("QR Code not found.");
      return;
    }

    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      alert("Unable to open print window.");
      return;
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>Print QR Code</title>
          <style>
            body{
              display:flex;
              justify-content:center;
              align-items:center;
              height:100vh;
              margin:0;
              background:white;
            }
          </style>
        </head>
        <body>
          ${element.outerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <button
      onClick={handlePrint}
      className="rounded-lg bg-slate-700 hover:bg-slate-600 px-4 py-2"
    >
      Print QR
    </button>
  );
}