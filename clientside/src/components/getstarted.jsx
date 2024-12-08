import { useNavigate } from 'react-router-dom';

const GetStarted = () => {
    const navigate = useNavigate();

    const admin = () => {
        localStorage.setItem("role","admin");
        navigate("/")
    }
    const user = () => {
        localStorage.setItem("role","user");
        navigate("/")
    }

    return (
        <div className="h-[100vh] flex justify-center items-center ">
            <div className="h-[35vh] w-[80vw] lg:w-[20vw] bg-black rounded-md flex flex-col justify-center items-center">
                <h1 className="text-white text-3xl">Get Started</h1>
                <button className="text-white h-[40px] w-[90%] bg-blue-500 rounded my-2" onClick={admin}>Continue as Admin</button>
                <button className="text-white h-[40px] w-[90%] bg-blue-500 rounded my-2" onClick={user}>Continue as User</button>
            </div>
        </div>
    )
}

export default GetStarted;