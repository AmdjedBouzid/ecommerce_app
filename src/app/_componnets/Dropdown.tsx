"use client";
import {
  BrickWall,
  ShoppingCart,
  Smile,
  LockKeyhole,
  Menu,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/app/utils/types";

interface DropdownMenuDemoProps {
  user: User | null;
  isLogedIn: boolean;
  handleLogout: () => void;
}

export default function DropdownMenuDemo({
  user,
  isLogedIn,
  handleLogout,
}: DropdownMenuDemoProps) {
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    const updateDisplay = () => {
      if (window.innerWidth < 800) {
        setDisplay(true);
      } else {
        setDisplay(false);
      }
    };

    updateDisplay();
    window.addEventListener("resize", updateDisplay);

    return () => {
      window.removeEventListener("resize", updateDisplay);
    };
  }, []);

  return (
    <div>
      {display && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Menu />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>home</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BrickWall className="mr-2 h-4 w-4" />
                <Link href="/About">
                  <span>about</span>
                </Link>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ShoppingCart className="mr-2 h-4 w-4" />
                <Link href="/Products">
                  <span>products</span>
                </Link>
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <Link href="/Clients">
                <DropdownMenuItem>
                  <Smile className="mr-2 h-4 w-4" />
                  <span>best clients</span>
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>

              {user?.isAdmin ? (
                <Link href="/Administration">
                  <DropdownMenuItem>
                    <LockKeyhole className="mr-2 h-4 w-4" />
                    <span>administration</span>
                    <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </Link>
              ) : null}
            </DropdownMenuGroup>
            {isLogedIn ? (
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            ) : (
              <>
                <Link href="/Login">
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log in</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </Link>
                <Link href="/SigneUp">
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Signe up</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </Link>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
