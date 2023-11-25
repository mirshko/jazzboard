import { Toaster } from ".";

export function TitleAndLogo({ name }: { name: string }) {
  return (
    <>
      <div className="flex items-center gap-2 justify-center mt-5">{name}</div>

      <Toaster />
    </>
  );
}
