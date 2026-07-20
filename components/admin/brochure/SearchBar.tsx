"use client";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Cari brosur..."
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500"
      />
    </div>
  );
}