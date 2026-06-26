"use client";

type ActivateNFCButtonProps = {
  profileId: string;
};

export default function ActivateNFCButton({
  profileId,
}: ActivateNFCButtonProps) {
  const handleActivate = async () => {
    const response = await fetch(
      `/api/business-profiles/${profileId}/activate-nfc`,
      {
        method: "POST",
      }
    );

    const result = await response.json();

    if (response.ok) {
      alert(result.message);
      window.location.reload();
    } else {
      alert(result.error);
    }
  };

  return (
    <button
      onClick={handleActivate}
      className="rounded-lg bg-blue-600 hover:bg-blue-700 px-4 py-2"
    >
      Activate on NFC
    </button>
  );
}