"use client";

import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>Name Card</title>
        <meta name="description" content="Name card with contact details" />
      </Head>
      <div className="home-page h-screen flex justify-center items-center">
        <Image src={'/pngwing.com.png'} alt="logo" width={200} height={200} />
      </div>
    </>
  );
}
