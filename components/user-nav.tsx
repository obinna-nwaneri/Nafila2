"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export function UserNav() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <Link href="/login" className="rounded-md border border-primary-500 px-3 py-1">
          Log in
        </Link>
        <Link href="/register" className="rounded-md bg-primary-500 px-3 py-1 text-white">
          Sign up
        </Link>
      </div>
    );
  }

  const initials = session.user?.name
    ?.split(" ")
    .map((part) => part.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-2 py-1">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{initials || "NA"}</AvatarFallback>
          </Avatar>
          <span className="hidden text-sm font-medium text-white md:inline">
            {session.user?.name || session.user?.email}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-slate-900 text-slate-100">
        <DropdownMenuLabel className="text-xs uppercase tracking-wide text-slate-400">
          Signed in as
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/dashboard">Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings">Settings</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => signOut({ callbackUrl: "/" })}>
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
