import { Button } from "@/basicComponents";
import { Link } from "react-router-dom";
import { TodoAccountRoot } from "@/types";
import { useJazz } from "jazz-react";
import { Profile } from "cojson";

export function HomeScreen() {
  const { me } = useJazz<Profile, TodoAccountRoot>();

  return (
    <>
      <pre>
        <code>{JSON.stringify(me.root, null, 2)}</code>
      </pre>

      <ul className="space-y-4">
        <li>
          <Button asChild variant="outline">
            <Link to="/projects">Projects</Link>
          </Button>
        </li>

        <li>
          <Button asChild variant="outline">
            <Link to="/bookmarks">Bookmarks</Link>
          </Button>
        </li>
      </ul>
    </>
  );
}
