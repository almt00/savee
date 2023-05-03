import React from "react";
import { fetchAsyncUser, getUser } from "../../store/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { styled } from "@stitches/react";

const id = 1; // variavel de sessao ou algo assim no login
let name;

export default function DisplayName() {
  const dispatch = useDispatch();
  const userData = useSelector(getUser);

  
  useEffect(() => {
    if (userData.status !== 200) {
      dispatch(fetchAsyncUser(id)); // fazer o fetch com redux
    }
  }, [dispatch]);

  if (userData.status === 200) {
    name = userData.user.first_name;
  }
  return <H2 className="!font-extrabold">Olá {name}!</H2>;
}

const H2 = styled("h2", {
  fontSize: "$largeheading",
  fontWeight: "$bolder",
});