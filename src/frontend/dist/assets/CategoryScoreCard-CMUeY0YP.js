import { c as createLucideIcon, j as jsxRuntimeExports, r as reactExports } from "./index-B1-BzShZ.js";
import { B as Badge, j as getScoreColor } from "./proxy-DWt_d6Z3.js";
import { L as Lightbulb } from "./lightbulb-BChc7IvU.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]];
const ChevronUp = createLucideIcon("chevron-up", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
const Info = createLucideIcon("info", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
const priorityConfig = {
  high: {
    label: "High",
    icon: TriangleAlert,
    badgeClass: "bg-red-500/15 text-red-400 border-red-500/30",
    iconClass: "text-red-400"
  },
  medium: {
    label: "Medium",
    icon: Info,
    badgeClass: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    iconClass: "text-yellow-400"
  },
  low: {
    label: "Low",
    icon: Lightbulb,
    badgeClass: "bg-primary/15 text-primary border-primary/30",
    iconClass: "text-primary"
  }
};
function TipCard({ tip, compact = false }) {
  const config = priorityConfig[tip.priority];
  const Icon = config.icon;
  if (compact) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 py-1", "data-ocid": "tip-card-compact", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-3.5 h-3.5 mt-0.5 shrink-0 ${config.iconClass}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: tip.text })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "bg-card border border-border rounded-lg p-4 hover:border-primary/30 transition-smooth",
      "data-ocid": "tip-card",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `p-1.5 rounded-md bg-card border ${config.badgeClass} shrink-0`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-3.5 h-3.5 ${config.iconClass}` })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1.5 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: tip.category }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                className: `text-xs px-2 py-0.5 border font-medium ${config.badgeClass}`,
                variant: "outline",
                children: [
                  config.label,
                  " Priority"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: tip.text })
        ] })
      ] })
    }
  );
}
function CategoryScoreCard({
  label,
  categoryKey,
  score,
  tips = [],
  icon
}) {
  const [expanded, setExpanded] = reactExports.useState(false);
  const relevantTips = tips.filter(
    (t) => t.category.toLowerCase() === categoryKey.toLowerCase()
  );
  const hasExpansion = relevantTips.length > 0;
  const scoreColor = getScoreColor(score);
  const barWidth = `${score}%`;
  const barColor = score >= 75 ? "bg-emerald-500" : score >= 50 ? "bg-yellow-500" : "bg-red-500";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `bg-secondary/30 border border-border rounded-lg overflow-hidden transition-smooth ${hasExpansion ? "cursor-pointer hover:border-primary/40" : ""}`,
      "data-ocid": `category-card-${label.toLowerCase().replace(/\s+/g, "-")}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "px-4 py-3 flex items-center gap-3",
            onClick: () => hasExpansion && setExpanded((e) => !e),
            role: hasExpansion ? "button" : void 0,
            "aria-expanded": hasExpansion ? expanded : void 0,
            tabIndex: hasExpansion ? 0 : void 0,
            onKeyDown: (e) => {
              if (hasExpansion && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                setExpanded((prev) => !prev);
              }
            },
            children: [
              icon && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground truncate", children: label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 ml-2 shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-mono text-sm font-bold ${scoreColor}`, children: score }),
                    hasExpansion && (expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-3.5 h-3.5 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3.5 h-3.5 text-muted-foreground" }))
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-border rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `h-full rounded-full transition-all duration-1000 ease-out ${barColor}`,
                    style: { width: barWidth }
                  }
                ) })
              ] })
            ]
          }
        ),
        expanded && relevantTips.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-3 pt-1 border-t border-border/50 space-y-2", children: relevantTips.map((tip) => /* @__PURE__ */ jsxRuntimeExports.jsx(TipCard, { tip, compact: true }, tip.id)) })
      ]
    }
  );
}
export {
  CategoryScoreCard as C,
  TipCard as T
};
