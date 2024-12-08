import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { pdfjs } from 'react-pdf';
import io from 'socket.io-client';

import GetStarted from "./components/getstarted";
import PdfView from "./components/pdfview";

const socket = io.connect("http://localhost:9000");

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();




function App() {
  return (
    <Router>
      <div className="">
        <Routes>
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/" element={<PdfView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
