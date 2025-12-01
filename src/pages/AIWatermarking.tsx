import { useState } from "react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, FileText, Image as ImageIcon, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const AIWatermarking = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Text Model State
  const [textMode, setTextMode] = useState<"generate" | "detect">("generate");
  const [textPrompt, setTextPrompt] = useState("");
  const [textToDetect, setTextToDetect] = useState("");
  const [textResult, setTextResult] = useState<any>(null);

  // Frequency Domain Image State
  const [freqMode, setFreqMode] = useState<"generate" | "detect">("generate");
  const [freqPrompt, setFreqPrompt] = useState("");
  const [freqMethod, setFreqMethod] = useState("sift");
  const [freqFile, setFreqFile] = useState<File | null>(null);
  const [freqPreview, setFreqPreview] = useState<string>("");
  const [freqResult, setFreqResult] = useState<any>(null);

  // Robust Image State
  const [robustMode, setRobustMode] = useState<"generate" | "detect">("generate");
  const [robustPrompt, setRobustPrompt] = useState("");
  const [robustFile, setRobustFile] = useState<File | null>(null);
  const [robustPreview, setRobustPreview] = useState<string>("");
  const [robustResult, setRobustResult] = useState<any>(null);

  const handleTextSubmit = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();

      if (textMode === "generate") {
        if (!textPrompt.trim()) {
          toast({ title: "Error", description: "Please enter a prompt", variant: "destructive" });
          return;
        }
        formData.append("prompt", textPrompt);
        formData.append("max_new_tokens", "60");
        formData.append("top_k", "50");
        formData.append("temperature", "1.0");

        const res = await fetch(`${API_BASE_URL}/text/generate`, {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        setTextResult(data);
        toast({ title: "Success", description: "Text generated successfully" });
      } else {
        if (!textToDetect.trim()) {
          toast({ title: "Error", description: "Please enter text to detect", variant: "destructive" });
          return;
        }
        formData.append("text", textToDetect);

        const res = await fetch(`${API_BASE_URL}/text/detect`, {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        setTextResult(data);
        toast({ title: "Success", description: "Detection completed" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to process text", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFreqImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFreqFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setFreqPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleFreqSubmit = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();

      if (freqMode === "generate") {
        if (!freqPrompt.trim()) {
          toast({ title: "Error", description: "Please enter a prompt", variant: "destructive" });
          return;
        }
        formData.append("prompt", freqPrompt);
        formData.append("method", freqMethod);
        formData.append("strength", "0.25");

        const res = await fetch(`${API_BASE_URL}/freq/generate`, {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        setFreqResult(data);
        toast({ title: "Success", description: "Image generated and watermarked" });
      } else {
        if (!freqFile) {
          toast({ title: "Error", description: "Please upload an image", variant: "destructive" });
          return;
        }
        formData.append("file", freqFile);
        formData.append("method", freqMethod);

        const res = await fetch(`${API_BASE_URL}/freq/detect`, {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        setFreqResult(data);
        toast({ title: "Success", description: "Watermark detection completed" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to process image", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRobustImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setRobustFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setRobustPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleRobustSubmit = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();

      if (robustMode === "generate") {
        if (!robustPrompt.trim()) {
          toast({ title: "Error", description: "Please enter a prompt", variant: "destructive" });
          return;
        }
        formData.append("prompt", robustPrompt);

        const res = await fetch(`${API_BASE_URL}/robust/generate`, {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        setRobustResult(data);
        toast({ title: "Success", description: "Image generated and watermarked" });
      } else {
        if (!robustFile) {
          toast({ title: "Error", description: "Please upload an image", variant: "destructive" });
          return;
        }
        formData.append("file", robustFile);

        const res = await fetch(`${API_BASE_URL}/robust/detect`, {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        setRobustResult(data);
        toast({ title: "Success", description: "Watermark detection completed" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to process image", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">AI Watermarking</h1>
            <p className="text-xl text-muted-foreground">Watermark and detect watermarks in AI-generated content</p>
          </div>

          <Tabs defaultValue="text" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="text" className="flex items-center gap-2">
                <FileText size={16} />
                <span className="hidden sm:inline">Text Models</span>
              </TabsTrigger>
              <TabsTrigger value="closedsource" className="flex items-center gap-2">
                <ImageIcon size={16} />
                <span className="hidden sm:inline">Images</span>
              </TabsTrigger>
              <TabsTrigger value="nn" className="flex items-center gap-2">
                <Zap size={16} />
                <span className="hidden sm:inline">Images - Stronger</span>
              </TabsTrigger>
            </TabsList>

            {/* Text Models Tab */}
            <TabsContent value="text">
              <Card>
                <CardHeader>
                  <CardTitle>Text Model Watermarking (GPT-2 for Demo)</CardTitle>
                  <CardDescription>
                    Generate watermarked text or detect watermarks in existing text outputted by GPT-2 for demo. This
                    method works with any Open-Source HuggingFace generative model.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Mode</Label>
                    <Select value={textMode} onValueChange={(v: any) => setTextMode(v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="generate">Generate Watermarked Text</SelectItem>
                        <SelectItem value="detect">Detect Watermark</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {textMode === "generate" ? (
                    <div className="space-y-2">
                      <Label htmlFor="text-prompt">Prompt</Label>
                      <Textarea
                        id="text-prompt"
                        placeholder="Enter prompt to generate watermarked text..."
                        value={textPrompt}
                        onChange={(e) => setTextPrompt(e.target.value)}
                        rows={4}
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Label htmlFor="text-detect">Text to Detect</Label>
                      <Textarea
                        id="text-detect"
                        placeholder="Enter text to check for watermarks..."
                        value={textToDetect}
                        onChange={(e) => setTextToDetect(e.target.value)}
                        rows={8}
                      />
                    </div>
                  )}

                  <Button onClick={handleTextSubmit} disabled={isLoading} className="w-full">
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {textMode === "generate" ? "Generate" : "Detect"}
                  </Button>

                  {textResult && (
                    <div className="space-y-4">
                      <Label>Result</Label>
                      
                      {textMode === "generate" && textResult.generated_text && (
                        <Card className="bg-muted/50">
                          <CardHeader>
                            <CardTitle className="text-lg">📝 Generated Text</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                              {textResult.generated_text}
                            </p>
                          </CardContent>
                        </Card>
                      )}

                      {((textMode === "detect" && textResult.status) || textResult.detection) && (() => {
                        const detectionData = textMode === "detect" ? textResult : textResult.detection;
                        return (
                        <Card className="bg-muted/50">
                          <CardHeader>
                            <CardTitle className="text-lg">🔍 Detection Results</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2 p-4 bg-background rounded-lg border">
                                <p className="text-sm font-medium text-muted-foreground">Status</p>
                                <p className={`text-lg font-bold ${
                                  detectionData.status === "WATERMARK DETECTED" 
                                    ? "text-green-600 dark:text-green-400" 
                                    : "text-red-600 dark:text-red-400"
                                }`}>
                                  {detectionData.status === "WATERMARK DETECTED" ? "✅" : "❌"} {detectionData.status}
                                </p>
                              </div>

                              <div className="space-y-2 p-4 bg-background rounded-lg border">
                                <p className="text-sm font-medium text-muted-foreground">Confidence</p>
                                <p className="text-lg font-bold text-foreground">
                                  🎯 {(detectionData.confidence * 100).toFixed(2)}%
                                </p>
                              </div>

                              <div className="space-y-2 p-4 bg-background rounded-lg border">
                                <p className="text-sm font-medium text-muted-foreground">Z-Score</p>
                                <p className="text-lg font-bold text-foreground">
                                  📊 {detectionData.z?.toFixed(4)}
                                </p>
                              </div>

                              <div className="space-y-2 p-4 bg-background rounded-lg border">
                                <p className="text-sm font-medium text-muted-foreground">P-Value</p>
                                <p className="text-lg font-bold text-foreground">
                                  📈 {detectionData.p?.toExponential(4)}
                                </p>
                              </div>

                              <div className="space-y-2 p-4 bg-background rounded-lg border">
                                <p className="text-sm font-medium text-muted-foreground">Tokens Analyzed</p>
                                <p className="text-lg font-bold text-foreground">
                                  🔢 {detectionData.T}
                                </p>
                              </div>

                              <div className="space-y-2 p-4 bg-background rounded-lg border">
                                <p className="text-sm font-medium text-muted-foreground">Tournament Layers (m)</p>
                                <p className="text-lg font-bold text-foreground">
                                  🏆 {detectionData.m}
                                </p>
                              </div>

                              <div className="space-y-2 p-4 bg-background rounded-lg border">
                                <p className="text-sm font-medium text-muted-foreground">Mean G-Value</p>
                                <p className="text-lg font-bold text-foreground">
                                  💫 {detectionData.mean_g?.toFixed(4)}
                                </p>
                              </div>
                            </div>

                            {detectionData.explanation && (
                              <div className="p-4 bg-background rounded-lg border">
                                <p className="text-sm font-medium text-muted-foreground mb-2">💡 Explanation</p>
                                <p className="text-foreground">{detectionData.explanation}</p>
                              </div>
                            )}

                            {detectionData.report && (
                              <div className="p-4 bg-background rounded-lg border">
                                <p className="text-sm font-medium text-muted-foreground mb-2">📋 Detailed Report</p>
                                <pre className="text-xs text-foreground whitespace-pre-wrap font-mono">
                                  {detectionData.report}
                                </pre>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                        );
                      })()}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Images Tab (Frequency Domain) */}
            <TabsContent value="closedsource">
              <Card>
                <CardHeader>
                  <CardTitle>Image Watermarking (Frequency Domain)</CardTitle>
                  <CardDescription>
                    Generate watermarked images or detect watermarks using SIFT/DWT/DCT methods. The SIFT method is most
                    robust to editing, screenshotting, etc.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Mode</Label>
                    <Select value={freqMode} onValueChange={(v: any) => setFreqMode(v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="generate">Generate Watermarked Image</SelectItem>
                        <SelectItem value="detect">Detect Watermark</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Method</Label>
                    <Select value={freqMethod} onValueChange={setFreqMethod}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sift">SIFT (Recommended - Robust to edits)</SelectItem>
                        <SelectItem value="dwt">DWT</SelectItem>
                        <SelectItem value="dct">DCT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {freqMode === "generate" ? (
                    <div className="space-y-2">
                      <Label htmlFor="freq-prompt">Prompt</Label>
                      <Input
                        id="freq-prompt"
                        placeholder="Enter image prompt..."
                        value={freqPrompt}
                        onChange={(e) => setFreqPrompt(e.target.value)}
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Label htmlFor="freq-upload">Upload Image</Label>
                      <Input
                        id="freq-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFreqImageUpload}
                        className="cursor-pointer"
                      />
                    </div>
                  )}

                  {freqPreview && freqMode === "detect" && (
                    <div className="space-y-2">
                      <Label>Preview</Label>
                      <div className="border rounded-md p-4 bg-muted">
                        <img src={freqPreview} alt="Preview" className="max-w-full h-auto max-h-64 mx-auto rounded" />
                      </div>
                    </div>
                  )}

                  <Button onClick={handleFreqSubmit} disabled={isLoading} className="w-full">
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {freqMode === "generate" ? "Generate" : "Detect"}
                  </Button>

                  {freqResult && (
                    <div className="space-y-2">
                      <Label>Result</Label>
                      <div className="p-4 bg-muted rounded-md space-y-4">
                        {freqResult.unwatermarked_image && freqResult.watermarked_image ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-sm">Original Image</Label>
                              <img
                                src={`data:image/png;base64,${freqResult.unwatermarked_image}`}
                                alt="Original"
                                className="max-w-full h-auto rounded border"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm">Watermarked Image</Label>
                              <img
                                src={`data:image/png;base64,${freqResult.watermarked_image}`}
                                alt="Watermarked"
                                className="max-w-full h-auto rounded border"
                              />
                            </div>
                          </div>
                        ) : freqResult.is_watermarked !== undefined ? (
                          <div className="space-y-4">
                            <div className="flex items-center gap-3 p-4 bg-background rounded-lg border">
                              <span className="text-3xl">{freqResult.is_watermarked ? "✅" : "❌"}</span>
                              <div>
                                <p className="font-semibold text-lg">
                                  {freqResult.is_watermarked ? "Watermark Detected" : "No Watermark Detected"}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Method: {freqResult.method?.toUpperCase()}
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="p-3 bg-background rounded-lg border">
                                <p className="text-sm text-muted-foreground mb-1">🎯 Bit Accuracy</p>
                                <p className="text-xl font-semibold">{(freqResult.bit_accuracy * 100).toFixed(1)}%</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {freqResult.matching_bits}/{freqResult.total_bits} bits matched
                                </p>
                              </div>

                              <div className="p-3 bg-background rounded-lg border">
                                <p className="text-sm text-muted-foreground mb-1">📊 Confidence</p>
                                <p className="text-xl font-semibold">{(freqResult.confidence * 100).toFixed(2)}%</p>
                              </div>

                              <div className="p-3 bg-background rounded-lg border">
                                <p className="text-sm text-muted-foreground mb-1">🔗 Correlation</p>
                                <p className="text-xl font-semibold">{freqResult.correlation?.toFixed(4)}</p>
                              </div>

                              <div className="p-3 bg-background rounded-lg border">
                                <p className="text-sm text-muted-foreground mb-1">📈 P-Value</p>
                                <p className="text-xl font-semibold">{freqResult.correlation_p_value?.toFixed(4)}</p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <pre className="text-sm text-foreground whitespace-pre-wrap">
                            {JSON.stringify(freqResult, null, 2)}
                          </pre>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Images - Stronger Tab (Robust) */}
            <TabsContent value="nn">
              <Card className="border-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Image Watermarking - Stronger
                  </CardTitle>
                  <CardDescription>
                    Advanced neural network watermarking for enhanced robustness. Trained over large datasets. Robust to
                    screenshotting, edits, etc.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Mode</Label>
                    <Select value={robustMode} onValueChange={(v: any) => setRobustMode(v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="generate">Generate Watermarked Image</SelectItem>
                        <SelectItem value="detect">Detect Watermark</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {robustMode === "generate" ? (
                    <div className="space-y-2">
                      <Label htmlFor="robust-prompt">Prompt</Label>
                      <Input
                        id="robust-prompt"
                        placeholder="Enter image prompt..."
                        value={robustPrompt}
                        onChange={(e) => setRobustPrompt(e.target.value)}
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Label htmlFor="robust-upload">Upload Image</Label>
                      <Input
                        id="robust-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleRobustImageUpload}
                        className="cursor-pointer"
                      />
                    </div>
                  )}

                  {robustPreview && robustMode === "detect" && (
                    <div className="space-y-2">
                      <Label>Preview</Label>
                      <div className="border rounded-md p-4 bg-muted">
                        <img src={robustPreview} alt="Preview" className="max-w-full h-auto max-h-64 mx-auto rounded" />
                      </div>
                    </div>
                  )}

                  <Button onClick={handleRobustSubmit} disabled={isLoading} className="w-full">
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <Zap className="mr-2 h-4 w-4" />
                    {robustMode === "generate" ? "Generate with NN" : "Detect with NN"}
                  </Button>

                  {robustResult && (
                    <div className="space-y-2">
                      <Label>Result</Label>
                      <div className="p-4 bg-primary/10 border border-primary rounded-md space-y-4">
                        {robustResult.unwatermarked_image && robustResult.watermarked_image ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-sm">Original Image</Label>
                              <img
                                src={`data:image/png;base64,${robustResult.unwatermarked_image}`}
                                alt="Original"
                                className="max-w-full h-auto rounded border"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm">Watermarked Image</Label>
                              <img
                                src={`data:image/png;base64,${robustResult.watermarked_image}`}
                                alt="Watermarked"
                                className="max-w-full h-auto rounded border"
                              />
                            </div>
                          </div>
                        ) : robustResult.is_watermarked !== undefined ? (
                          <div className="space-y-4">
                            <div className="flex items-center gap-3 p-4 bg-background rounded-lg border-2 border-primary">
                              <span className="text-3xl">{robustResult.is_watermarked ? "✅" : "❌"}</span>
                              <div>
                                <p className="font-semibold text-lg">
                                  {robustResult.is_watermarked ? "Watermark Detected" : "No Watermark Detected"}
                                </p>
                                <p className="text-sm text-muted-foreground">Neural Network Detection</p>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              <div className="p-3 bg-background rounded-lg border border-primary/30">
                                <p className="text-sm text-muted-foreground mb-1">🎯 Bit Accuracy</p>
                                <p className="text-xl font-semibold">{(robustResult.bit_accuracy * 100).toFixed(1)}%</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {robustResult.matching_bits}/{robustResult.total_bits} bits matched
                                </p>
                              </div>

                              <div className="p-3 bg-background rounded-lg border border-primary/30">
                                <p className="text-sm text-muted-foreground mb-1">💪 Confidence</p>
                                <p className="text-xl font-semibold">{(robustResult.confidence * 100).toFixed(2)}%</p>
                              </div>

                              <div className="p-3 bg-background rounded-lg border border-primary/30">
                                <p className="text-sm text-muted-foreground mb-1">📊 P-Value</p>
                                <p className="text-xl font-semibold">{robustResult.p_value?.toExponential(2)}</p>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="p-3 bg-background rounded-lg border border-primary/30">
                                <p className="text-sm text-muted-foreground mb-1">🧪 Statistical Test</p>
                                <p className="text-lg font-semibold flex items-center gap-2">
                                  {robustResult.statistical_test ? "✅ Passed" : "❌ Failed"}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Threshold: {robustResult.threshold_bits} bits (α = {robustResult.significance_level})
                                </p>
                              </div>

                              <div className="p-3 bg-background rounded-lg border border-primary/30">
                                <p className="text-sm text-muted-foreground mb-1">🔬 Confidence Test</p>
                                <p className="text-lg font-semibold flex items-center gap-2">
                                  {robustResult.confidence_test ? "✅ Passed" : "❌ Failed"}
                                </p>
                              </div>
                            </div>

                            {robustResult.extracted_message && robustResult.expected_message && (
                              <div className="p-4 bg-background rounded-lg border border-primary/30 space-y-3">
                                <div>
                                  <p className="text-sm text-muted-foreground mb-1">🔑 Expected Message</p>
                                  <code className="text-xs font-mono bg-muted px-2 py-1 rounded block break-all">
                                    {robustResult.expected_message}
                                  </code>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground mb-1">🔍 Extracted Message</p>
                                  <code className="text-xs font-mono bg-muted px-2 py-1 rounded block break-all">
                                    {robustResult.extracted_message}
                                  </code>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <pre className="text-sm text-foreground font-medium whitespace-pre-wrap">
                            {JSON.stringify(robustResult, null, 2)}
                          </pre>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AIWatermarking;
