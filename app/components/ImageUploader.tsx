"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

interface ImageUploaderProps {
  label: string;
  currentImage?: string | null;
}

export default function ImageUploader({
  label,
  currentImage,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState(
    currentImage || ""
  );

async function handleUpload(
  e: React.ChangeEvent<HTMLInputElement>
) {
  console.log("UPLOAD STARTED");

  const file = e.target.files?.[0];

  console.log("FILE:", file);

  if (!file) return;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("profiles")
    .upload(fileName, file);

  if (error) {
    alert(error.message);
    console.error(error);
    return;
  }

  const { data } = supabase.storage
    .from("profiles")
    .getPublicUrl(fileName);

  console.log("PUBLIC URL:", data.publicUrl);

  setPreview(data.publicUrl);
}

  return (
    <div className="bg-black border border-gray-700 rounded-xl p-4">

      <div className="h-40 rounded-lg bg-[#111827] flex items-center justify-center mb-4 overflow-hidden">

        {preview ? (
          <img
            src={preview}
            alt={label}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-500">
            {label}
          </span>
        )}

      </div>

      <input
  type="file"
  accept="image/*"
  onChange={handleUpload}
  className="w-full"
/>

    </div>
  );
}