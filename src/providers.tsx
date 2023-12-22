import { WithJazz } from "jazz-react";
import { LocalAuth } from "jazz-react-auth-local";
import { AccountMigration } from "cojson";

import { PrettyAuthUI } from "./components/Auth.tsx";
import { migration } from "./types.ts";

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

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WithJazz auth={auth} migration={migration as AccountMigration}>
      {children}
    </WithJazz>
  );
}
