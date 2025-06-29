
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ExternalLink, Github, FileText, Database as DatabaseIcon, Search, Filter, ChevronDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Contribution = Database['public']['Tables']['contributions']['Row'];

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const { data: contributions = [], isLoading, error } = useQuery({
    queryKey: ['contributions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contributions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Contribution[];
    },
  });

  // Filter contributions based on search term and type
  const filteredContributions = contributions.filter((contribution) => {
    const matchesSearch = searchTerm === "" || 
      contribution.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contribution.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contribution.author_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === "all" || contribution.type === filterType;
    
    return matchesSearch && matchesType;
  });

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCards(newExpanded);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'research': return 'bg-blue-100 text-blue-800';
      case 'dataset': return 'bg-green-100 text-green-800';
      case 'methodology': return 'bg-purple-100 text-purple-800';
      case 'community': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'research': return <FileText size={16} />;
      case 'dataset': return <DatabaseIcon size={16} />;
      case 'methodology': return <FileText size={16} />;
      case 'community': return <Github size={16} />;
      default: return <FileText size={16} />;
    }
  };

  const truncateDescription = (description: string, maxLength: number = 150) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + "...";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">Loading resources...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-red-600">Error loading resources</div>
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Community Resources</h1>
            <p className="text-xl text-gray-600">
              Research papers, datasets, methodologies, and community contributions for language model analysis
            </p>
          </div>

          {/* Search and Filter Controls */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Search contributions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-500" />
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="research">Research</SelectItem>
                  <SelectItem value="dataset">Dataset</SelectItem>
                  <SelectItem value="methodology">Methodology</SelectItem>
                  <SelectItem value="community">Community</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredContributions.length} of {contributions.length} contributions
            </p>
          </div>

          {filteredContributions.length === 0 ? (
            <div className="text-center py-12">
              {contributions.length === 0 ? (
                <>
                  <p className="text-gray-600 mb-4">No contributions yet. Be the first to contribute!</p>
                  <Button asChild>
                    <a href="/contribute">Submit a Contribution</a>
                  </Button>
                </>
              ) : (
                <p className="text-gray-600">No contributions match your search criteria.</p>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContributions.map((contribution) => {
                const isExpanded = expandedCards.has(contribution.id);
                const shouldShowReadMore = contribution.description.length > 150;
                
                return (
                  <Card key={contribution.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge className={getTypeColor(contribution.type)}>
                          <span className="flex items-center gap-1">
                            {getTypeIcon(contribution.type)}
                            {contribution.type}
                          </span>
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{contribution.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <p className="text-gray-600 text-sm">
                          {isExpanded ? contribution.description : truncateDescription(contribution.description)}
                        </p>
                        {shouldShowReadMore && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleExpanded(contribution.id)}
                            className="mt-2 p-0 h-auto font-normal text-blue-600 hover:text-blue-800"
                          >
                            <span className="flex items-center gap-1">
                              {isExpanded ? "Read less" : "Read more"}
                              <ChevronDown 
                                size={14} 
                                className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
                              />
                            </span>
                          </Button>
                        )}
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        {contribution.github_url && (
                          <Button variant="outline" size="sm" asChild className="w-full">
                            <a href={contribution.github_url} target="_blank" rel="noopener noreferrer">
                              <Github size={16} className="mr-2" />
                              GitHub
                              <ExternalLink size={14} className="ml-auto" />
                            </a>
                          </Button>
                        )}
                        
                        {contribution.paper_url && (
                          <Button variant="outline" size="sm" asChild className="w-full">
                            <a href={contribution.paper_url} target="_blank" rel="noopener noreferrer">
                              <FileText size={16} className="mr-2" />
                              Paper
                              <ExternalLink size={14} className="ml-auto" />
                            </a>
                          </Button>
                        )}
                        
                        {contribution.dataset_url && (
                          <Button variant="outline" size="sm" asChild className="w-full">
                            <a href={contribution.dataset_url} target="_blank" rel="noopener noreferrer">
                              <DatabaseIcon size={16} className="mr-2" />
                              Dataset
                              <ExternalLink size={14} className="ml-auto" />
                            </a>
                          </Button>
                        )}
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        <p>By: {contribution.author_name}</p>
                        <p>Added: {new Date(contribution.created_at).toLocaleDateString()}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Resources;
