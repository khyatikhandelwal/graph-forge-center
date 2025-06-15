
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
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
                  BlackBoxScan is dedicated to democratizing advanced analysis tools through open-source development. 
                  We believe that powerful scanning and analysis capabilities should be accessible to researchers, 
                  developers, and organizations worldwide, fostering innovation and collaboration in the field.
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
                  can share methodologies, data, and insights to advance the field of black box analysis.
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
                  <li>Code contributions and methodology improvements</li>
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
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
