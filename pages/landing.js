import React, { use } from "react";
import Layout from "../components/elements/Layout";
import Button from "../components/elements/Button";
import { styled } from "@stitches/react";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import Image from "next/image";
import Link from "next/link";

export default function Landing() {
  const [activeIndex, setActiveIndex] = useState(0);
  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex > 2) {
      newIndex = 2;
    }
    setActiveIndex(newIndex);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex(activeIndex + 1),
    onSwipedRight: () => updateIndex(activeIndex - 1),
  });

  return (
    <Layout title="Savee" description="Savee">
      <Navbar className="flex justify-end items-center gap-4 p-4"> 
        <Link href="/login"><Button size="lg">Iniciar Sessão</Button></Link>
      </Navbar>
      <FirstSection className="flex items-center justify-cente">
        <div className="flex flex-col items-center gap-6">
          <Image src="/img/logo.svg" width={150} height={150} alt="Savee Logo" />
          <div>
          <h2 className="text-center mb-2">
            A forma inteligente de partilhares a tua conta de eletricidade.
          </h2>
          <p className="text-center mx-2">
            O Savee ajuda-te a dividir as faturas conforme os teus consumos. Os
            teus consumos, o teu preço!
          </p>
          </div>
          <Link href="#about" scroll={false}><Button size="lg">Saber Mais</Button></Link>
        </div>
      </FirstSection>
      <SecondSection className="flex flex-col items-center justify-center gap-12" id="about">
        <h2>Como funciona?</h2>
        <Carousel {...handlers}>
          <Slides style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
            <SlideItem>
              <Card id="first-card" className="flex flex-col p-6 gap-4">
                <CardNumber>#1</CardNumber>
                <img src="/img/onboardingOne.svg" className="z-10" alt="onboarding 1" />
                <div>
                  <h3>Inscreve a tua casa</h3>
                  <p>
                    Convida os teus colegas de casa a usarem o Savee. Adicionem
                    os vossos equipamentos para perceberem os vossos consumos.
                  </p>
                </div>
              </Card>
            </SlideItem>
            <SlideItem>
              <Card id="first-card" className="flex flex-col p-6 gap-4">
                <CardNumber>#2</CardNumber>
                <img src="/img/onboardingTwo.svg" className="z-10" alt="Onboarding 2"></img>
                <div>
                  <h3>Cria as tuas rotinas</h3>
                  <p>
                    Depois de adicionares equipamentos, cria rotinas de uso para
                    os mesmos. O Savee faz o trabalho por ti e calcula os teus
                    consumos.
                  </p>
                </div>
              </Card>
            </SlideItem>
            <SlideItem>
              <Card id="first-card" className="flex flex-col p-6 gap-4">
                <CardNumber>#3</CardNumber>
                <img src="/img/onboardingThree.svg" className="z-10" alt="onboarding 3"></img>
                <div>
                  <h3>Começa a poupar</h3>
                  <p>
                    Quando for a hora de pagar, cada um paga o que consome! O
                    Savee distribui o total da fatura pelos colegas de casa
                    conforme os seus hábitos.
                  </p>
                </div>
              </Card>
            </SlideItem>
          </Slides>
        </Carousel>
        <Link href="/register"><Button size="lg">Começar a Usar</Button></Link>
      </SecondSection>
      <Footer className="flex text-center justify-between items-center">
        <Image src="/img/logo.svg" width={74} height={74} alt="Savee Logo" />
        <p>&copy; Copyright 2022 Savee</p>
      </Footer>
    </Layout>
  );
}

const Navbar = styled("div", {
  backgroundColor: "$white",
  boxShadow: "0px 8px 16px rgba(14, 14, 14, 0.08)",
});

const FirstSection = styled("div", {
  backgroundColor: "$mint",
  backgroundImage: "url(/img/eletrico.svg)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "100% 90%",
  height: "100vh",
  padding: "2rem",
});

const SecondSection = styled("div", {
  backgroundColor: "$orange",
  height: "100vh",
  padding: "1.5rem",
});

const Carousel = styled("div", {
  overflow: "hidden",
});

const Slides = styled("div", {
  whiteSpace: "nowrap",
  transition: "transform 0.3s",
});

const SlideItem = styled("div", {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});

const Card = styled("div", {
  backgroundColor: "$white",
  borderRadius: "12px",
  boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.08)",
  position: "relative",
  alignSelf: "stretch",
  width: "70%",
  margin: "0.5rem",
  h3: {
    whiteSpace: "initial",
  },
  p: {
    whiteSpace: "initial",
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


const Footer = styled("footer", {
  backgroundColor: "$black",
  color: "$white",
  padding: "1.5rem 2rem"
})