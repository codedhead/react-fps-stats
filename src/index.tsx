import React, { useEffect, useState } from "react";

export default function FPSStat() {
  //const [frame, setFrame] = useState(0);
  const [startTime, setStartTime] = useState(0);
  //const [prevTime, setPrevTime] = useState(0);
  const [fps, setFps] = useState([0]);

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

        console.log(fpsList);
        //let sliceStart = Math.min(fpsList.length - 300, 0);
        //fpsList = fpsList.slice(sliceStart, fpsList.length);
        setFps(fpsList);
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
    bottom: "0px",
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
