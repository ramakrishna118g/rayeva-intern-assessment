import { Routes, Route } from "react-router-dom";
import Userui from "./Userui.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Userui />} />
    </Routes>
  );
}

export default App;