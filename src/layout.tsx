import { Button } from "@/ui/button";
import { useJazz } from "jazz-react";
import { Outlet, useNavigate } from "react-router";

export function Layout() {
  const navigate = useNavigate();

  // logOut logs out the AuthProvider passed to `<WithJazz/>` above.
  const { logOut } = useJazz();

  return (
    <>
      <Outlet />

      <div className="fixed top-5 right-5">
        <Button
          onClick={() => {
            navigate("/");
            logOut();
          }}
        >
          Log Out
        </Button>
      </div>
    </>
  );
}
