import { useState } from "react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const Demo = () => {
  const [selectedFunction, setSelectedFunction] = useState("");
  const [inputText, setInputText] = useState("");
  const [kValue, setKValue] = useState("5");
  const [model, setModel] = useState("gpt2");
  const [words, setWords] = useState("");
  const [includePlot, setIncludePlot] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const demoFunctions = [
    { value: "sentence_likelihood", label: "Sentence Likelihood Analysis" },
    { value: "top_k_tokens", label: "Top-K Token Prediction" },
    { value: "embeddings", label: "Word Embeddings" },
    { value: "attention", label: "Attention Analysis" },
    { value: "attention_visualize", label: "Attention Visualization" },
  ];

  const API_BASE_URL = "https://khyatikhandelwal20-blackboxscan-demo.hf.space";

  const handleDemo = async () => {
    if (!selectedFunction || !inputText.trim()) return;

    setIsLoading(true);
    
    try {
      let endpoint = "";
      let payload = {};

      switch (selectedFunction) {
        case "sentence_likelihood":
          endpoint = `${API_BASE_URL}/analyze/sentence-likelihood`;
          payload = { text: inputText };
          break;
        
        case "top_k_tokens":
          endpoint = `${API_BASE_URL}/analyze/top-k-tokens`;
          payload = { 
            text: inputText, 
            k: parseInt(kValue), 
            include_plot: includePlot 
          };
          break;
        
        case "embeddings":
          endpoint = `${API_BASE_URL}/analyze/embeddings`;
          payload = { 
            words: words.split(",").map(w => w.trim()).filter(w => w),
            model: model 
          };
          break;
        
        case "attention":
          endpoint = `${API_BASE_URL}/analyze/attention`;
          payload = { 
            sentence: inputText,
            model: model,
            generative: true
          };
          break;
        
        case "attention_visualize":
          endpoint = `${API_BASE_URL}/analyze/attention/visualize`;
          payload = { 
            sentence: inputText,
            model: model,
            generative: true,
            show_graph: showGraph
          };
          break;
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setResults({ type: selectedFunction, data });
    } catch (error) {
      setResults({ type: "error", data: { error: error.message } });
    } finally {
      setIsLoading(false);
    }
  };

  const renderImage = (imageData: string, altText: string = "API Generated Image") => {
    if (!imageData) return null;
    
    // Check if it's a base64 image (starts with data:image) or a URL
    const isBase64 = imageData.startsWith('data:image/') || !imageData.startsWith('http');
    const imageSrc = isBase64 && !imageData.startsWith('data:image/') 
      ? `data:image/png;base64,${imageData}` 
      : imageData;
    
    return (
      <div className="mt-4">
        <Label className="text-sm font-medium mb-2 block">{altText}</Label>
        <div className="border rounded-lg overflow-hidden">
          <img 
            src={imageSrc} 
            alt={altText}
            className="max-w-full h-auto"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              const errorDiv = target.nextSibling as HTMLElement;
              target.style.display = 'none';
              if (errorDiv) {
                errorDiv.style.display = 'block';
              }
            }}
          />
          <div className="bg-red-50 border border-red-200 rounded p-4 text-red-700 hidden">
            Failed to load image from: {isBase64 ? 'base64 data' : imageSrc}
          </div>
        </div>
      </div>
    );
  };

  const renderResults = () => {
    if (!results) return null;

    return (
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>API Response</CardTitle>
          <Badge variant="outline">{selectedFunction.replace('_', ' ').toUpperCase()}</Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {results.type === "error" && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="text-red-800 font-semibold mb-2">Error</h4>
                <p className="text-red-700">{results.data.error}</p>
              </div>
            )}

            {results.type === "sentence_likelihood" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Model</Label>
                    <p className="text-lg">{results.data.model}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Number of Tokens</Label>
                    <p className="text-lg">{results.data.num_tokens}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Perplexity</Label>
                    <p className="text-lg">{typeof results.data.perplexity === 'number' ? results.data.perplexity.toFixed(4) : 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Total Likelihood</Label>
                    <p className="text-lg">{typeof results.data.total_likelihood === 'number' ? results.data.total_likelihood.toFixed(4) : 'N/A'}</p>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium mb-2 block">Token Likelihoods</Label>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-2">
                      {results.data.tokens?.map(([token, likelihood], index) => (
                        <div key={index} className="flex justify-between items-center py-1 border-b border-gray-200 last:border-b-0">
                          <span className="font-mono text-sm bg-white px-2 py-1 rounded">{token}</span>
                          <span className="text-sm text-gray-600">{typeof likelihood === 'number' ? likelihood.toFixed(4) : 'N/A'}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Handle base64 plot images */}
                {results.data.plot && renderImage(results.data.plot, "Likelihood Plot")}
                {results.data.plot_url && renderImage(results.data.plot_url, "Likelihood Plot")}
              </div>
            )}

            {results.type === "top_k_tokens" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Input Text</Label>
                    <p className="text-sm bg-gray-50 p-2 rounded">{results.data.input_text}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">K Value</Label>
                    <p className="text-lg">{results.data.k}</p>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium mb-2 block">Top {results.data.k} Token Predictions</Label>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-3">
                      {results.data.top_tokens && Object.entries(results.data.top_tokens)
                        .filter(([key]) => key !== 'plot_url')
                        .sort(([,a], [,b]) => (b as number) - (a as number))
                        .map(([token, score], index) => (
                        <div key={index} className="flex justify-between items-center py-2 px-3 bg-white rounded border">
                          <div className="flex items-center space-x-3">
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                              #{index + 1}
                            </span>
                            <span className="font-mono text-sm font-medium">"{token}"</span>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-medium text-gray-900">
                              {typeof score === 'number' ? score.toFixed(2) : 'N/A'}
                            </span>
                            <div className="text-xs text-gray-500">score</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Handle base64 plot images from top_tokens object */}
                {results.data.top_tokens?.plot_url && renderImage(results.data.top_tokens.plot_url, "Top-K Tokens Visualization")}
                {results.data.plot && renderImage(results.data.plot, "Top-K Tokens Plot")}
                {results.data.plot_url && renderImage(results.data.plot_url, "Top-K Tokens Plot")}
              </div>
            )}

            {results.type === "embeddings" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Model</Label>
                    <p className="text-lg">{results.data.model}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Words Processed</Label>
                    <p className="text-lg">{results.data.words?.join(", ")}</p>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium mb-2 block">Embeddings</Label>
                  <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                    {Object.entries(results.data.embeddings || {}).map(([word, embedding]) => (
                      <div key={word} className="mb-4">
                        <h4 className="font-medium mb-2">"{word}"</h4>
                        <div className="text-xs font-mono bg-white p-2 rounded border max-h-32 overflow-y-auto">
                          {JSON.stringify(embedding[0]?.slice(0, 20), null, 2)}...
                          <span className="text-gray-500"> (showing first 20 dimensions)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Handle base64 visualization images */}
                {results.data.visualization && renderImage(results.data.visualization, "Embeddings Visualization")}
                {results.data.visualization_url && renderImage(results.data.visualization_url, "Embeddings Visualization")}
              </div>
            )}

            {results.type === "attention" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Sentence</Label>
                    <p className="text-sm bg-gray-50 p-2 rounded">{results.data.sentence}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Model</Label>
                    <p className="text-lg">{results.data.model}</p>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium mb-2 block">Attention Scores (Sorted)</Label>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-2">
                      {results.data.sorted_scores?.map(([token, score], index) => (
                        <div key={index} className="flex justify-between items-center py-1 border-b border-gray-200 last:border-b-0">
                          <span className="font-mono text-sm bg-white px-2 py-1 rounded">"{token}"</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-600 h-2 rounded-full" 
                                style={{ width: `${(score * 100)}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-600 w-16 text-right">{score.toFixed(4)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Handle base64 heatmap images */}
                {results.data.heatmap && renderImage(results.data.heatmap, "Attention Heatmap")}
                {results.data.heatmap_url && renderImage(results.data.heatmap_url, "Attention Heatmap")}
              </div>
            )}

            {results.type === "attention_visualize" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Sentence</Label>
                    <p className="text-sm bg-gray-50 p-2 rounded">{results.data.sentence}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Graph Generated</Label>
                    <p className="text-lg">{results.data.graph_generated ? "Yes" : "No"}</p>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium mb-2 block">Attention Output</Label>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm whitespace-pre-line">
                    {results.data.attention_output}
                  </div>
                </div>

                {/* Handle base64 visualization images */}
                {results.data.graph && renderImage(results.data.graph, "Attention Visualization Graph")}
                {results.data.graph_url && renderImage(results.data.graph_url, "Attention Visualization Graph")}
                {results.data.heatmap && renderImage(results.data.heatmap, "Attention Heatmap")}
                {results.data.heatmap_url && renderImage(results.data.heatmap_url, "Attention Heatmap")}
                {results.data.plot && renderImage(results.data.plot, "Attention Plot")}
                {results.data.plot_url && renderImage(results.data.plot_url, "Attention Plot")}
              </div>
            )}

            <div className="mt-6">
              <Label className="text-sm font-medium mb-2 block">Raw API Response</Label>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs max-h-64 overflow-y-auto">
                {JSON.stringify(results.data, null, 2)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderInputFields = () => {
    switch (selectedFunction) {
      case "sentence_likelihood":
        return (
          <div>
            <Label htmlFor="input-text" className="block text-sm font-medium text-gray-700 mb-2">
              Text to Analyze
            </Label>
            <Textarea
              id="input-text"
              placeholder="Enter text for likelihood analysis (e.g., 'The quick brown fox jumps over the lazy dog')"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={3}
            />
          </div>
        );
      
      case "top_k_tokens":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="input-text" className="block text-sm font-medium text-gray-700 mb-2">
                Input Text
              </Label>
              <Textarea
                id="input-text"
                placeholder="Enter incomplete text (e.g., 'The meaning of life is')"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="k-value" className="block text-sm font-medium text-gray-700 mb-2">
                  K Value
                </Label>
                <Input
                  id="k-value"
                  type="number"
                  min="1"
                  max="20"
                  value={kValue}
                  onChange={(e) => setKValue(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2 pt-8">
                <Checkbox 
                  id="include-plot" 
                  checked={includePlot}
                  onCheckedChange={(checked) => setIncludePlot(checked === true)}
                />
                <Label htmlFor="include-plot">Include Plot</Label>
              </div>
            </div>
          </div>
        );
      
      case "embeddings":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="words" className="block text-sm font-medium text-gray-700 mb-2">
                Words (comma-separated)
              </Label>
              <Input
                id="words"
                placeholder="hello, world, example"
                value={words}
                onChange={(e) => setWords(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-2">
                Model
              </Label>
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bert-base-uncased">BERT Base Uncased</SelectItem>
                  <SelectItem value="distilbert-base-uncased">DistilBERT Base Uncased</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      
      case "attention":
      case "attention_visualize":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="input-text" className="block text-sm font-medium text-gray-700 mb-2">
                Sentence
              </Label>
              <Textarea
                id="input-text"
                placeholder="Enter sentence for attention analysis (e.g., 'The cat sat on the mat')"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-2">
                  Model
                </Label>
                <Select value={model} onValueChange={setModel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt2">GPT-2</SelectItem>
                    <SelectItem value="bert-base-uncased">BERT Base Uncased</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {selectedFunction === "attention_visualize" && (
                <div className="flex items-center space-x-2 pt-8">
                  <Checkbox 
                    id="show-graph" 
                    checked={showGraph}
                    onCheckedChange={(checked) => setShowGraph(checked === true)}
                  />
                  <Label htmlFor="show-graph">Generate Graph</Label>
                </div>
              )}
            </div>
          </div>
        );
      
      default:
        return (
          <div>
            <Label htmlFor="input-text" className="block text-sm font-medium text-gray-700 mb-2">
              Input Parameters
            </Label>
            <Textarea
              id="input-text"
              placeholder="Enter your input..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={4}
            />
          </div>
        );
    }
  };

  const canRunDemo = () => {
    if (!selectedFunction) return false;
    
    switch (selectedFunction) {
      case "embeddings":
        return words.trim().length > 0;
      default:
        return inputText.trim().length > 0;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Live API Demo</h1>
            <p className="text-xl text-gray-600">
              Test Black Box Scan API endpoints with real-time analysis
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="function-select" className="block text-sm font-medium text-gray-700 mb-2">
                  Select API Endpoint
                </Label>
                <Select value={selectedFunction} onValueChange={setSelectedFunction}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an API endpoint..." />
                  </SelectTrigger>
                  <SelectContent>
                    {demoFunctions.map((func) => (
                      <SelectItem key={func.value} value={func.value}>
                        {func.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedFunction && renderInputFields()}

              <Button 
                onClick={handleDemo} 
                disabled={!canRunDemo() || isLoading}
                className="w-full"
              >
                {isLoading ? "Processing..." : "Run API Call"}
              </Button>
            </CardContent>
          </Card>

          {renderResults()}

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Available API Endpoints</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Sentence Likelihood</h4>
                  <p className="text-sm text-gray-600">
                    Analyze the likelihood and perplexity of a given sentence using GPT-2.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Top-K Tokens</h4>
                  <p className="text-sm text-gray-600">
                    Predict the most likely next tokens for incomplete text input using GPT-2.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Word Embeddings</h4>
                  <p className="text-sm text-gray-600">
                    Generate high-dimensional vector representations for words using BERT or DistilBERT.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Attention Analysis</h4>
                  <p className="text-sm text-gray-600">
                    Analyze attention weights to understand model focus on different parts of input.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Demo;
