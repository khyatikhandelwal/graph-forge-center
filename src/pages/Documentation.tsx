
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const Documentation = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Documentation</h1>
            <p className="text-xl text-gray-600">
              Complete guide to using Black Box Scan library
            </p>
          </div>

          <Tabs defaultValue="getting-started" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
              <TabsTrigger value="api-reference">API Reference</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="getting-started" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Installation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Using pip:</h4>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono">
                      pip install blackboxscan
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Using conda:</h4>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono">
                      conda install -c blackboxscan blackboxscan
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Start</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                    <div className="text-gray-500"># Import the library</div>
                    <div>from blackboxscan import Scanner, Analyzer</div>
                    <br />
                    <div className="text-gray-500"># Initialize scanner</div>
                    <div>scanner = Scanner(config='default')</div>
                    <br />
                    <div className="text-gray-500"># Perform scan</div>
                    <div>results = scanner.scan(target='your_target')</div>
                    <br />
                    <div className="text-gray-500"># Analyze results</div>
                    <div>analyzer = Analyzer()</div>
                    <div>analysis = analyzer.analyze(results)</div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="api-reference" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Scanner Class</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2">
                      Scanner.scan() 
                      <Badge variant="secondary">method</Badge>
                    </h4>
                    <p className="text-gray-600 mb-2">Performs a comprehensive scan of the target system.</p>
                    <div className="bg-gray-50 p-3 rounded">
                      <strong>Parameters:</strong>
                      <ul className="mt-1 space-y-1 text-sm">
                        <li><code>target</code> (str): Target system or URL to scan</li>
                        <li><code>depth</code> (int, optional): Scan depth level (default: 3)</li>
                        <li><code>timeout</code> (int, optional): Timeout in seconds (default: 30)</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2">
                      Scanner.configure() 
                      <Badge variant="secondary">method</Badge>
                    </h4>
                    <p className="text-gray-600 mb-2">Configure scanner settings and parameters.</p>
                    <div className="bg-gray-50 p-3 rounded">
                      <strong>Parameters:</strong>
                      <ul className="mt-1 space-y-1 text-sm">
                        <li><code>config</code> (dict): Configuration dictionary</li>
                        <li><code>preset</code> (str, optional): Use predefined configuration preset</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Analyzer Class</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2">
                      Analyzer.analyze() 
                      <Badge variant="secondary">method</Badge>
                    </h4>
                    <p className="text-gray-600 mb-2">Analyze scan results and generate insights.</p>
                    <div className="bg-gray-50 p-3 rounded">
                      <strong>Parameters:</strong>
                      <ul className="mt-1 space-y-1 text-sm">
                        <li><code>results</code> (ScanResults): Results from Scanner.scan()</li>
                        <li><code>format</code> (str, optional): Output format ('json', 'xml', 'csv')</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="examples" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Web Scanning</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                    <div>from blackboxscan import Scanner</div>
                    <br />
                    <div className="text-gray-500"># Create scanner instance</div>
                    <div>scanner = Scanner()</div>
                    <div>scanner.configure(preset='web_security')</div>
                    <br />
                    <div className="text-gray-500"># Scan a website</div>
                    <div>results = scanner.scan('https://example.com')</div>
                    <div>print(f"Found {'{'}len(results.vulnerabilities){'}'} vulnerabilities")</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Advanced Analysis with Custom Config</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                    <div>from blackboxscan import Scanner, Analyzer</div>
                    <br />
                    <div className="text-gray-500"># Custom configuration</div>
                    <div>config = {'{'}</div>
                    <div>&nbsp;&nbsp;'scan_depth': 5,</div>
                    <div>&nbsp;&nbsp;'enable_ai': True,</div>
                    <div>&nbsp;&nbsp;'output_format': 'detailed'</div>
                    <div>{'}'}</div>
                    <br />
                    <div>scanner = Scanner(config=config)</div>
                    <div>results = scanner.scan('target_system')</div>
                    <br />
                    <div>analyzer = Analyzer()</div>
                    <div>report = analyzer.generate_report(results)</div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Custom Plugins</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Black Box Scan supports custom plugins for extending functionality:
                  </p>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                    <div>from blackboxscan.plugins import BasePlugin</div>
                    <br />
                    <div>class CustomPlugin(BasePlugin):</div>
                    <div>&nbsp;&nbsp;def scan(self, target):</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;# Custom scanning logic</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;return results</div>
                    <br />
                    <div># Register plugin</div>
                    <div>scanner.register_plugin(CustomPlugin())</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Optimization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Parallel Processing</h4>
                      <p className="text-gray-700 text-sm">
                        Enable parallel processing for faster scans on multi-core systems.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Memory Management</h4>
                      <p className="text-gray-700 text-sm">
                        Configure memory limits and garbage collection for large-scale scans.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Caching</h4>
                      <p className="text-gray-700 text-sm">
                        Implement result caching to avoid redundant scans.
                      </p>
                    </div>
                  </div>
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

export default Documentation;
