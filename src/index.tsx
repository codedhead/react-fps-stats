import React, { useEffect, useState } from "react";

export default function FPSStat() {
  const [startTime, setStartTime] = useState(0);
  const [fps, setFps] = useState([0]);

  const capacity = 20;

  useEffect(() => {
    let afRequest = 0;
    const currentTime = +new Date();
    setStartTime(currentTime);
    let prevTime = currentTime;
    let frame = 0;
    let fpsList = [0];

    let calcFPS = () => {
      const currentTime = +new Date();
      frame = frame + 1;
      //console.log(frame);
      if (currentTime > prevTime + 1000) {
        let fpsNow = Math.round((frame * 1000) / (currentTime - prevTime));
        //fpsNow = 30;

        fpsList = fpsList.concat(fpsNow);

        if (fpsList.length > capacity) {
          fpsList = fpsList.slice(1, capacity + 2);
        }

        //let sliceStart = Math.min(fpsList.length - capacity, 0);

        setFps(fpsList);
        console.log(fpsList);
        frame = 0;
        prevTime = currentTime;
      }

      afRequest = requestAnimationFrame(calcFPS);
    };

    afRequest = requestAnimationFrame(calcFPS);

    return () => {
      //calcFPS = () => {};
      cancelAnimationFrame(afRequest);
    };
  }, []);

  useEffect(() => {
    //
  });

  const wrapperStyle = {
    zIndex: 100,
    //position: "fixed" as "fixed",
    display: "flex",
    flexDirection: "column" as "column",
    height: "150px",
    width: "300px",
    padding: "3px",
    //backgroundColor: "#000",
    color: "#00ffff",
    fontSize: "0.75em",
    //lineHeight: "10px",
    fontFamily: "Helvetica, Arial, sans-serif",
    fontWeight: "bold" as "bold",
  };

  const maxFps = Math.max.apply(Math.max, fps);
  const barWidth = 100 / capacity;

  return (
    <div style={wrapperStyle}>
      <span style={{ zIndex: 101 }}>{fps[fps.length - 1]} FPS</span>
      <svg style={{ height: "150px", width: "300px", overflow: "visible" }}>
        {fps.map((fpsNow, i) => {
          const height = (100 * fpsNow) / maxFps;
          return (
            <rect
              x={`${100 - barWidth - i * barWidth}%`}
              y={`${100 - height}%`}
              width={`${barWidth * 1.2}%`}
              height={`${height}%`}
              fill={"#00ffff"}
            />
          );
        })}
      </svg>
    </div>
  );
}
