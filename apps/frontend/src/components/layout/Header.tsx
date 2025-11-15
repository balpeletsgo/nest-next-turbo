import { BookAudioIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ThemeSwitcer } from "../themes";

export function Header() {
  return (
    <div className="fixed top-0 z-[9999] h-16 w-full shrink-0 border-b border-dashed">
      <div className="mx-auto flex h-full w-full max-w-7xl flex-row items-center justify-between border-x border-dashed px-4">
        <div className="flex flex-row items-center gap-2">
          <BookAudioIcon />
          <p className="text-xl font-semibold">Acme Inc</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <ThemeSwitcer />
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="User Avatar"
            />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}
