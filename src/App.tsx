import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { CompanySidebar } from "@/components/layout/CompanySidebar";
import Index from "./pages/Index";
import CompanyDetail from "./pages/CompanyDetail";
import SearchResults from "./pages/SearchResults";
import NotFound from "./pages/NotFound";
import Cd from "./pages/cd";
const queryClient = new QueryClient();

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    window.location.href = `/search?q=${encodeURIComponent(query)}`;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <div className="min-h-screen flex w-full bg-background">
              <CompanySidebar />
              <div className="flex-1 flex flex-col">
                <AppHeader onSearch={handleSearch} searchQuery={searchQuery} />
                <main className="flex-1 p-6">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/company/:companyId" element={<Cd />} />
                    <Route path="/company-detail" element={<CompanyDetail />} />
                    <Route path="/search" element={<SearchResults />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
