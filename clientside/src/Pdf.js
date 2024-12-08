import { useEffect, useRef, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import io from 'socket.io-client';

const socket = io.connect("http://localhost:9000");

function PdfComp(props) {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageWidth, setPageWidth] = useState(null); // State for dynamic width
  const containerRef = useRef(null); // Ref for container width

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const role = localStorage.getItem("role");

  const prev = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
      socket.emit("page", { message: pageNumber - 1 });
    }
  };

  const next = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
      socket.emit("page", { message: pageNumber + 1 });
    }
  };

  useEffect(() => {
    socket.on("currentpage", (data) => {
      setPageNumber(data.message);
    });
  }, []);

  useEffect(() => {
    // Update the page width based on the container
    if (containerRef.current) {
      setPageWidth(containerRef.current.offsetWidth);
    }

    // Handle window resize
    const handleResize = () => {
      if (containerRef.current) {
        setPageWidth(containerRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-[80vw] lg:w-[30vw] h-[80vh] mt-2 flex flex-col items-center"
    >
      <Document file={props.pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
        <Page
          pageNumber={pageNumber}
          width={pageWidth} // Set dynamic width
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
      <div className="flex flex-row items-center justify-center mt-2 space-x-2">
        {role === "admin" && (
          <button onClick={prev}>
            <GrFormPrevious />
          </button>
        )}
        <div>{`${pageNumber} / ${numPages}`}</div>
        {role === "admin" && (
          <button onClick={next}>
            <GrFormNext />
          </button>
        )}
      </div>
    </div>
  );
}

export default PdfComp;
