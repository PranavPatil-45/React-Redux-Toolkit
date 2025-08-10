
# 📝 Redux Toolkit Todo App (CRUD) with Bootstrap UI

[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)  
[![React](https://img.shields.io/badge/React-17%2B-blue.svg?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)  
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5-purple.svg?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)  

A **modern and responsive** Todo Application built using **React, Redux Toolkit, and Bootstrap 5**.  
Supports **full CRUD operations** with a clean, minimal UI.



## ✨ Features
- ➕ **Add Todo**
- 🖊 **Update Todo**
- ❌ **Delete Todo**
- ✅ **Mark Complete / Incomplete**
- 🎨 **Beautiful Bootstrap UI**
- ⚡ **State Management with Redux Toolkit**

---

## 🏗 Redux Toolkit Flow

`

┌───────────────┐
│   Component   │  dispatch(action)
└───────┬───────┘
│
▼
┌────────────────┐
│   Reducer /    │  ← createSlice()
│   Slice Logic  │
└───────┬────────┘
│
▼
┌────────────────┐
│ Redux Store    │  ← configureStore()
└───────┬────────┘
│
▼
┌────────────────┐
│   UI Updates   │  ← useSelector()
└────────────────┘




##Video

https://drive.google.com/file/d/1KOMp7FIWmMkLTdERz_gV5NbZWWWAZagZ/view?usp=sharing
---

## 📂 Project Structure


src/
│── Store/
│   └── store.js
│── features/
│   └── todoSlice.js
│── components/
│   └── Todos.jsx
│── App.js
└── index.js






---

## 🛠 Tech Stack

* **React** – UI Library
* **Redux Toolkit** – State Management
* **Bootstrap 5** – UI Styling

---

## 📚 Learning Resources

* [Redux Toolkit Docs](https://redux-toolkit.js.org/)
* [React Docs](https://react.dev/)
* [Bootstrap Docs](https://getbootstrap.com/)

---

## 📜 License

This project is licensed under the **MIT License**.

---

💡 *Simple, fast, and beautiful Todo app — built with Redux Toolkit & Bootstrap*
