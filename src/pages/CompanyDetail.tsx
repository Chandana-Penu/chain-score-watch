
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CompanyDetail() {
  const location = useLocation();
  const { state } = location;
  const companyDataArray = state?.companyData;

  if (!companyDataArray || !Array.isArray(companyDataArray)) {
    return <div className="p-8 text-center">No company data found.</div>;
  }

  // Use the first object from the array
  const companyData = companyDataArray[0];

  if (!companyData) {
    return <div className="p-8 text-center">No company data found.</div>;
  }

  // Parse Web_Traffic data (JSON string or object)
  type WebTrafficType = {
    title?: string;
    pohi_score?: number;
    risk_level?: string;
    recommendation?: string;
    input_summary?: string;
  };
  let webTraffic: WebTrafficType = {};
  try {
    if (typeof companyData.Web_Traffic === 'string') {
      webTraffic = JSON.parse(companyData.Web_Traffic);
    } else if (typeof companyData.Web_Traffic === 'object') {
      webTraffic = companyData.Web_Traffic;
    }
  } catch {
    webTraffic = {};
  }

  // Parse News data and extract risk score
  let newsRiskScore = "";
  let newsOnePager = "";
  if (companyData.News) {
    // Extract risk score from text
    const riskScoreMatch = companyData.News.match(/Final Risk Score[^:]*:\s*([0-9.]+)/i);
    if (riskScoreMatch) {
      newsRiskScore = riskScoreMatch[1];
    }
    newsOnePager = companyData.News;
  }

  // Parse Funding data
  type FundingMetricType = {
    metric_name?: string;
    metric_value?: number;
    breakdown?: Record<string, number>;
    rationale?: string;
  };
  let fundingMetric: FundingMetricType | null = null;
  let fundingOnePager = "";
  
  if (companyData.Funding) {
    // Extract one-pager summary from JSON block
    const onePagerJsonMatch = companyData.Funding.match(/"one_pager_summary":\s*"([^"]*(?:\\.[^"]*)*)"/);
    if (onePagerJsonMatch) {
      fundingOnePager = onePagerJsonMatch[1].replace(/\\n/g, '\n').replace(/\\\"/g, '"');
    }
    
    // Extract key risk metric from JSON block
    const metricJsonMatch = companyData.Funding.match(/"key_risk_metric":\s*({[^}]*(?:{[^}]*}[^}]*)*})/);
    if (metricJsonMatch) {
      try {
        fundingMetric = JSON.parse(metricJsonMatch[1]);
      } catch {}
    }
  }

  // Parse Reviews data and extract risk score
  let reviewsRiskScore = "";
  let reviewsOnePager = "";
  if (companyData.Reviews) {
    const riskScoreMatch = companyData.Reviews.match(/Final Risk Score:\s*([0-9.]+|N\/A)/i);
    if (riskScoreMatch) {
      reviewsRiskScore = riskScoreMatch[1];
    }
    reviewsOnePager = companyData.Reviews;
  }

  return (
    <div className="max-w-6xl mx-auto py-8 space-y-8">
      {/* Web Traffic & POHI */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center justify-between">
            Web Traffic & POHI
            {webTraffic.pohi_score && (
              <div className="text-right">
                <div className="text-3xl font-bold text-orange-600">{webTraffic.pohi_score}</div>
                <div className="text-sm text-muted-foreground">POHI Score</div>
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="font-semibold mb-2">Risk Level</div>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                webTraffic.risk_level === 'High' ? 'bg-red-100 text-red-700' :
                webTraffic.risk_level === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-green-100 text-green-700'
              }`}>
                {webTraffic.risk_level ?? "N/A"}
              </div>
            </div>
            <div>
              <div className="font-semibold mb-2">Report Title</div>
              <div className="text-sm">{webTraffic.title ?? "No title available"}</div>
            </div>
          </div>
          <div>
            <div className="font-semibold mb-2">Recommendation</div>
            <div className="text-sm bg-blue-50 p-3 rounded">{webTraffic.recommendation ?? "No recommendation available"}</div>
          </div>
          <div>
            <div className="font-semibold mb-2">Summary</div>
            <div className="text-sm text-muted-foreground">{webTraffic.input_summary ?? "No summary available"}</div>
          </div>
        </CardContent>
      </Card>

      {/* News & Risk Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center justify-between">
            News & Risk Summary
            {newsRiskScore && (
              <div className="text-right">
                <div className="text-3xl font-bold text-red-600">{newsRiskScore}</div>
                <div className="text-sm text-muted-foreground">Risk Score (0-10)</div>
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded">
            <pre className="whitespace-pre-wrap text-sm">{newsOnePager}</pre>
          </div>
        </CardContent>
      </Card>

      {/* Funding */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center justify-between">
            Funding Analysis
            {fundingMetric?.metric_value && (
              <div className="text-right">
                <div className="text-3xl font-bold text-purple-600">{fundingMetric.metric_value}</div>
                <div className="text-sm text-muted-foreground">Funding Score</div>
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="font-semibold mb-2">One-Pager Summary</div>
            <div className="bg-purple-50 p-4 rounded">
              <pre className="whitespace-pre-wrap text-sm">{fundingOnePager || "No funding summary available"}</pre>
            </div>
          </div>
          {fundingMetric && (
            <div>
              <div className="font-semibold mb-2">Key Metrics</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium">Metric Name</div>
                  <div className="text-sm">{fundingMetric.metric_name ?? "N/A"}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Value</div>
                  <div className="text-sm font-bold">{fundingMetric.metric_value ?? "N/A"}</div>
                </div>
              </div>
              {fundingMetric.breakdown && (
                <div className="mt-3">
                  <div className="text-sm font-medium mb-1">Breakdown</div>
                  <ul className="text-sm space-y-1">
                    {Object.entries(fundingMetric.breakdown).map(([k, v]) => (
                      <li key={k} className="flex justify-between">
                        <span>{k}:</span>
                        <span className="font-medium">{typeof v === "number" ? v : String(v)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="mt-3">
                <div className="text-sm font-medium">Rationale</div>
                <div className="text-sm text-muted-foreground">{fundingMetric.rationale ?? "N/A"}</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reviews */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center justify-between">
            Supplier Reviews
            {reviewsRiskScore && (
              <div className="text-right">
                <div className="text-3xl font-bold text-green-600">{reviewsRiskScore}</div>
                <div className="text-sm text-muted-foreground">Review Score</div>
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-green-50 p-4 rounded">
            <pre className="whitespace-pre-wrap text-sm">{reviewsOnePager || "No review data available"}</pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}