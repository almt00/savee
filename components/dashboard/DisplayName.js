import React from "react";
import { fetchAsyncUser, getUser } from "../../store/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const id = 1; // variavel de sessao ou algo assim no login
let name;

export default function DisplayName() {
  const dispatch = useDispatch();
  const userData = useSelector(getUser);

  useEffect(() => {
    if (userData.status !== 200) {
      dispatch(fetchAsyncUser(id)); // fazer o fetch com redux
    }
  }, [dispatch, userData.status]);

  if (userData.status === 200 && userData.user) {
    name = userData.user.first_name;
    console.log(userData.user.first_name);
  }
  return <h2>Olá {name}!</h2>;
}
