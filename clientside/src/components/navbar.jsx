import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Icons for toggle
import { GoPlusCircle } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NavBar = ({ getPdf, toggleSidebar }) => {
  const [isAddNew, setAddNew] = useState(false); // For modal state
  const [title, setTitle] = useState(""); // For PDF title
  const [file, setFile] = useState(null); // For file upload
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const start = () => {
    localStorage.removeItem("role");
    navigate("/get-started");
  };

  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    console.log("Uploading:", title, file);

    try {
      const result = await axios.post(
        "http://localhost:9000/upload-files",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(result);

      if (result.data.status === "ok") {
        if (getPdf) getPdf(); // Call getPdf if it's passed as a prop
      }
    } catch (error) {
      console.error("Network error:", error);
    }
    setAddNew(false); // Close modal after submission
  };

  return (
    <>
      <div className="h-[6vh] w-full bg-teal-800 flex items-center justify-between px-4 lg:px-10 text-white">
        <div className="flex items-center">
          <button
            className="text-white mr-4 focus:outline-none lg:hidden"
            onClick={toggleSidebar}
          >
            <FaBars size={20} />
          </button>
          <h1 className="text-xs md:text-lg font-bold">PDF Co-Viewer</h1>
        </div>
        <div className="flex items-center">
          {role === "admin" && (
            <button
              className="bg-blue-500 px-3 rounded h-[30px] flex text-xs md:text-lg items-center mr-5 hover:bg-blue-600 transition duration-200"
              onClick={() => setAddNew(true)}
            >
              <GoPlusCircle className="mr-2" /> Add PDF
            </button>
          )}
          <button
            className="bg-blue-500 px-3 rounded h-[30px] hover:bg-blue-600 transition duration-200 text-xs md:text-lg"
            onClick={start}
          >
            Get Started
          </button>
        </div>
      </div>

      {isAddNew && (
        <div className="fixed top-0 bottom-0 left-0 right-0 z-50 w-screen h-screen">
          <div className="w-screen h-screen top-0 bottom-0 right-0 left-0 fixed bg-[rgba(49,49,49,0.8)]">
            <div className="flex items-center justify-center h-screen">
              <div className="w-[90vw] lg:w-[20vw] bg-[#111] text-white font-caslon p-5 pb-8 rounded-md drop-shadow-lg">
                <div className="flex items-center justify-end">
                  <button
                    className="text-[#ffffff]"
                    onClick={() => setAddNew(false)}
                  >
                    <RxCross2 size={20} />
                  </button>
                </div>

                <form className="formStyle" onSubmit={submitImage}>
                  <h4 className="text-center">Upload Your PDF</h4>
                  <div className="d-flex flex-col justify-between">
                    <h1>Title</h1>
                    <input
                      type="text"
                      className="form-control w-full text-black"
                      placeholder="Title"
                      required
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <input
                    type="file"
                    className="form-control mt-6"
                    accept="application/pdf"
                    required
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <br />
                  <div className="flex w-full justify-center mt-6">
                    <button className="bg-blue-500 px-3 rounded" type="submit">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
