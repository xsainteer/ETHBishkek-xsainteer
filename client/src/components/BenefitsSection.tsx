import { Check } from "lucide-react";
import securityImg from "@assets/generated_images/Blockchain_security_illustration_57744a8c.png";
import networkImg from "@assets/generated_images/Global_network_connectivity_69ed04e9.png";
import verificationImg from "@assets/generated_images/Instant_verification_badge_d9498411.png";
import licensingImg from "@assets/generated_images/Automated_licensing_system_2b9922a3.png";

const benefits = [
  {
    title: "Immutable Proof of Ownership",
    description: "Your IP ownership is permanently recorded on the blockchain, creating an unalterable timestamp and verification of your rights.",
    image: securityImg,
    features: [
      "Tamper-proof blockchain records",
      "Cryptographic verification",
      "Permanent ownership history",
    ],
  },
  {
    title: "Global Accessibility",
    description: "Access and manage your tokenized IP from anywhere in the world, with instant verification and cross-border transactions.",
    image: networkImg,
    features: [
      "24/7 worldwide access",
      "Borderless transactions",
      "Multi-currency support",
    ],
  },
  {
    title: "Instant Verification",
    description: "Anyone can instantly verify the authenticity and ownership of your IP assets through blockchain transparency.",
    image: verificationImg,
    features: [
      "Real-time authentication",
      "Public verification system",
      "Fraud prevention",
    ],
  },
  {
    title: "Automated Licensing",
    description: "Smart contracts automatically handle licensing agreements, royalty distributions, and payment processing.",
    image: licensingImg,
    features: [
      "Self-executing contracts",
      "Instant royalty payments",
      "Reduced intermediary costs",
    ],
  },
];

export default function BenefitsSection() {
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold mb-4">
            Why Tokenize Your IP?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Unlock the full potential of your intellectual property with blockchain technology
          </p>
        </div>
        
        <div className="space-y-24">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
              data-testid={`benefit-${index + 1}`}
            >
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <img 
                  src={benefit.image} 
                  alt={benefit.title}
                  className="rounded-2xl w-full h-auto shadow-xl"
                />
              </div>
              
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <h3 className="text-3xl md:text-4xl font-semibold mb-4">
                  {benefit.title}
                </h3>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {benefit.description}
                </p>
                
                <ul className="space-y-3">
                  {benefit.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-chart-1/20 flex items-center justify-center mt-0.5">
                        <Check className="w-4 h-4 text-chart-1" />
                      </div>
                      <span className="text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
