# 💸 Transaction Dispute Dashboard

A modern, professional-grade React.js app for managing and raising disputes on customer transactions. Built for financial use cases, inspired by real-world workflows from BFSI companies like Mastercard and HSBC.

![Preview](https://transaction-dispute-dashboard.vercel.app/) <!-- (optional: add image later) -->

---

## 🚀 Features

- 🧾 **Transaction Viewer** — View all recent transactions
- 🔍 **Search & Filter** — Search by merchant, filter by status
- 📊 **Sorting** — Sort by amount or number of disputes
- ⚠️ **Raise Dispute** — Clean form with Zod + React Hook Form
- 📄 **PDF Export** — Generate printable transaction PDFs
- 🎨 **Responsive UI** — Built with Tailwind CSS + shadcn/ui
- 🧠 **State Management** — Redux Toolkit for global state
- 🔁 **Persisted State** — Disputes persist across navigation
- ✅ **Fully Typed** — End-to-end TypeScript support

---

## 🏗️ Tech Stack

| Tech             | Why                                     |
|------------------|------------------------------------------|
| React + Vite     | Fast modern web app setup               |
| TypeScript       | Safer, cleaner code                     |
| Redux Toolkit    | Scalable global state                   |
| React Hook Form  | Minimal, performant form management     |
| Zod              | Declarative schema validation           |
| Tailwind CSS     | Utility-first, responsive styling       |
| shadcn/ui        | Prebuilt professional UI components     |
| html2canvas + jsPDF | Export views as downloadable PDFs     |

---

## 📸 Screenshots

> Add screenshots of:
> - Dashboard view
> - Dispute form
> - PDF download
> - Responsive mobile view

---

## 🧪 Running Locally

```bash
git clone https://github.com/your-username/dispute-dashboard.git
cd dispute-dashboard

npm install
npm run dev

Runs on http://localhost:5173/

src/
│
├── components/         # Reusable UI components
├── features/           # Feature-based structure (transactions, disputes)
├── pages/              # Route-level components
├── store/              # Redux store + slices
├── types/              # Global TypeScript types
├── utils/              # Mock data & helpers
└── App.tsx             # Root app logic

## 📚 Concepts Implemented

✅ Props  
✅ State & State Lifting  
✅ Routing (`react-router-dom`)  
✅ Redux Toolkit Store/Slice setup  
✅ Form validation (Zod + Hook Form)  
✅ UI responsiveness  
✅ Code-splitting & lazy loading  
✅ Barrel exports  
✅ Reusable card-based UIs

---

## 📦 Future Enhancements

- [ ] Backend API integration  
- [ ] Role-based admin dashboard  
- [ ] Pagination and infinite scroll  
- [ ] Export as CSV  
- [ ] Unit tests (Vitest + Testing Library)

---

## 👨‍💻 Author

Built by **[Clinton](https://github.com/clinton1719)** —  
React engineer focused on high-performance apps for banking and fintech use cases.

---

## 🪪 License

MIT — free to use and modify.
