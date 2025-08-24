import { useParams } from "react-router-dom";
import { Building2, MapPin, Users, TrendingUp, Globe, Phone, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CompanyCard } from "@/components/common/CompanyCard";

// Mock data for company details and suppliers
const cd = {
  apple: {
    id: "apple",
    name: "Apple Inc.",
    category: "Technology",
    location: "Cupertino, CA",
    employeeCount: 164000,
    revenue: "$394.3B",
    description: "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.",
    website: "apple.com",
    phone: "+1-408-996-1010",
    email: "investor_relations@apple.com",
    riskScore: 25,
    suppliers: [
      { id: "foxconn", name: "Foxconn Technology", category: "Manufacturing", location: "Taiwan", riskScore: 45, description: "Major electronics manufacturer and Apple's primary assembly partner." },
      { id: "tsmc", name: "Taiwan Semiconductor", category: "Semiconductors", location: "Taiwan", riskScore: 30, description: "World's largest semiconductor foundry, produces Apple's custom chips." },
      { id: "lg-display", name: "LG Display", category: "Displays", location: "South Korea", riskScore: 35, description: "Major display panel manufacturer for Apple devices." },
      { id: "corning", name: "Corning Inc.", category: "Materials", location: "New York, USA", riskScore: 20, description: "Produces specialty glass for Apple devices including Gorilla Glass." },
    ]
  },
  microsoft: {
    id: "microsoft",
    name: "Microsoft Corporation",
    category: "Technology", 
    location: "Redmond, WA",
    employeeCount: 221000,
    revenue: "$211.9B",
    description: "Microsoft Corporation develops and supports software, services, devices and solutions worldwide.",
    website: "microsoft.com",
    phone: "+1-425-882-8080",
    email: "msft@microsoft.com",
    riskScore: 18,
    suppliers: [
      { id: "intel", name: "Intel Corporation", category: "Semiconductors", location: "California, USA", riskScore: 25, description: "Major processor manufacturer for Microsoft Surface devices." },
      { id: "amd", name: "Advanced Micro Devices", category: "Semiconductors", location: "California, USA", riskScore: 30, description: "Provides processors for Xbox gaming consoles." },
      { id: "samsung", name: "Samsung Electronics", category: "Electronics", location: "South Korea", riskScore: 28, description: "Supplies memory and storage components." },
    ]
  },
  // Add more mock data as needed
};

export default function Cd() {
  const { companyId } = useParams<{ companyId: string }>();
  const company = companyId ? cd[companyId as keyof typeof cd] : null;

  if (!company) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-corporate-gray">Company Not Found</h2>
          <p className="text-muted-foreground mt-2">The requested company information is not available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Company Header */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-corporate-gray">{company.name}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary">{company.category}</Badge>
                  <div className="text-sm text-muted-foreground flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {company.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {company.employeeCount.toLocaleString()} employees
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {company.revenue} revenue
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-risk-low">{company.riskScore}/100</div>
              <div className="text-sm text-risk-low">Low Risk</div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <p className="text-corporate-gray-light leading-relaxed mb-4">{company.description}</p>
          
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Globe className="h-4 w-4" />
              <a href={`https://${company.website}`} className="hover:text-primary transition-colors">
                {company.website}
              </a>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>{company.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>{company.email}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Suppliers Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Key Suppliers ({company.suppliers.length})
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {company.suppliers.map((supplier) => (
              <CompanyCard
                key={supplier.id}
                company={supplier}
                showAnalyzeButton={true}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}