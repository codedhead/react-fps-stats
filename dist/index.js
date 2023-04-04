'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

const baseBarColor = "rgba(0,255,255,1)";
const baseFontColor = "rgba(0,255,255,1)";
function FPSStat({ fontColor, fontSize, barColor, capacity, paused }) {
    const [fpsPointer, setFpsPointer] = React.useState(0);
    const fpsPointerRef = React.useRef(0);
    const prevTime = React.useRef(performance.now());
    const frame = React.useRef(0);
    const raf = React.useRef(0);
    // const [ctx, setCtx] = useState<CanvasRenderingContext2D|null>(null);
    React.useEffect(() => {
        fpsPointerRef.current = fpsPointer;
    });
    const fpsList = React.useMemo(() => {
        const f = new Array(capacity);
        f.fill(0, 0);
        return f;
    }, [capacity]);
    const canvasMain = React.useRef(null);
    // const ctx = useMemo(factory, deps) : CanvasRenderingContext2D;
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
    React.useEffect(() => {
        if (!raf.current) {
            raf.current = requestAnimationFrame(calcFPS);
        }
        return () => cancelAnimationFrame(raf.current);
    }, []);
    React.useEffect(() => {
        if (paused) {
            if (raf.current) {
                cancelAnimationFrame(raf.current);
            }
            raf.current = 0;
        }
        else {
            if (!raf.current) {
                raf.current = requestAnimationFrame(calcFPS);
            }
        }
    }, [paused]);
    React.useEffect(() => {
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
        flexDirection: "column",
        height: "100%",
        width: "100%",
        padding: "3px",
        color: fontColor == undefined ? baseFontColor : fontColor,
        fontSize: fontSize == undefined ? "0.75em" : fontSize,
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: "bold",
    };
    const canvasStyle = {
        width: "100%",
    };
    return (React__default.createElement("div", { style: wrapperStyle },
        React__default.createElement("span", { style: { zIndex: 101 } },
            fpsList[(fpsPointer + capacity - 1) % capacity],
            " FPS"),
        React__default.createElement("canvas", { ref: canvasMain, style: canvasStyle })));
}

module.exports = FPSStat;
//# sourceMappingURL=index.js.map
