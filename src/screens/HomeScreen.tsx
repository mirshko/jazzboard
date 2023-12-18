import { TodoAccountRoot } from "@/1_types";
import { useJazz } from "jazz-react";
import { useNavigate } from "react-router-dom";
import { Profile } from "cojson";
import { Button } from "@/basicComponents";
import { NewProjectForm } from "@/3_NewProjectForm";

export function HomeScreen() {
  const { me } = useJazz<Profile, TodoAccountRoot>();

  const navigate = useNavigate();

  return (
    <>
      {me.root?.projects?.length ? <h1>My Projects</h1> : null}

      <ul>
        {me.root?.projects?.map((project, idx) => {
          return (
            <li key={`${idx}-${project?.id}`}>
              <Button
                onClick={() => navigate("/project/" + project?.id)}
                variant="outline"
              >
                {project?.title}
              </Button>
            </li>
          );
        })}
      </ul>

      <NewProjectForm />
    </>
  );
}
