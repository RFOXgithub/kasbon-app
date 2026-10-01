# Kasbon

Aplikasi pribadi untuk mencatat utang dan piutang, memantau saldo belum lunas, serta menandai pembayaran. Dibangun dengan Next.js 16 App Router, TypeScript, Tailwind CSS v4, Supabase Auth/PostgreSQL, dan Lucide React.

## Setup

1. Jalankan `npm install` dari folder `kasbon-app`.
2. Salin `.env.example` ke `.env` dan isi `NEXT_PUBLIC_SUPABASE_URL` serta `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` dari proyek Supabase Anda. Jangan commit `.env` atau token sesi.
3. Di Supabase Auth, atur Site URL dan redirect URL untuk `http://localhost:3000` serta domain Vercel pada bagian Demo.
4. Terapkan migration di `supabase/migrations/` dengan Supabase CLI: `npx supabase login`, `npx supabase link --project-ref <project-ref>`, lalu `npx supabase db push`. Migration membuat tabel, constraint, trigger, indeks, grant, dan RLS.
5. Jalankan `npm run dev`, lalu buka `http://localhost:3000`.

Untuk pengecekan sebelum deploy, jalankan `npm run lint`, `npm run build`, dan `npx supabase test db` dengan Supabase lokal yang berjalan. Di Vercel, isi dua environment variable Supabase yang sama pada pengaturan proyek dan deploy ulang.

## Demo

[Buka Kasbon di Vercel](https://konten-com-assignment-rival-septian.vercel.app/). Akun dibuat lewat halaman signup (Diperlukan verifikasi email)

## Fitur

- Signup, login, logout, dan pembatasan halaman/API untuk pengguna yang terautentikasi.
- Catat, edit, lunasi, dan hapus utang/piutang. Jumlah disimpan sebagai Rupiah utuh dan divalidasi di client serta API.
- Ringkasan transaksi belum lunas, Net, dan chart perbandingan.
- Filter status/tipe, cari nama, urutkan tanggal/jumlah, dan ringkasan beberapa catatan dari orang yang sama.
- Loading, error, dan empty state. API berada di `/api/debts` dan `/api/debts/[id]`.

## Approach

Saya membuat alur aplikasi sesederhana mungkin: pengguna login, lalu API hanya mengambil dan mengubah catatan milik pengguna tersebut. Keamanan data dijaga oleh pengecekan pengguna di API dan RLS di Supabase. Status lunas disimpan langsung di database agar tidak hilang saat halaman dimuat ulang. Setiap input juga diperiksa dengan Zod sebelum disimpan, lalu hasil dari API langsung digunakan untuk memperbarui tampilan.

## Trade-off

Dengan satu hari tambahan, saya akan menambah beberapa fitur seperti pencatatan pemasukan dan pengeluaran pribadi yang detail dan juga mungkin penambahan fitur scan receipt yang otomatis akan melakukan input pada sistem, serta memoles aksesibilitas dan tampilan.

## Time spent

Mulai dari commit GitHub pertama pada 30 September 2026 pukul 17.06 WIB. Hingga audit 1 Oktober 2026 pukul 01.49 WIB, rentangnya sekitar 8 jam 43 menit; ini waktu kalender, bukan klaim jam kerja efektif. Belum lagi ditambah pembuatan video Loom.
