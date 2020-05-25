'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

const baseColor = "rgba(0,255,255,1)";
function FPSStat({ color, fontSize, capacity }) {
    const [fps, setFps] = React.useState([0]);
    React.useEffect(() => {
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
        flexDirection: "column",
        height: "100%",
        width: "100%",
        padding: "3px",
        color: color == undefined ? baseColor : color,
        fontSize: fontSize == undefined ? "0.75em" : fontSize,
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: "bold",
    };
    const maxFps = Math.max.apply(Math.max, fps);
    const barWidth = 100 / capacity;
    return (React__default.createElement("div", { style: wrapperStyle },
        React__default.createElement("span", { style: { zIndex: 101 } },
            fps[fps.length - 1],
            " FPS"),
        React__default.createElement("svg", { style: { height: "100%", width: "100%", overflow: "visible" } }, fps.map((fpsNow, i) => {
            const height = fpsNow == 0 ? 0 : (100 * fpsNow) / maxFps;
            return (React__default.createElement("rect", { key: i, x: `${100 - barWidth - i * barWidth}%`, y: `${100 - height}%`, width: `${barWidth * 1.2}%`, height: `${height}%`, fill: color == undefined ? baseColor : color }));
        }))));
}

module.exports = FPSStat;
//# sourceMappingURL=index.js.map
