"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FPSStat;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function FPSStat() {
  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      frame = _useState2[0],
      setFrame = _useState2[1];

  var _useState3 = (0, _react.useState)(0),
      _useState4 = _slicedToArray(_useState3, 2),
      startTime = _useState4[0],
      setStartTime = _useState4[1];

  var _useState5 = (0, _react.useState)(0),
      _useState6 = _slicedToArray(_useState5, 2),
      prevTime = _useState6[0],
      setPrevTime = _useState6[1];

  var _useState7 = (0, _react.useState)([0]),
      _useState8 = _slicedToArray(_useState7, 2),
      fps = _useState8[0],
      setFps = _useState8[1];

  var calcFPS = function calcFPS() {
    var currentTime = +new Date();
    setFrame(frame + 1);

    if (currentTime > prevTime + 1000) {
      var fpsNow = Math.round(frame * 1000 / (currentTime - prevTime));
      var fpsList = fps.concat(fpsNow);
      var sliceStart = Math.min(fpsList.length - 300, 0);
      fpsList = fpsList.slice(sliceStart, fpsList.length);
      setFps(fpsList);
      setFrame(0);
      setPrevTime(currentTime);
    }
  };

  var wrapperStyle = {
    zIndex: 999999,
    //position: 'fixed',
    height: "46px",
    width: "300px",
    padding: "3px",
    backgroundColor: "#000",
    color: "#00ffff",
    fontSize: "9px",
    lineHeight: "10px",
    fontFamily: "Helvetica, Arial, sans-serif" //fontWeight: 'bold',
    //MozBoxSizing: 'border-box',
    //boxSizing: 'border-box',
    //pointerEvents: 'none',

  };
  var graphStyle = {
    //position: 'absolute',
    left: "3px",
    right: "3px",
    bottom: "3px",
    height: "200px",
    backgroundColor: "#282844" //MozBoxSizing: 'border-box',
    //boxSizing: 'border-box'

  };

  var barStyle = function barStyle(height, i) {
    return {
      //position: 'absolute',
      bottom: "0",
      right: fps.length - 1 - i + "px",
      height: height + "px",
      width: "1px",
      backgroundColor: "#00ffff" //MozBoxSizing: 'border-box',
      //boxSizing: 'border-box'

    };
  };

  var maxFps = Math.max.apply(Math.max, fps);
  return /*#__PURE__*/_react.default.createElement("div", {
    style: wrapperStyle
  }, /*#__PURE__*/_react.default.createElement("span", null, fps[fps.length - 1], " FPS"), /*#__PURE__*/_react.default.createElement("div", {
    style: graphStyle
  }, fps.map(function (fps, i) {
    var height = 300 * fps / maxFps;
    return /*#__PURE__*/_react.default.createElement("div", {
      key: "fps-".concat(i),
      style: barStyle(height, i)
    });
  })));
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50c3giXSwibmFtZXMiOlsiRlBTU3RhdCIsImZyYW1lIiwic2V0RnJhbWUiLCJzdGFydFRpbWUiLCJzZXRTdGFydFRpbWUiLCJwcmV2VGltZSIsInNldFByZXZUaW1lIiwiZnBzIiwic2V0RnBzIiwiY2FsY0ZQUyIsImN1cnJlbnRUaW1lIiwiRGF0ZSIsImZwc05vdyIsIk1hdGgiLCJyb3VuZCIsImZwc0xpc3QiLCJjb25jYXQiLCJzbGljZVN0YXJ0IiwibWluIiwibGVuZ3RoIiwic2xpY2UiLCJ3cmFwcGVyU3R5bGUiLCJ6SW5kZXgiLCJoZWlnaHQiLCJ3aWR0aCIsInBhZGRpbmciLCJiYWNrZ3JvdW5kQ29sb3IiLCJjb2xvciIsImZvbnRTaXplIiwibGluZUhlaWdodCIsImZvbnRGYW1pbHkiLCJncmFwaFN0eWxlIiwibGVmdCIsInJpZ2h0IiwiYm90dG9tIiwiYmFyU3R5bGUiLCJpIiwibWF4RnBzIiwibWF4IiwiYXBwbHkiLCJtYXAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFZSxTQUFTQSxPQUFULEdBQW1CO0FBQUEsa0JBQ04scUJBQVMsQ0FBVCxDQURNO0FBQUE7QUFBQSxNQUN6QkMsS0FEeUI7QUFBQSxNQUNsQkMsUUFEa0I7O0FBQUEsbUJBRUUscUJBQVMsQ0FBVCxDQUZGO0FBQUE7QUFBQSxNQUV6QkMsU0FGeUI7QUFBQSxNQUVkQyxZQUZjOztBQUFBLG1CQUdBLHFCQUFTLENBQVQsQ0FIQTtBQUFBO0FBQUEsTUFHekJDLFFBSHlCO0FBQUEsTUFHZkMsV0FIZTs7QUFBQSxtQkFJVixxQkFBUyxDQUFDLENBQUQsQ0FBVCxDQUpVO0FBQUE7QUFBQSxNQUl6QkMsR0FKeUI7QUFBQSxNQUlwQkMsTUFKb0I7O0FBTWhDLE1BQU1DLE9BQU8sR0FBRyxTQUFWQSxPQUFVLEdBQU07QUFDcEIsUUFBTUMsV0FBVyxHQUFHLENBQUMsSUFBSUMsSUFBSixFQUFyQjtBQUNBVCxJQUFBQSxRQUFR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ImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBGUFNTdGF0KCkge1xyXG4gIGNvbnN0IFtmcmFtZSwgc2V0RnJhbWVdID0gdXNlU3RhdGUoMCk7XHJcbiAgY29uc3QgW3N0YXJ0VGltZSwgc2V0U3RhcnRUaW1lXSA9IHVzZVN0YXRlKDApO1xyXG4gIGNvbnN0IFtwcmV2VGltZSwgc2V0UHJldlRpbWVdID0gdXNlU3RhdGUoMCk7XHJcbiAgY29uc3QgW2Zwcywgc2V0RnBzXSA9IHVzZVN0YXRlKFswXSk7XHJcblxyXG4gIGNvbnN0IGNhbGNGUFMgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBjdXJyZW50VGltZSA9ICtuZXcgRGF0ZSgpO1xyXG4gICAgc2V0RnJhbWUoZnJhbWUgKyAxKTtcclxuICAgIGlmIChjdXJyZW50VGltZSA+IHByZXZUaW1lICsgMTAwMCkge1xyXG4gICAgICBsZXQgZnBzTm93ID0gTWF0aC5yb3VuZCgoZnJhbWUgKiAxMDAwKSAvIChjdXJyZW50VGltZSAtIHByZXZUaW1lKSk7XHJcbiAgICAgIGxldCBmcHNMaXN0ID0gZnBzLmNvbmNhdChmcHNOb3cpO1xyXG4gICAgICBsZXQgc2xpY2VTdGFydCA9IE1hdGgubWluKGZwc0xpc3QubGVuZ3RoIC0gMzAwLCAwKTtcclxuICAgICAgZnBzTGlzdCA9IGZwc0xpc3Quc2xpY2Uoc2xpY2VTdGFydCwgZnBzTGlzdC5sZW5ndGgpO1xyXG4gICAgICBzZXRGcHMoZnBzTGlzdCk7XHJcbiAgICAgIHNldEZyYW1lKDApO1xyXG4gICAgICBzZXRQcmV2VGltZShjdXJyZW50VGltZSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgd3JhcHBlclN0eWxlID0ge1xyXG4gICAgekluZGV4OiA5OTk5OTksXHJcbiAgICAvL3Bvc2l0aW9uOiAnZml4ZWQnLFxyXG4gICAgaGVpZ2h0OiBcIjQ2cHhcIixcclxuICAgIHdpZHRoOiBcIjMwMHB4XCIsXHJcbiAgICBwYWRkaW5nOiBcIjNweFwiLFxyXG4gICAgYmFja2dyb3VuZENvbG9yOiBcIiMwMDBcIixcclxuICAgIGNvbG9yOiBcIiMwMGZmZmZcIixcclxuICAgIGZvbnRTaXplOiBcIjlweFwiLFxyXG4gICAgbGluZUhlaWdodDogXCIxMHB4XCIsXHJcbiAgICBmb250RmFtaWx5OiBcIkhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWZcIixcclxuICAgIC8vZm9udFdlaWdodDogJ2JvbGQnLFxyXG4gICAgLy9Nb3pCb3hTaXppbmc6ICdib3JkZXItYm94JyxcclxuICAgIC8vYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXHJcbiAgICAvL3BvaW50ZXJFdmVudHM6ICdub25lJyxcclxuICB9O1xyXG5cclxuICBjb25zdCBncmFwaFN0eWxlID0ge1xyXG4gICAgLy9wb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuICAgIGxlZnQ6IFwiM3B4XCIsXHJcbiAgICByaWdodDogXCIzcHhcIixcclxuICAgIGJvdHRvbTogXCIzcHhcIixcclxuICAgIGhlaWdodDogXCIyMDBweFwiLFxyXG4gICAgYmFja2dyb3VuZENvbG9yOiBcIiMyODI4NDRcIixcclxuICAgIC8vTW96Qm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXHJcbiAgICAvL2JveFNpemluZzogJ2JvcmRlci1ib3gnXHJcbiAgfTtcclxuICBjb25zdCBiYXJTdHlsZSA9IChoZWlnaHQ6IG51bWJlciwgaTogbnVtYmVyKSA9PiAoe1xyXG4gICAgLy9wb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuICAgIGJvdHRvbTogXCIwXCIsXHJcbiAgICByaWdodDogZnBzLmxlbmd0aCAtIDEgLSBpICsgXCJweFwiLFxyXG4gICAgaGVpZ2h0OiBoZWlnaHQgKyBcInB4XCIsXHJcbiAgICB3aWR0aDogXCIxcHhcIixcclxuICAgIGJhY2tncm91bmRDb2xvcjogXCIjMDBmZmZmXCIsXHJcbiAgICAvL01vekJveFNpemluZzogJ2JvcmRlci1ib3gnLFxyXG4gICAgLy9ib3hTaXppbmc6ICdib3JkZXItYm94J1xyXG4gIH0pO1xyXG5cclxuICBjb25zdCBtYXhGcHMgPSBNYXRoLm1heC5hcHBseShNYXRoLm1heCwgZnBzKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgc3R5bGU9e3dyYXBwZXJTdHlsZX0+XHJcbiAgICAgIDxzcGFuPntmcHNbZnBzLmxlbmd0aCAtIDFdfSBGUFM8L3NwYW4+XHJcbiAgICAgIDxkaXYgc3R5bGU9e2dyYXBoU3R5bGV9PlxyXG4gICAgICAgIHtmcHMubWFwKChmcHMsIGkpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGhlaWdodCA9ICgzMDAgKiBmcHMpIC8gbWF4RnBzO1xyXG4gICAgICAgICAgcmV0dXJuIDxkaXYga2V5PXtgZnBzLSR7aX1gfSBzdHlsZT17YmFyU3R5bGUoaGVpZ2h0LCBpKX0gLz47XHJcbiAgICAgICAgfSl9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG4iXX0=