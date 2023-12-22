import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router-dom";
import "./index.css";

import { WithJazz, useJazz, useAcceptInvite } from "jazz-react";
import { LocalAuth } from "jazz-react-auth-local";

import { PrettyAuthUI } from "./components/Auth.tsx";
import { migration } from "./types.ts";
import { AccountMigration } from "cojson";

import { Button } from "./ui/button.tsx";

import { HomeScreen } from "./screens/HomeScreen.tsx";

/**
 * Walkthrough: The top-level provider `<WithJazz/>`
 *
 * This shows how to use the top-level provider `<WithJazz/>`,
 * which provides the rest of the app with a controlled account (used through `useJazz` later).
 * Here we use `LocalAuth`, which uses Passkeys (aka WebAuthn) to store a user's account secret
 * - no backend needed.
 *
 * `<WithJazz/>` also runs our account migration
 */

const appName = "Jazzboard";

const auth = LocalAuth({
  appName,
  Component: PrettyAuthUI,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="p-5 min-h-svh flex flex-col items-center justify-center">
      <WithJazz auth={auth} migration={migration as AccountMigration}>
        <App />
      </WithJazz>
    </div>
  </React.StrictMode>
);

/**
 * Routing in `<App/>`
 *
 * <App> is the main app component, handling client-side routing based
 * on the CoValue ID (CoID) of our TodoProject, stored in the URL hash
 * - which can also contain invite links.
 */

function App() {
  // logOut logs out the AuthProvider passed to `<WithJazz/>` above.
  const { logOut } = useJazz();

  const router = createHashRouter([
    {
      path: "/",
      element: <HomeScreen />,
    },
    {
      path: "/projects",
      lazy: () => import("./pages/projects.tsx"),
    },
    {
      path: "/project/:projectId",
      lazy: () => import("./pages/project.tsx"),
    },
    {
      path: "/bookmarks",
      lazy: () => import("./pages/bookmarks.tsx"),
    },
    {
      path: "/invite/*",
      element: <p>Accepting invite...</p>,
    },
  ]);

  // `useAcceptInvite()` is a hook that accepts an invite link from the URL hash,
  // and on success calls our callback where we navigate to the project that we were just invited to.
  useAcceptInvite((projectID) => router.navigate("/project/" + projectID));

  return (
    <>
      <RouterProvider router={router} />

      <div className="fixed top-5 right-5">
        <Button onClick={() => router.navigate("/").then(logOut)}>
          Log Out
        </Button>
      </div>
    </>
  );
}
