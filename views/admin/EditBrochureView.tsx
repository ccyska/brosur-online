"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

import PackageSection from "@/components/admin/brochure/PackageSection";

interface Brochure {
  id: number;
  title: string;
  slug: string;
  image: string;
  short_description: string | null;
  description: string | null;
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
        alert(result.message);
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
      alert("Terjadi kesalahan.");
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
      alert(
        "Gunakan PNG, JPG atau WEBP."
      );
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
      alert(
        "Judul brosur wajib diisi."
      );
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
          alert(
            uploadResult.message
          );
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
        alert(result.message);
        return;
      }

      alert(result.message);

      router.refresh();
    } catch (error) {
      console.error(error);
      alert(
        "Terjadi kesalahan."
      );
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
            onChange={
              handleImageChange
            }
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
              setTitle(
                e.target.value
              )
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
            value={
              shortDescription
            }
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
          className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white"
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