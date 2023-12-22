import { TodoAccountRoot } from "@/types";
import { useJazz } from "jazz-react";
import { useNavigate } from "react-router-dom";
import { Profile } from "cojson";
import { NewProjectForm } from "@/components/NewProjectForm";
import { Text } from "@/ui/text";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";

export function BookmarksScreen() {
  const { me } = useJazz<Profile, TodoAccountRoot>();

  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-8 max-w-lg w-full">
      <Text className="text-center">Bookmarks</Text>

      <Input placeholder="Insert a link" />

      <div className="flex justify-between border-b pb-2">
        <Text>Title</Text>

        <Text>Created at</Text>
      </div>

      <div></div>
    </div>
  );
}
