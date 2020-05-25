import typescript from "rollup-plugin-typescript2";
import commonjs from "rollup-plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import resolve from "rollup-plugin-node-resolve";

export default {
  input: "src/index.tsx",
  output: [
    {
      file: "./dist/index.js",
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "./dist/index.esm.js",
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    external(),
    resolve(),
    typescript(),
    commonjs({
      namedExports: {
        react: ["useState", "useEffect", "useRef", "useLayoutEffect"],
      },
    }),
  ],
};
