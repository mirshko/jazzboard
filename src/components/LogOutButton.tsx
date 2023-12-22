import { Button } from "@/ui/button";
import { useJazz } from "jazz-react";
import { useNavigate } from "react-router";

export default function LogOutButton() {
  const navigate = useNavigate();

  // logOut logs out the AuthProvider passed to `<WithJazz/>` above.
  const { logOut } = useJazz();

  return (
    <Button
      onClick={() => {
        navigate("/");
        logOut();
      }}
    >
      Log Out
    </Button>
  );
}
