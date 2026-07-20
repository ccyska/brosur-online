"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

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

      const response = await fetch(
        `/api/brochures/${id}`,
        {
          method: "PUT",
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