import React from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createHashRouter,
} from "react-router-dom";
import "./index.css";

import { WithJazz, useJazz, useAcceptInvite } from "jazz-react";
import { LocalAuth } from "jazz-react-auth-local";

import { Button, Toaster } from "./basicComponents/index.ts";
import { PrettyAuthUI } from "./components/Auth.tsx";
import { ProjectTodoTable } from "./screens/Project.tsx";
import { migration } from "./types.ts";
import { AccountMigration, } from "cojson";

import { ProjectsScreen } from "./screens/ProjectsScreen.tsx";
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
    <div className="flex items-center gap-2 justify-center mt-5">{appName}</div>

    <Toaster />

    <div className="flex flex-col h-full items-center justify-start gap-10 pt-10 pb-10 px-5">
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
      element: <HomeScreen />
    },
    {
      path: "/projects",
      element: <ProjectsScreen />,
    },
    {
      path: "/project/:projectId",
      element: <ProjectTodoTable />,
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

      <Button
        onClick={() => router.navigate("/").then(logOut)}
        variant="outline"
      >
        Log Out
      </Button>
    </>
  );
}
