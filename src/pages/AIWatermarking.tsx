import { useState } from "react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, FileText, Image as ImageIcon, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AIWatermarking = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Text Model State
  const [textInput, setTextInput] = useState("");
  const [textOutput, setTextOutput] = useState("");

  // Image Models State
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageOutput, setImageOutput] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTextModelSubmit = async () => {
    if (!textInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to watermark",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      setTextOutput("Watermarked text will appear here once API is connected");
      toast({
        title: "Success",
        description: "Text watermarked successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to watermark text",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageModelSubmit = async (modelType: string) => {
    if (!imageFile) {
      toast({
        title: "Error",
        description: "Please upload an image first",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      setImageOutput(`Image processed with ${modelType} model. Watermark detected/added successfully.`);
      toast({
        title: "Success",
        description: "Image processed successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process image",
        variant: "destructive",
      });
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
            <p className="text-xl text-muted-foreground">
              Watermark and detect watermarks in AI-generated content
            </p>
          </div>

          <Tabs defaultValue="text" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="text" className="flex items-center gap-2">
                <FileText size={16} />
                <span className="hidden sm:inline">Text Models</span>
              </TabsTrigger>
              <TabsTrigger value="opensource" className="flex items-center gap-2">
                <ImageIcon size={16} />
                <span className="hidden sm:inline">Open Source</span>
              </TabsTrigger>
              <TabsTrigger value="closedsource" className="flex items-center gap-2">
                <ImageIcon size={16} />
                <span className="hidden sm:inline">Closed Source</span>
              </TabsTrigger>
              <TabsTrigger value="nn" className="flex items-center gap-2">
                <Zap size={16} />
                <span className="hidden sm:inline">NN Stronger 🔥</span>
              </TabsTrigger>
            </TabsList>

            {/* Text Models Tab */}
            <TabsContent value="text">
              <Card>
                <CardHeader>
                  <CardTitle>Text Model Watermarking</CardTitle>
                  <CardDescription>
                    Watermark or detect watermarks in AI-generated text
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="text-input">Input Text</Label>
                    <Textarea
                      id="text-input"
                      placeholder="Enter text to watermark or check for watermarks..."
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      rows={8}
                      className="resize-none"
                    />
                  </div>

                  <Button 
                    onClick={handleTextModelSubmit}
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Process Text
                  </Button>

                  {textOutput && (
                    <div className="space-y-2">
                      <Label>Output</Label>
                      <div className="p-4 bg-muted rounded-md">
                        <p className="text-sm text-foreground">{textOutput}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Open Source Image Models Tab */}
            <TabsContent value="opensource">
              <Card>
                <CardHeader>
                  <CardTitle>Image Watermarking - Open Source Models</CardTitle>
                  <CardDescription>
                    Watermark images using open source models
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="image-upload-os">Upload Image</Label>
                    <Input
                      id="image-upload-os"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="cursor-pointer"
                    />
                  </div>

                  {imagePreview && (
                    <div className="space-y-2">
                      <Label>Preview</Label>
                      <div className="border rounded-md p-4 bg-muted">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="max-w-full h-auto max-h-64 mx-auto rounded"
                        />
                      </div>
                    </div>
                  )}

                  <Button 
                    onClick={() => handleImageModelSubmit("Open Source")}
                    disabled={isLoading || !imageFile}
                    className="w-full"
                  >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Process Image
                  </Button>

                  {imageOutput && (
                    <div className="space-y-2">
                      <Label>Result</Label>
                      <div className="p-4 bg-muted rounded-md">
                        <p className="text-sm text-foreground">{imageOutput}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Closed Source Image Models Tab */}
            <TabsContent value="closedsource">
              <Card>
                <CardHeader>
                  <CardTitle>Image Watermarking - Closed Source Models</CardTitle>
                  <CardDescription>
                    Watermark images from closed source AI models
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="image-upload-cs">Upload Image</Label>
                    <Input
                      id="image-upload-cs"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="cursor-pointer"
                    />
                  </div>

                  {imagePreview && (
                    <div className="space-y-2">
                      <Label>Preview</Label>
                      <div className="border rounded-md p-4 bg-muted">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="max-w-full h-auto max-h-64 mx-auto rounded"
                        />
                      </div>
                    </div>
                  )}

                  <Button 
                    onClick={() => handleImageModelSubmit("Closed Source")}
                    disabled={isLoading || !imageFile}
                    className="w-full"
                  >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Process Image
                  </Button>

                  {imageOutput && (
                    <div className="space-y-2">
                      <Label>Result</Label>
                      <div className="p-4 bg-muted rounded-md">
                        <p className="text-sm text-foreground">{imageOutput}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* NN Stronger Image Models Tab */}
            <TabsContent value="nn">
              <Card className="border-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Image Watermarking - Neural Network (Stronger) 🔥
                  </CardTitle>
                  <CardDescription>
                    Advanced neural network watermarking for closed source models
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="image-upload-nn">Upload Image</Label>
                    <Input
                      id="image-upload-nn"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="cursor-pointer"
                    />
                  </div>

                  {imagePreview && (
                    <div className="space-y-2">
                      <Label>Preview</Label>
                      <div className="border rounded-md p-4 bg-muted">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="max-w-full h-auto max-h-64 mx-auto rounded"
                        />
                      </div>
                    </div>
                  )}

                  <Button 
                    onClick={() => handleImageModelSubmit("Neural Network")}
                    disabled={isLoading || !imageFile}
                    className="w-full"
                  >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <Zap className="mr-2 h-4 w-4" />
                    Process with Advanced NN
                  </Button>

                  {imageOutput && (
                    <div className="space-y-2">
                      <Label>Result</Label>
                      <div className="p-4 bg-primary/10 border border-primary rounded-md">
                        <p className="text-sm text-foreground font-medium">{imageOutput}</p>
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
