import SplitWithImage from "@/components/features/headfeatures";
import React from "react";

export default function Page() {
  return (
    <div>
      <SplitWithImage />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Welcome to Next.js!</h1>
        <p style={{ textAlign: "center" }}>
          Get started by editing <code>pages/index.js</code> or{" "}
          <code>components/sidebar/sidebar.js</code>
        </p>
        <p style={{ textAlign: "center" }}>
          <a href="https://nextjs.org/docs">Documentation &rarr;</a>
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <a href="https://github.com/vercel/next.js/tree/canary/examples/with-sidebar">
            <img
              alt="GitHub Stars"
              src="https://img.shields.io/github/stars/vercel/next.js?style=social"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
