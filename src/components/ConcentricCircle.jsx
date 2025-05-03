import { Zap } from "lucide-react";
import React, { useState, useEffect, useMemo } from "react";

const ConcentricCircle = ({ percentage = 75, tabIndex = 0 }) => {
  const [currentPercentage, setCurrentPercentage] = useState(0);

  const getRotationDegrees = useMemo(() => {
    switch (tabIndex) {
      case 0:
        return { arc1: 0, arc5: 0 };
      case 1:
        return { arc1: 120, arc5: 120 };
      case 2:
        return { arc1: 270, arc5: 270 };
      default:
        return { arc1: 0, arc5: 0 };
    }
  }, [tabIndex]);

  const calculateArc = (percent) => {
    const angle = (percent / 100) * 360;
    const angleRad = (angle * Math.PI) / 180;

    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + angleRad;

    const radius = 120;

    const endX = 200 + radius * Math.cos(endAngle);
    const endY = 200 + radius * Math.sin(endAngle);

    const largeArcFlag = angle > 180 ? 1 : 0;

    return `M 200,80 A ${radius},${radius} 0 ${largeArcFlag},1 ${endX.toFixed(
      1
    )},${endY.toFixed(1)}`;
  };

  useEffect(() => {
    setCurrentPercentage(0);

    const animationInterval = setInterval(() => {
      setCurrentPercentage((prev) => {
        if (prev >= percentage) {
          clearInterval(animationInterval);
          return percentage;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(animationInterval);
  }, [percentage]);

  const tickMarks = Array.from({ length: 90 }, (_, index) => {
    const angle = (index * 4 * Math.PI) / 180;
    const innerRadius = 120;
    const outerRadius = 135;
    const x1 = 200 + innerRadius * Math.cos(angle);
    const y1 = 200 + innerRadius * Math.sin(angle);
    const x2 = 200 + outerRadius * Math.cos(angle);
    const y2 = 200 + outerRadius * Math.sin(angle);
    return (
      <line
        key={index}
        x1={x1.toFixed(1)}
        y1={y1.toFixed(1)}
        x2={x2.toFixed(1)}
        y2={y2.toFixed(1)}
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="2"
      />
    );
  });

  return (
    <>
      <style>
        {`
            .arc1 {
            //   animation: rotateArc1${tabIndex} 10s linear infinite;
              transform-origin: 200px 200px;
              transform: rotate(${getRotationDegrees.arc1}deg);
              transition: transform 0.5s ease-in-out;
              }
              .arc5 {
                animation: rotateArc5${tabIndex} 6s linear infinite;
                transform-origin: 200px 200px;
                transition: transform 0.5s ease-in-out;
              transform: rotate(${getRotationDegrees.arc5}deg);
            }
            .progress-arc {
              filter: drop-shadow(0 0 6px rgba(255, 69, 0, 0.7));
            }
          `}
      </style>
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 400 400"
          xmlSpace="preserve"
        >
          <defs>
            <linearGradient
              id="progressGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#ff7300" />
              <stop offset="100%" stopColor="#ff3500" />
            </linearGradient>
          </defs>

          <rect width="400" height="400" fill="transparent" />

          <circle
            cx="200"
            cy="200"
            r="180"
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="4"
            strokeDasharray="4 4"
          />

          <path
            className="arc1"
            d="M 200,20 A 180,180 0 0,1 356,290"
            fill="none"
            stroke="rgba(255,255,255,1)"
            strokeWidth="3"
          />

          <circle
            cx="200"
            cy="200"
            r="140"
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="2"
          />

          <circle
            cx="200"
            cy="200"
            r="120"
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="2"
          />

          <path
            className="progress-arc"
            d={calculateArc(currentPercentage)}
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="5"
            strokeLinecap="round"
          />

          <g stroke="rgba(255,255,255,0.15)" strokeWidth="2">
            {tickMarks}
          </g>

          <circle
            cx="200"
            cy="200"
            r="90"
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="3"
          />

          <circle
            cx="200"
            cy="200"
            r="80"
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="6"
          />

          <path
            className="arc5"
            d="M 200,120 A 80,80 0 0,1 269.3,240"
            fill="none"
            stroke="rgba(255,255,255,1)"
            strokeWidth="6"
          />

          <g>
            <text
              x="380.9"
              y="120.9"
              fill="white"
              fontSize="14"
              fontFamily="Arial"
              textAnchor="middle"
            >
              01
            </text>
            <text
              x="187.8"
              y="398.8"
              fill="white"
              fontSize="14"
              fontFamily="Arial"
              textAnchor="middle"
            >
              02
            </text>
            <text
              x="18.3"
              y="120.9"
              fill="white"
              fontSize="14"
              fontFamily="Arial"
              textAnchor="middle"
            >
              03
            </text>
          </g>
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-[20px]">
          <div>
            <Zap size={20} color="#ff7300" />
          </div>
          <div className="text-center font-bold text-5xl text-orange-500 flex items-center justify-center">
            <h1 className="inline">{currentPercentage}</h1>
            <span className="text-sm ml-1">%</span>
          </div>
          <div className="text-center">
            <p>Electric</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConcentricCircle;
