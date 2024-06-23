import { useNavigate } from "react-router-dom";

export const Appbar = () => {
    const navigator = useNavigate();
    const handleLogout = () => {
        window.localStorage.removeItem("token");
        navigator("/signin");
    }
    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            PayTM App
        </div>
        <div className="flex">
        <button onClick={handleLogout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold rounded w-15 h-10 ">Logout</button>
            <div className="flex flex-col justify-center h-full mr-4">
                Hello
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    U
                </div>
            </div>
        </div>
    </div>
}