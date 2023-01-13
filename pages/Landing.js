import React from "react";
import Button from "../components/elements/Button";
import { styled } from "@stitches/react";
import autoprefixer from "autoprefixer";

const Navbar = styled("div", {
  backgroundColor: "$white",
  boxShadow: "0px 8px 16px rgba(14, 14, 14, 0.08)",
});

const FirstSection = styled("div", {
  backgroundColor: "$mint",
  backgroundImage: "url(/eletrico.svg)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "100% 90%",
  height: "100vh",
  padding: "2rem",
  h2: {
    fontSize: "$h2",
    fontWeight: "800",
  },
  p: {
    fontSize: "$normal",
  },
});

const SecondSection = styled("div", {
  backgroundColor: "$orange",
  height: "100vh",
  padding: "1.5rem",
  h2: {
    fontSize: "$h2",
    fontWeight: "800",
  },
  p: {
    fontSize: "$normal",
  },
});

const Card = styled("div", {
  backgroundColor: "$white",
  borderRadius: "12px",
  position: "relative",
  width: "100vw",
  h3: {
    fontSize: "$h3",
    fontWeight: "800",
  },
  p: {
    fontSize: "$normal",
  },
});

const CardNumber = styled("h1", {
  color: "$orange",
  opacity: "0.6",
  fontSize: "6rem",
  fontWeight: 800,
  position: "absolute",
  lineHeight: "auto",
  right: "1rem",
  top: "-0.5rem",
  marginLeft: "auto",
});

export default function Landing() {
  return (
    <>
      <Navbar className="flex justify-end items-center gap-4 p-4">
        <Button size="lg">Iniciar Sessão</Button>
        <div id="menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
      </Navbar>
      <FirstSection className="flex items-center">
        <div className="flex flex-col items-center gap-6">
          <img src="/logo.svg"></img>
          <h2 className="text-center">
            A forma inteligente de partilhares a tua conta de eletricidade.
          </h2>
          <p className="text-center">
            O Savee ajuda-te a dividir as faturas conforme os teus consumos. Os
            teus consumos, o teu preço!
          </p>
          <Button size="lg">Saber Mais</Button>
        </div>
      </FirstSection>
      <SecondSection className="flex flex-col items-center justify-center gap-12">
        <h2>Como funciona?</h2>
        <div className="flex flex-row overflow-x-scroll">
          <Card id="first-card" className="flex flex-col p-6 gap-4">
            <CardNumber>#1</CardNumber>
            <img src="/onboardingOne.svg" className="z-10"></img>
            <div>
              <h3>Inscreve a tua casa</h3>
              <p>
                Convida os teus colegas de casa a usarem o Savee. Adicionem os
                vossos equipamentos para perceberem os vossos consumos.
              </p>
            </div>
          </Card>
          <Card id="second-card" className="flex flex-col p-6 gap-4">
            <CardNumber>#1</CardNumber>
            <img src="/onboardingOne.svg" className="z-10"></img>
            <div>
              <h3>Inscreve a tua casa</h3>
              <p>
                Convida os teus colegas de casa a usarem o Savee. Adicionem os
                vossos equipamentos para perceberem os vossos consumos.
              </p>
            </div>
          </Card>
        </div>
        <Button size="lg">Começar a Usar</Button>
      </SecondSection>
      <div>footer</div>
    </>
  );
}
