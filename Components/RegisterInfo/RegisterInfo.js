import { useRef, useState } from "react";
import { Modal, Button, Group, InputWrapper, Input, CardSection, Card } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { modalsActions } from "../../store/modals";
import { DatePicker } from "@mantine/dates";
import { useMetaMask } from "metamask-react";
import useMetaMaskAuthentication from "../customHooks/useMetamaskAuthentication";
import { authActions } from "../../store/auth";
import { useForm, zodResolver } from "@mantine/form";
import styles from "./RegisterInfo.module.css"
import { z } from "zod";
export default function RegisterInfo(props) {
  const state = useSelector((state) => {
    return state;
  });
  const metamask = useMetaMask();
  const dispatch = useDispatch();
  const schema = z.object({
    firstName: z.string().min(2, {message: "Jméno musí mít více než 1 znak"}),
    lastName: z.string().min(2, {message:"Příjmení musí mít více než 1 znak"}),
    birth: z.instanceof(Date, { message: 'Zadejte prosím datum narození' }).refine((date) => {return date < new Date(Date.now())}, "Cestovatel časem? Zadejte prosím datum v minulosti"),
  })
  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      firstName: "",
      lastName: "",
      birth: "",
    },
    
  });
  async function submitHandler(props) {
    let {firstName, lastName, birth} = props
    const response3 = await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        address: localStorage.getItem("wallet"),
        request: "Get_Auth_Token",
        firstName,
        lastName,
        birth,
      }),
    });

    const resolvedResponse3 = await response3.json();
    console.log(resolvedResponse3);
    if (await resolvedResponse3.token) {
      localStorage.setItem("Auth_token", await resolvedResponse3.token);
    } else {
    }
    dispatch(
      modalsActions.setRegisterInfo({
        firstName,
        lastName,
        birth,
        registerFilled: true,
      })
    );
    dispatch(authActions.authenticate());
    dispatch(modalsActions.setRegister(false));
    useMetaMaskAuthentication(metamask, dispatch, state);
  }
  return (
    <>
      <Modal
        opened={state.modals}
        onClose={() => {}}
        title="Řekněte nám nejprve něco o sobě"
      >
        <form onSubmit={form.onSubmit(submitHandler)} className={styles.form}>
          <InputWrapper sx={{display: "flex", flexDirection: "column"}}
            id="input"
            required
            label="Jak ti máme říkat?"
            description="Zadej prosím své jméno a přijímení"
          >
          <div className={styles.inputs}>
          <InputWrapper error={form.errors.firstName}>
          <Input
              id="input-demo"
              placeholder="Jméno"
              required
              {...form.getInputProps("firstName")}
            />
          </InputWrapper>
          <InputWrapper error={form.errors.lastName}>
            <Input
              id="input-demo"
              placeholder="Přijímení"
              required
              {...form.getInputProps("lastName")}
            />
            </InputWrapper>
            <InputWrapper>
            <DatePicker
              placeholder="Vyberte datum"
              label="Datum narození"
              required
              {...form.getInputProps("birth")}
            />
            </InputWrapper>
          </div>
          </InputWrapper>
          <Button type="submit">Odeslat</Button>
        </form>
      </Modal>
    </>
  );
}
