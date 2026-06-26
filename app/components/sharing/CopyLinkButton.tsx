"use client";

type CopyLinkButtonProps = {
  url: string;
};

export default function CopyLinkButton({
  url,
}: CopyLinkButtonProps) {
  const handleCopy = async () => {
    const fullUrl = new URL(url, window.location.origin).toString();

    await navigator.clipboard.writeText(fullUrl);
    alert("Profile link copied.");
  };

  return (
    <button
      onClick={handleCopy}
      className="rounded-lg bg-slate-700 hover:bg-slate-600 px-4 py-2"
    >
      Copy Link
    </button>
  );
}