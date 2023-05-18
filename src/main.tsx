import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const data = {
  env: {
    name: "",
    payload: {
      price: 0,
      size: 0,
    },
  },
};

type DataType = typeof data;

type PathsInRecord<OBJ extends Record<string, any>> = keyof {
  [KEY in keyof OBJ as OBJ[KEY] extends object
    ? KEY extends string | number
      ? PathsInRecord<OBJ[KEY]> extends string
        ? KEY | `${KEY}.${PathsInRecord<OBJ[KEY]>}`
        : never
      : never
    : KEY]: never;
};

type PathTo<T extends Record<string, unknown>> = keyof {
  [K in keyof T as T[K] extends Record<string, unknown>
    ? `${K & string}.${PathTo<T[K]> & string}`
    : K & string]: any;
};

type res = PathsInRecord<DataType>;

const a: res = "env";
const a0: res = "env.name";
const a1: res = "env.payload";
const a2: res = "env.payload.price";
