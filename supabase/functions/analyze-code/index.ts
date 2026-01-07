import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `You are an expert cybersecurity analyst specializing in code vulnerability detection. Analyze the provided code for security vulnerabilities including but not limited to:

- XSS (Cross-Site Scripting)
- SQL Injection
- Data Exposure (hardcoded secrets, API keys)
- Command Injection
- Path Traversal
- Insecure Deserialization
- Authentication Bypass
- Broken Access Control
- Sensitive Data Logging
- Use of dangerous functions (eval, exec, etc.)

For each vulnerability found, return a JSON array with objects containing:
- severity: "Low", "Medium", or "Critical"
- description: A clear explanation of the vulnerability and its potential impact
- file: The filename where the vulnerability was found
- line: The approximate line number (if determinable)
- fix: A code example showing the recommended fix

If no vulnerabilities are found, return an empty array: []

IMPORTANT: Return ONLY valid JSON. No markdown, no explanations outside the JSON structure.`;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { files } = await req.json();
    
    if (!files || !Array.isArray(files) || files.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No files provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not configured');
      return new Response(
        JSON.stringify({ error: 'AI service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Prepare code content for analysis
    const codeContent = files.map((f: { name: string; content: string }) => 
      `--- File: ${f.name} ---\n${f.content}\n`
    ).join('\n');

    console.log(`Analyzing ${files.length} file(s)...`);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: `Analyze the following code for security vulnerabilities:\n\n${codeContent}` }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Usage limit reached. Please check your account.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: 'AI analysis failed' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '[]';
    
    console.log('AI Response:', content);

    // Parse the JSON response
    let vulnerabilities: Array<{
      id: string;
      severity: string;
      description: string;
      file: string;
      line: number;
      fix: string;
    }> = [];
    try {
      // Clean up the response - remove markdown code blocks if present
      let cleanContent = content.trim();
      if (cleanContent.startsWith('```json')) {
        cleanContent = cleanContent.slice(7);
      } else if (cleanContent.startsWith('```')) {
        cleanContent = cleanContent.slice(3);
      }
      if (cleanContent.endsWith('```')) {
        cleanContent = cleanContent.slice(0, -3);
      }
      cleanContent = cleanContent.trim();
      
      vulnerabilities = JSON.parse(cleanContent);
      
      // Validate structure
      if (!Array.isArray(vulnerabilities)) {
        console.log('Response is not an array, wrapping...');
        vulnerabilities = [vulnerabilities];
      }
      
      // Add IDs to each vulnerability
      vulnerabilities = vulnerabilities.map((v: any, index: number) => ({
        id: `vuln-${Date.now()}-${index}`,
        severity: v.severity || 'Medium',
        description: v.description || 'Unknown vulnerability',
        file: v.file || 'unknown',
        line: v.line || 1,
        fix: v.fix || 'No fix suggestion available',
      }));
      
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      console.log('Raw content:', content);
      // Return empty array if parsing fails
      vulnerabilities = [];
    }

    return new Response(
      JSON.stringify({ vulnerabilities }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-code function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
