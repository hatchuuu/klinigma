# Menggunakan image Node.js versi terbaru sebagai base image
# 20 adalah versi node yang dipakai
# alpine adalah tag node yang dipakai
FROM node:20-alpine AS build

# Menentukan working directory di dalam container
WORKDIR /app

# Menyalin file package.json dan package-lock.json untuk instalasi dependensi
COPY package.json package-lock.json /app/

# Menginstal dependensi
RUN npm install

# Menyalin semua file dari proyek lokal ke dalam container
COPY . .

# Build aplikasi React menggunakan Vite
RUN npm run build

# Menggunakan image Nginx untuk menyajikan build React
FROM nginx:alpine

# Menyalin hasil build dari stage sebelumnya ke folder Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Menyediakan port untuk aplikasi
EXPOSE 80

# Menjalankan server Nginx
CMD ["nginx", "-g", "daemon off;"]
