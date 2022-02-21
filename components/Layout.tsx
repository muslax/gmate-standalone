import Head from "next/head";
import React from "react";

export default function Layout(
  { title="GmateStandalone", children }: 
  { title:string, children: React.ReactNode}
) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="bg-sky-100 antialiased">
        <div className="bg-white max-w-4xl mx-auto min-h-screen px-6">
          {children}
        </div>
      </div>
    </>
  )
}