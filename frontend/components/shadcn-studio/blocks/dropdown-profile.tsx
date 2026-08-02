"use client";
import type { ReactElement } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserIcon, SettingsIcon, CreditCardIcon, CarIcon, LogOutIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Props = {
  trigger: ReactElement;
  defaultOpen?: boolean;
  align?: "start" | "center" | "end";
  /** Real user data passed in from the Navbar */
  user: {
    name: string;
    email: string;
    avatar: string;
    initials: string;
  };
};

const ProfileDropdown = ({ trigger, defaultOpen, align = "end", user }: Props) => {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <DropdownMenu defaultOpen={defaultOpen}>
      <DropdownMenuTrigger render={trigger} />
      <DropdownMenuContent className="w-80" align={align || "end"}>
        {/* ── User info header ─────────────────────────────────────────────── */}
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex items-center gap-4 px-4 py-2.5 font-normal">
            <div className="relative">
              <Avatar size="lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.initials}</AvatarFallback>
              </Avatar>
              <span className="ring-card absolute right-0 bottom-0 block size-2 rounded-full bg-green-600 ring-2" />
            </div>
            <div className="flex flex-1 flex-col items-start min-w-0">
              <span className="text-foreground text-lg font-semibold truncate w-full">{user.name}</span>
              <span className="text-muted-foreground text-sm truncate w-full">{user.email}</span>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem className="gap-2 px-4 py-2.5 text-base cursor-pointer" onClick={() => router.push("/account")}>
            <UserIcon className="text-foreground size-5" />
            <span>My account</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2 px-4 py-2.5 text-base cursor-pointer" onClick={() => router.push("/account?tab=settings")}>
            <SettingsIcon className="text-foreground size-5" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2 px-4 py-2.5 text-base cursor-pointer" onClick={() => router.push("/account?tab=rentals")}>
            <CreditCardIcon className="text-foreground size-5" />
            <span>My rentals</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem className="gap-2 px-4 py-2.5 text-base cursor-pointer" onClick={() => router.push("/account?tab=listings")}>
            <CarIcon className="text-foreground size-5" />
            <span>My listings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            variant="destructive"
            className="gap-2 px-4 py-2.5 text-base cursor-pointer"
            onClick={handleLogout}
          >
            <LogOutIcon className="size-5" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
