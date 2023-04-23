import { styled } from "@stitches/react";
import Chart from "../elements/Chart";
import Button from "../elements/Button";
import Card from "../elements/Card";
import Image from "next/image";
import { useEffect } from "react";
import {
  fetchAsyncPaymentGroupDetailsSlice,
  getPaymentGroupDetails,
} from "../../store/PaymentGroupDetailsSlice";
import { useDispatch, useSelector } from "react-redux";

const PaymentCard = ({ id }) => {
  const dispatch = useDispatch();
  const paymentGroupDetails = useSelector(getPaymentGroupDetails);

  const houseid = 1;
  const paymentid = id;

  useEffect(() => {
    if (paymentGroupDetails.status !== 200) {
      dispatch(fetchAsyncPaymentGroupDetailsSlice({ houseid, paymentid }));
    }
  }, [dispatch]);

  if (paymentGroupDetails.status === 200) {
    let totalValue = paymentGroupDetails.paymentGroupDetails.value_payment;
    let obj = paymentGroupDetails.paymentGroupDetails.UserPayment;

    // map obj and return all colleagues
    const PaymentGroup = obj.map((user, key) => {
      let percentage = user.payment_percentage * totalValue;
      let name = user.user.first_name;

      return (
        <User key={key}>
          <Image
            src="/img/user_bird_profile_icon.svg"
            alt="Avatar"
            className="ml-6 "
            width="38"
            height="38"
          />
          <SubTitle>{name}</SubTitle>
          <Percentage>{percentage}</Percentage>
        </User>
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
          <UsersContainer>{PaymentGroup}</UsersContainer>
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
