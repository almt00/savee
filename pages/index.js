import Head from "next/head";
import { Inter } from "@next/font/google";
import { styled } from "../stitches.config";
import Landing from "./landing";

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <main>
        <Landing/>
      </main>
    </>
  );
}
