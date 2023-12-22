import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { HomeScreen } from "./screens/HomeScreen.tsx";

/**
 * Routing in `<App/>`
 *
 * <App> is the main app component, handling client-side routing based
 * on the CoValue ID (CoID) of our TodoProject, stored in the URL hash
 * - which can also contain invite links.
 */

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      async lazy() {
        const { Layout } = await import("./layout.tsx");
        return { Component: Layout };
      },
      children: [
        {
          index: true,
          element: <HomeScreen />,
        },
        {
          path: "projects",
          lazy: () => import("./routes/projects.tsx"),
        },
        {
          path: "project/:projectId",
          lazy: () => import("./routes/project.tsx"),
        },
        {
          path: "bookmarks",
          lazy: () => import("./routes/bookmarks.tsx"),
        },
        {
          path: "invite/*",
          lazy: () => import("./routes/invite.tsx"),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
