import { useAcceptInvite } from "jazz-react";
import { useNavigate } from "react-router";

export function Component() {
  const navigate = useNavigate();

  // `useAcceptInvite()` is a hook that accepts an invite link from the URL hash,
  // and on success calls our callback where we navigate to the project that we were just invited to.
  useAcceptInvite((projectID) => navigate("/project/" + projectID));

  return <p>Accepting invite...</p>;
}

Component.displayName = "Invite";
