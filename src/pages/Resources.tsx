
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github, FileText, Database, Users, Star, GitFork, Calendar, ExternalLink } from "lucide-react";

const Resources = () => {
  // Mock data for contributed resources
  const resources = [
    {
      id: 1,
      title: "Advanced Neural Network Scanner",
      description: "Deep learning approach for improved vulnerability detection using transformer architectures and ensemble methods.",
      type: "methodology",
      author: "Dr. Sarah Chen",
      organization: "MIT Security Lab",
      githubUrl: "https://github.com/sarahchen/neural-scanner",
      paperUrl: "https://arxiv.org/abs/2023.12345",
      stars: 156,
      forks: 23,
      lastUpdated: "2024-01-15",
      language: "Python",
      tags: ["deep-learning", "security", "neural-networks"]
    },
    {
      id: 2,
      title: "Large-scale Web Security Dataset",
      description: "Comprehensive dataset containing 10M+ labeled security scan results for training machine learning models.",
      type: "dataset",
      author: "Security Research Lab",
      organization: "Stanford University",
      datasetUrl: "https://datasets.stanford.edu/websec-10m",
      paperUrl: "https://arxiv.org/abs/2023.54321",
      size: "2.3 GB",
      samples: "10,247,892",
      lastUpdated: "2024-01-10",
      tags: ["dataset", "web-security", "machine-learning"]
    },
    {
      id: 3,
      title: "Real-time Threat Classification",
      description: "Novel approach to real-time threat classification using ensemble methods and feature engineering.",
      type: "research",
      author: "Alex Rodriguez",
      organization: "CyberSec Institute",
      paperUrl: "https://arxiv.org/abs/2023.98765",
      githubUrl: "https://github.com/alexr/threat-classifier",
      stars: 89,
      forks: 12,
      lastUpdated: "2024-01-08",
      language: "JavaScript",
      tags: ["real-time", "classification", "security"]
    },
    {
      id: 4,
      title: "BlackBox Analysis Toolkit",
      description: "Community-driven toolkit for black box security analysis with modular architecture.",
      type: "community",
      author: "OpenSec Community",
      organization: "Open Source",
      githubUrl: "https://github.com/opensec/blackbox-toolkit",
      stars: 234,
      forks: 45,
      lastUpdated: "2024-01-12",
      language: "TypeScript",
      tags: ["toolkit", "modular", "community"]
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "research": return FileText;
      case "dataset": return Database;
      case "methodology": return Github;
      case "community": return Users;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "research": return "bg-blue-100 text-blue-800";
      case "dataset": return "bg-green-100 text-green-800";
      case "methodology": return "bg-purple-100 text-purple-800";
      case "community": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "research": return "Research Paper";
      case "dataset": return "Dataset";
      case "methodology": return "Methodology";
      case "community": return "Community Tool";
      default: return type;
    }
  };

  const filterByType = (type: string) => {
    if (type === "all") return resources;
    return resources.filter(resource => resource.type === type);
  };

  const ResourceCard = ({ resource }: { resource: any }) => {
    const Icon = getTypeIcon(resource.type);
    
    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 mb-2">
              <Icon className="h-5 w-5 text-gray-600" />
              <Badge className={getTypeColor(resource.type)}>
                {getTypeLabel(resource.type)}
              </Badge>
            </div>
            {resource.stars && (
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  {resource.stars}
                </div>
                <div className="flex items-center gap-1">
                  <GitFork className="h-4 w-4" />
                  {resource.forks}
                </div>
              </div>
            )}
          </div>
          <CardTitle className="text-lg">{resource.title}</CardTitle>
          <p className="text-sm text-gray-600">{resource.description}</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <div>
                <p className="font-medium">{resource.author}</p>
                <p className="text-gray-500">{resource.organization}</p>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <Calendar className="h-4 w-4" />
                {new Date(resource.lastUpdated).toLocaleDateString()}
              </div>
            </div>
            
            {resource.language && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">{resource.language}</span>
              </div>
            )}
            
            {resource.size && (
              <div className="text-sm text-gray-600">
                <strong>Size:</strong> {resource.size} | <strong>Samples:</strong> {resource.samples?.toLocaleString()}
              </div>
            )}
            
            <div className="flex flex-wrap gap-1">
              {resource.tags.map((tag: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="flex gap-2 pt-2">
              {resource.githubUrl && (
                <Button variant="outline" size="sm" asChild>
                  <a href={resource.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-1" />
                    Code
                  </a>
                </Button>
              )}
              {resource.paperUrl && (
                <Button variant="outline" size="sm" asChild>
                  <a href={resource.paperUrl} target="_blank" rel="noopener noreferrer">
                    <FileText className="h-4 w-4 mr-1" />
                    Paper
                  </a>
                </Button>
              )}
              {resource.datasetUrl && (
                <Button variant="outline" size="sm" asChild>
                  <a href={resource.datasetUrl} target="_blank" rel="noopener noreferrer">
                    <Database className="h-4 w-4 mr-1" />
                    Dataset
                  </a>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Community Resources</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore datasets, research papers, methodologies, and community tools contributed by our members
            </p>
          </div>

          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <Database className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">1</p>
                  <p className="text-sm text-gray-600">Datasets</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">1</p>
                  <p className="text-sm text-gray-600">Research Papers</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Github className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">2</p>
                  <p className="text-sm text-gray-600">Code Repositories</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">4</p>
                  <p className="text-sm text-gray-600">Total Contributors</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All Resources</TabsTrigger>
              <TabsTrigger value="dataset">Datasets</TabsTrigger>
              <TabsTrigger value="research">Research</TabsTrigger>
              <TabsTrigger value="methodology">Methodology</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="dataset" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filterByType("dataset").map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="research" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filterByType("research").map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="methodology" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filterByType("methodology").map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="community" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filterByType("community").map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Want to contribute?</h2>
            <p className="text-gray-600 mb-6">
              Share your research, datasets, or tools with the BlackBoxScan community
            </p>
            <Button asChild>
              <a href="/contribute">
                <ExternalLink className="h-4 w-4 mr-2" />
                Submit Your Contribution
              </a>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Resources;
