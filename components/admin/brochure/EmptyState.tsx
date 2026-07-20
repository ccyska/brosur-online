import { FileText } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20">

      <div className="mb-5 rounded-full bg-orange-100 p-6">
        <FileText
          size={40}
          className="text-orange-500"
        />
      </div>

      <h2 className="text-xl font-semibold">
        Belum ada brosur
      </h2>

      <p className="mt-2 text-gray-500">
        Silakan tambahkan brosur pertama.
      </p>

    </div>
  );
}