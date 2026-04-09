import Types "../types/analysis";
import CommonTypes "../types/common";
import Text "mo:core/Text";

module {
  // Keywords commonly found in strong resumes
  let techKeywords = [
    "javascript", "typescript", "python", "java", "react", "nodejs", "sql",
    "html", "css", "git", "docker", "kubernetes", "aws", "cloud", "api",
    "rest", "graphql", "agile", "scrum", "ci/cd", "devops", "linux", "testing",
  ];

  let skillsKeywords = [
    "leadership", "communication", "teamwork", "problem-solving", "analytical",
    "management", "collaboration", "mentoring", "critical thinking", "adaptability",
  ];

  let experienceKeywords = [
    "developed", "built", "implemented", "designed", "architected", "led",
    "managed", "delivered", "improved", "optimized", "reduced", "increased",
    "launched", "created", "deployed", "maintained", "collaborated",
  ];

  let educationKeywords = [
    "bachelor", "master", "phd", "degree", "university", "college", "certification",
    "diploma", "graduate", "undergraduate", "computer science", "engineering", "gpa",
  ];

  func countMatches(lower : Text, keywords : [Text]) : Nat {
    var count = 0;
    for (kw in keywords.values()) {
      if (lower.contains(#text kw)) {
        count += 1;
      };
    };
    count;
  };

  func clamp(value : Nat, max : Nat) : Nat {
    if (value > max) max else value;
  };

  func scoreFromCount(count : Nat, total : Nat) : Nat {
    if (total == 0) return 50;
    let pct = (count * 100) / total;
    clamp(pct, 100);
  };

  func scoreFormatting(text : Text) : Nat {
    let len = text.size();
    // Score based on length (too short or too long is bad)
    // Good resume: 300-2000 words
    let wordCount = len / 5; // rough word count estimate
    if (wordCount < 50) { 20 }
    else if (wordCount < 100) { 45 }
    else if (wordCount < 200) { 65 }
    else if (wordCount < 600) { 90 }
    else if (wordCount < 1200) { 80 }
    else { 60 }
  };

  func scoreClarity(text : Text) : Nat {
    let lower = text.toLower();
    var score = 50;
    // Bullet point indicators
    if (lower.contains(#text "•") or lower.contains(#text "- ") or lower.contains(#text "* ")) {
      score += 15;
    };
    // Has quantified achievements (numbers)
    if (lower.contains(#text "%") or lower.contains(#text " million") or lower.contains(#text " thousand")) {
      score += 20;
    };
    // Has contact info section
    if (lower.contains(#text "@") or lower.contains(#text "linkedin") or lower.contains(#text "github")) {
      score += 15;
    };
    clamp(score, 100);
  };

  func buildTips(lower : Text, cat : Types.CategoryScores) : [Types.Tip] {
    var tips : [Types.Tip] = [];

    // Keywords tips — always at least one
    if (cat.keywords < 40) {
      tips := tips.concat([{
        category = "Keywords";
        priority = #high;
        text = "Add industry keywords like JavaScript, React, Node.js, TypeScript, Python, SQL, and Git to your resume. Applicant Tracking Systems (ATS) filter resumes based on keyword matches.";
      }]);
      tips := tips.concat([{
        category = "Keywords";
        priority = #high;
        text = "Mirror the exact language from the job description. If it says 'REST APIs', use that exact phrase rather than paraphrasing.";
      }]);
    } else if (cat.keywords < 65) {
      tips := tips.concat([{
        category = "Keywords";
        priority = #medium;
        text = "Boost your technical keyword density. Add more tools and frameworks: Docker, Kubernetes, AWS, CI/CD, GraphQL, Agile/Scrum based on your actual experience.";
      }]);
    } else if (cat.keywords < 85) {
      tips := tips.concat([{
        category = "Keywords";
        priority = #low;
        text = "Your keyword coverage is good. Ensure all technical terms are spelled out at least once (e.g., 'Continuous Integration/CD (CI/CD)') for better ATS scanning.";
      }]);
    } else {
      tips := tips.concat([{
        category = "Keywords";
        priority = #low;
        text = "Excellent keyword coverage. Avoid keyword stuffing — ensure every technology listed is backed by real experience in your work history.";
      }]);
    };

    // Skills tips — always at least one
    if (cat.skills < 40) {
      tips := tips.concat([{
        category = "Skills";
        priority = #high;
        text = "Add a dedicated 'Skills' section. Separate technical skills (programming languages, frameworks, tools) from soft skills (leadership, communication, teamwork).";
      }]);
      tips := tips.concat([{
        category = "Skills";
        priority = #high;
        text = "Highlight in-demand soft skills: problem-solving, critical thinking, collaboration, adaptability, and mentoring to stand out beyond technical qualifications.";
      }]);
    } else if (cat.skills < 65) {
      tips := tips.concat([{
        category = "Skills";
        priority = #medium;
        text = "Expand your skills section with competencies like analytical thinking, project management, or cross-functional collaboration that are highly valued by web development employers.";
      }]);
    } else {
      tips := tips.concat([{
        category = "Skills";
        priority = #low;
        text = "Good skills coverage. Consider grouping skills by proficiency level (Expert / Proficient / Familiar) to help recruiters quickly assess your depth.";
      }]);
    };

    // Experience tips — always at least one
    if (cat.experience < 40) {
      tips := tips.concat([{
        category = "Experience";
        priority = #high;
        text = "Rewrite experience bullet points using strong action verbs: Developed, Built, Architected, Implemented, Optimized, Delivered, Led, Launched. Avoid passive language like 'was responsible for'.";
      }]);
      tips := tips.concat([{
        category = "Experience";
        priority = #high;
        text = "Quantify your achievements with specific metrics — e.g., 'Reduced API response time by 35%', 'Delivered 12 features on a 3-person team', 'Grew test coverage from 40% to 85%'.";
      }]);
    } else if (cat.experience < 65) {
      tips := tips.concat([{
        category = "Experience";
        priority = #medium;
        text = "Add measurable outcomes to your experience entries. Replace vague statements like 'improved performance' with specific figures: 'Improved page load speed by 40% using lazy loading and CDN caching'.";
      }]);
    } else if (cat.experience < 85) {
      tips := tips.concat([{
        category = "Experience";
        priority = #low;
        text = "Strong experience section. Ensure each role shows progression and increasing responsibility to demonstrate career growth.";
      }]);
    } else {
      tips := tips.concat([{
        category = "Experience";
        priority = #low;
        text = "Excellent experience section. Tailor bullet points to match the specific role you are applying for by emphasizing the most relevant achievements first.";
      }]);
    };

    // Education tips — always at least one
    if (cat.education < 40) {
      tips := tips.concat([{
        category = "Education";
        priority = #medium;
        text = "Add an Education section listing your degree, institution, and graduation year. Include GPA if above 3.5, and note relevant coursework (Data Structures, Algorithms, Web Development).";
      }]);
      tips := tips.concat([{
        category = "Education";
        priority = #low;
        text = "List relevant certifications and online courses: AWS Certified Developer, Google Cloud Associate, Meta Front-End Certificate, freeCodeCamp, Coursera specializations, etc.";
      }]);
    } else if (cat.education < 70) {
      tips := tips.concat([{
        category = "Education";
        priority = #low;
        text = "Strengthen your education section with certifications. Add cloud, DevOps, or framework-specific certifications that validate your technical expertise.";
      }]);
    } else {
      tips := tips.concat([{
        category = "Education";
        priority = #low;
        text = "Good education section. If you have recent bootcamp or online course completions, add them here — modern employers value continuous learning.";
      }]);
    };

    // Formatting tips — always at least one
    if (cat.formatting < 45) {
      tips := tips.concat([{
        category = "Formatting";
        priority = #high;
        text = "Your resume appears too short or too long. Aim for 1 page if under 5 years of experience, or 2 pages maximum for senior roles. Remove filler and focus on impact.";
      }]);
      tips := tips.concat([{
        category = "Formatting";
        priority = #medium;
        text = "Use consistent formatting: uniform font sizes, clear section headers (EXPERIENCE, EDUCATION, SKILLS), and bullet points with parallel grammatical structure.";
      }]);
    } else if (cat.formatting < 70) {
      tips := tips.concat([{
        category = "Formatting";
        priority = #medium;
        text = "Improve visual structure with clear section dividers. Use whitespace effectively — a cluttered resume is harder to scan in the 6-second recruiter review window.";
      }]);
    } else {
      tips := tips.concat([{
        category = "Formatting";
        priority = #low;
        text = "Good resume length. Ensure it is saved as a clean PDF to preserve formatting across different systems and ATS parsers.";
      }]);
    };

    // Clarity tips — always at least one
    if (cat.clarity < 50) {
      tips := tips.concat([{
        category = "Clarity";
        priority = #medium;
        text = "Use bullet points (•) to break up dense paragraphs. Each bullet should start with an action verb and describe one specific accomplishment.";
      }]);
      tips := tips.concat([{
        category = "Clarity";
        priority = #medium;
        text = "Add quantified achievements using numbers and percentages. Include contact details and profile links: LinkedIn URL, GitHub profile, and personal portfolio website.";
      }]);
    } else if (cat.clarity < 75) {
      tips := tips.concat([{
        category = "Clarity";
        priority = #low;
        text = "Improve scannability by adding metrics to achievements. Recruiters spend an average of 6 seconds on first pass — numbers (%, $, x faster) instantly draw attention.";
      }]);
    } else {
      tips := tips.concat([{
        category = "Clarity";
        priority = #low;
        text = "Good clarity. Double-check for consistent tense: use past tense for previous roles and present tense for your current position.";
      }]);
    };

    // Structural tips based on content presence
    if (not lower.contains(#text "summary") and not lower.contains(#text "objective") and not lower.contains(#text "profile")) {
      tips := tips.concat([{
        category = "Structure";
        priority = #medium;
        text = "Add a 3-4 line Professional Summary at the top. It should highlight your years of experience, key technologies, and what value you bring — this is the first thing recruiters read.";
      }]);
    };

    if (not lower.contains(#text "project") and not lower.contains(#text "portfolio")) {
      tips := tips.concat([{
        category = "Projects";
        priority = #medium;
        text = "Add a Projects section showcasing 2-3 personal or open-source projects. Include tech stack used, your role, and a link to GitHub or live demo. This is crucial for web developers.";
      }]);
    };

    if (not lower.contains(#text "github") and not lower.contains(#text "linkedin")) {
      tips := tips.concat([{
        category = "Contact";
        priority = #low;
        text = "Include your GitHub profile and LinkedIn URL in the contact section. For web developers, a strong GitHub presence with active commits is a major differentiator.";
      }]);
    };

    tips;
  };

  public func scoreResume(
    id : CommonTypes.AnalysisId,
    timestamp : CommonTypes.Timestamp,
    resumeText : Text,
  ) : Types.Analysis {
    let lower = resumeText.toLower();

    let techCount = countMatches(lower, techKeywords);
    let skillCount = countMatches(lower, skillsKeywords);
    let expCount = countMatches(lower, experienceKeywords);
    let eduCount = countMatches(lower, educationKeywords);

    let keywordsScore = clamp(scoreFromCount(techCount, techKeywords.size()), 100);
    let skillsScore = clamp(scoreFromCount(skillCount, skillsKeywords.size()), 100);
    let experienceScore = clamp(scoreFromCount(expCount, experienceKeywords.size()), 100);
    let educationScore = clamp(scoreFromCount(eduCount, educationKeywords.size()), 100);
    let formattingScore = scoreFormatting(resumeText);
    let clarityScore = scoreClarity(lower);

    let catScores : Types.CategoryScores = {
      keywords = keywordsScore;
      skills = skillsScore;
      experience = experienceScore;
      education = educationScore;
      formatting = formattingScore;
      clarity = clarityScore;
    };

    let overall = (keywordsScore * 25 + skillsScore * 20 + experienceScore * 25 + educationScore * 15 + formattingScore * 10 + clarityScore * 5) / 100;

    {
      id;
      timestamp;
      resumeText;
      overallScore = overall;
      categoryScores = catScores;
      tips = buildTips(lower, catScores);
    };
  };

  public func getSnippet(resumeText : Text) : Text {
    let len = resumeText.size();
    if (len <= 120) { resumeText }
    else {
      let chars = resumeText.toArray();
      var snippet = "";
      var i = 0;
      for (c in chars.values()) {
        if (i < 120) {
          snippet := snippet # Text.fromChar(c);
          i += 1;
        };
      };
      snippet # "..."
    };
  };

  public func toSummary(analysis : Types.Analysis) : Types.AnalysisSummary {
    {
      id = analysis.id;
      timestamp = analysis.timestamp;
      snippet = getSnippet(analysis.resumeText);
      overallScore = analysis.overallScore;
      categoryScores = analysis.categoryScores;
    };
  };
};
