import { Card } from "@/components/ui/card";
import { Lock, Globe, Zap, BarChart3, FileCheck, DollarSign } from "lucide-react";

const features = [
  {
    icon: Lock,
    title: "Military-Grade Security",
    description: "Your IP is protected by the same cryptographic technology securing billions in digital assets.",
  },
  {
    icon: Globe,
    title: "Decentralized Storage",
    description: "IP metadata stored across distributed nodes ensures perpetual availability and censorship resistance.",
  },
  {
    icon: Zap,
    title: "Instant Transactions",
    description: "Transfer ownership or grant licenses in seconds, not weeks, with blockchain efficiency.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description: "Track usage, monitor royalties, and analyze performance metrics from your comprehensive dashboard.",
  },
  {
    icon: FileCheck,
    title: "Smart Contract Automation",
    description: "Self-executing agreements handle licensing terms, payments, and compliance automatically.",
  },
  {
    icon: DollarSign,
    title: "Fractional Ownership",
    description: "Divide IP ownership into shares, enabling collaborative investment and revenue sharing.",
  },
];

export default function FeaturesShowcase() {
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold mb-4">
            Powerful Features
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to manage, protect, and monetize your intellectual property
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-8 hover-elevate active-elevate-2 transition-all duration-300 border-2 glassmorphism cursor-pointer"
              style={{
                borderImage: 'linear-gradient(135deg, hsl(var(--chart-1)), hsl(var(--chart-2))) 1',
              }}
              data-testid={`feature-card-${index + 1}`}
              onClick={() => console.log(`Feature ${index + 1} clicked`)}
            >
              <div className="w-14 h-14 rounded-lg bg-gradient-primary flex items-center justify-center mb-6">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
