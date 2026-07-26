"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Swal from "sweetalert2";

import PackageSection from "@/components/admin/brochure/PackageSection";

interface Brochure {
  id: number;
  title: string;
  slug: string;
  image: string;
  short_description: string | null;
  description: string |null;
}

export default function EditBrochureView() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const [shortDescription, setShortDescription] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [newImage, setNewImage] =
    useState<File | null>(null);

  const [previewUrl, setPreviewUrl] =
    useState("");

  useEffect(() => {
    fetchBrochure();
  }, []);

  async function fetchBrochure() {
    try {
      const response = await fetch(
        `/api/brochures/${id}`
      );

      const result = await response.json();

      if (!result.success) {
        await Swal.fire({
          icon: "error",
          title: "Gagal",
          text: result.message,
          confirmButtonColor: "#f97316",
        });

        return;
      }

      const brochure: Brochure =
        result.data;

      setTitle(brochure.title);
      setImage(brochure.image);

      setShortDescription(
        brochure.short_description ?? ""
      );

      setDescription(
        brochure.description ?? ""
      );
    } catch (error) {
      console.error(error);

      await Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: "Gagal mengambil data brosur.",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setLoading(false);
    }
  }

  function handleImageChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      e.target.files?.[0];

    if (!file) return;

    const allowed = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
    ];

    if (!allowed.includes(file.type)) {
      Swal.fire({
        icon: "warning",
        title: "Format Tidak Didukung",
        text: "Gunakan file PNG, JPG atau WEBP.",
        confirmButtonColor: "#f97316",
      });

      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(
        previewUrl
      );
    }

    setNewImage(file);
    setPreviewUrl(
      URL.createObjectURL(file)
    );
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!title.trim()) {
      await Swal.fire({
        icon: "warning",
        title: "Judul Belum Diisi",
        text: "Silakan isi judul brosur.",
        confirmButtonColor: "#f97316",
      });

      return;
    }

    try {
      setSaving(true);

      let imageName = image;

      if (newImage) {
        const formData =
          new FormData();

        formData.append(
          "file",
          newImage
        );

        const upload =
          await fetch(
            "/api/upload",
            {
              method: "POST",
              body: formData,
            }
          );

        const uploadResult =
          await upload.json();

        if (
          !uploadResult.success
        ) {
          await Swal.fire({
            icon: "error",
            title: "Upload Gagal",
            text: uploadResult.message,
            confirmButtonColor: "#ef4444",
          });

          return;
        }

        imageName =
          uploadResult.filename;
      }

      const body = {
        title,
        image: imageName,
        short_description:
          shortDescription,
        description,
      };

      const response =
        await fetch(
          `/api/brochures/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(
              body
            ),
          }
        );

      const result =
        await response.json();
              if (!result.success) {
        await Swal.fire({
          icon: "error",
          title: "Update Gagal",
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
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-8">
        Loading...
      </div>
    );
  }

  const displayImage =
    previewUrl ||
    `/uploads/${image}`;

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          Edit Brochure
        </h1>

        <p className="text-gray-500">
          Perbarui informasi brosur.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl bg-white p-8 shadow-sm"
      >

        <div>

          <label className="mb-2 block font-medium">
            Image
          </label>

          <div className="relative mb-4 h-56 w-full overflow-hidden rounded-xl border">

            <Image
              src={displayImage}
              alt={title}
              fill
              className="object-cover"
            />

          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />

        </div>

        <div>

          <label className="mb-2 block font-medium">
            Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full rounded-xl border p-3"
          />

        </div>

        <div>

          <label className="mb-2 block font-medium">
            Short Description
          </label>

          <textarea
            rows={3}
            value={shortDescription}
            onChange={(e) =>
              setShortDescription(
                e.target.value
              )
            }
            className="w-full rounded-xl border p-3"
          />

        </div>

        <div>

          <label className="mb-2 block font-medium">
            Description
          </label>

          <textarea
            rows={5}
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            className="w-full rounded-xl border p-3"
          />

        </div>

        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:bg-gray-400"
        >
          {saving
            ? "Updating..."
            : "Update Brochure"}
        </button>

      </form>

      <PackageSection
        brochureId={Number(id)}
      />

    </div>
  );
}