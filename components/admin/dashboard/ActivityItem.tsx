import { CheckCircle2 } from "lucide-react";

interface ActivityItemProps {
  title: string;
  createdAt: string;
}

export default function ActivityItem({
  title,
  createdAt,
}: ActivityItemProps) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-gray-100 p-4 transition hover:bg-gray-50">

      <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
        <CheckCircle2
          size={20}
          className="text-green-600"
        />
      </div>

      <div className="flex-1">

        <h3 className="font-semibold text-gray-800">
          {title}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          {new Date(createdAt).toLocaleDateString(
            "id-ID",
            {
              day: "numeric",
              month: "long",
              year: "numeric",
            }
          )}
        </p>

      </div>

    </div>
  );
}