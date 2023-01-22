import { styled } from "@stitches/react";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getPage } from "../../store/PageSlice";

// falta fazer a logica de selecionar a area da app no menu
const collapseMenu = function (e) {
  e.preventDefault();
  let menu = document.getElementById("menu");
  let overlay = document.getElementById("menu_overlay");
  menu.style.transform = "translate(-100%)";
  menu.style.transition = "0.3s ease-out";
  overlay.style.transform = "translate(-100%)";
  document.documentElement.style.overflow = "initial";
};

export default function Menu() {
  let page = useSelector(getPage);
  useEffect(() => {
    if (document.getElementById(page) !== null) {
      document.getElementById(page).className = "";
      document.getElementById(page).className = "selected";
      document.getElementById(page).style.backgroundColor = "$yellow";
    }
  }, [page]);

  const router = useRouter();
  const { asPath } = useRouter();
  const handleClick = (event, path) => {
    event.preventDefault();
    router.push(path);
  };
  return (
    <>
      <div
        id="menu_overlay"
        onClick={collapseMenu}
        className="h-screen w-screen absolute z-40 bg-muted opacity-50 backdrop-blur-md -translate-x-full"
      ></div>

      <div
        id="menu"
        className="h-screen w-3/4 absolute z-50 bg-white pt-1 -translate-x-full flex flex-col justify-between"
        onClick={collapseMenu}
      >
        <div>
          <Link href="" onClick={(e) => handleClick(e, "/homepage")}>
            <img
              src="/img/logo_alt.svg"
              className="mt-6 ml-6"
              alt="Savee logo"
            />
          </Link>
          <MenuList>
            <Link href="/homepage" onClick={(e) => handleClick(e, "/homepage")}>
              <li className="" id="homepage">
                <img src="/img/home-icon.svg" className="ml-6" alt="Home" />
                <h2>Homepage</h2>
              </li>
            </Link>
            <Link
              href="/all-usage"
              onClick={(e) => handleClick(e, "/all-usage")}
            >
              <li className="" id="usage">
                <img
                  src="/img/chart-pie-icon.svg"
                  className="ml-6"
                  alt="Histórico uso"
                />
                <h2>Histórico uso</h2>
              </li>
            </Link>
            <Link
              href="/create-routine"
              onClick={(e) => handleClick(e, "/create-routine")}
            >
              <li className="" id="routines">
                <img src="/img/sun-icon.svg" className="ml-6" alt="Rotinas" />
                <h2>Rotinas</h2>
              </li>
            </Link>
            <Link
              href="/all-payments"
              onClick={(e) => handleClick(e, "/all-payments")}
            >
              <li className="" id="payments">
                <img
                  src="/img/currency-dollar-icon.svg"
                  className="ml-6"
                  alt="Pagamentos"
                />
                <h2>Pagamentos</h2>
              </li>
            </Link>
          </MenuList>
        </div>

        <MenuList size="sm" className="mb-6">
          <li className="h-8">
            <img src="/img/user-bird.svg" className="ml-6" alt="Avatar" />
            <div>
              <h4>Pedro</h4>
              <p>Editar perfil</p>
            </div>
          </li>
          <li className="h-8">
            <img src="/img/icon-settings.svg" className="ml-6" alt="Settings" />
            <h4>Definições</h4>
          </li>
          <li className="h-8">
            <img src="/img/icon-help-circle.svg" className="ml-6" alt="Ajuda" />
            <h4>Ajuda</h4>
          </li>
        </MenuList>
      </div>
    </>
  );
}

const MenuList = styled("ul", {
  marginTop: "1.5rem",
  li: {
    display: "flex",
    gap: "1.5rem",
    height: "4rem",
    alignItems: "center",
    borderRadius: "0px 8px 8px 0px",
    width: "90%",
    transition: "background-color 0.3s ease",
  },
  "#homepage": {
    "&:hover, &.selected": {
      backgroundColor: "$mint",
    },
  },
  "#usage": {
    "&:hover, &.selected": {
      backgroundColor: "$orange",
    },
  },
  "#routines": {
    "&:hover, &.selected": {
      backgroundColor: "$purple",
    },
  },
  "#payments": {
    "&:hover, &.selected": {
      backgroundColor: "$skyblue",
    },
  },
  variants: {
    size: {
      sm: {
        li: {
          display: "flex",
          gap: "1.5rem",
          height: "3.5rem",
          alignItems: "center",
          borderRadius: "0px 8px 8px 0px",
          width: "90%",
          backgroundColor: "transparent",
        },
        "li:nth-child(n)": {
          "&:hover, &.selected": {
            backgroundColor: "transparent",
          },
        },
      },
    },
  },
});
