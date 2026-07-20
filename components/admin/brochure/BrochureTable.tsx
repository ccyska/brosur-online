import BrochureRow from "./BrochureRow";

export default function BrochureTable() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="px-6 py-4 text-left">
              Image
            </th>

            <th className="text-left">
              Title
            </th>

            <th className="text-left">
              Price
            </th>

            <th className="text-left">
              Created
            </th>

            <th className="text-left">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          <BrochureRow />

          <BrochureRow />

        </tbody>

      </table>

    </div>
  );
}