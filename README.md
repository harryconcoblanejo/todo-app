# 📝 To-Do App

A simple and modern **To-Do List application** built with **Next.js**, **Tailwind CSS**, and **Prisma**.

## ✨ Features

- ✅ User authentication (NextAuth)
- 📄 Create, read, update, and delete (CRUD) tasks
- 👤 Each user only sees and manages their own tasks
- 🎨 Responsive and minimal UI with Tailwind CSS
- ⚡ Fast and scalable with Next.js App Router
- 💾 SQLite as the development database

## 🚀 Tech Stack

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
- [SQLite](https://www.sqlite.org/)
- [NextAuth.js](https://next-auth.js.org/)

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm

### Installation

```bash
git clone https://github.com/your-username/todo-app.git
cd todo-app
npm install

 Running the Development Server:
npm run dev

Prisma Setup
npx prisma migrate dev --name init
npx prisma generate

 Structure:
/app          - Next.js App Router structure
/components   - Reusable React components
/libs         - Auth and helper utilities
/prisma       - Prisma schema and configuration


