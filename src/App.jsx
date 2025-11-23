import React from "react";
import { Navigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Siswa from "./pages/siswa.jsx";
import EditSiswa from "./pages/editSiswa.jsx";

export default function App() {
  return (
    <React.StrictMode> {/* strictmode untuk agar jika ada error di dalam element ini maka tidak akan ditampilkan output di web nya */}
      <BrowserRouter>
        <div className="mb-4">
          <Routes>
            <Route path="/" element={<Navigate to="/siswa" />} />  {/* redirect default */}
            <Route path="/siswa" element={<Siswa />} />
            <Route path="/editSiswa/:id" element={<EditSiswa />} />
          </Routes>
        </div>
      </BrowserRouter>
    </React.StrictMode>
  )
}