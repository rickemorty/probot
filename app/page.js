"use client";
import Script from "next/script"
export default function Home() {
  return <Script src="probot.js" onLoad={()=>probot("655f5b7224009e22a413bbfa-8d5b3e8e6f88eb985134867f7325e1f573f696b4")} />
}
