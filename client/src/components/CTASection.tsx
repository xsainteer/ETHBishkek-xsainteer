import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 gradient-primary opacity-10"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Ready to Tokenize Your IP?
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Join hundreds of creators protecting and monetizing their intellectual property on the blockchain.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="text-base px-8 py-6 gap-2"
            data-testid="button-get-started"
            onClick={() => console.log('Navigate to sign up')}
          >
            Get Started <ArrowRight className="w-5 h-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="text-base px-8 py-6 gap-2"
            data-testid="button-view-demo"
            onClick={() => console.log('Open demo modal')}
          >
            <Play className="w-5 h-5" /> View Demo
          </Button>
        </div>
      </div>
    </section>
  );
}
