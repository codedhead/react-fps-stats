import React, { useEffect, useState } from "react";

export default function FPSStat() {
  const [frame, setFrame] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [prevTime, setPrevTime] = useState(0);
  const [fps, setFps] = useState([0]);

  const calcFPS = () => {
    const currentTime = +new Date();
    setFrame(frame + 1);
    if (currentTime > prevTime + 1000) {
      let fpsNow = Math.round((frame * 1000) / (currentTime - prevTime));
      let fpsList = fps.concat(fpsNow);
      let sliceStart = Math.min(fpsList.length - 300, 0);
      fpsList = fpsList.slice(sliceStart, fpsList.length);
      setFps(fpsList);
      setFrame(0);
      setPrevTime(currentTime);
    }
  };

  const wrapperStyle = {
    zIndex: 999999,
    //position: 'fixed',
    height: "46px",
    width: "300px",
    padding: "3px",
    backgroundColor: "#000",
    color: "#00ffff",
    fontSize: "9px",
    lineHeight: "10px",
    fontFamily: "Helvetica, Arial, sans-serif",
    //fontWeight: 'bold',
    //MozBoxSizing: 'border-box',
    //boxSizing: 'border-box',
    //pointerEvents: 'none',
  };

  const graphStyle = {
    //position: 'absolute',
    left: "3px",
    right: "3px",
    bottom: "3px",
    height: "200px",
    backgroundColor: "#282844",
    //MozBoxSizing: 'border-box',
    //boxSizing: 'border-box'
  };
  const barStyle = (height: number, i: number) => ({
    //position: 'absolute',
    bottom: "0",
    right: fps.length - 1 - i + "px",
    height: height + "px",
    width: "1px",
    backgroundColor: "#00ffff",
    //MozBoxSizing: 'border-box',
    //boxSizing: 'border-box'
  });

  const maxFps = Math.max.apply(Math.max, fps);

  return (
    <div style={wrapperStyle}>
      <span>{fps[fps.length - 1]} FPS</span>
      <div style={graphStyle}>
        {fps.map((fps, i) => {
          const height = (300 * fps) / maxFps;
          return <div key={`fps-${i}`} style={barStyle(height, i)} />;
        })}
      </div>
    </div>
  );
}
