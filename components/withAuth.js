// components/RequireAuth.js
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function withAuth(Component) {
  return function ProtectedRoute({ ...props }) {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const user = Cookies.get("userToken");
    const userIsAuthenticated = user !== undefined;

    useEffect(() => {
      if (!userIsAuthenticated) {
        router.push("/login");
      } else {
        setIsLoading(false);
      }
    }, [userIsAuthenticated, router]);

    return <>{isLoading ? <div></div> : <Component {...props} />}</>;
  };
}
