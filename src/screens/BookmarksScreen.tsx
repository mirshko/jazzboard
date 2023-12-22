import { TodoAccountRoot } from "@/types";
import { useJazz } from "jazz-react";
import { Profile } from "cojson";
import { Text } from "@/ui/text";
import { Input } from "@/ui/input";

export function BookmarksScreen() {
  const { me } = useJazz<Profile, TodoAccountRoot>();

  return (
    <div className="flex flex-col gap-8 max-w-lg w-full">
      <Text className="text-center">Bookmarks</Text>

      <Input placeholder="Insert a link" />

      <div className="flex justify-between border-b pb-2">
        <Text>Title</Text>

        <Text>Created at</Text>
      </div>

      <ul>
        {me.root?.bookmarks?.map((bookmark) => (
          <li key={bookmark?.id}>{bookmark?.title}</li>
        ))}
      </ul>
    </div>
  );
}
