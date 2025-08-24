import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useState } from "react";

interface AppHeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

export function AppHeader({ onSearch, searchQuery }: AppHeaderProps) {
  const [inputValue, setInputValue] = useState(searchQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="h-8 w-8" />
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">SA</span>
            </div>
            <span className="font-semibold text-corporate-gray">Supply Analytics</span>
          </div>
        </div>

        <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search companies, suppliers, or risk data..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="pl-9 h-10 bg-muted/50 border-0 focus-visible:ring-2 focus-visible:ring-primary/20"
            />
          </div>
        </form>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Settings
          </Button>
        </div>
      </div>
    </header>
  );
}