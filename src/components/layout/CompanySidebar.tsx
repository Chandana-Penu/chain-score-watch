import { useState } from "react";
import { Building2, ChevronRight, Users } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

// Mock data for companies
const companies = [
  { id: "apple", name: "Apple Inc.", category: "Technology", supplierCount: 156 },
  { id: "microsoft", name: "Microsoft Corp.", category: "Technology", supplierCount: 203 },
  { id: "amazon", name: "Amazon.com Inc.", category: "E-commerce", supplierCount: 1247 },
  { id: "tesla", name: "Tesla Inc.", category: "Automotive", supplierCount: 89 },
  { id: "walmart", name: "Walmart Inc.", category: "Retail", supplierCount: 2156 },
  { id: "johnson", name: "Johnson & Johnson", category: "Healthcare", supplierCount: 347 },
  { id: "procter", name: "Procter & Gamble", category: "Consumer Goods", supplierCount: 198 },
  { id: "coca-cola", name: "Coca-Cola Co.", category: "Beverages", supplierCount: 267 },
];

export function CompanySidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (companyId: string) => currentPath === `/company/${companyId}`;

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-72"} collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-corporate-gray-light uppercase tracking-wider">
            {!isCollapsed && "Company Directory"}
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {companies.map((company) => (
                <SidebarMenuItem key={company.id}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={`/company/${company.id}`} 
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 ${
                          isActive 
                            ? "bg-primary/10 text-primary border-r-2 border-primary" 
                            : "hover:bg-muted/60 text-corporate-gray-light"
                        }`
                      }
                    >
                      <Building2 className="h-4 w-4 shrink-0" />
                      {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">{company.name}</div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Users className="h-3 w-3" />
                            <span>{company.supplierCount} suppliers</span>
                          </div>
                        </div>
                      )}
                      {!isCollapsed && <ChevronRight className="h-3 w-3 opacity-50" />}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}