
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

  const handleDemo = async () => {
    if (!selectedFunction || !inputText.trim()) return;

    setIsLoading(true);
    
    try {
      let endpoint = "";
      let payload = {};

      switch (selectedFunction) {
        case "sentence_likelihood":
          endpoint = "http://127.0.0.1:5000/analyze/sentence-likelihood";
          payload = { text: inputText };
          break;
        
        case "top_k_tokens":
          endpoint = "http://127.0.0.1:5000/analyze/top-k-tokens";
          payload = { 
            text: inputText, 
            k: parseInt(kValue), 
            include_plot: includePlot 
          };
          break;
        
        case "embeddings":
          endpoint = "http://127.0.0.1:5000/analyze/embeddings";
          payload = { 
            words: words.split(",").map(w => w.trim()).filter(w => w),
            model: model 
          };
          break;
        
        case "attention":
          endpoint = "http://127.0.0.1:5000/analyze/attention";
          payload = { 
            sentence: inputText,
            model: model,
            generative: true
          };
          break;
        
        case "attention_visualize":
          endpoint = "http://127.0.0.1:5000/analyze/attention/visualize";
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
                    <p className="text-lg">{results.data.perplexity?.toFixed(4)}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Total Likelihood</Label>
                    <p className="text-lg">{results.data.total_likelihood?.toFixed(4)}</p>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium mb-2 block">Token Likelihoods</Label>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-2">
                      {results.data.tokens?.map(([token, likelihood], index) => (
                        <div key={index} className="flex justify-between items-center py-1 border-b border-gray-200 last:border-b-0">
                          <span className="font-mono text-sm bg-white px-2 py-1 rounded">{token}</span>
                          <span className="text-sm text-gray-600">{likelihood.toFixed(4)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
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
                  <Label className="text-sm font-medium mb-2 block">Top {results.data.k} Tokens</Label>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-2">
                      {Object.entries(results.data.top_tokens || {}).map(([token, score], index) => (
                        <div key={index} className="flex justify-between items-center py-1 border-b border-gray-200 last:border-b-0">
                          <span className="font-mono text-sm bg-white px-2 py-1 rounded">"{token}"</span>
                          <span className="text-sm text-gray-600">{score.toFixed(4)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
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

                {results.data.graph_url && (
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Attention Visualization</Label>
                    <img 
                      src={results.data.graph_url} 
                      alt="Attention Visualization Graph" 
                      className="max-w-full h-auto border rounded-lg"
                    />
                  </div>
                )}
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
                  onCheckedChange={setIncludePlot}
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
                  <SelectItem value="gpt2">GPT-2</SelectItem>
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
                    onCheckedChange={setShowGraph}
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
                    Analyze the likelihood and perplexity of a given sentence using language models.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Top-K Tokens</h4>
                  <p className="text-sm text-gray-600">
                    Predict the most likely next tokens for incomplete text input.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Word Embeddings</h4>
                  <p className="text-sm text-gray-600">
                    Generate high-dimensional vector representations for words using BERT or GPT-2.
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
