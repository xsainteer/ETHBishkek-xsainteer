import { useState } from "react";
import Navigation from "@/components/Navigation";
import IPSubmissionForm from "@/components/IPSubmissionForm";
import TokenizationProgress from "@/components/TokenizationProgress";
import IPAssetGallery from "@/components/IPAssetGallery";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("gallery");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground text-lg">
              Manage and tokenize your intellectual property assets
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="gallery" data-testid="tab-gallery">My Assets</TabsTrigger>
              <TabsTrigger value="tokenize" data-testid="tab-tokenize">Tokenize IP</TabsTrigger>
              <TabsTrigger value="progress" data-testid="tab-progress">Progress</TabsTrigger>
            </TabsList>
            
            <TabsContent value="gallery" className="mt-8">
              <IPAssetGallery />
            </TabsContent>
            
            <TabsContent value="tokenize" className="mt-8">
              <IPSubmissionForm />
            </TabsContent>
            
            <TabsContent value="progress" className="mt-8">
              <TokenizationProgress ipName="Innovative AI Algorithm Patent" />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
