
import { useState } from "react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const Demo = () => {
  const [selectedFunction, setSelectedFunction] = useState("");
  const [inputText, setInputText] = useState("");
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const demoFunctions = [
    { value: "vulnerability_scan", label: "Vulnerability Scanning" },
    { value: "performance_analysis", label: "Performance Analysis" },
    { value: "security_audit", label: "Security Audit" },
    { value: "network_mapping", label: "Network Mapping" },
    { value: "threat_detection", label: "Threat Detection" },
  ];

  // Mock data for different demo types
  const mockData = {
    vulnerability_scan: {
      type: "chart",
      data: [
        { name: "Critical", count: 3, severity: 100 },
        { name: "High", count: 7, severity: 80 },
        { name: "Medium", count: 12, severity: 60 },
        { name: "Low", count: 18, severity: 40 },
        { name: "Info", count: 25, severity: 20 },
      ],
      summary: "Found 65 total vulnerabilities across 5 severity levels."
    },
    performance_analysis: {
      type: "line_chart",
      data: [
        { time: "00:00", cpu: 45, memory: 62, network: 23 },
        { time: "00:05", cpu: 52, memory: 58, network: 31 },
        { time: "00:10", cpu: 48, memory: 65, network: 28 },
        { time: "00:15", cpu: 61, memory: 71, network: 42 },
        { time: "00:20", cpu: 55, memory: 68, network: 38 },
        { time: "00:25", cpu: 49, memory: 63, network: 25 },
      ],
      summary: "System performance analysis shows average CPU usage of 52% with memory consumption at 64%."
    },
    security_audit: {
      type: "text",
      data: `Security Audit Report:

✅ PASSED: SSL/TLS Configuration
✅ PASSED: Authentication Mechanisms  
⚠️  WARNING: Session Management - Consider implementing stricter timeout policies
❌ FAILED: Input Validation - Multiple injection vulnerabilities detected
✅ PASSED: Access Controls
⚠️  WARNING: Logging and Monitoring - Insufficient log retention period

Score: 7/10 - Good security posture with room for improvement`,
      summary: "Security audit completed with a score of 7/10."
    },
    network_mapping: {
      type: "text",
      data: `Network Topology Discovery:

📍 Gateway: 192.168.1.1 (Router/Firewall)
├── 192.168.1.10 (Web Server) - Apache 2.4.41
├── 192.168.1.20 (Database Server) - MySQL 8.0
├── 192.168.1.30 (File Server) - Samba 4.15
├── 192.168.1.40 (DNS Server) - BIND 9.16
└── 192.168.1.100-150 (DHCP Range) - 12 active hosts

🔍 Open Ports Summary:
- Port 80/443: HTTP/HTTPS (Web Server)
- Port 3306: MySQL (Database)
- Port 445: SMB (File Server)
- Port 53: DNS

⚡ Network Performance: 98.5% uptime, avg latency 12ms`,
      summary: "Discovered 16 active hosts with 4 critical services identified."
    },
    threat_detection: {
      type: "chart",
      data: [
        { name: "Malware", detected: 12, blocked: 11 },
        { name: "Phishing", detected: 8, blocked: 8 },
        { name: "Intrusion", detected: 15, blocked: 13 },
        { name: "DDoS", detected: 3, blocked: 3 },
        { name: "Data Exfil", detected: 5, blocked: 4 },
      ],
      summary: "Detected 43 threats with 39 successfully blocked (90.7% success rate)."
    }
  };

  const handleDemo = async () => {
    if (!selectedFunction || !inputText.trim()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setResults(mockData[selectedFunction]);
      setIsLoading(false);
    }, 2000);
  };

  const renderResults = () => {
    if (!results) return null;

    return (
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Results</CardTitle>
          <Badge variant="outline">{selectedFunction.replace('_', ' ').toUpperCase()}</Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p className="text-sm text-gray-600">{results.summary}</p>
            
            {results.type === "chart" && (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={results.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            )}

            {results.type === "line_chart" && (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={results.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="cpu" stroke="#ef4444" name="CPU %" />
                  <Line type="monotone" dataKey="memory" stroke="#10b981" name="Memory %" />
                  <Line type="monotone" dataKey="network" stroke="#3b82f6" name="Network %" />
                </LineChart>
              </ResponsiveContainer>
            )}

            {results.type === "text" && (
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm whitespace-pre-line">
                {results.data}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Interactive Demo</h1>
            <p className="text-xl text-gray-600">
              Try out Black Box Scan functionality with our live demo
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Demo Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label htmlFor="function-select" className="block text-sm font-medium text-gray-700 mb-2">
                  Select Functionality
                </label>
                <Select value={selectedFunction} onValueChange={setSelectedFunction}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a demo function..." />
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

              <div>
                <label htmlFor="input-text" className="block text-sm font-medium text-gray-700 mb-2">
                  Input Parameters
                </label>
                <Textarea
                  id="input-text"
                  placeholder="Enter target URL, IP address, or configuration parameters..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  rows={4}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Example: https://example.com, 192.168.1.0/24, or custom configuration parameters
                </p>
              </div>

              <Button 
                onClick={handleDemo} 
                disabled={!selectedFunction || !inputText.trim() || isLoading}
                className="w-full"
              >
                {isLoading ? "Running Analysis..." : "Run Demo"}
              </Button>
            </CardContent>
          </Card>

          {renderResults()}

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Demo Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Vulnerability Scanning</h4>
                  <p className="text-sm text-gray-600">
                    Comprehensive security vulnerability assessment with severity classification.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Performance Analysis</h4>
                  <p className="text-sm text-gray-600">
                    Real-time system performance monitoring and resource utilization tracking.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Security Audit</h4>
                  <p className="text-sm text-gray-600">
                    Complete security posture evaluation with detailed recommendations.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Network Mapping</h4>
                  <p className="text-sm text-gray-600">
                    Automated network topology discovery and service identification.
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
