import { TodoAccountRoot } from "@/types";
import { useJazz } from "jazz-react";
import { useNavigate } from "react-router-dom";
import { Profile } from "cojson";
import { NewProjectForm } from "@/components/NewProjectForm";
import { Text } from "@/ui/text";
import { Button } from "@/ui/button";

export function ProjectsScreen() {
  const { me } = useJazz<Profile, TodoAccountRoot>();

  const navigate = useNavigate();

  return (
    <>
      {me.root?.projects && (
        <>
          <Text>Projects</Text>

          <ul>
            {me.root.projects.map((project, idx) => {
              return (
                <li key={`${idx}-${project?.id}`}>
                  <Button
                    onClick={() => navigate("/project/" + project?.id)}
                    outline
                  >
                    {project?.title}
                  </Button>
                </li>
              );
            })}
          </ul>
        </>
      )}

      <NewProjectForm />
    </>
  );
}
