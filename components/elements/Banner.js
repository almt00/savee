import { styled } from '@stitches/react';
import Button from './Button';
import Link from "next/link";

import React from "react";
import { fetchAsyncGroup, getGroup } from '../../store/GroupSlice';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";


export default function Banner(props) {//via props é enviado o dia de hoje


  const [isShown, setIsShown] = useState(true);

  function ShownFalse() {
    setIsShown(false)
  }

  let toDay = props.toDay;//recolhe do props o valor do dia atual para depois comparar

  const id = 1;//Id para identificar o grupo a ir buscar dados
  let invoice = "";//para guardar data do grupo

  const dispatch = useDispatch();
  const groupData = useSelector(getGroup);

  useEffect(() => {
    dispatch(fetchAsyncGroup(id)); // fazer o fetch com redux
  }, [dispatch]);

  if (groupData.status === 200) {
    invoice = groupData.group.invoice_date;//Guarda o dia do invoice do grupo
    console.log(invoice)
  }
  const groupFullDate = new Date(invoice);
  const payDate = groupFullDate.getDate();
  console.log(payDate);

  const checkDate = toDay + 4;
  if (payDate <= checkDate) {
    console.log("inside if")
    //setIsShown(true) não me permite alterar a variável de estado, "react limita o número de renders para evitar loops"
  }
  //Se os dois valores forem iguais o banner é apresentado
  if ((payDate <= checkDate) & (isShown == true)) {
    console.log("sucess")
    return (
      <Container>
        <BannerText>Está na hora de pagar!</BannerText>
        <Link href='/invoice'>
          <Button size='md' bg='primary' onClick={ShownFalse}>
            Inserir fatura
          </Button>
        </Link>
      </Container>
    );
  }
};

const BannerText = styled('p', {
  color: '$white',
  fontSize: '$normal',
  fontWeight: '$normal',
  alignSelf: 'center',
});

const Container = styled('div', {
  backgroundColor: '$black',
  borderRadius: '12px',
  padding: '1rem 1.5rem',
  display: 'flex',
  justifyContent: 'space-between',
});

