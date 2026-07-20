export default function ActivityTable() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-semibold">
        Recent Activity
      </h2>

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="py-3 text-left">
              Brosur
            </th>

            <th className="text-left">
              Status
            </th>

            <th className="text-left">
              Tanggal
            </th>

            <th className="text-left">
              View
            </th>

          </tr>

        </thead>

        <tbody>

          <tr className="border-b">

            <td className="py-4">
              Paket Internet 100 Mbps
            </td>

            <td>Published</td>

            <td>20 Juli 2026</td>

            <td>1.250</td>

          </tr>

          <tr>

            <td className="py-4">
              Promo Fiber Unlimited
            </td>

            <td>Draft</td>

            <td>18 Juli 2026</td>

            <td>850</td>

          </tr>

        </tbody>

      </table>

    </div>
  );
}