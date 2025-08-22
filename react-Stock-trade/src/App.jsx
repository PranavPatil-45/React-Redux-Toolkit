import React, { useState } from "react";
import StockForm from "./componets/StockForm";
import StockList from "./componets/StockList";

function App() {
  const [editData, setEditData] = useState(null);

  return (
    <div>
      <h1>📈 Stock Trading CRUD</h1>
      <StockForm editData={editData} setEditData={setEditData} />
      <StockList setEditData={setEditData} />
    </div>
  );
}

export default App;
