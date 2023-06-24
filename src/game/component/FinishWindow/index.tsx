import { FinishMessage } from "./interface";
import style from "./window.module.css";
import React from "react";

type prop = {
  content: string;
  onReset: Function;
};

export default function FinishWindow({ content, onReset }: prop) {
  return (
    <>
      <hr style={{ margin: "30px 0" }} />
      <h1
        style={{ width: "100%", textAlign: "center", color: "#c11000" }}
      >
        Game Over!!
      </h1>
      <h2 style={{ width: "100%", textAlign: "center", color: "gray" }}>
        {content}
      </h2>
      <div style={{ width: "100%", textAlign: "center" }}>
        <button
          onClick={() => onReset()}
          className={style.btn}
          style={{ fontSize: "1.25rem" }}
        >
          เริ่มใหม่อีกครั้ง
        </button>
      </div>
      <hr style={{ margin: "30px 0" }} />
    </>
  );
}
