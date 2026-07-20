"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import FormInput from "./FormInput";
import ImageUpload from "./ImageUpload";

export default function BrochureForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [shortDescription, setShortDescription] =
    useState("");
  const [description, setDescription] =
    useState("");
  const [image, setImage] =
    useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Judul brosur wajib diisi.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "/api/brochures",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            title,
            price:
              price === ""
                ? null
                : Number(price),
            short_description:
              shortDescription,
            description,
          }),
        }
      );

      const result =
        await response.json();

      if (!result.success) {
        alert(result.message);
        return;
      }

      alert(result.message);

      router.push(
        "/admin/brochures"
      );
    } catch (error) {
      console.error(error);

      alert(
        "Terjadi kesalahan pada server."
      );
    } finally {
      setLoading(false);
    }
  };

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
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <FormInput
        label="Price"
        name="price"
        type="number"
        placeholder="Masukkan harga"
        value={price}
        onChange={(e) =>
          setPrice(e.target.value)
        }
      />

      <FormInput
        label="Short Description"
        name="shortDescription"
        placeholder="Masukkan deskripsi singkat"
        value={shortDescription}
        onChange={(e) =>
          setShortDescription(
            e.target.value
          )
        }
      />

      <div className="space-y-2">
        <label className="font-medium text-gray-700">
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
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500"
        />
      </div>

      <ImageUpload
        onChange={(e) => {
          const file =
            e.target.files?.[0] ??
            null;

          setImage(file);
        }}
      />

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {loading
          ? "Saving..."
          : "Save Brochure"}
      </button>
    </form>
  );
} 