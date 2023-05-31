import Cookies from "js-cookie";
import { useEffect } from "react";

export default function useLogout(router) {
  const handleLogout = () => {
    Cookies.remove("userToken");
    Cookies.remove("userId");
    router.push("/");
  };

  useEffect(() => {
    // Check if the logout button was clicked
    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
      logoutButton.addEventListener("click", handleLogout);
    }

    return () => {
      // Cleanup event listener
      if (logoutButton) {
        logoutButton.removeEventListener("click", handleLogout);
      }
    };
  }, []);
}
