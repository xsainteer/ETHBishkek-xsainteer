import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Upload, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function IPSubmissionForm() {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // todo: remove mock functionality
    console.log('Submitting IP:', formData);
    
    setTimeout(() => {
      toast({
        title: "IP Submitted Successfully",
        description: "Your intellectual property is now being tokenized",
      });
      setIsSubmitting(false);
      setFormData({ name: "", type: "", description: "" });
    }, 1500);
  };

  return (
    <Card className="max-w-2xl mx-auto p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Submit Your IP</h2>
        <p className="text-muted-foreground">
          Provide details about your intellectual property to begin the tokenization process
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="ip-name">IP Name *</Label>
          <Input
            id="ip-name"
            placeholder="Enter the name of your intellectual property"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            data-testid="input-ip-name"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="ip-type">IP Type *</Label>
          <Select 
            value={formData.type} 
            onValueChange={(value) => setFormData({ ...formData, type: value })}
          >
            <SelectTrigger id="ip-type" data-testid="select-ip-type">
              <SelectValue placeholder="Select IP type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="patent">Patent</SelectItem>
              <SelectItem value="copyright">Copyright</SelectItem>
              <SelectItem value="trademark">Trademark</SelectItem>
              <SelectItem value="trade-secret">Trade Secret</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="ip-description">Description *</Label>
          <Textarea
            id="ip-description"
            placeholder="Provide a detailed description of your intellectual property"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={6}
            required
            data-testid="input-ip-description"
          />
        </div>
        
        <div className="space-y-2">
  <Label>Supporting Documents</Label>
  <label
    htmlFor="file-upload"
    className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-muted/20 transition-colors block"
  >
    <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
    <p className="text-sm text-muted-foreground mb-2">
      Click to upload or drag and drop
    </p>
    <p className="text-xs text-muted-foreground">
      PDF, DOC, or TXT (max 10MB)
    </p>
  </label>
  <Input
    id="file-upload"
    type="file"
    className="hidden"
    accept=".pdf,.doc,.docx,.txt"
    onChange={(e) => console.log(e.target.files[0])}
  />
</div>

        
        <div className="flex gap-4 pt-4">
          <Button 
            type="submit" 
            className="flex-1"
            disabled={isSubmitting || !formData.name || !formData.type || !formData.description}
            data-testid="button-submit-ip"
          >
            {isSubmitting ? (
              <>
                <FileText className="w-4 h-4 mr-2 animate-pulse" />
                Processing...
              </>
            ) : (
              "Submit for Tokenization"
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
}
