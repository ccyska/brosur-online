import Link from "next/link";
import { Plus } from "lucide-react";

export default function WelcomeCard() {
  return (
    <div className="flex h-[420px] flex-col rounded-[28px] bg-[#F5A000] p-8 text-[#1E1E1E] shadow-lg">

      <div>
        <h2 className="text-[40px] font-bold leading-tight">
          Publish New
          <br />
          Brochure
        </h2>

        <p className="mt-5 text-[17px] leading-8 text-[#4E3B14]">
          Tambahkan brosur dan paket baru internet NARATEL
        </p>
      </div>

      <Link
        href="/admin/brochures/create"
        className="mt-auto flex h-16 w-full items-center justify-center rounded-2xl bg-[#9A6500] text-xl font-semibold text-white shadow-md transition hover:bg-[#855700]"
      >
        <Plus size={24} className="mr-2" />
        Add Brochure
      </Link>

    </div>
  );
}