import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { useState } from "react";

const footerLinks = {
  product: [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Pricing", href: "#pricing" },
    { name: "Roadmap", href: "#roadmap" },
  ],
  resources: [
    { name: "Documentation", href: "#docs" },
    { name: "API Reference", href: "#api" },
    { name: "Blog", href: "#blog" },
    { name: "Community", href: "#community" },
  ],
  company: [
    { name: "About Us", href: "#about" },
    { name: "Careers", href: "#careers" },
    { name: "Contact", href: "#contact" },
    { name: "Partners", href: "#partners" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Terms of Service", href: "#terms" },
    { name: "Cookie Policy", href: "#cookies" },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    console.log('Subscribe:', email);
    setEmail("");
  };

  return (
    <footer className="border-t bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4 gradient-text">IdeaVault</h3>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Built for the Future of IP. Secure, tokenize, and monetize your intellectual property on the blockchain.
            </p>
            
            <div className="flex gap-4 mb-6">
              <Button 
                size="icon" 
                variant="outline"
                data-testid="link-twitter"
                onClick={() => console.log('Twitter clicked')}
              >
                <Twitter className="w-5 h-5" />
              </Button>
              <Button 
                size="icon" 
                variant="outline"
                data-testid="link-github"
                onClick={() => console.log('GitHub clicked')}
              >
                <Github className="w-5 h-5" />
              </Button>
              <Button 
                size="icon" 
                variant="outline"
                data-testid="link-linkedin"
                onClick={() => console.log('LinkedIn clicked')}
              >
                <Linkedin className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="newsletter" className="text-sm font-medium">
                Subscribe to Newsletter
              </label>
              <div className="flex gap-2">
                <Input 
                  id="newsletter"
                  type="email" 
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-testid="input-newsletter"
                />
                <Button 
                  onClick={handleSubscribe}
                  data-testid="button-subscribe"
                >
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-${link.name.toLowerCase().replace(' ', '-')}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-${link.name.toLowerCase().replace(' ', '-')}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 mb-6">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-${link.name.toLowerCase().replace(' ', '-')}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-${link.name.toLowerCase().replace(' ', '-')}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 IdeaVault. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
