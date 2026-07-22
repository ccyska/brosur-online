"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

interface Brochure {
  id: number;
  title: string;
  slug: string;
  image: string;
  price: number | null;
  short_description: string | null;
  description: string | null;
}

export default function EditBrochureView() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [image, setImage] = useState("");
  const [newImage, setNewImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [shortDescription, setShortDescription] =
    useState("");
  const [description, setDescription] =
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
        alert(result.message);
        return;
      }

      const brochure: Brochure = result.data;

      setTitle(brochure.title);
      setImage(brochure.image ?? "");
      setPrice(
        brochure.price
          ? String(brochure.price)
          : ""
      );
      setShortDescription(
        brochure.short_description ?? ""
      );
      setDescription(
        brochure.description ?? ""
      );
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  }

  function handleImageChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert(
        "Format gambar tidak didukung. Gunakan PNG, JPG, atau WebP."
      );
      e.target.value = "";
      return;
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      alert("Ukuran gambar maksimal 5 MB.");
      e.target.value = "";
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setNewImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!title.trim()) {
      alert("Judul brosur wajib diisi.");
      return;
    }

    try {
      setSaving(true);

      let uploadedFilename: string | null = null;

      if (newImage) {
        const formData = new FormData();
        formData.append("file", newImage);

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const uploadResult = await uploadResponse.json();

        if (!uploadResult.success) {
          alert("Upload gambar gagal.");
          return;
        }

        uploadedFilename = uploadResult.filename;
      }

      const body: Record<string, unknown> = {
        title,
        price: price === "" ? null : Number(price),
        short_description: shortDescription,
        description,
      };

      if (uploadedFilename) {
        body.image = uploadedFilename;
      }

      const response = await fetch(
        `/api/brochures/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const result = await response.json();

      if (!result.success) {
        alert(result.message);
        return;
      }

      alert(result.message);

      router.push("/admin/brochures");
    } catch (error) {
      console.error(error);

      alert("Terjadi kesalahan pada server.");
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

  const displaySrc = previewUrl
    ? previewUrl
    : image
    ? `/uploads/${image}`
    : null;

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Edit Brochure
        </h1>

        <p className="text-gray-500">
          Ubah informasi brosur.
        </p>

      </div>

      <div className="rounded-2xl bg-white p-8 shadow-sm">

        <label className="mb-2 block font-medium">
          {previewUrl ? "New Image Preview" : "Current Image"}
        </label>

        {displaySrc ? (
          <div className="relative h-48 w-80 overflow-hidden rounded-xl">
            <Image
              src={displaySrc}
              alt="Brochure image"
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="flex h-48 w-80 items-center justify-center rounded-xl bg-gray-200">
            <span className="text-sm text-gray-400">
              No image
            </span>
          </div>
        )}

        <div className="mt-4">

          <label className="mb-2 block font-medium">
            Change Image
          </label>

          <input
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            onChange={handleImageChange}
            className="w-full rounded-xl border p-3 text-sm outline-none focus:border-orange-500"
          />

          {newImage && (
            <p className="mt-2 text-sm text-gray-500">
              {newImage.name}
            </p>
          )}

        </div>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl bg-white p-8 shadow-sm"
      >

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
            className="w-full rounded-xl border p-3 outline-none focus:border-orange-500"
          />

        </div>

        <div>

          <label className="mb-2 block font-medium">
            Price
          </label>

          <input
            type="number"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            className="w-full rounded-xl border p-3 outline-none focus:border-orange-500"
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
            className="w-full rounded-xl border p-3 outline-none focus:border-orange-500"
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
            className="w-full rounded-xl border p-3 outline-none focus:border-orange-500"
          />

        </div>

        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {saving
            ? "Updating..."
            : "Update Brochure"}
        </button>

      </form>

    </div>
  );
}
