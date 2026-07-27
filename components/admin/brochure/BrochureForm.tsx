"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

import FormInput from "./FormInput";
import ImageUpload from "./ImageUpload";

export default function BrochureForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!title.trim()) {
      await Swal.fire({
        icon: "warning",
        title: "Judul Belum Diisi",
        text: "Silakan isi judul brosur terlebih dahulu.",
        confirmButtonColor: "#f97316",
      });

      return;
    }

    try {
      setLoading(true);

      let imageName = "default.png";

      // Upload gambar
      if (image) {
        const formData = new FormData();
        formData.append("file", image);

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const uploadResult = await uploadResponse.json();

        if (!uploadResult.success) {
          await Swal.fire({
            icon: "error",
            title: "Upload Gagal",
            text: uploadResult.message,
            confirmButtonColor: "#ef4444",
          });

          return;
        }

        imageName = uploadResult.filename;
      }

      // Simpan brosur
      const response = await fetch("/api/brochures", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          image: imageName,
          short_description: shortDescription,
          description,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        await Swal.fire({
          icon: "error",
          title: "Gagal Menyimpan",
          text: result.message,
          confirmButtonColor: "#ef4444",
        });

        return;
      }

      await Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: result.message,
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      router.push("/admin/brochures");
      router.refresh();
    } catch (error) {
      console.error(error);

      await Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: "Server sedang bermasalah.",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl bg-white p-8 shadow-sm"
    >
      <FormInput
        label="Title"
        name="title"
        placeholder="Masukkan judul brosur"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <FormInput
        label="Short Description"
        name="shortDescription"
        placeholder="Masukkan deskripsi singkat"
        value={shortDescription}
        onChange={(e) => setShortDescription(e.target.value)}
      />

      <div className="space-y-2">
        <label className="font-medium text-gray-700">Description</label>

        <textarea
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500"
        />
      </div>

      <ImageUpload
        onChange={(e) => {
          const file = e.target.files?.[0] ?? null;

          setImage(file);
        }}
      />

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-[#F5A000] px-6 py-3 font-semibold text-white transition hover:bg-orange-300 disabled:bg-gray-400"
      >
        {loading ? "Saving..." : "Save Brochure"}
      </button>
    </form>
  );
}
