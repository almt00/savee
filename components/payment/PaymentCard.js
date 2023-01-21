import { styled } from "@stitches/react";
import Chart from "../elements/Chart";
import Button from "../elements/Button";
import Card from "../elements/Card";

const PaymentCard = () => {
  let percentageOurUser = 55;
  let percentageColleagueA = 25;
  let percentageColleagueB = 20;

  return (
    <Card>
      <Text className="mb-5">
        Com base nos teus comportamentos deste mês, este é o valor aproximado a
        pagares:
      </Text>
      <div className="w-56 m-auto">
        <Chart className="mt-5" environment="payment"></Chart>
      </div>
      <div className="text-center my-4">
        <Link href="">Como calculamos este valor?</Link>
      </div>
      <UsersContainer>
        <User>
          <Img src="/img/user_bird_profile_icon.svg" alt="Avatar" />
          <SubTitle>Pedro</SubTitle>
          <Percentage>{percentageOurUser}%</Percentage>
        </User>
        <User>
          <Img src="/img/dog_profile_icon.svg" alt="Avatar" />
          <SubTitle>Asdrúbal</SubTitle>
          <Percentage>{percentageColleagueA}%</Percentage>
        </User>
        <User>
          <Img src="/img/bird_profile_icon.svg" alt="Avatar" />
          <SubTitle>Fernando</SubTitle>
          <Percentage>{percentageColleagueB}%</Percentage>
        </User>
      </UsersContainer>
      <div className="text-center">
        <Button className="mt-6" bg="solid" size="lg">
          Confirmar
        </Button>
      </div>
    </Card>
  );
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
