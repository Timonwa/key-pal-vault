import { useEffect } from "react";
import { useRouter } from "next/router";
import useStore from "../../store";

export function withAuth(Component) {
  return function WithAuth(props) {
    const user = useStore((state) => state.userData);
    const router = useRouter();

    useEffect(() => {
      if (user) {
        setUser(user);
      } else {
        router.push("/");
      }
    }, [user, router]);

    if (user) {
      return <Component {...props} />;
    } else {
      return null;
    }
  };
}
