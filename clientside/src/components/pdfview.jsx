import { useEffect, useState } from "react";
import axios from "axios";
import PdfComp from "../Pdf";
import { pdfjs } from "react-pdf";
import NavBar from "./navbar";
import { FaFilePdf } from "react-icons/fa6";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

const socket = io.connect("http://localhost:9000");

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const PdfView = () => {
  const [avlFiles, setavlFiles] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    if (role === null) {
      navigate("/get-started");
    }
  }, [role, navigate]);

  useEffect(() => {
    getPdf();
  }, []);

  const [currindex, updateCurrentIndex] = useState(null);

  const getPdf = async () => {
    try {
      const result = await axios.get("http://localhost:9000/get-files");
      setavlFiles(result.data.data);
    } catch (error) {
      console.error("Error fetching PDFs:", error);
    }
  };

  useEffect(() => {
    socket.on("currentindex", (ind) => {
      updateCurrentIndex(ind.index);
      showPdfI(ind.index);
    });
    return () => {
      socket.off("currentindex");
    };
  }, [avlFiles]);

  const showPdfI = (id) => {
    if (avlFiles[id]) {
      const pdf = avlFiles[id].pdf;
      setPdfFile(`http://localhost:9000/files/${pdf}`);
    }
  };

  const showPdf = (pdf, index) => {
    updateCurrentIndex(index);
    socket.emit("index", { index });
    socket.emit("page", { message: 1 });
    setPdfFile(`http://localhost:9000/files/${pdf}`);
  };

  return (
    <div className="relative min-h-screen bg-slate-300">
      <NavBar getPdf={getPdf} toggleSidebar={() => setIsSidebarVisible(!isSidebarVisible)} />
      <div className="flex flex-col lg:flex-row">
        <div
          className={`min-w-full lg:w-[80vw] flex justify-center ${
            isSidebarVisible ? "hidden lg:flex" : "flex"
          }`}
        >
          {pdfFile !== null ? (
            <PdfComp pdfFile={pdfFile} />
          ) : (
            <div className="flex flex-col justify-center items-center text-lg text-gray-700">
              {role === "admin"
                ? "Choose a file to start presentation!"
                : "No presentation going on!"}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div
          className={`fixed lg:static top-0 right-0 w-[80vw] lg:w-[20vw] h-screen bg-black transition-transform duration-300 ${
            isSidebarVisible ? "translate-x-0" : "translate-x-full lg:translate-x-0"
          }`}
        >
          {avlFiles.length === 0 ? (
            <div className="h-full flex flex-col justify-center items-center">
              <h1 className="text-white">No PDFs found</h1>
            </div>
          ) : (
            <>
              <h1 className="text-white text-center text-2xl mt-5">
                {role === "admin" ? "Added Files" : "Available Files"}
              </h1>
              <div className="flex flex-wrap p-5 mt-10">
                {avlFiles.map((eachpdf, index) => (
                  <div
                    key={index}
                    className={`h-[100px] w-[150px] border border-black text-black mr-3 mb-3 flex flex-col justify-center items-center rounded-md ${
                      currindex === index
                        ? "text-white bg-gray-800 border-white"
                        : "bg-white"
                    }`}
                  >
                    <FaFilePdf />
                    <h1>{eachpdf.title}</h1>
                    {role === "admin" && (
                      <button
                        onClick={() => showPdf(eachpdf.pdf, index)}
                        className="px-5 bg-blue-500 text-white rounded mt-2"
                      >
                        Present
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PdfView;
