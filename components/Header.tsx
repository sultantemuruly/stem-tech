"use client";

import { useState } from "react";
import Link from "next/link";
import { Github, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChatModal } from "./ChatModal";

const Header = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const isChatAvailable = false;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center">
          <Link href="/" className="font-bold text-lg md:text-xl">
            Sultan Temuruly&apos;s website
          </Link>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex md:items-center md:space-x-4">
          <Link
            href="https://github.com/sultantemuruly"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="GitHub Profile"
          >
            <Github className="h-5 w-5" />
          </Link>

          {/* Chat Dialog for desktop */}
          {isChatAvailable ? (
            <ChatModal
              isOpen={isChatOpen}
              onOpenChange={setIsChatOpen}
              trigger={<Button>Ask about me</Button>}
            />
          ) : null}
        </div>

        {/* Mobile menu */}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col space-y-4 mt-6">
              <Link
                href="https://github.com/sultantemuruly"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 rounded-md p-2 hover:bg-accent"
                onClick={() => setIsSheetOpen(false)}
              >
                <Github className="h-5 w-5" />
                <span>GitHub</span>
              </Link>

              {/* Chat Dialog trigger for mobile */}
              {isChatAvailable ? (
                <ChatModal
                  isOpen={isChatOpen}
                  onOpenChange={(open) => {
                    setIsChatOpen(open);
                    if (open) setIsSheetOpen(false); // Close sheet when dialog opens
                  }}
                  trigger={
                    <Button className="w-full justify-center">
                      Ask about me
                    </Button>
                  }
                />
              ) : null}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
