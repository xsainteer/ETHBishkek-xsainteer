import { Upload, Zap, Wallet } from "lucide-react";
import { Card } from "@/components/ui/card";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Submit Your IP",
    description: "Upload your intellectual property details, documentation, and proof of ownership to our secure platform.",
  },
  {
    number: "02",
    icon: Zap,
    title: "Automated Tokenization",
    description: "Our smart contracts automatically mint your unique NFT token, creating an immutable record on the blockchain.",
  },
  {
    number: "03",
    icon: Wallet,
    title: "Manage & Monetize",
    description: "Control your tokenized IP, set licensing terms, and receive instant payments through decentralized transactions.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold mb-4">
            How It Works
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Three simple steps to tokenize your intellectual property on the blockchain
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-1/3 left-0 right-0 h-0.5 bg-gradient-to-r from-chart-1 via-chart-2 to-chart-3 opacity-20"></div>
          
          {steps.map((step, index) => (
            <Card 
              key={index}
              className="relative p-8 hover-elevate transition-all duration-300"
              data-testid={`card-step-${index + 1}`}
            >
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-6xl font-bold text-primary/10 absolute top-4 right-4">
                  {step.number}
                </div>
              </div>
              
              <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
