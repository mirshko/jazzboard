import { Outlet } from "react-router";
import LogOutButton from "./components/LogOutButton";
import { Providers } from "./providers";
import { Button } from "./ui/button";

export function Layout() {
  return (
    <Providers>
      <div className="fixed top-5 left-5">
        <Button outline href="/">
          Jazzboard
        </Button>
      </div>

      <Outlet />

      <div className="fixed top-5 right-5">
        <LogOutButton />
      </div>
    </Providers>
  );
}
