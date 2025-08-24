import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Search, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';

  const [companyNames, setCompanyNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [clickedCompany, setClickedCompany] = useState<string | null>(null);
  const [postStatus, setPostStatus] = useState<string>("");

  // Function to handle card click and POST company name
  const handleCompanyClick = async (companyName: string) => {
    setClickedCompany(companyName);
    setPostStatus("");
    try {
      const res = await fetch("https://guptayatharth1.app.n8n.cloud/webhook/927884eb-5da6-4b91-81fa-f7c1562b62f0", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ company_name: companyName })
      });
      if (!res.ok) throw new Error("POST failed");
      const companyData = await res.json();
      setPostStatus("Success!");
      // Navigate to CompanyDetail page with companyData
//     const companyData = [
//     {
//         "Web_Traffic": "{\n  \"title\": \"Public Perception and Operational Health Index (POHI) Report\",\n  \"pohi_score\": 8.4,\n  \"risk_level\": \"High\",\n  \"recommendation\": \"Urgent need to improve company perception and stabilize web traffic trends. Develop targeted strategies for enhancing employee satisfaction and digital engagement.\",\n  \"input_summary\": \"Web traffic shows a consistent decline with negative month-over-month and quarter-over-quarter visitor percentages. Glassdoor ratings are completely unavailable, indicating potential transparency issues. Traffic sources are predominantly direct and search-based, with minimal social media engagement.\"\n}",
//         "News": "Based on the provided data, here's the risk assessment for Swiggy:\n\n1. Final Risk Score (0–10): 6.5\n\n2. One-Page Risk Summary / Overview\n\n**Risk Assessment: Swiggy (Final Risk Score: 6.5/10)**\n\n**Key Recent Events:**\n- Received ₹158 crore tax demand notice from Income Tax Department\n- Preparing for IPO with price band of ₹371-390\n- Facing increasing competition from Rapido in food delivery\n- Navigating complex regulatory environment with potential GST challenges\n\n**Risk Factors Driving Score:**\n\n1. **Regulatory Pressures**\n- Significant tax notice indicating potential financial/compliance risks\n- Government scrutiny on food delivery commission structures\n- Potential GST complications with delivery fee models\n\n2. **Competitive Landscape**\n- New entrant Rapido challenging existing duopoly\n- Potential margin compression due to competitive pricing\n- Need to continuously innovate to maintain market position\n\n3. **Financial Transition**\n- IPO preparation introduces market valuation uncertainties\n- Investor expectations around profitability and growth\n- Ongoing investments in diversification (Instamart, B2B services)\n\n**Key Takeaways:**\n- Moderate risk profile with strong market positioning\n- Regulatory environment remains complex and dynamic\n- Continued strategic pivots necessary to maintain competitive edge\n\nThe risk score of 6.5 reflects these nuanced challenges while acknowledging Swiggy's robust market presence and growth potential.",
//         "Funding": "I'll help you analyze the funding data and generate the requested output. Let me break this down systematically:\n\n1. One-Pager Summary:\n```json\n{\n  \"one_pager_summary\": \"Swiggy Funding Overview: A Strategic Investment Landscape\\n\\nKey Financial Metrics:\\n- Total Investment: $0 (Cumulative)\\n- Last Funding Round Investment: $200,000,000\\n- Days Since Last Fundraise: 327\\n\\nInvestor Composition:\\n- Prominent Venture Capital Investors: Norwest Venture Partners, Accel, Bessemer Venture Partners\\n- Notable Corporate Investors: SoftBank Vision Fund, Prosus Ventures, Tencent\\n- Diverse Investor Base: 40+ unique investors across venture capital, corporate venture, and private equity\\n\\nFunding History Highlights:\\n- Multiple funding rounds from Series A to Series J\\n- Consistent investor interest with recurring participation from key investors\\n- Notable acquisitions including Dineout ($200M) and Scootsy Logistics ($8M)\\n\\nSentiment Analysis:\\nStrong investor confidence demonstrated through sustained multi-round investments from top-tier global investors. The diverse and stable investor portfolio suggests robust financial health and strategic growth potential.\"\n}\n```\n\n2. Key Risk Metric:\n```json\n{\n  \"key_risk_metric\": {\n    \"metric_name\": \"Funding Dependency & Stability Score\",\n    \"metric_value\": 4.75,\n    \"breakdown\": {\n      \"funding_velocity_score\": 5.2,\n      \"investor_stability_score\": 4.3\n    },\n    \"rationale\": \"A moderate risk score indicating stable funding history with potential for continued investor support. The score suggests balanced funding dynamics with room for improved investor engagement and fundraising strategy.\"\n  }\n}\n```\n\nThe metric calculation considered:\n- Funding Velocity Score: Relatively high due to consistent fundraising and significant last round investment\n- Investor Stability Score: Moderate, reflecting a diverse but potentially fragmented investor base\n- The 4.75 score suggests moderate funding risk, neither extremely concerning nor perfectly stable\n\nThe analysis combines quantitative metrics with qualitative insights to provide a comprehensive view of Swiggy's funding landscape.",
//         "Reviews": "## Supplier Risk Assessment\n\n**Final Risk Score: N/A**\n\n*Insufficient Data*\n\nUnable to complete a comprehensive supplier risk assessment due to lack of review data. No reviews were provided to analyze supplier performance or risk profile. Recommendation: Collect more supplier feedback before conducting a detailed risk evaluation."
//     },
//     {
//         "Web_Traffic": "{\n  \"title\": \"Public Perception and Operational Health Index (POHI) Report\",\n  \"pohi_score\": 7.5,\n  \"risk_level\": \"High\",\n  \"recommendation\": \"Immediately investigate declining web traffic trends and implement strategic interventions to stabilize visitor engagement and brand perception.\",\n  \"input_summary\": \"Web traffic shows a negative month-over-month and quarter-over-quarter decline, with monthly visitors dropping to 17,161,379. Traffic sources are predominantly direct (52.2%) and search (42.2%), with minimal social media contribution. Glassdoor data is completely unavailable, preventing comprehensive employee sentiment analysis.\"\n}",
//         "News": "**Final Risk Score (0–10): 6.2**\n\n**One-Page Risk Summary / Overview**\n\n**Risk Profile: Moderate-High (6.2/10)**\n\n**Key Recent Events:**\n- Significant GST tax notice of ₹500 crore issued\n- Preparing for IPO with ₹4,499 crore primary issuance\n- Board restructuring with SoftBank and Accel representatives exiting\n- Facing increased competition from Rapido in food delivery market\n\n**Main Risk Factors:**\n1. **Regulatory Challenges**: \n   - Large tax notice indicates potential compliance and financial risks\n   - Government scrutiny on tax structures and gig worker policies\n   - Potential legal disputes with restaurant associations\n\n2. **Competitive Landscape**:\n   - Emerging competition from Rapido with lower commission model\n   - Zomato gaining market share (57% vs Swiggy)\n   - Intense price and service competition in quick commerce segment\n\n3. **Financial Transition**:\n   - Preparing for IPO suggests need for stabilizing financials\n   - Growth potentially coming at cost of profitability\n   - Transitioning from startup to public company dynamics\n\n**Risk Reasoning**:\nThe 6.2 score reflects a complex risk environment. While Swiggy shows strong growth and market positioning, it faces significant regulatory, competitive, and financial transformation challenges that could impact its near-term performance.\n\n**Key Takeaways**:\n- Moderate regulatory and competitive risks\n- Strong fundamental business model\n- Potential for volatility during IPO and market expansion",
//         "Funding": "I'll help you analyze the funding data for the company and generate the requested outputs. I'll break this down into two main components.\n\n1. One-Page Summary:\n```json\n{\n    \"one_pager_summary\": \"Swiggy Funding Analysis Overview\\n\\nTotal Historical Investment: $0 recorded in Crunchbase\\nMost Recent Funding Round: $200,000,000 (Secondary Market)\\nDays Since Last Fundraise: 327 days\\n\\nInvestor Landscape:\\n- Diverse, high-profile investor base including SoftBank Vision Fund, Accel, Prosus Ventures, Goldman Sachs\\n- Strong representation from venture capital, corporate venture capital, and global investment firms\\n\\nFunding History Highlights:\\n- Multiple funding rounds from Series A (2015) to Series J (2021)\\n- Notable investors consistently participating across rounds: Prosus Ventures, Accel, Norwest Venture Partners\\n\\nAcquisition Strategy:\\n- 6 strategic acquisitions, including Dineout ($200M), Scootsy Logistics ($8M)\\n- Focus on expanding logistics, technology, and dining ecosystem\\n\\nSentiment: Positive funding trajectory with consistent investor confidence and strategic growth through acquisitions.\"\n}\n```\n\n2. Key Risk Metric:\n```json\n{\n    \"key_risk_metric\": {\n        \"metric_name\": \"Funding Dependency & Stability Score\",\n        \"metric_value\": 4.75,\n        \"breakdown\": {\n            \"funding_velocity_score\": 5.2,\n            \"investor_stability_score\": 4.3\n        },\n        \"rationale\": \"Moderate risk profile indicating stable but potentially slowing fundraising momentum. Long gap between recent rounds (327 days) suggests potential need for strategic investor engagement. Diverse, reputable investor base provides some funding stability.\"\n    }\n}\n```\n\nCalculation Rationale:\n- Funding Velocity Score (5.2/10): Based on longer fundraising interval and substantial last round size\n- Investor Stability Score (4.3/10): Reflects mix of repeat and new investors, with strong institutional presence\n- Final Score (4.75/10): Indicates a balanced, moderate-risk funding environment\n\nThe analysis suggests Swiggy has a robust funding history with potential areas for continued strategic investment and investor relationship management.",
//         "Reviews": "## Supplier Risk Assessment Report\n\n**Final Risk Score: 0 / 10**\n\n*No review data available for risk assessment.*\n\n**Analysis Limitations:**\n- Insufficient data to perform comprehensive supplier risk evaluation\n- No reviews or ratings present in the dataset\n\n**Recommendation:**\n- Collect additional supplier review information\n- Conduct further due diligence before making any risk determinations\n\n*This report cannot provide meaningful risk insights due to lack of data.*"
//     }
// ]
      navigate("/company-detail", { state: { companyData } });
    } catch {
      setPostStatus("Failed to send company name.");
    }
  };

  // useEffect(() => {
  //   if (!query) {
  //     setCompanyNames([]);
  //     return;
  //   }

  //   setLoading(true);
  //   setError("");

  //   fetch("https://guptayatharth1.app.n8n.cloud/webhook/query?query=memorychipsmanufacturers", {
  //     method: "GET",   
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //   })
  //     .then(res => {
  //       if (!res.ok) throw new Error("API error");
  //       return res.json();
  //     })
  //       .then(data => {
  //         // Parse array of objects to array of company names
  //         setCompanyNames(Array.isArray(data) ? data.map((item) => item.company_name) : []);
  //       })
  //     .catch(() => setError("Failed to fetch results."))
  //     .finally(() => setLoading(false));
  // }, [query]);
  useEffect(() => {
    if (!query) {
      setCompanyNames([]);
      return;
    }

    setLoading(true);
    setError("");

    fetch(`https://guptayatharth1.app.n8n.cloud/webhook/query?query=${encodeURIComponent(query)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(res => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
        .then(data => {
          // Parse array of objects to array of company names
          setCompanyNames(Array.isArray(data) ? data.map((item) => item.company_name) : []);
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
        <>
          {postStatus && clickedCompany && (
            <div className="mb-4 text-center text-sm text-muted-foreground">
              {clickedCompany}: {postStatus}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyNames.map((name) => (
              <button
                key={name}
                className="w-full"
                onClick={() => handleCompanyClick(name)}
                style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
              >
                <Card>
                  <CardContent className="flex items-center justify-center py-8">
                    <span className="text-lg font-semibold">{name}</span>
                  </CardContent>
                </Card>
              </button>
            ))}
          </div>
        </>
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