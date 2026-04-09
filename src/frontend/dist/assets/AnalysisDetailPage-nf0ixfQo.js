import { c as createLucideIcon, u as useParams, j as jsxRuntimeExports, F as FileText, L as Link } from "./index-B1-BzShZ.js";
import { C as CategoryScoreCard, T as TipCard } from "./CategoryScoreCard-CMUeY0YP.js";
import { a as Button, g as getScoreLevel, C as ChevronRight, m as motion, S as ScoreGauge, B as Badge, h as formatDate } from "./proxy-DWt_d6Z3.js";
import { S as Skeleton } from "./skeleton-BkRH0zHy.js";
import { c as useGetAnalysis } from "./useBackend-BJGbvjy7.js";
import "./lightbulb-BChc7IvU.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode);
const categoryLabels = {
  keywords: "Keywords & Tech Stack",
  experience: "Relevant Experience",
  technicalSkills: "Technical Skills",
  education: "Education & Certifications",
  formatting: "Formatting & Structure",
  clarity: "Overall Clarity & Impact"
};
const scoreLevelConfig = {
  excellent: {
    label: "Excellent",
    badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
  },
  good: {
    label: "Good",
    badge: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30"
  },
  fair: {
    label: "Fair",
    badge: "bg-yellow-500/15 text-yellow-500 border-yellow-500/30"
  },
  poor: {
    label: "Needs Work",
    badge: "bg-red-500/15 text-red-400 border-red-500/30"
  }
};
function AnalysisDetailPage() {
  const { id } = useParams({ from: "/history/$id" });
  const { data: analysis, isLoading } = useGetAnalysis(id);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-4xl mx-auto px-4 py-12 space-y-6",
        "data-ocid": "detail-loading",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-48 bg-secondary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 w-40 rounded-full bg-secondary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-32 bg-secondary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full bg-secondary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4 bg-secondary" })
            ] })
          ] }) })
        ]
      }
    );
  }
  if (!analysis) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-4xl mx-auto px-4 py-12 text-center",
        "data-ocid": "detail-not-found",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center justify-center mb-4 mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-7 h-7 text-destructive" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-xl text-foreground mb-2", children: "Analysis not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "This analysis may have been deleted or doesn't exist." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/history", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "border-border gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            " Back to History"
          ] }) })
        ]
      }
    );
  }
  const level = getScoreLevel(analysis.overallScore);
  const cfg = scoreLevelConfig[level];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-4xl mx-auto px-4 py-12 space-y-6",
      "data-ocid": "detail-page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/history",
              className: "hover:text-foreground transition-colors duration-200 flex items-center gap-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-3.5 h-3.5" }),
                " History"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Analysis Detail" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "bg-card border border-border rounded-xl p-6",
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row items-center gap-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0 flex flex-col items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ScoreGauge, { score: analysis.overallScore, size: "lg", animated: true }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: `px-3 py-1 border font-medium ${cfg.badge}`,
                    variant: "outline",
                    children: cfg.label
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3 text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDate(analysis.createdAt) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-4", children: analysis.summary }),
                analysis.topSkills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide", children: "Identified Skills" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: analysis.topSkills.map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: "bg-primary/10 text-primary border-primary/30 text-xs",
                      children: skill
                    },
                    skill
                  )) })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.1 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground mb-3", children: "Category Breakdown" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-3", children: Object.entries(analysis.categoryScores).map(([key, score]) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                CategoryScoreCard,
                {
                  label: categoryLabels[key] ?? key,
                  categoryKey: key,
                  score,
                  tips: analysis.tips
                },
                key
              )) })
            ]
          }
        ),
        analysis.tips.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.2 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground mb-3", children: "Improvement Tips" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: analysis.tips.sort((a, b) => {
                const order = { high: 0, medium: 1, low: 2 };
                return order[a.priority] - order[b.priority];
              }).map((tip) => /* @__PURE__ */ jsxRuntimeExports.jsx(TipCard, { tip }, tip.id)) })
            ]
          }
        ),
        analysis.resumeText && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.3 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground mb-3", children: "Resume Text" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "text-xs text-muted-foreground font-mono whitespace-pre-wrap leading-relaxed overflow-auto max-h-64", children: analysis.resumeText }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/history", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              className: "border-border hover:bg-secondary gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                " Back to History"
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/analyze", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "bg-primary text-primary-foreground hover:opacity-90 gap-2",
              "data-ocid": "detail-analyze-again",
              children: [
                "Analyze Another ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
export {
  AnalysisDetailPage as default
};
