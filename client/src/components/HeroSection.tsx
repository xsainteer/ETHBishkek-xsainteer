import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Users } from "lucide-react";
import heroImage from "@assets/generated_images/Web3_blockchain_network_hero_90c71677.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-background"></div>
        <div className="absolute inset-0" style={{ background: 'var(--gradient-hero)' }}></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Shield className="w-5 h-5 text-chart-2" />
          <p className="text-sm font-medium uppercase tracking-wide text-gray-300">
            Trusted by 500+ IP Creators
          </p>
          <Users className="w-5 h-5 text-chart-2" />
        </div>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-6 text-white">
          <span className="gradient-text">Tokenize</span> Your
          <br />
          Intellectual Property
        </h1>
        
        <p className="text-lg md:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto mb-12 leading-relaxed">
          Transform patents, copyrights, and trademarks into secure blockchain tokens. 
          Verify ownership, automate licensing, and unlock new revenue streams.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="text-base px-8 py-6 gap-2"
            data-testid="button-start-tokenizing"
            onClick={() => console.log('Navigate to tokenize')}
          >
            Start Tokenizing <ArrowRight className="w-5 h-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-base px-8 py-6 backdrop-blur-md bg-background/10 border-white/20 text-white hover:bg-background/20"
            data-testid="button-learn-more"
            onClick={() => console.log('Scroll to learn more')}
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}
