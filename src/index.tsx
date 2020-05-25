import React, { useEffect, useState } from "react";

type Props = {
  color?: string;
  fontSize?: string;
  capacity: number;
};

const baseColor = "rgba(0,255,255,1)";

export default function FPSStat({ color, fontSize, capacity }: Props): JSX.Element {
  const [fps, setFps] = useState([0]);

  useEffect(() => {
    let afRequest = 0;
    const currentTime = +new Date();

    let prevTime = currentTime;
    let frame = 0;
    let fpsList = [0];

    let calcFPS = () => {
      const currentTime = +new Date();
      frame = frame + 1;

      if (currentTime > prevTime + 1000) {
        let fpsNow = Math.round((frame * 1000) / (currentTime - prevTime));

        fpsList = fpsList.concat(fpsNow);

        if (fpsList.length > capacity) {
          fpsList = fpsList.slice(1, capacity + 2);
        }

        setFps(fpsList);
        //console.log(fpsList);
        frame = 0;
        prevTime = currentTime;
      }

      afRequest = requestAnimationFrame(calcFPS);
    };

    afRequest = requestAnimationFrame(calcFPS);

    return () => {
      cancelAnimationFrame(afRequest);
    };
  }, []);

  const wrapperStyle = {
    zIndex: 100,
    display: "flex",
    flexDirection: "column" as "column",
    height: "100%",
    width: "100%",
    padding: "3px",
    color: color == undefined ? baseColor : color,
    fontSize: fontSize == undefined ? "0.75em" : fontSize,
    fontFamily: "Helvetica, Arial, sans-serif",
    fontWeight: "bold" as "bold",
  };

  const maxFps = Math.max.apply(Math.max, fps);
  const barWidth = 100 / capacity;

  return (
    <div style={wrapperStyle}>
      <span style={{ zIndex: 101 }}>{fps[fps.length - 1]} FPS</span>
      <svg style={{ height: "100%", width: "100%", overflow: "visible" }}>
        {fps.map((fpsNow, i) => {
          const height = fpsNow == 0 ? 0 : (100 * fpsNow) / maxFps;
          return (
            <rect
              key={i}
              x={`${100 - barWidth - i * barWidth}%`}
              y={`${100 - height}%`}
              width={`${barWidth * 1.2}%`}
              height={`${height}%`}
              fill={color == undefined ? baseColor : color}
            />
          );
        })}
      </svg>
    </div>
  );
}
