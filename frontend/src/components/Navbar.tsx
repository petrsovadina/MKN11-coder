import { ModeToggle } from "@/components/ui/mode-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-filter-none">
      <div className="container flex h-14 items-center">
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-2">
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
