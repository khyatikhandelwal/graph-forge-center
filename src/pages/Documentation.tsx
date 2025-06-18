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
              A comprehensive Python toolkit for analyzing language models with SOTA AI techniques
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
                    <h4 className="font-semibold mb-2">Install BlackBoxScan:</h4>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono">
                      pip install blackboxscan
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Or clone from GitHub:</h4>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono">
                      git clone https://github.com/khyatikhandelwal/blackboxscan.git
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Required dependencies:</h4>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono">
                      pip install -r requirements.txt
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Required imports:</h4>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                      <div>import torch</div>
                      <div>from transformers import AutoModelForCausalLM, AutoTokenizer, AutoModel</div>
                      <div>from collections import defaultdict</div>
                      <div>import plotly.graph_objects as go</div>
                      <div>import matplotlib.pyplot as plt</div>
                      <div>from sklearn.preprocessing import normalize</div>
                      <div>from typing import Optional, Dict</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Loading Models</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Generative Models (GPT, LLaMA, etc.):</h4>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                      <div className="text-gray-500"># Load a generative model</div>
                      <div>model_name = "gpt2"</div>
                      <div>model = AutoModelForCausalLM.from_pretrained(model_name)</div>
                      <div>tokenizer = AutoTokenizer.from_pretrained(model_name)</div>
                      <br />
                      <div className="text-gray-500"># Set pad token if not present</div>
                      <div>if tokenizer.pad_token is None:</div>
                      <div>&nbsp;&nbsp;&nbsp;&nbsp;tokenizer.pad_token = tokenizer.eos_token</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Encoder Models (BERT, RoBERTa, etc.):</h4>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                      <div className="text-gray-500"># Load an encoder model</div>
                      <div>model_name = "bert-base-uncased"</div>
                      <div>model = AutoModel.from_pretrained(model_name)</div>
                      <div>tokenizer = AutoTokenizer.from_pretrained(model_name)</div>
                      <div>model.eval()  # Set to evaluation mode</div>
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
                    <div className="text-gray-500"># Basic usage example</div>
                    <div>from transformers import AutoModelForCausalLM, AutoTokenizer</div>
                    <br />
                    <div className="text-gray-500"># Load model</div>
                    <div>model = AutoModelForCausalLM.from_pretrained("gpt2")</div>
                    <div>tokenizer = AutoTokenizer.from_pretrained("gpt2")</div>
                    <br />
                    <div className="text-gray-500"># Create analyzer</div>
                    <div>analyzer = GenerativeModelOutputs(model, tokenizer)</div>
                    <br />
                    <div className="text-gray-500"># Analyze text</div>
                    <div>results = analyzer.sentence_log_likelihoods("Hello world")</div>
                    <div>print(f"Perplexity: {'{'}results.get_perplexity(){'}'}")</div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="api-reference" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>ScannedOutputs Class</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2">
                      add_token_output() 
                      <Badge variant="secondary">method</Badge>
                    </h4>
                    <p className="text-gray-600 mb-2">Add token-wise likelihood data to the output collection.</p>
                    <div className="bg-gray-50 p-3 rounded">
                      <strong>Parameters:</strong>
                      <ul className="mt-1 space-y-1 text-sm">
                        <li><code>token</code> (str): Token string</li>
                        <li><code>output</code> (float): Likelihood value for the token</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2">
                      get_perplexity() 
                      <Badge variant="secondary">method</Badge>
                    </h4>
                    <p className="text-gray-600 mb-2">Calculate perplexity score from token likelihoods.</p>
                    <div className="bg-gray-50 p-3 rounded">
                      <strong>Returns:</strong> <code>float</code> - Perplexity score
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2">
                      get_tokens() 
                      <Badge variant="secondary">method</Badge>
                    </h4>
                    <p className="text-gray-600 mb-2">Return list of (token, likelihood) tuples.</p>
                    <div className="bg-gray-50 p-3 rounded">
                      <strong>Returns:</strong> <code>list[tuple]</code> - List of (token, likelihood) pairs
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>GenerativeModelOutputs Class</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2">
                      sentence_log_likelihoods() 
                      <Badge variant="secondary">method</Badge>
                    </h4>
                    <p className="text-gray-600 mb-2">Computes log-likelihood scores for each token in the input sequence.</p>
                    <div className="bg-gray-50 p-3 rounded">
                      <strong>Parameters:</strong>
                      <ul className="mt-1 space-y-1 text-sm">
                        <li><code>words</code> (list | str): Input text (string or list of words)</li>
                      </ul>
                      <strong>Returns:</strong> <code>ScannedOutputs</code> - Object containing token-wise likelihoods
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2">
                      view_topk() 
                      <Badge variant="secondary">method</Badge>
                    </h4>
                    <p className="text-gray-600 mb-2">Analyzes the top-k most likely next tokens for a given input.</p>
                    <div className="bg-gray-50 p-3 rounded">
                      <strong>Parameters:</strong>
                      <ul className="mt-1 space-y-1 text-sm">
                        <li><code>input_sentence</code> (str): Input text string</li>
                        <li><code>k</code> (int): Number of top tokens to retrieve</li>
                        <li><code>get_plot</code> (bool, optional): Whether to display visualization plot</li>
                      </ul>
                      <strong>Returns:</strong> <code>dict</code> - Dictionary mapping top tokens to their scores
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>EmbeddingOutputs Class</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2">
                      get_embeddings_output() 
                      <Badge variant="secondary">method</Badge>
                    </h4>
                    <p className="text-gray-600 mb-2">Extracts normalized word embeddings for a list of words.</p>
                    <div className="bg-gray-50 p-3 rounded">
                      <strong>Parameters:</strong>
                      <ul className="mt-1 space-y-1 text-sm">
                        <li><code>words_list</code> (list): List of words to analyze</li>
                      </ul>
                      <strong>Returns:</strong> <code>ScannedOutputs</code> - Object containing word embeddings
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Attention Class</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2">
                      attention_scores() 
                      <Badge variant="secondary">method</Badge>
                    </h4>
                    <p className="text-gray-600 mb-2">Extracts attention scores for each token in the input sentence.</p>
                    <div className="bg-gray-50 p-3 rounded">
                      <strong>Parameters:</strong>
                      <ul className="mt-1 space-y-1 text-sm">
                        <li><code>sentence</code> (str): Input sentence to analyze</li>
                      </ul>
                      <strong>Returns:</strong> <code>Dict[str, float]</code> - Dictionary mapping tokens to attention scores
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2">
                      view_attention() 
                      <Badge variant="secondary">method</Badge>
                    </h4>
                    <p className="text-gray-600 mb-2">Visualizes attention scores with optional bar chart.</p>
                    <div className="bg-gray-50 p-3 rounded">
                      <strong>Parameters:</strong>
                      <ul className="mt-1 space-y-1 text-sm">
                        <li><code>sentence</code> (str): Input sentence to analyze</li>
                        <li><code>graph</code> (bool): Whether to display matplotlib visualization</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="examples" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Analyzing Token Likelihoods</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                    <div className="text-gray-500"># Load model</div>
                    <div>model = AutoModelForCausalLM.from_pretrained("gpt2")</div>
                    <div>tokenizer = AutoTokenizer.from_pretrained("gpt2")</div>
                    <div>if tokenizer.pad_token is None:</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;tokenizer.pad_token = tokenizer.eos_token</div>
                    <br />
                    <div className="text-gray-500"># Create analyzer</div>
                    <div>analyzer = GenerativeModelOutputs(model, tokenizer)</div>
                    <br />
                    <div className="text-gray-500"># Analyze sentence</div>
                    <div>text = "The quick brown fox jumps over the lazy dog"</div>
                    <div>results = analyzer.sentence_log_likelihoods(text)</div>
                    <br />
                    <div className="text-gray-500"># Get results</div>
                    <div>print(f"Perplexity: {'{'}results.get_perplexity(){'}'}")</div>
                    <div>for token, likelihood in results.get_tokens():</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;print(f"{'{'}token{'}'}: {'{'}likelihood:.4f{'}'}")</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top-K Token Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                    <div className="text-gray-500"># Analyze top-5 most likely next tokens</div>
                    <div>input_text = "The weather today is"</div>
                    <div>top_tokens = analyzer.view_topk(input_text, k=5, get_plot=True)</div>
                    <br />
                    <div>print("Top 5 next tokens:")</div>
                    <div>for token, score in top_tokens.items():</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;print(f"{'{'}token{'}'}: {'{'}score:.4f{'}'}")</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Word Embeddings Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                    <div className="text-gray-500"># Load BERT model</div>
                    <div>bert_model = AutoModel.from_pretrained("bert-base-uncased")</div>
                    <div>bert_tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")</div>
                    <div>bert_model.eval()</div>
                    <br />
                    <div className="text-gray-500"># Create embedding analyzer</div>
                    <div>embedding_analyzer = EmbeddingOutputs(bert_model, bert_tokenizer)</div>
                    <br />
                    <div className="text-gray-500"># Extract embeddings</div>
                    <div>words = ["cat", "dog", "animal", "car", "vehicle"]</div>
                    <div>embeddings = embedding_analyzer.get_embeddings_output(words)</div>
                    <div>print("Embeddings extracted for:", words)</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Attention Visualization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                    <div className="text-gray-500"># Analyze attention patterns</div>
                    <div>attention_analyzer = Attention(model_name="gpt2", gen=True)</div>
                    <br />
                    <div className="text-gray-500"># Get attention scores</div>
                    <div>sentence = "The cat sat on the mat"</div>
                    <div>scores = attention_analyzer.attention_scores(sentence)</div>
                    <br />
                    <div>for token, score in scores.items():</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;print(f"{'{'}token{'}'}: {'{'}score:.4f{'}'}")</div>
                    <br />
                    <div className="text-gray-500"># Visualize with graph</div>
                    <div>attention_analyzer.view_attention(sentence, graph=True)</div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Popular Model Options</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Generative Models:</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• "gpt2", "gpt2-medium", "gpt2-large", "gpt2-xl" - GPT-2 variants</li>
                        <li>• "microsoft/DialoGPT-small" - Conversational GPT</li>
                        <li>• "distilgpt2" - Lightweight GPT-2</li>
                        <li>• "EleutherAI/gpt-j-6B" - Large open-source GPT model</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Encoder Models:</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• "bert-base-uncased", "bert-large-uncased" - BERT variants</li>
                        <li>• "roberta-base", "roberta-large" - RoBERTa variants</li>
                        <li>• "distilbert-base-uncased" - Lightweight BERT</li>
                        <li>• "sentence-transformers/all-MiniLM-L6-v2" - Optimized for embeddings</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Memory and Performance Optimization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Memory-Constrained Environments</h4>
                      <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                        <div>model = AutoModelForCausalLM.from_pretrained(</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;model_name,</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;torch_dtype=torch.float16,  # Half precision</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;low_cpu_mem_usage=True,     # Reduce CPU memory</div>
                        <div>)</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">GPU Usage</h4>
                      <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                        <div>device = torch.device("cuda" if torch.cuda.is_available() else "cpu")</div>
                        <div>model = model.to(device)</div>
                        <div>model.eval()</div>
                        <div>torch.set_grad_enabled(False)  # For inference only</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Authentication for Gated Models</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                    <div>from huggingface_hub import login</div>
                    <br />
                    <div className="text-gray-500"># Login with your Hugging Face token</div>
                    <div>login(token="your_hf_token_here")</div>
                    <br />
                    <div className="text-gray-500"># Or set environment variable:</div>
                    <div className="text-gray-500"># export HUGGINGFACE_HUB_TOKEN="your_token"</div>
                    <div>model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-2-7b-hf")</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Output Formats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">ScannedOutputs Methods</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• <code>get_tokens()</code>: Returns list of tuples [(token, likelihood), ...]</li>
                        <li>• <code>get_total()</code>: Returns float sum of all likelihoods</li>
                        <li>• <code>get_perplexity()</code>: Returns float perplexity score</li>
                        <li>• <code>embeddings</code>: Dictionary mapping words to normalized embedding arrays</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Visualization Outputs</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• <code>plot_topk()</code>: Interactive Plotly bar chart saved as HTML</li>
                        <li>• <code>view_attention()</code>: Matplotlib bar chart saved as "attention_scores.png"</li>
                        <li>• Console output with sorted token scores</li>
                      </ul>
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
