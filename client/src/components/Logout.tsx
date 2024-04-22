import { CiLogout } from "react-icons/ci";
import "../styles/logout.css";

interface ILogoutProps {
  setUser: (user: string) => void;
}

export const Logout = ({setUser}: ILogoutProps) => {
    const handleLogout = async () => {
        const response = await fetch("http://localhost:3001/auth/logout", {
          method: "POST",
          credentials: "include",
        });
    
        if (response.status === 200) {
          setUser("");
        }
      };

    return (
        <>
        <div className="logout" onClick={handleLogout}>
          <CiLogout />
          <div>
            Log out
          </div>
        </div>
        </>
    );
};