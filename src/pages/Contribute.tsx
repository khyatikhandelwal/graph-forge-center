
import { useState } from "react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Github, FileText, Database, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contribute = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    github_url: "",
    paper_url: "",
    dataset_url: "",
    author_name: "",
    author_email: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const contributionTypes = [
    { id: "research", label: "Research Paper", icon: FileText, color: "bg-blue-100 text-blue-800" },
    { id: "dataset", label: "Dataset", icon: Database, color: "bg-green-100 text-green-800" },
    { id: "methodology", label: "Methodology", icon: Github, color: "bg-purple-100 text-purple-800" },
    { id: "community", label: "Community Tool", icon: Users, color: "bg-orange-100 text-orange-800" }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('contributions')
        .insert([{
          title: formData.title,
          description: formData.description,
          type: formData.type,
          github_url: formData.github_url || null,
          paper_url: formData.paper_url || null,
          dataset_url: formData.dataset_url || null,
          author_name: formData.author_name,
          author_email: formData.author_email
        }]);

      if (error) {
        throw error;
      }

      toast({
        title: "Contribution Submitted!",
        description: "Thank you for contributing to Black Box Scan. Your submission has been saved.",
      });

      // Reset form
      setFormData({
        title: "",
        description: "",
        type: "",
        github_url: "",
        paper_url: "",
        dataset_url: "",
        author_name: "",
        author_email: ""
      });
    } catch (error) {
      console.error('Error submitting contribution:', error);
      toast({
        title: "Error",
        description: "There was an error submitting your contribution. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contribute to Black Box Scan</h1>
            <p className="text-xl text-gray-600">
              Join our community and help advance the field of black box analysis
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contribution Types */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contribution Types</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contributionTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <div key={type.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <Icon className="h-6 w-6 text-gray-600" />
                        <div>
                          <Badge className={type.color}>{type.label}</Badge>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>

            {/* Contribution Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Submit Your Contribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contribution Title *
                        </label>
                        <Input
                          value={formData.title}
                          onChange={(e) => handleInputChange("title", e.target.value)}
                          placeholder="Enter a descriptive title"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contribution Type *
                        </label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={formData.type}
                          onChange={(e) => handleInputChange("type", e.target.value)}
                          required
                        >
                          <option value="">Select type...</option>
                          <option value="research">Research Paper</option>
                          <option value="dataset">Dataset</option>
                          <option value="methodology">Methodology</option>
                          <option value="community">Community Tool</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description *
                      </label>
                      <Textarea
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        placeholder="Describe your contribution, its purpose, and how it benefits the community..."
                        rows={4}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Name *
                        </label>
                        <Input
                          value={formData.author_name}
                          onChange={(e) => handleInputChange("author_name", e.target.value)}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          value={formData.author_email}
                          onChange={(e) => handleInputChange("author_email", e.target.value)}
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Resource Links</h4>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          GitHub Repository URL
                        </label>
                        <Input
                          type="url"
                          value={formData.github_url}
                          onChange={(e) => handleInputChange("github_url", e.target.value)}
                          placeholder="https://github.com/username/repository"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Research Paper URL
                        </label>
                        <Input
                          type="url"
                          value={formData.paper_url}
                          onChange={(e) => handleInputChange("paper_url", e.target.value)}
                          placeholder="https://arxiv.org/abs/..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Dataset URL
                        </label>
                        <Input
                          type="url"
                          value={formData.dataset_url}
                          onChange={(e) => handleInputChange("dataset_url", e.target.value)}
                          placeholder="https://dataset-hosting-platform.com/..."
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit Contribution"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contribute;
