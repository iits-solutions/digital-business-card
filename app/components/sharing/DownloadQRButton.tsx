"use client";

import { toPng } from "html-to-image";

type DownloadQRButtonProps = {
  elementId: string;
  fileName: string;
};

export default function DownloadQRButton({
  elementId,
  fileName,
}: DownloadQRButtonProps) {
  const download = async () => {
    const element = document.getElementById(elementId);

    if (!element) {
      alert("QR Code not found.");
      return;
    }

    const dataUrl = await toPng(element);

    const link = document.createElement("a");
    link.download = `${fileName}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <button
      onClick={download}
      className="rounded-lg bg-blue-600 hover:bg-blue-700 px-4 py-2"
    >
      Download QR
    </button>
  );
}