import { ScoreGauge } from "@/components/ScoreGauge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  BarChart2,
  ChevronRight,
  FileCheck,
  Lightbulb,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: Zap,
    title: "Instant AI Analysis",
    desc: "Paste your resume and get a comprehensive score in seconds across 6 key dimensions.",
  },
  {
    icon: BarChart2,
    title: "Category Breakdown",
    desc: "Understand your strengths and gaps across keywords, experience, skills, formatting, and more.",
  },
  {
    icon: Lightbulb,
    title: "Actionable Tips",
    desc: "Prioritized improvement suggestions tailored to your resume's specific weaknesses.",
  },
];

const stats = [
  { value: "6", label: "Scoring Categories", icon: BarChart2 },
  { value: "98%", label: "Analysis Accuracy", icon: Star },
  { value: "10s", label: "Average Analysis Time", icon: Zap },
  { value: "500+", label: "Resumes Scored", icon: Users },
];

const sampleScores = [
  { label: "Keywords & Tech Stack", score: 85 },
  { label: "Relevant Experience", score: 72 },
  { label: "Technical Skills", score: 90 },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-background overflow-hidden pt-24 pb-20 px-4">
        {/* Background grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.24 0 0 / 0.4) 1px, transparent 1px), linear-gradient(90deg, oklch(0.24 0 0 / 0.4) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
          aria-hidden="true"
        />
        {/* Glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, oklch(0.7 0.18 260 / 0.12) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              className="mb-6 px-3 py-1 text-xs bg-primary/15 text-primary border-primary/30"
              variant="outline"
            >
              Web Dev Summit 2026 · Resume Scoring System
            </Badge>
          </motion.div>

          <motion.h1
            className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Score Your Resume
            <br />
            <span className="text-gradient-accent">Like a Pro</span>
          </motion.h1>

          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            AI-powered resume analysis across 6 key dimensions. Get an instant
            score, category breakdown, and prioritized tips to land your dream
            developer role.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link to="/analyze">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:opacity-90 shadow-elevated px-8 gap-2"
                data-ocid="hero-cta-primary"
              >
                Analyze My Resume <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/history">
              <Button
                size="lg"
                variant="outline"
                className="border-border hover:bg-secondary gap-2"
                data-ocid="hero-cta-secondary"
              >
                View History
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Sample score preview */}
        <motion.div
          className="relative max-w-3xl mx-auto mt-16 bg-card border border-border rounded-xl p-6 shadow-elevated"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="shrink-0">
              <ScoreGauge score={82} size="lg" />
            </div>
            <div className="flex-1 w-full space-y-3">
              <p className="text-sm font-medium text-muted-foreground mb-4">
                Category Scores Preview
              </p>
              {sampleScores.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-foreground">{item.label}</span>
                    <span className="font-mono font-bold text-primary">
                      {item.score}
                    </span>
                  </div>
                  <div className="h-1.5 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary/80"
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <Badge
              className="bg-card border-primary/40 text-primary text-xs"
              variant="outline"
            >
              <FileCheck className="w-3 h-3 mr-1" /> Live Preview
            </Badge>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="bg-muted/30 border-y border-border py-12 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="font-mono font-bold text-3xl text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-background py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-4">
              Everything you need to{" "}
              <span className="text-gradient-accent">stand out</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Built for developers, by developers. Our scoring engine
              understands what tech recruiters look for.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/40 transition-smooth shadow-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground text-lg mb-2">
                  {f.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-muted/40 border-y border-border py-16 px-4">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display font-bold text-3xl text-foreground mb-4">
            Ready to score your resume?
          </h2>
          <p className="text-muted-foreground mb-8">
            Paste your resume text and get a full analysis in under 10 seconds.
          </p>
          <Link to="/analyze">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:opacity-90 shadow-elevated px-10 gap-2"
              data-ocid="bottom-cta"
            >
              Start Analyzing <Zap className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
