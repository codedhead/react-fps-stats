'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

function FPSStat() {
    //const [startTime, setStartTime] = useState(0);
    const [fps, setFps] = React.useState([0]);
    const capacity = 20;
    React.useEffect(() => {
        let afRequest = 0;
        const currentTime = +new Date();
        //setStartTime(currentTime);
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
    React.useEffect(() => {
        //
    });
    const wrapperStyle = {
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        padding: "3px",
        color: "#00ffff",
        fontSize: "0.75em",
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
            return (React__default.createElement("rect", { key: i, x: `${100 - barWidth - i * barWidth}%`, y: `${100 - height}%`, width: `${barWidth * 1.2}%`, height: `${height}%`, fill: "#00ffff" }));
        }))));
}

module.exports = FPSStat;
//# sourceMappingURL=index.js.map
