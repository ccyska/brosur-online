export default function WelcomeCard() {
  return (
    <div className="mb-8 rounded-3xl bg-gradient-to-r from-[#FF8A00] to-[#FFB347] p-8 text-white shadow-lg">
      <h2 className="text-2xl font-bold">
        Selamat Datang 👋
      </h2>

      <p className="mt-3 max-w-2xl text-white/90">
        Selamat datang di Dashboard Admin Brosur Online Naratel.
        Kelola brosur, pantau statistik pengunjung,
        dan lihat perkembangan website dalam satu tempat.
      </p>
    </div>
  );
}