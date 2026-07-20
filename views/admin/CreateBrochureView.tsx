import BrochureForm from "@/components/admin/brochure/BrochureForm";

export default function CreateBrochureView() {
  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">
        Add Brochure
      </h1>

      <p className="mb-8 text-gray-500">
        Tambahkan brosur baru ke sistem.
      </p>

      <BrochureForm />
    </div>
  );
}