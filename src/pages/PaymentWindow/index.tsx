import React, { useCallback, useContext, useState } from "react";

import {
  Container,
  FormBox,
  InfoBox,
  Menubox,
  LeftBox,
  PageBody,
  DonationSelect,
  PaymentBox,
  CCSelect,
} from "./styles";
import {
  HiOutlineUserCircle,
  HiHeart,
  HiHome,
  HiIdentification,
  HiGift,
} from "react-icons/hi";
import {
  AppBar,
  Button,
  ButtonGroup,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Tab,
  Tabs,
  TextField,
} from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import DonationTable from "../../components/DonationTable";
import TopBarComponent from "../../components/TopBarComponent";
import CreditCardForm from "../../components/CreditCardForm";
import LoggedMenu from "../../components/LoggedMenu";
import { Instituicao } from "../../models/Instituição";
import { DonationsService } from "../../services/DonationsService";
import AuthContext from "../../context/AuthenticationContext";

const PaymentWindow: React.FC = () => {
  const [donationValue, setdonationValue] = useState("10rs");
  const { state }: { state: any } = useLocation();
  let history = useHistory();

  const auth = useContext(AuthContext);
  const user_id = auth.loggedUser?.id;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setdonationValue((event.target as HTMLInputElement).value);
  };

  const CreateDonation = useCallback(() => {
    const donationService = new DonationsService();
    if (user_id) {
      const createdDonation = donationService.CreateDonation(
        user_id,
        "60ac36fa1f354d9b256cd5a0",
        donationValue
      );
      history.push({ pathname: "/donations", state: {} });
    }
  }, [donationValue, history, state.instituicao.id]);

  return (
    <Container>
      <TopBarComponent></TopBarComponent>

      <PageBody>
        <Menubox>
          <LoggedMenu />
        </Menubox>

        <InfoBox>
          <FormBox>
            <PaymentBox>
              <DonationSelect>
                <h1>{state.instituicao.nome}</h1>
                <img src={state.instituicao.foto} width={400} alt="" />
                <h3>Escolha o valor da doação</h3>

                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={donationValue}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="10rs"
                    control={<Radio />}
                    label="R$10,00 e ganhe 1 Cupom Ifood de R$10,00"
                  />
                  <FormControlLabel
                    value="15rs"
                    control={<Radio />}
                    label="R$15,00 e ganhe + 1 Cupom Ifood de R$15,00"
                  />
                  <FormControlLabel
                    value="20rs"
                    control={<Radio />}
                    label="R$20,00 e ganhe + 1 Cupom Uber de de R$10,00"
                  />
                </RadioGroup>
              </DonationSelect>
              <CCSelect>
                <CreditCardForm />
                <form action="https://alo" method="post">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={CreateDonation}
                  >
                    Realizar o pagameno
                  </Button>
                </form>
              </CCSelect>
            </PaymentBox>
          </FormBox>
        </InfoBox>
      </PageBody>
    </Container>
  );
};

export default PaymentWindow;
