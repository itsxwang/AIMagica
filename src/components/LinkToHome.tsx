import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

import useTheme from "../hooks/useTheme";

export default function LinkToHome() {
    const { resolvedTheme } = useTheme();  // <-- using resolvedTheme directly
    
    return <Link to="/">
        <nav className="absolute top-6 left-6">
          <FaHome
            className={`text-5xl hover:scale-110 shadow-2xl transition active:scale-50
              ${resolvedTheme === "dark"
                ? "text-slate-200 hover:shadow-slate-600"
                : "text-slate-700 hover:shadow-slate-300"
              }`}
          />
        </nav>
      </Link>

}