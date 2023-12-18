import { Button } from "@/basicComponents";
import { Link } from "react-router-dom";

export function HomeScreen() {
  return <>
    <Button asChild variant="outline">
      <Link to="/projects">Projects</Link>
    </Button >
  </>
}
