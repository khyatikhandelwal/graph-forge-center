
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const About = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const { toast } = useToast();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Here you would normally send the data to your API
    console.log("Contact form submitted:", formData);
    
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 font-inter">About Us</h1>
            <p className="text-xl text-gray-600">
              Learn about our mission, vision, and the team behind BlackBoxScan
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  BlackBoxScan is the brainchild of Khyati Khandelwal - an Oxford grad, currently working at Google as an AI Engineer.
                  She started this effort from her study table, working in the after-hours only to be able to propogate the AI research community.
                  The resolve was clear - the world deserves a platform for latest research in AI analysis 
                  as much as top researchers deserve a platform to showcase their contributions and help one another.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  We envision a future where complex system analysis is simplified through intelligent tools and 
                  community-driven development. Our goal is to create a comprehensive ecosystem where researchers 
                  can share methodologies, data, and tools to advance the field of black box analysis.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Community-Driven Development</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Our project thrives on community contributions. We welcome:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Research papers and academic contributions</li>
                  <li>Open datasets for training and validation</li>
                  <li>Code contributions through PRs and methodology improvements</li>
                  <li>Documentation and tutorial enhancements</li>
                  <li>Bug reports and feature requests</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Open Source Commitment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  We are committed to maintaining BlackBoxScan as a fully open-source project. 
                  All our code, documentation, and resources are freely available under permissive licenses, 
                  ensuring that our tools remain accessible and can be built upon by the global community.
                </p>
              </CardContent>
            </Card>

            {/* Contact Form Section */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name *
                      </label>
                      <Input
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <Input
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      placeholder="What is this about?"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">How can I contribute?</h4>
                  <p className="text-sm text-gray-600">
                    Visit our Contribute page to submit research papers, datasets, or code contributions.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Is the software free to use?</h4>
                  <p className="text-sm text-gray-600">
                    Yes, BlackBoxScan is completely open-source and free for both academic and commercial use.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">How do I report a bug?</h4>
                  <p className="text-sm text-gray-600">
                    Please use our GitHub issues page or contact our technical support team directly.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
