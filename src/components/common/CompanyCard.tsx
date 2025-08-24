import { useState } from "react";
import { Building2, MapPin, Users, TrendingUp, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface CompanyCardProps {
  company: {
    id: string;
    name: string;
    category: string;
    location?: string;
    employeeCount?: number;
    revenue?: string;
    riskScore?: number;
    description?: string;
  };
  showAnalyzeButton?: boolean;
  onAnalyze?: (companyId: string) => void;
}

export function CompanyCard({ company, showAnalyzeButton = true, onAnalyze }: CompanyCardProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    toast({
      title: "Analyzing Risk Score",
      description: `Starting risk analysis for ${company.name}...`,
    });

    // Simulate API call - in real app, this would call Crustdata API
    setTimeout(() => {
      setIsAnalyzing(false);
      toast({
        title: "Analysis Complete",
        description: `Risk analysis for ${company.name} has been completed.`,
      });
      onAnalyze?.(company.id);
    }, 2000);
  };

  const getRiskColor = (score?: number) => {
    if (!score) return "text-muted-foreground";
    if (score >= 70) return "text-risk-high";
    if (score >= 40) return "text-risk-medium";
    return "text-risk-low";
  };

  const getRiskLabel = (score?: number) => {
    if (!score) return "Not Analyzed";
    if (score >= 70) return "High Risk";
    if (score >= 40) return "Medium Risk";
    return "Low Risk";
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-muted bg-gradient-to-br from-card to-muted/30">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-corporate-gray group-hover:text-primary transition-colors">
                {company.name}
              </h3>
              <Badge variant="secondary" className="text-xs">
                {company.category}
              </Badge>
            </div>
          </div>

          {company.riskScore !== undefined && (
            <div className="text-right">
              <div className={`text-sm font-medium ${getRiskColor(company.riskScore)}`}>
                {company.riskScore}/100
              </div>
              <div className={`text-xs ${getRiskColor(company.riskScore)}`}>
                {getRiskLabel(company.riskScore)}
              </div>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {company.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {company.description}
          </p>
        )}

        <div className="grid grid-cols-2 gap-4 text-sm">
          {company.location && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>{company.location}</span>
            </div>
          )}
          
          {company.employeeCount && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-3 w-3" />
              <span>{company.employeeCount.toLocaleString()} employees</span>
            </div>
          )}
          
          {company.revenue && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="h-3 w-3" />
              <span>{company.revenue} revenue</span>
            </div>
          )}
        </div>

        {showAnalyzeButton && (
          <div className="pt-2 border-t">
            <Button 
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full"
              variant="outline"
            >
              {isAnalyzing ? (
                <>
                  <div className="h-3 w-3 border border-current border-t-transparent rounded-full animate-spin mr-2" />
                  Analyzing...
                </>
              ) : (
                <>
                  <AlertTriangle className="h-3 w-3 mr-2" />
                  Analyze Risk Score
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}