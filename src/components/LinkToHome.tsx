import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";


export default function LinkToHome() {
    return <Link to="/">
        <nav className="absolute top-6 left-6">
            <FaHome className="text-5xl hover:scale-110 shadow-2xl hover:shadow-slate-600 transition active:scale-50 text-slate-100" />
        </nav>
    </Link>

}