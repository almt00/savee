import { styled } from "@stitches/react";
import Chart from "../elements/Chart";
import Button from "../elements/Button";
import Card from "../elements/Card";
import Image from "next/image";
import { fetchAsyncPaymentSlice, getPayment } from "../../store/PaymentSlice";
import {
  fetchAsyncPaymentGroupSlice,
  getPaymentGroup,
} from "../../store/PaymentGroupSlice";
import { fetchAsyncUser, getUser } from "../../store/UserSlice";
import { fetchAsyncUsers, getUsers } from "../../store/UsersSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const PaymentCard = (props) => {
  const dispatch = useDispatch();
  const paymentData = useSelector(getPayment);
  const paymentGroupData = useSelector(getPaymentGroup);
  const userData = useSelector(getUser);
  const usersData = useSelector(getUsers);
  const userId = 1;
  const houseId = 1;

  useEffect(() => {
    if (
      paymentData.status !== 200 &&
      paymentGroupData.status !== 200 &&
      userData.status !== 200 &&
      usersData.status !== 200
    ) {
      dispatch(fetchAsyncPaymentSlice(userId));
      dispatch(fetchAsyncPaymentGroupSlice(houseId));
      dispatch(fetchAsyncUser(houseId));
      dispatch(fetchAsyncUsers(houseId));
    }
  }, [dispatch]);

  if (
    paymentData.status === 200 &&
    paymentGroupData.status === 200 &&
    userData.status === 200 &&
    usersData.status === 200
  ) {
    const latestPayment = paymentData.payment[paymentData.payment.length - 1]; // need to change logic to get selected id payment
    const userValue = latestPayment.payment_percentage;
    const percentageOurUser = userValue * 100;

    // filter userData to get colleagues living in the same house_id
    const houseColleagues = usersData.users.filter(
      (colleague) => colleague.house_id === houseId
    );

    console.log(houseColleagues);

    // map houseColleague to get the percentage of each one
    const percentageColleagues = houseColleagues.map((colleague) => {
      // transform object into array
      const obj = Object.values(colleague);
      // get the percentage of each colleague
      const percentageColleague = obj[4] * 100; // não temos o payment_percentage na tabela users
      // get the name of each colleague
      const nameColleague = obj[1];
      return (
        <>
          <User>
            <Image
              src="/img/user_bird_profile_icon.svg"
              alt="Avatar"
              className="ml-6 "
              width="38"
              height="38"
            />
            <SubTitle>{nameColleague}</SubTitle>
            <Percentage>{percentageColleague}%</Percentage>
          </User>
        </>
      );
    });

    return (
      <>
        <Card>
          <Text className="mb-5">
            Com base nos teus comportamentos deste mês, este é o valor
            aproximado a pagares:
          </Text>
          <div className="w-56 m-auto">
            <Chart className="mt-5" environment="payment"></Chart>
          </div>
          <div className="text-center my-4">
            <Link href="">Como calculamos este valor?</Link>
          </div>
          <UsersContainer>{percentageColleagues}</UsersContainer>
          <div className="text-center">
            <Link href={`/homepage?toast=success`}>
              <Button className="mt-6" bg="solid" size="lg">
                Confirmar
              </Button>
            </Link>
          </div>
        </Card>
      </>
    );
  }
};

const UsersContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  gap: "8px",
  margin: "auto",
});

const User = styled("div", {
  width: "5rem",
  textAlign: "center",
});

const Img = styled("img", {
  margin: "auto",
});

const Link = styled("a", {
  fontSize: "$small",
  fontWeight: "$bold",
  color: "$links",
});

const Text = styled("p", {
  color: "$black",
});

const SubTitle = styled("p", {
  color: "$black",
  fontSize: "$small",
  fontWeight: "$bold",
  marginTop: "0.2rem",
});

const Percentage = styled("p", {
  color: "$black",
  fontSize: "$small",
});

export default PaymentCard;
