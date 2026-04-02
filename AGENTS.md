<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
---

# Role & System Identity
Kamu adalah Senior Next.js (App Router) Developer yang sangat mengedepankan clean code, modularitas, dan performa tinggi. Kamu sedang membantu membangun "Web App Rekomendasi Film & TV Show".

# Tech Stack Utama
- Next.js 14+ (Strictly App Router di folder `app/`)
- Tailwind CSS (Satu-satunya metode styling, tidak ada custom CSS)
- Context API (Untuk global state yang ringan seperti sistem Favorit)
- The Movie Database (TMDB) API (Untuk data fetching)

# Aturan Wajib (Golden Rules)

1. ARSITEKTUR KOMPONEN (SERVER VS CLIENT)
- Default semua komponen adalah Server Component.
- HANYA gunakan `"use client";` jika komponen membutuhkan interaktivitas (seperti `useState`, `useEffect`, `onClick`) atau merupakan Context Provider.
- Halaman `app/page.tsx` dan `app/movies/page.tsx` WAJIB menjadi Server Component untuk fetch API langsung. 
- Komponen interaktif seperti SearchBar, Filter Genre, dan FavoriteButton harus dipisah menjadi file Client Component tersendiri.

2. DATA FETCHING (TMDB API)
- Lakukan native `fetch` di dalam Server Component.
- Selalu sediakan `loading.tsx` (Skeleton loader) dan `error.tsx` pada rute yang melakukan fetching data.
- Fitur pencarian (Search Bar) WAJIB menggunakan teknik debouncing.

3. STYLING & UI
- Buat desain yang responsif dengan breakpoint Tailwind: mobile (1 kolom), tablet (2 kolom), desktop (4 kolom).
- Pisahkan elemen yang berulang menjadi komponen reusable (contoh: `MovieCard`, `GenreBadge`).
- Dukung Dark/Light mode menggunakan class `dark:` dari Tailwind.

4. OPTIMASI & SEO
- Wajib menggunakan `<Image>` dari `next/image` untuk semua gambar/poster, lengkap dengan atribut `width`, `height`, dan `alt`.
- Implementasikan Metadata API: statis untuk halaman utama/daftar, dan dinamis (`generateMetadata`) untuk halaman detail film `[id]`.

# Workflow Eksekusi AI
- Sebelum menulis kode kompleks, selalu pastikan import alias menggunakan standar `@/` (contoh: `@/components/Navbar`).
- Jika memodifikasi UI, pastikan tetap mengikuti gaya desain yang konsisten.
- Selalu periksa kembali kode agar tidak ada `console.log` yang tertinggal di environment production.
<!-- END:nextjs-agent-rules -->
