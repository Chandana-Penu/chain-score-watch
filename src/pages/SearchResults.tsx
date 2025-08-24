import { useLocation } from "react-router-dom";
import { Search, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CompanyCard } from "@/components/common/CompanyCard";

// Mock search results
const mockSearchResults = [
  {
    id: "apple-search",
    name: "Apple Inc.",
    category: "Technology",
    location: "Cupertino, CA",
    employeeCount: 164000,
    revenue: "$394.3B",
    riskScore: 25,
    description: "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide."
  },
  {
    id: "tesla-search", 
    name: "Tesla Inc.",
    category: "Automotive",
    location: "Austin, TX",
    employeeCount: 127855,
    revenue: "$96.8B",
    riskScore: 55,
    description: "Tesla designs, develops, manufactures, leases, and sells electric vehicles, and energy generation and storage systems."
  },
  {
    id: "microsoft-search",
    name: "Microsoft Corporation", 
    category: "Technology",
    location: "Redmond, WA",
    employeeCount: 221000,
    revenue: "$211.9B",
    riskScore: 18,
    description: "Microsoft Corporation develops and supports software, services, devices and solutions worldwide."
  },
  {
    id: "amazon-search",
    name: "Amazon.com Inc.",
    category: "E-commerce",
    location: "Seattle, WA", 
    employeeCount: 1541000,
    revenue: "$574.8B",
    riskScore: 32,
    description: "Amazon.com, Inc. engages in the retail sale of consumer products and subscriptions through online and physical stores."
  }
];

export default function SearchResults() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';

  // Filter results based on search query
  const filteredResults = mockSearchResults.filter(company =>
    company.name.toLowerCase().includes(query.toLowerCase()) ||
    company.category.toLowerCase().includes(query.toLowerCase()) ||
    company.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <Card className="bg-gradient-to-r from-muted/50 to-muted/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Results
          </CardTitle>
          <div className="text-muted-foreground">
            {filteredResults.length} companies found for "{query}"
          </div>
        </CardHeader>
      </Card>

      {/* Results */}
      {filteredResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResults.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              showAnalyzeButton={true}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-corporate-gray mb-2">No Results Found</h3>
            <p className="text-muted-foreground text-center max-w-md">
              We couldn't find any companies matching "{query}". Try adjusting your search terms or browse our company directory.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}