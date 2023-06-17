// components/RequireAuth.js
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function withAuth(Component) {
  return function ProtectedRoute({ ...props }) {
    const router = useRouter();
    const user = Cookies.get("userToken");
    console.log(user);
    const userIsAuthenticated = user !== undefined;

    useEffect(() => {
      if (!userIsAuthenticated) {
        router.push("/login");
      }
    }, [userIsAuthenticated, router]);

    return <Component {...props} />;
  };
}
