
import { useEffect, useState } from "react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github, FileText, Database, Users, Calendar, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Contribution {
  id: string;
  title: string;
  description: string;
  type: "research" | "dataset" | "methodology" | "community";
  github_url?: string;
  paper_url?: string;
  dataset_url?: string;
  author_name: string;
  author_email: string;
  created_at: string;
}

const Resources = () => {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchContributions();
  }, []);

  const fetchContributions = async () => {
    try {
      const { data, error } = await supabase
        .from('contributions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setContributions(data || []);
    } catch (error) {
      console.error('Error fetching contributions:', error);
      toast({
        title: "Error",
        description: "Failed to load contributions. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

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
    if (type === "all") return contributions;
    return contributions.filter(contribution => contribution.type === type);
  };

  const getTypeCounts = () => {
    const counts = {
      dataset: 0,
      research: 0,
      methodology: 0,
      community: 0
    };
    
    contributions.forEach(contribution => {
      counts[contribution.type]++;
    });
    
    return counts;
  };

  const ResourceCard = ({ contribution }: { contribution: Contribution }) => {
    const Icon = getTypeIcon(contribution.type);
    
    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 mb-2">
              <Icon className="h-5 w-5 text-gray-600" />
              <Badge className={getTypeColor(contribution.type)}>
                {getTypeLabel(contribution.type)}
              </Badge>
            </div>
          </div>
          <CardTitle className="text-lg">{contribution.title}</CardTitle>
          <p className="text-sm text-gray-600">{contribution.description}</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <div>
                <p className="font-medium">{contribution.author_name}</p>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <Calendar className="h-4 w-4" />
                {new Date(contribution.created_at).toLocaleDateString()}
              </div>
            </div>
            
            <div className="flex gap-2 pt-2">
              {contribution.github_url && (
                <Button variant="outline" size="sm" asChild>
                  <a href={contribution.github_url} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-1" />
                    Code
                  </a>
                </Button>
              )}
              {contribution.paper_url && (
                <Button variant="outline" size="sm" asChild>
                  <a href={contribution.paper_url} target="_blank" rel="noopener noreferrer">
                    <FileText className="h-4 w-4 mr-1" />
                    Paper
                  </a>
                </Button>
              )}
              {contribution.dataset_url && (
                <Button variant="outline" size="sm" asChild>
                  <a href={contribution.dataset_url} target="_blank" rel="noopener noreferrer">
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

  const typeCounts = getTypeCounts();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 py-12 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading contributions...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
                  <p className="text-2xl font-bold">{typeCounts.dataset}</p>
                  <p className="text-sm text-gray-600">Datasets</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{typeCounts.research}</p>
                  <p className="text-sm text-gray-600">Research Papers</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Github className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{typeCounts.methodology}</p>
                  <p className="text-sm text-gray-600">Methodologies</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{typeCounts.community}</p>
                  <p className="text-sm text-gray-600">Community Tools</p>
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
              {contributions.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No contributions yet. Be the first to contribute!</p>
                  <Button asChild className="mt-4">
                    <a href="/contribute">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Submit Your Contribution
                    </a>
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {contributions.map((contribution) => (
                    <ResourceCard key={contribution.id} contribution={contribution} />
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="dataset" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filterByType("dataset").map((contribution) => (
                  <ResourceCard key={contribution.id} contribution={contribution} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="research" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filterByType("research").map((contribution) => (
                  <ResourceCard key={contribution.id} contribution={contribution} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="methodology" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filterByType("methodology").map((contribution) => (
                  <ResourceCard key={contribution.id} contribution={contribution} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="community" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filterByType("community").map((contribution) => (
                  <ResourceCard key={contribution.id} contribution={contribution} />
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
