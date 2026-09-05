"use client";

import { useState } from "react";

interface IdentityNode {
  id: string;
  label: string;
  tools: string[];
  x: number;
  y: number;
}

const NODES: IdentityNode[] = [
  { id: "research", label: "Research", tools: ["ICETET 2025", "QAMP 2025", "Quantum ML"], x: 200, y: 40 },
  { id: "engineering", label: "Engineering", tools: ["PySpark", "Software Engineering", "Delta Lake"], x: 360, y: 140 },
  { id: "data", label: "Data", tools: ["SQL", "Statistics", "Feature Engineering"], x: 320, y: 300 },
  { id: "quantum", label: "Quantum", tools: ["Qiskit", "Variational Algorithms", "QCBM"], x: 80, y: 300 },
  { id: "ai", label: "AI", tools: ["PyTorch", "TensorFlow", "Keras"], x: 40, y: 140 },
  { id: "visualisation", label: "Visualisation", tools: ["Power BI", "Looker Studio", "Plotly"], x: 200, y: 210 }
];

// Every node connects to every other node — a complete mesh across all six disciplines.
const EDGES: [string, string][] = NODES.flatMap((node, i) =>
  NODES.slice(i + 1).map((other): [string, string] => [node.id, other.id])
);

export function IdentityMap() {
  const [active, setActive] = useState<string | null>(null);
  const activeNode = NODES.find((n) => n.id === active);

  return (
    <div className="grid items-center gap-6 sm:grid-cols-[minmax(0,260px)_1fr]">
      <div className="relative w-full sm:max-w-[260px]">
        <svg viewBox="0 0 400 340" role="img" aria-label="Technical identity map connecting Research, Engineering, Data, Quantum, AI and Visualisation" className="h-auto w-full">
          {EDGES.map(([a, b]) => {
            const nodeA = NODES.find((n) => n.id === a)!;
            const nodeB = NODES.find((n) => n.id === b)!;
            const isActive = active === a || active === b;
            return (
              <line
                key={`${a}-${b}`}
                x1={nodeA.x}
                y1={nodeA.y}
                x2={nodeB.x}
                y2={nodeB.y}
                stroke={isActive ? "#FFD84A" : "rgba(255,216,74,0.28)"}
                strokeWidth={isActive ? 1.5 : 1}
                opacity={isActive ? 0.9 : 0.5}
              />
            );
          })}
          {NODES.map((node) => (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r={active === node.id ? 30 : 26}
                fill={active === node.id ? "#FFD84A" : "#0D1E32"}
                stroke="rgba(255,216,74,0.28)"
                strokeWidth={1}
                tabIndex={0}
                role="button"
                aria-pressed={active === node.id}
                aria-label={`${node.label}: ${node.tools.join(", ")}`}
                className="cursor-pointer outline-none transition-[r,fill] duration-200 focus-visible:stroke-accent focus-visible:stroke-2"
                onMouseEnter={() => setActive(node.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(node.id)}
                onBlur={() => setActive(null)}
                // Touch has no hover: tapping toggles the node instead.
                onClick={() => setActive((current) => (current === node.id ? null : node.id))}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActive((current) => (current === node.id ? null : node.id));
                  }
                }}
              />
              <text
                x={node.x}
                y={node.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="pointer-events-none select-none font-mono"
                fontSize={10}
                fill={active === node.id ? "#02070F" : "#F5E8A8"}
              >
                {node.label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="min-h-[7rem] border-l-2 border-accent pl-4" aria-live="polite">
        {activeNode ? (
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] uppercase tracking-label text-accent">{activeNode.label}</span>
            <ul className="flex flex-col gap-1">
              {activeNode.tools.map((tool) => (
                <li key={tool} className="font-body text-sm leading-snug text-ink">
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <span className="font-mono text-[10px] uppercase leading-relaxed tracking-label text-mute">
            Tap or hover a node to reveal related tools and experience
          </span>
        )}
      </div>

      <ul className="sr-only">
        {NODES.map((node) => (
          <li key={node.id}>
            {node.label}: {node.tools.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}
