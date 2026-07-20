"use client";

interface ImageUploadProps {
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export default function ImageUpload({
  onChange,
}: ImageUploadProps) {
  return (
    <div className="space-y-2">
      <label className="font-medium text-gray-700">
        Image
      </label>

      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        className="w-full rounded-xl border border-gray-300 p-3"
      />
    </div>
  );
}