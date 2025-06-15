
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

const Contribute = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    githubUrl: "",
    paperUrl: "",
    datasetUrl: "",
    authorName: "",
    authorEmail: ""
  });

  const { toast } = useToast();

  const contributionTypes = [
    { id: "research", label: "Research Paper", icon: FileText, color: "bg-blue-100 text-blue-800" },
    { id: "dataset", label: "Dataset", icon: Database, color: "bg-green-100 text-green-800" },
    { id: "methodology", label: "Methodology", icon: Github, color: "bg-purple-100 text-purple-800" },
    { id: "community", label: "Community Tool", icon: Users, color: "bg-orange-100 text-orange-800" }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Here you would normally send the data to your API
    console.log("Contribution submitted:", formData);
    
    toast({
      title: "Contribution Submitted!",
      description: "Thank you for contributing to Black Box Scan. We'll review your submission soon.",
    });

    // Reset form
    setFormData({
      title: "",
      description: "",
      type: "",
      githubUrl: "",
      paperUrl: "",
      datasetUrl: "",
      authorName: "",
      authorEmail: ""
    });
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

              <Card>
                <CardHeader>
                  <CardTitle>Community Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Contributors</span>
                    <span className="font-semibold">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Research Papers</span>
                    <span className="font-semibold">89</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Datasets</span>
                    <span className="font-semibold">156</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Code Contributions</span>
                    <span className="font-semibold">423</span>
                  </div>
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
                          value={formData.authorName}
                          onChange={(e) => handleInputChange("authorName", e.target.value)}
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
                          value={formData.authorEmail}
                          onChange={(e) => handleInputChange("authorEmail", e.target.value)}
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
                          value={formData.githubUrl}
                          onChange={(e) => handleInputChange("githubUrl", e.target.value)}
                          placeholder="https://github.com/username/repository"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Research Paper URL
                        </label>
                        <Input
                          type="url"
                          value={formData.paperUrl}
                          onChange={(e) => handleInputChange("paperUrl", e.target.value)}
                          placeholder="https://arxiv.org/abs/..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Dataset URL
                        </label>
                        <Input
                          type="url"
                          value={formData.datasetUrl}
                          onChange={(e) => handleInputChange("datasetUrl", e.target.value)}
                          placeholder="https://dataset-hosting-platform.com/..."
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full">
                      Submit Contribution
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recent Contributions */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Contributions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Advanced Neural Network Scanner",
                  author: "Dr. Sarah Chen",
                  type: "methodology",
                  description: "Deep learning approach for improved vulnerability detection"
                },
                {
                  title: "Large-scale Web Security Dataset",
                  author: "Security Research Lab",
                  type: "dataset",
                  description: "10M+ labeled security scan results for training"
                },
                {
                  title: "Real-time Threat Classification",
                  author: "Alex Rodriguez",
                  type: "research",
                  description: "Novel approach to real-time threat classification using ensemble methods"
                }
              ].map((contribution, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge className={contributionTypes.find(t => t.id === contribution.type)?.color}>
                        {contributionTypes.find(t => t.id === contribution.type)?.label}
                      </Badge>
                      <span className="text-xs text-gray-500">2 days ago</span>
                    </div>
                    <CardTitle className="text-lg">{contribution.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-2">{contribution.description}</p>
                    <p className="text-xs text-gray-500">by {contribution.author}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contribute;
