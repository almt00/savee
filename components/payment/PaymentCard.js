import { styled } from "@stitches/react";
import Chart from "../elements/Chart";
import Button from "../elements/Button";
import Card from "../elements/Card";
import Image from "next/image";
import {
  fetchAsyncPaymentGroupDetailsSlice,
  getPaymentGroupDetails,
} from "../../store/PaymentGroupDetailsSlice";
import { fetchAsyncUser, getUser } from "../../store/UserSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const PaymentCard = (props) => {
  const dispatch = useDispatch();
  const paymentGroupDetailsData = useSelector(getPaymentGroupDetails);
  const userData = useSelector(getUser);
  const userId = 1;
  const houseId = 1;
  const paymentId = 1;

  useEffect(() => {
    if (paymentGroupDetailsData.status === 200 && userData.status !== 200) {
      dispatch(fetchAsyncPaymentGroupDetailsSlice(houseId, paymentId));
      dispatch(fetchAsyncUser(houseId));
    }
  }, [dispatch]);

  if (paymentGroupDetailsData.status === 200 && userData.status === 200) {
    const latestGroupPayment =
      paymentGroupDetailsData.paymentGroup[
        paymentGroupData.paymentGroup.length - 1
      ];

    // map through UserPayment object and output payment_percentage

    const obj = latestGroupPayment.UserPayment;

    console.log(obj);

    const percentageColleagues = latestGroupPayment.UserPayment.map((user) => {
      const percentageColleague = user.payment_percentage;
      const idColleague = user.user_id;
      // map id to name
      const nameColleague = userData.user.find(
        (user) => user.id === idColleague
      ).name;

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
