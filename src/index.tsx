import React, { useEffect, useState, useRef, useMemo } from "react";

type Props = {
  barColor?: string;
  fontColor?: string;
  fontSize?: string;
  capacity: number;
  paused?: boolean;
};

const baseBarColor = "rgba(0,255,255,1)";
const baseFontColor = "rgba(0,255,255,1)";

export default function FPSStat({ fontColor, fontSize, barColor, capacity, paused }: Props): JSX.Element {
  const [fpsPointer, setFpsPointer] = useState(0);
  const fpsPointerRef = useRef(0);
  const prevTime = useRef(performance.now());
  const frame = useRef(0);
  const raf = useRef(0);

  useEffect(() => {
    fpsPointerRef.current = fpsPointer;
  });

  const fpsList = useMemo(() => {
    const f = new Array(capacity);
    f.fill(0, 0);
    return f;
  }, [capacity]);

  const canvasMain = useRef<HTMLCanvasElement>(null);

  const calcFPS = () => {
    const currentTime = performance.now();
    frame.current = frame.current + 1;
    if (currentTime > prevTime.current + 1000) {
      const fpsNow = Math.round((frame.current * 1000) / (currentTime - prevTime.current));
      fpsList[fpsPointerRef.current] = fpsNow;
      setFpsPointer((fpsPointerRef.current + 1) % capacity);
      frame.current = 0;
      prevTime.current = currentTime;
    }
    raf.current = requestAnimationFrame(calcFPS);
  };

  useEffect(() => {
    if (!raf.current) {
      raf.current = requestAnimationFrame(calcFPS);
    }
    return () => cancelAnimationFrame(raf.current);
  }, []);

  useEffect(() => {
    if (paused) {
      if (raf.current) {
        cancelAnimationFrame(raf.current);
      }
      raf.current = 0;
    } else {
      if (!raf.current) {
        raf.current = requestAnimationFrame(calcFPS);
      }
    }
  }, [paused]);

  useEffect(() => {
    const maxFps = Math.max.apply(Math.max, fpsList);
    if (canvasMain.current) {
      const ctx = canvasMain.current.getContext("2d");
      const w = canvasMain.current.width;
      const h = canvasMain.current.height;
      if (ctx) {
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = barColor ? barColor : baseBarColor;
        for (let i = 0; i < capacity; i++) {
          const ri = (i - fpsPointer + capacity) % capacity;
          const rh = fpsList[i] / maxFps;
          ctx.fillRect((ri * w) / capacity, h * (1 - rh), w / capacity, rh * h);
        }
      }
    }
  }, [fpsPointer]);

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
      <span style={{ zIndex: 101 }}>{fpsList[(fpsPointer + capacity - 1) % capacity]} FPS</span>
      <canvas ref={canvasMain} style={canvasStyle}></canvas>
    </div>
  );
}
