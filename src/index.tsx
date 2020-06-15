import React, { useEffect, useState, useRef } from "react";

type Props = {
  barColor?: string;
  fontColor?: string;
  fontSize?: string;
  capacity: number;
};

const baseBarColor = "rgba(0,255,255,1)";
const baseFontColor = "rgba(0,255,255,1)";

export default function FPSStat({ fontColor, fontSize, barColor, capacity }: Props): JSX.Element {
  const [fps, setFps] = useState([0]);

  const canvasMain = useRef<HTMLCanvasElement>(null);
  //let ctx: CanvasRenderingContext2D;

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

  useEffect(() => {
    const maxFps = Math.max.apply(Math.max, fps);
    if (canvasMain.current) {
      const ctx = canvasMain.current.getContext("2d");
      const w = canvasMain.current.width;
      const h = canvasMain.current.height;
      if (ctx) {
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = barColor ? barColor : baseBarColor;
        fps.forEach((e, i) => {
          const rh = e / maxFps;
          const ri = capacity - i - 1;
          ctx.fillRect((ri * w) / capacity, h * (1 - rh), w / capacity, rh * h);
        });
      }
    }
  }, [fps]);

  const wrapperStyle = {
    zIndex: 100,
    display: "flex",
    flexDirection: "column" as "column",
    height: "100%",
    width: "100%",
    padding: "3px",
    color: fontColor == undefined ? baseFontColor : fontColor,
    fontSize: fontSize == undefined ? "0.75em" : fontSize,
    fontFamily: "Helvetica, Arial, sans-serif",
    fontWeight: "bold" as "bold",
  };

  const canvasStyle = {
    width: "100%",
    //height: "100%",
  };

  return (
    <div style={wrapperStyle}>
      <span style={{ zIndex: 101 }}>{fps[fps.length - 1]} FPS</span>
      <canvas ref={canvasMain} style={canvasStyle}></canvas>
    </div>
  );
}
