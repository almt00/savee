import { styled } from "@stitches/react";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getPage } from "../../store/PageSlice";
import Image from "next/image";
import useLogout from "../../utils/logout";

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
  const page = useSelector(getPage);
  const router = useRouter();
  const handleClick = (event, path) => {
    event.preventDefault();
    router.push(path);
  };
  const handleLogout = useLogout(router);

  return (
    <>
      <Link
        href="/homepage#main"
        className="skip-to-main-content-link"
      >
        Skip to main content
      </Link>
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
            <Image
              src="/img/logo_alt.svg"
              className="mt-6 ml-6"
              alt="Savee logo"
              width="80"
              height="35"
            />
          </Link>
          <MenuList>
            <Link href="/homepage" onClick={(e) => handleClick(e, "/homepage")}>
              {page === "homepage" && page ? (
                <li className="selected" id="homepage">
                  <Image
                    src="/img/home-icon.svg"
                    className="ml-6"
                    alt="Home"
                    width="38"
                    height="38"
                  />
                  <H2 aria-hidden="true">Homepage</H2>
                </li>
              ) : (
                <li id="homepage">
                  <Image
                    src="/img/home-icon.svg"
                    className="ml-6"
                    alt="Home"
                    width="38"
                    height="38"
                  />
                  <H2 aria-hidden="true">Homepage</H2>
                </li>
              )}
            </Link>
            <Link
              href="/all-usage"
              onClick={(e) => handleClick(e, "/all-usage")}
            >
              {page === "usage" ? (
                <li className="selected" id="usage">
                  <Image
                    src="/img/chart-pie-icon.svg"
                    className="ml-6"
                    alt="Histórico uso"
                    width="38"
                    height="38"
                  />
                  <H2 aria-hidden="true">Histórico uso</H2>
                </li>
              ) : (
                <li id="usage">
                  <Image
                    src="/img/chart-pie-icon.svg"
                    className="ml-6"
                    alt="Histórico uso"
                    width="38"
                    height="38"
                  />
                  <H2 aria-hidden="true">Histórico uso</H2>
                </li>
              )}
            </Link>
            <Link
              href="/all-routines"
              onClick={(e) => handleClick(e, "/all-routines")}
            >
              {page === "routines" ? (
                <li className="selected" id="routines">
                  <Image
                    src="/img/sun-icon.svg"
                    className="ml-6"
                    alt="Rotinas"
                    width="38"
                    height="38"
                  />
                  <H2 aria-hidden="true">Rotinas</H2>
                </li>
              ) : (
                <li id="routines">
                  <Image
                    src="/img/sun-icon.svg"
                    className="ml-6"
                    alt="Rotinas"
                    width="38"
                    height="38"
                  />
                  <H2 aria-hidden="true">Rotinas</H2>
                </li>
              )}
            </Link>
            <Link
              href="/all-payments"
              onClick={(e) => handleClick(e, "/all-payments")}
            >
              {page === "payments" ? (
                <li className="selected" id="payments">
                  <Image
                    src="/img/currency-dollar-icon.svg"
                    className="ml-6"
                    alt="Pagamentos"
                    width="38"
                    height="38"
                  />
                  <H2 aria-hidden="true">Pagamentos</H2>
                </li>
              ) : (
                <li id="payments">
                  <Image
                    src="/img/currency-dollar-icon.svg"
                    className="ml-6"
                    alt="Pagamentos"
                    width="38"
                    height="38"
                  />
                  <H2 aria-hidden="true">Pagamentos</H2>
                </li>
              )}
            </Link>
          </MenuList>
        </div>

        <MenuList size="sm" className="mb-6">
          <li className="h-8" onClick={handleLogout} id="logoutButton">
            <Image
              src="/img/icon-log-out.svg"
              className="ml-6"
              alt="Logout"
              width="38"
              height="38"
            />
            <H4 className="font-extrabold">Logout</H4>
          </li>
        </MenuList>
      </div>
    </>
  );
}

const H2 = styled("h2", {
  fontSize: "$largeheading",
  fontWeight: "$bolder",
});

const H4 = styled("p", {
  fontSize: "$smallheading",
  fontWeight: "$bolder",
});

const MenuList = styled("menu", {
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
