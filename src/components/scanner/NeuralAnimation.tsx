import { useEffect, useState } from 'react';

export function NeuralAnimation() {
  const [nodes] = useState(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: 50 + Math.cos((i * Math.PI * 2) / 12) * 35,
      y: 50 + Math.sin((i * Math.PI * 2) / 12) * 35,
    }))
  );

  const [activeConnections, setActiveConnections] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newActive = Array.from({ length: 4 }, () =>
        Math.floor(Math.random() * nodes.length)
      );
      setActiveConnections(newActive);
    }, 500);

    return () => clearInterval(interval);
  }, [nodes.length]);

  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Connections */}
        {nodes.map((node, i) =>
          nodes.slice(i + 1).map((otherNode, j) => {
            const isActive =
              activeConnections.includes(i) ||
              activeConnections.includes(i + j + 1);
            return (
              <line
                key={`${i}-${j}`}
                x1={node.x}
                y1={node.y}
                x2={otherNode.x}
                y2={otherNode.y}
                stroke={isActive ? 'hsl(187, 92%, 69%)' : 'hsl(217, 33%, 25%)'}
                strokeWidth={isActive ? 0.8 : 0.3}
                strokeDasharray={isActive ? '0' : '2,2'}
                className="transition-all duration-300"
              />
            );
          })
        )}

        {/* Center node */}
        <circle
          cx="50"
          cy="50"
          r="8"
          fill="none"
          stroke="hsl(187, 92%, 69%)"
          strokeWidth="1.5"
          className="animate-pulse-glow"
        />
        <circle
          cx="50"
          cy="50"
          r="4"
          fill="hsl(187, 92%, 69%)"
          className="animate-pulse-glow"
        />

        {/* Outer nodes */}
        {nodes.map((node, i) => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r={activeConnections.includes(i) ? 4 : 2.5}
              fill={
                activeConnections.includes(i)
                  ? 'hsl(160, 84%, 60%)'
                  : 'hsl(217, 33%, 40%)'
              }
              className="transition-all duration-300"
            />
            {activeConnections.includes(i) && (
              <circle
                cx={node.x}
                cy={node.y}
                r="6"
                fill="none"
                stroke="hsl(160, 84%, 60%)"
                strokeWidth="0.5"
                className="animate-ping"
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              />
            )}
          </g>
        ))}

        {/* Scanning ring */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="hsl(187, 92%, 69%)"
          strokeWidth="0.5"
          strokeDasharray="4,4"
          className="origin-center animate-spin"
          style={{ animationDuration: '8s' }}
        />
      </svg>

      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-radial from-cyan/20 via-transparent to-transparent animate-pulse-glow" />
    </div>
  );
}
