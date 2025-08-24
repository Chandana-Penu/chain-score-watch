import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Shield, BarChart3, Users, Mail, Phone, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-corporate.jpg";

export function HeroSection() {
  return (
    <div className="space-y-16">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-background">
        <div 
          className="absolute inset-0 opacity-10 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative px-8 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-corporate-gray to-corporate-blue bg-clip-text text-transparent">
              Supply Chain Risk Analytics
            </h1>
            <p className="text-xl lg:text-2xl text-corporate-gray-light max-w-3xl mx-auto leading-relaxed">
              Comprehensive risk assessment and supplier intelligence platform for enterprise supply chain management
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button size="lg" className="bg-gradient-to-r from-primary to-corporate-blue-dark hover:shadow-lg">
                <TrendingUp className="h-4 w-4 mr-2" />
                Start Analysis
              </Button>
              <Button variant="outline" size="lg">
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-card to-muted/30">
          <CardContent className="p-6 text-center">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-corporate-gray mb-2">Risk Assessment</h3>
            <p className="text-muted-foreground text-sm">
              Real-time risk scoring using advanced analytics and market intelligence
            </p>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-card to-muted/30">
          <CardContent className="p-6 text-center">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-corporate-gray mb-2">Market Intelligence</h3>
            <p className="text-muted-foreground text-sm">
              Comprehensive supplier data and market insights for informed decisions
            </p>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-card to-muted/30">
          <CardContent className="p-6 text-center">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-corporate-gray mb-2">Supplier Network</h3>
            <p className="text-muted-foreground text-sm">
              Map and analyze complex supplier relationships and dependencies
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Company Description */}
      <section className="space-y-8">
        <Card className="bg-gradient-to-r from-muted/50 to-muted/20">
          <CardContent className="p-8">
            <div className="max-w-4xl mx-auto space-y-6">
              <h2 className="text-3xl font-bold text-corporate-gray text-center">
                About Supply Analytics
              </h2>
              <div className="prose prose-lg max-w-none text-corporate-gray-light">
                <p className="text-center text-lg leading-relaxed">
                  Supply Analytics is a leading provider of supply chain risk intelligence and analytics. 
                  Our platform leverages advanced data science and machine learning to deliver actionable 
                  insights into supplier performance, market dynamics, and risk exposure across global supply networks.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  <div>
                    <h3 className="text-xl font-semibold text-corporate-gray mb-3">Our Mission</h3>
                    <p className="text-muted-foreground">
                      To empower businesses with comprehensive supply chain visibility and risk intelligence, 
                      enabling proactive decision-making and resilient operations in an interconnected global economy.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-corporate-gray mb-3">Our Approach</h3>
                    <p className="text-muted-foreground">
                      We combine real-time data aggregation, advanced analytics, and industry expertise to 
                      provide unparalleled insights into supplier relationships, market conditions, and emerging risks.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Contact Information */}
      <section>
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-8">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 className="text-2xl font-bold text-corporate-gray">Get In Touch</h2>
              <p className="text-corporate-gray-light">
                Ready to transform your supply chain analytics? Contact our team for a personalized consultation.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-corporate-gray">Email</div>
                    <div className="text-muted-foreground">contact@supplyanalytics.com</div>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-corporate-gray">Phone</div>
                    <div className="text-muted-foreground">+1 (555) 123-4567</div>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-corporate-gray">Address</div>
                    <div className="text-muted-foreground">San Francisco, CA</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}