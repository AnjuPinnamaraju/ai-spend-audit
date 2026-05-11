"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {

  const [toolName, setToolName] = useState("");
  const [plan, setPlan] = useState("");
  const [monthlySpend, setMonthlySpend] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [useCase, setUseCase] = useState("");
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState({
    message: "",
    monthlySavings: 0,
    yearlySavings: 0,
  });

  const [summary, setSummary] = useState("");
  const resultRef = useRef<HTMLDivElement | null>(null);
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [reportSent, setReportSent] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [score, setScore] = useState(0);
  const [statusColor, setStatusColor] = useState("text-green-400");
  const [statusText, setStatusText] = useState("");
  const [error, setError] = useState("");
  const [borderColor, setBorderColor] = useState("border-zinc-700");
  const [confidence, setConfidence] = useState("");
  const [toolInsight, setToolInsight] = useState("");
  const [riskLevel, setRiskLevel] = useState("");
  const [recommendedTool, setRecommendedTool] = useState("");

  useEffect(() => {

    const savedTool = localStorage.getItem("toolName");
    const savedPlan = localStorage.getItem("plan");
    const savedSpend = localStorage.getItem("monthlySpend");
    const savedTeamSize = localStorage.getItem("teamSize");
    const savedUseCase = localStorage.getItem("useCase");

    if (savedTool) setToolName(savedTool);
    if (savedPlan) setPlan(savedPlan);
    if (savedSpend) setMonthlySpend(savedSpend);
    if (savedTeamSize) setTeamSize(savedTeamSize);
    if (savedUseCase) setUseCase(savedUseCase);

    setMounted(true);

  }, []);

  useEffect(() => {

    localStorage.setItem("toolName", toolName);
    localStorage.setItem("plan", plan);
    localStorage.setItem("monthlySpend", monthlySpend);
    localStorage.setItem("teamSize", teamSize);
    localStorage.setItem("useCase", useCase);

  }, [toolName, plan, monthlySpend, teamSize, useCase]);
  useEffect(() => {

  if (result.message) {

    resultRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

  }

  }, [result]);

  const generateAudit = () => {

  if (!toolName || !plan || !useCase) {

    setError("Please complete all required fields.");
    return;

  }

  setError("");

  setLoading(true);

  setTimeout(() => {

    const spend = Number(monthlySpend);
    const seats = Number(teamSize);

    if (plan === "Team" && seats <= 2) {
      
      setScore(35);  
      setStatusColor("text-red-400");
      setStatusText("High Overspend");
      setBorderColor("border-red-500");
      setConfidence("High Confidence");
      setRiskLevel("High Risk");
      setResult({
        message:
          `You may be overspending on the ${plan} plan for ${toolName}.`,
        monthlySavings: 40,
        yearlySavings: 480,
      });

      setSummary(
        `Your current ${toolName} setup may not match your actual team needs. Downgrading plans could significantly reduce unnecessary recurring costs.`
      );

      setToolInsight(
        "Collaborative AI plans provide best value when actively shared across multiple contributors."
      );
      
    }

    else if (spend > 500) {
      
      setScore(45);
      setStatusColor("text-orange-400");
      setStatusText("Needs Optimization");
      setBorderColor("border-orange-500");
      setConfidence("High Confidence");
      setRiskLevel("Medium Risk");
      setResult({
        message:
          `Your ${toolName} spending is high. Credex credits could reduce costs significantly.`,
        monthlySavings: 120,
        yearlySavings: 1440,
      });

      setSummary(
        `Your AI spending is relatively high compared to typical startup tooling costs. Exploring discounted infrastructure credits could improve operational efficiency.`
      );

      setToolInsight(
        "High recurring AI costs may indicate overlapping subscriptions or underutilized premium tooling."
      );

    }

    else if (plan === "Free") {
      
      setScore(92);
      setStatusColor("text-green-400");
      setStatusText("Well Optimized");
      setBorderColor("border-green-500");
      setConfidence("Very High Confidence");
      setRiskLevel("Low Risk");
      setResult({
        message:
          `Your setup is already optimized. No major savings found.`,
        monthlySavings: 0,
        yearlySavings: 0,
      });

      setSummary(
        `Your current AI tooling strategy already appears lean and cost-efficient. No major optimization opportunities were identified at this stage.`
      );

      setToolInsight(
        "Free-tier AI tools are often sufficient for lightweight productivity and experimentation workflows."
      );

    }

    else if (toolName === "ChatGPT" && useCase === "Coding") {

      setScore(70);
      setStatusColor("text-blue-400");
      setStatusText("Moderate Optimization");
      setBorderColor("border-yellow-500");
      setConfidence("Medium Confidence");
      setRiskLevel("Moderate Risk");
      setResult({
        message:
          `Cursor or GitHub Copilot may provide better value for coding-focused workflows.`,
        monthlySavings: 25,
        yearlySavings: 300,
      });

      setSummary(
        `Your current setup could potentially be optimized for engineering productivity. Developer-focused AI tools may provide better long-term value for coding workflows.`
      );
      
      setToolInsight(
        "Free-tier AI tools are often sufficient for lightweight productivity and experimentation workflows."
      );

      setRecommendedTool(
        "Cursor or GitHub Copilot may provide better coding-focused workflows."
      );
    }

    else {
      
      setScore(78);
      setStatusText("Healthy Setup");
      setBorderColor("border-blue-500");
      setConfidence("Low Confidence");
      setRiskLevel("Low Risk");
      setResult({
        message:
          `Your spending appears reasonable, but there may still be optimization opportunities.`,
        monthlySavings: 15,
        yearlySavings: 180,
      });

      setSummary(
        `Your current setup appears reasonable overall, though periodic audits may still uncover smaller optimization opportunities over time.`
      );

      setToolInsight(
        "Your current AI stack appears balanced for general operational productivity."
      );
    }

    if (
  useCase === "Coding" &&
  toolName !== "Cursor" &&
  toolName !== "GitHub Copilot"
) {

  setRecommendedTool(
    "Cursor or GitHub Copilot may provide better coding-focused workflows."
  );

}

else if (
  useCase === "Research" &&
  toolName !== "ChatGPT" &&
  toolName !== "Claude"
) {

  setRecommendedTool(
    "ChatGPT or Claude may provide stronger research and reasoning capabilities."
  );

}

else if (
  useCase === "Writing" &&
  toolName !== "ChatGPT"
) {

  setRecommendedTool(
    "ChatGPT may provide a smoother writing and content generation experience."
  );

}

else if (
  useCase === "Data Analysis" &&
  toolName !== "Claude" &&
  toolName !== "ChatGPT"
) {

  setRecommendedTool(
    "Claude or ChatGPT may provide stronger analytical and long-context workflows."
  );

}

else {

  setRecommendedTool("");

}

    setLoading(false);

}, 1500);

};

  if (!mounted) {
    return null;
  }

  const resetAudit = () => {

  setToolName("");
  setPlan("");
  setMonthlySpend("");
  setTeamSize("");
  setUseCase("");

  setResult({
    message: "",
    monthlySavings: 0,
    yearlySavings: 0,
  });

  setSummary("");
  setScore(0);
  setStatusText("");
  setReportSent(false);

  localStorage.clear();

};

  return (
    <main className="min-h-screen bg-black text-white px-4 md:px-6 py-10 md:py-12">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
          AI Spend Audit
        </h1>

        <p className="mt-4 text-gray-400 text-lg">
          Find where your startup is overspending on AI tools.
        </p>

        <div className="mt-10 bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-2xl">

          <h2 className="text-2xl font-semibold mb-6">
            Enter Your AI Tool Spending
          </h2>

          <div className="space-y-4">

            <div>
              <label className="block mb-2 text-sm text-gray-300">
                Tool Name <span className="text-red-400">*</span>
              </label>

              <select
                value={toolName}
                onChange={(e) => setToolName(e.target.value)}
                className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
              >
                <option value="">Select a tool</option>
                <option value="ChatGPT">ChatGPT</option>
                <option value="Claude">Claude</option>
                <option value="Cursor">Cursor</option>
                <option value="GitHub Copilot">GitHub Copilot</option>
                <option value="Gemini">Gemini</option>
                <option value="OpenAI API">OpenAI API</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-300">
                Plan <span className="text-red-400">*</span>
              </label>

              <select
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
              >
                <option value="">Select a plan</option>
                <option value="Free">Free</option>
                <option value="Plus">Plus</option>
                <option value="Pro">Pro</option>
                <option value="Team">Team</option>
                <option value="Business">Business</option>
                <option value="Enterprise">Enterprise</option>
              </select>
            </div>

          {plan !== "Free" && (
            <div>
              <label className="block mb-2 text-sm text-gray-300">
                Monthly Spend ($)
              </label>

              <input
                type="number"
                value={monthlySpend}
                onChange={(e) => setMonthlySpend(e.target.value)}
                placeholder="200"
                className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
              />
            </div>
          )}

          {(plan === "Team" ||
            plan === "Business" ||
            plan === "Enterprise") && (
            <div>
              <label className="block mb-2 text-sm text-gray-300">
                Team Size
              </label>

              <input
                type="number"
                value={teamSize}
                onChange={(e) => setTeamSize(e.target.value)}
                placeholder="5"
                className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
              />
            </div>
          )}

            <div>
              <label className="block mb-2 text-sm text-gray-300">
                Primary Use Case <span className="text-red-400">*</span>
              </label>

              <select
                value={useCase}
                onChange={(e) => setUseCase(e.target.value)}
                className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
              >
                <option value="">Select use case</option>
                <option value="Coding">Coding</option>
                <option value="Writing">Writing</option>
                <option value="Research">Research</option>
                <option value="Data Analysis">Data Analysis</option>
                <option value="Mixed">Mixed</option>
              </select>
            </div>
            
            {error && (
              <p className="text-red-400 text-sm">
                {error}
              </p>
            )}
            {error && (
              <p className="text-red-400 text-sm">
                {error}
              </p>
            )}

            <button
              onClick={generateAudit}
              disabled={
                loading ||
                !toolName ||
                !plan ||
                !useCase
              }
              className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >  
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  Generating Audit...
                </>
              ) : (
                "Generate Audit"
              )}
            </button>

            {result.message && (

              <button
                onClick={resetAudit}
                className="w-full bg-zinc-800 text-white py-3 rounded-xl font-semibold hover:bg-zinc-700 transition-all"
              >
                Start New Audit
              </button>

            )}


            { reportSent && (
              <p className="text-green-400 text-sm">
                Audit report sent successfully.
              </p>
            )}

            {result.message && (
              <div
                ref={resultRef}
                className="fade-in bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 rounded-2xl mt-6 space-y-4 border border-zinc-700"
              >

                <div className={`bg-black/30 rounded-xl p-4 border ${borderColor}`}>

                  <p className="text-sm text-gray-400 mb-2">
                    Optimization Score
                  </p>

                  <h3 className="text-3xl md:text-4xl font-bold">
                    {score}/100
                  </h3>

                  <p className={`mt-2 font-medium ${statusColor}`}>
                    {statusText}
                  </p>

                  <p className="text-sm text-gray-400 mt-1">
                    {confidence}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    {riskLevel}
                  </p>

                </div>

                <h3 className={`text-2xl font-bold ${statusColor}`}>
                  Potential Savings
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

  <               div className="bg-black/30 rounded-xl p-4 border border-zinc-700">

                    <p className="text-sm text-gray-400 mb-2">
                      Monthly Savings
                    </p>

                   <h3 className="text-2xl md:text-3xl font-bold">
                     ${result.monthlySavings}
                    </h3>

                  </div>

                 <div className="bg-black/30 rounded-xl p-4 border border-zinc-700">

                    <p className="text-sm text-gray-400 mb-2">
                      Yearly Savings
                    </p>

                    <h3 className="text-2xl md:text-3xl font-bold">
                      ${result.yearlySavings}
                   </h3>

                 </div>

                </div>

                <div className="border-t border-zinc-700 pt-3">
                  <p>{result.message}</p>
                </div>

              </div>            
            )}

            {summary && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mt-6">

                <h3 className="text-xl font-bold mb-3">
                  AI Generated Summary
                </h3>

                <p className="text-gray-300 leading-7">
                  {summary}
                </p>

              </div>
            )}

            {recommendedTool && (

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mt-6">

                <h3 className="text-xl font-bold mb-3">
                  Recommended Alternative
                </h3>

               <p className="text-gray-300 leading-7">
                  {recommendedTool}
                </p>

              </div>

            )}
            
            {result.message && (

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mt-6">

                <h3 className="text-2xl font-bold mb-2">
                  Get Full Audit Report
                </h3>

                <p className="text-gray-400 mb-6">
                  Receive your audit summary and future optimization alerts.
                </p>

                <div className="space-y-4">

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
                  />

                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Company name"
                    className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
                  />

                  <button
                    onClick={() => {

                      if (!email) {
                        alert("Please enter your email");
                        return;
                      }

                      setReportSent(true);

                    }}
                    className="w-full bg-green-500 text-black py-3 rounded-xl font-semibold hover:bg-green-400 transition-all"
                  >
                    Send My Report
              </button>

        </div>

  </div>

)}

          </div>

        </div>

      </div>

    </main>
  );
}