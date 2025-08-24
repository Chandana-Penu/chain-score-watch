import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Search, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SearchResults() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';

  const [companyNames, setCompanyNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!query) {
      setCompanyNames([]);
      return;
    }
    setLoading(true);
    setError("");
    fetch("https://guptayatharth1.app.n8n.cloud/webhook/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query })
    })
      .then(res => {
        if (!res.ok) throw new Error("API error");
        console.log(res.json)
        return res.json();
      })
      .then(data => {
        setCompanyNames(Array.isArray(data) ? data : []);
      })
      .catch(() => setError("Failed to fetch results."))
      .finally(() => setLoading(false));
  }, [query]);

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
            {loading ? "Loading..." : `${companyNames.length} companies found for "${query}"`}
          </div>
        </CardHeader>
      </Card>

      {/* Results */}
      {error ? (
        <Card><CardContent>{error}</CardContent></Card>
      ) : companyNames.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companyNames.map((name) => (
            <Card key={name}>
              <CardContent className="flex items-center justify-center py-8">
                <span className="text-lg font-semibold">{name}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : !loading ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-corporate-gray mb-2">No Results Found</h3>
            <p className="text-muted-foreground text-center max-w-md">
              We couldn't find any companies matching "{query}". Try adjusting your search terms or browse our company directory.
            </p>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}