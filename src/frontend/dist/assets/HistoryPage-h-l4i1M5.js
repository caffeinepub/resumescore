import { c as createLucideIcon, j as jsxRuntimeExports, L as Link } from "./index-B1-BzShZ.js";
import { a as Button, m as motion, C as ChevronRight, g as getScoreLevel, S as ScoreGauge, B as Badge, h as formatDate } from "./proxy-DWt_d6Z3.js";
import { S as Skeleton } from "./skeleton-BkRH0zHy.js";
import { a as useListAnalyses, b as useDeleteAnalysis } from "./useBackend-BJGbvjy7.js";
import { C as ChartNoAxesColumn } from "./chart-no-axes-column-DAg-DebF.js";
import { T as Trash2 } from "./trash-2--b1yD_cx.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ],
  ["path", { d: "M12 11h4", key: "1jrz19" }],
  ["path", { d: "M12 16h4", key: "n85exb" }],
  ["path", { d: "M8 11h.01", key: "1dfujw" }],
  ["path", { d: "M8 16h.01", key: "18s6g9" }]
];
const ClipboardList = createLucideIcon("clipboard-list", __iconNode);
const scoreLevelBadge = {
  excellent: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  good: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  fair: "bg-yellow-500/15 text-yellow-500 border-yellow-500/30",
  poor: "bg-red-500/15 text-red-400 border-red-500/30"
};
const scoreLevelLabel = {
  excellent: "Excellent",
  good: "Good",
  fair: "Fair",
  poor: "Needs Work"
};
function HistoryPage() {
  const { data: analyses, isLoading } = useListAnalyses();
  const deleteAnalysis = useDeleteAnalysis();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 py-12", "data-ocid": "history-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl sm:text-4xl text-foreground mb-2", children: "Analysis History" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Review past resume analyses and track your improvement over time." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/analyze", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          className: "bg-primary text-primary-foreground hover:opacity-90 shadow-elevated gap-2 hidden sm:flex",
          "data-ocid": "history-analyze-cta",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "w-4 h-4" }),
            " New Analysis"
          ]
        }
      ) })
    ] }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-5 space-y-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24 bg-secondary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-16 rounded-full mx-auto bg-secondary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full bg-secondary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-2/3 bg-secondary" })
        ]
      },
      i
    )) }),
    !isLoading && (!analyses || analyses.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        className: "flex flex-col items-center justify-center py-24 text-center",
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        "data-ocid": "history-empty",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "w-7 h-7 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-xl text-foreground mb-2", children: "No analyses yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6 max-w-sm", children: "Analyze your first resume to see scores, breakdowns, and improvement tips here." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/analyze", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "bg-primary text-primary-foreground hover:opacity-90 gap-2",
              "data-ocid": "empty-analyze-cta",
              children: [
                "Analyze a Resume ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
              ]
            }
          ) })
        ]
      }
    ),
    !isLoading && analyses && analyses.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: analyses.map((analysis, i) => {
      const level = getScoreLevel(analysis.overallScore);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "bg-card border border-border rounded-xl p-5 hover:border-primary/40 transition-smooth group relative",
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: i * 0.05 },
          "data-ocid": "history-card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "absolute top-3 right-3 p-1.5 rounded-md text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-smooth opacity-0 group-hover:opacity-100",
                onClick: (e) => {
                  e.preventDefault();
                  deleteAnalysis.mutate(analysis.id);
                },
                "aria-label": "Delete analysis",
                "data-ocid": "history-delete-btn",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/history/$id",
                params: { id: analysis.id },
                className: "block",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ScoreGauge,
                      {
                        score: analysis.overallScore,
                        size: "sm",
                        animated: false
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          className: `text-xs px-2 py-0.5 border mb-1 ${scoreLevelBadge[level]}`,
                          variant: "outline",
                          children: scoreLevelLabel[level]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: formatDate(analysis.createdAt) })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2", children: analysis.summary }),
                  analysis.topSkills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5", children: [
                    analysis.topSkills.slice(0, 3).map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "outline",
                        className: "bg-secondary/50 text-muted-foreground border-border text-xs",
                        children: skill
                      },
                      skill
                    )),
                    analysis.topSkills.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Badge,
                      {
                        variant: "outline",
                        className: "bg-secondary/50 text-muted-foreground border-border text-xs",
                        children: [
                          "+",
                          analysis.topSkills.length - 3
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-1 text-xs text-primary font-medium group-hover:gap-2 transition-smooth", children: [
                    "View Details ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5" })
                  ] })
                ]
              }
            )
          ]
        },
        analysis.id
      );
    }) })
  ] });
}
export {
  HistoryPage as default
};
