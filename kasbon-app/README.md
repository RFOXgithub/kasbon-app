# Kasbon

Aplikasi pribadi untuk mencatat utang dan piutang, memantau saldo belum lunas, serta menandai pembayaran. Dibangun dengan Next.js 16 App Router, TypeScript, Tailwind CSS v4, Supabase Auth/PostgreSQL, dan Lucide React.

## Demo

[Buka Kasbon di Vercel](https://konten-com-assignment-rival-septian.vercel.app/). Akun demo dibuat lewat halaman signup.

## Menjalankan secara lokal

1. Jalankan `npm install` dari folder `kasbon-app`.
2. Salin `.env.example` ke `.env` dan isi `NEXT_PUBLIC_SUPABASE_URL` serta `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` dari proyek Supabase Anda. Jangan commit `.env` atau token sesi.
3. Di Supabase Auth, atur Site URL dan redirect URL untuk `http://localhost:3000` serta domain Vercel di atas.
4. Terapkan migration di `supabase/migrations/` dengan Supabase CLI: `npx supabase login`, `npx supabase link --project-ref <project-ref>`, lalu `npx supabase db push`. Migration membuat tabel, constraint, trigger, indeks, dan RLS.
5. Jalankan `npm run dev`, lalu buka `http://localhost:3000`.

Untuk pengecekan sebelum deploy, jalankan `npm run lint` dan `npm run build`. Di Vercel, isi dua environment variable Supabase yang sama pada pengaturan proyek dan deploy ulang.

## Fitur

- Signup, login, logout, dan pembatasan halaman/API untuk pengguna yang terautentikasi.
- Catat, edit, lunasi, dan hapus utang/piutang. Jumlah disimpan sebagai Rupiah utuh dan divalidasi di client serta API.
- Ringkasan transaksi belum lunas, Net, dan chart perbandingan.
- Filter status/tipe, cari nama, urutkan tanggal/jumlah, dan ringkasan beberapa catatan dari orang yang sama.
- Loading, error, dan empty state. API berada di `/api/debts` dan `/api/debts/[id]`.

## Pendekatan

API selalu mengambil `user_id` dari claims terverifikasi, bukan dari input pengguna. Query tetap membatasi `user_id`, sementara Row Level Security di PostgreSQL menjadi lapisan pembatas akses jika tabel dipanggil langsung lewat Supabase REST. `settled_at = null` berarti belum lunas; PATCH pelunasan memperbarui row yang sama, lalu UI menggunakan respons API agar ringkasan dan daftar langsung sinkron. Zod dipakai sebagai dependensi tambahan untuk validasi dan pesan error yang konsisten antara form dan API.
