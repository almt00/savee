import React from "react";
import { fetchAsyncUser, getUser } from "../../features/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const id = 1; // variavel de sessao ou algo assim no login
let name;

export default function DisplayName() {
  const dispatch = useDispatch();
  const userData = useSelector(getUser);

  useEffect(() => {
    dispatch(fetchAsyncUser(id)); // fazer o fetch com redux
  }, []);

  if (userData.status === 200) {
    name = userData.user.name.split(" ")[0];
  }
  return <h2>Olá {name}!</h2>;
}
