# Hướng Dẫn Phát Triển Dự Án

## Yêu Cầu Hệ Thống

- Node.js (phiên bản 16 trở lên)
- npm (được cài đặt cùng Node.js)
- Git

## 1. Cách Chạy Dự Án Với NPM

### Cài Đặt Dependencies

Trước khi chạy dự án lần đầu tiên, bạn cần cài đặt các thư viện phụ thuộc:

```bash
npm install
```

### Chạy Môi Trường Development

Để chạy dự án ở chế độ development với hot reload:

```bash
npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:5173` (hoặc port khác nếu port này đang được sử dụng).

### Các Lệnh Khác

- **Kiểm tra lỗi code (linting):**
  ```bash
  npm run lint
  ```

## 2. Làm Việc Với Git

### Tạo Branch Riêng

Khi làm việc trên một tính năng mới hoặc sửa lỗi, bạn nên tạo một branch riêng:

```bash
# Tạo và chuyển sang branch mới
git checkout -b ten-branch-cua-ban

# Ví dụ:
git checkout -b thanhdong
```

### Pull Code Mới Nhất Từ Master

Để cập nhật code mới nhất từ branch master:

```bash
# Đảm bảo bạn đang ở branch master
git checkout master

# Pull code mới nhất
git pull origin master
```

**Cập nhật branch hiện tại với code mới từ master:**

```bash
# Đang ở branch của bạn
git checkout ten-branch-cua-ban

# Merge code mới từ master vào branch hiện tại
git merge master

### Workflow Cơ Bản

1. **Pull code mới nhất:**
   ```bash
   git checkout master
   git pull origin master
   ```

2. **Tạo branch mới:**
   ```bash
   git checkout -b feature/tinh-nang-moi
   ```

3. **Làm việc và commit:**
   ```bash
   git add .
   git commit -m "Mô tả thay đổi"
   ```

4. **Push branch lên remote:**
   ```bash
   git push origin ten-branch-cua-ban
   ```

5. **Tạo Pull Request trên GitHub/GitLab để merge vào master**

## 3. Tech Stack

Dự án sử dụng các công nghệ sau:

### Core Technologies

- **React 19.2.0** - Thư viện JavaScript để xây dựng giao diện người dùng
- **TypeScript 5.9.3** - Ngôn ngữ lập trình với type safety
- **Vite 7.2.2** - Build tool và development server nhanh

### Styling

- **Tailwind CSS 4.1.17** - CSS framework utility-first
- **class-variance-authority** - Quản lý variants cho components
- **clsx & tailwind-merge** - Utilities để merge CSS classes

### UI Components

- **Radix UI** - Primitives cho accessible components
- **Lucide React** - Icon library

### Khuyến Nghị: shadcn/ui

Dự án được khuyến nghị sử dụng **[shadcn/ui](https://ui.shadcn.com/)** - một bộ thư viện components có thể tái sử dụng được xây dựng trên:
- Radix UI (đã có trong dependencies)
- Tailwind CSS (đã có trong dependencies)

**Ưu điểm của shadcn/ui:**
- ✅ Components được copy trực tiếp vào dự án (không phải package)
- ✅ Có thể tùy chỉnh hoàn toàn
- ✅ Accessible và tuân theo best practices
- ✅ Được xây dựng với TypeScript
- ✅ Tích hợp hoàn hảo với Tailwind CSS

**Thêm components:**

```bash
# Thêm một component cụ thể
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog

# Xem danh sách tất cả components
npx shadcn@latest add
```

### Development Tools

- **ESLint** - Linting và code quality
- **TypeScript ESLint** - ESLint rules cho TypeScript
- **Vite Plugin React** - Plugin Vite cho React với Fast Refresh

## 4. Cấu Trúc Dự Án

```
frontend/
├── src/
│   ├── components/      # React components
│   │   └── ui/         # shadcn/ui components
│   ├── lib/            # Utility functions
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components
│   ├── assets/         # Static assets (images, fonts)
│   ├── App.tsx         # Main App component
│   └── main.tsx        # Entry point
├── public/             # Public static files
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## 5. Lưu Ý Khi Phát Triển

- Luôn chạy `npm run lint` trước khi commit code
- Viết code TypeScript với strict typing
- Sử dụng shadcn/ui components khi có thể để đảm bảo tính nhất quán
- Tuân theo coding conventions của team
- Viết commit messages rõ ràng và có ý nghĩa
- Test kỹ trước khi tạo Pull Request
