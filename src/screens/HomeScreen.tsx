import { Button } from "@/ui/button";
import { Text } from "@/ui/text";

export function HomeScreen() {
  return (
    <div className="flex flex-col gap-5 items-center">
      <Text>Links</Text>

      <Button outline href="/projects">
        Projects
      </Button>

      <Button outline href="/bookmarks">
        Bookmarks
      </Button>
    </div>
  );
}
