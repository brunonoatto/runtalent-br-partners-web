import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type TClient, clientSchema } from "@core/schemas";
import {
  useGetClient,
  usePostClient,
  useUpdateClient,
} from "@core/services/client";
import { useEffect } from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { RoutesPathEnum } from "@core/router/types";
import { onlyNumbers } from "@shared/string";
import useToast from "@core/store/useToast";

export default function Client() {
  const navigate = useNavigate();
  const { cpf: cpfParam } = useParams();

  const { toastSuccess, toastError } = useToast();
  const { data: clientUpdated } = useGetClient();
  const { mutate: mutatePostClient } = usePostClient();
  const { mutate: mutateUpdateClient } = useUpdateClient();

  const isRegister = !cpfParam;

  const form = useForm<TClient>({
    mode: "onSubmit",
    resolver: zodResolver(clientSchema),
  });
  const { setValue, register, handleSubmit } = form;

  const handlePostClient = (client: TClient) => {
    mutatePostClient(client, {
      onSuccess: () => {
        successProcess("Cadastrado realizado com sucesso!");
      },
      onError: handleError,
      onSettled: handleSettled,
    });
  };

  const handleUpdateClient = (client: TClient) => {
    mutateUpdateClient(client, {
      onSuccess: () => {
        successProcess("Edição realizada com sucesso!");
      },
      onError: handleError,
      onSettled: handleSettled,
    });
  };

  const handleError = (e: any) => {
    toastError(e.message);
  };

  const handleSettled = () => {
    console.log("handleSettled");
    // loading(false)
  };

  const successProcess = (message: string) => {
    toastSuccess(message);

    handleGoHome();
  };

  const handleValid: SubmitHandler<TClient> = (formData) => {
    console.log("handleValid", { formData });
    // loading(true);
    if (isRegister) {
      handlePostClient(formData);
    } else {
      handleUpdateClient(formData);
    }
  };

  const handleInvalid: SubmitErrorHandler<TClient> = () => {
    toastError("Formulário inválido.");
  };

  const handleGoHome = () => {
    navigate(RoutesPathEnum.Home);
  };

  useEffect(() => {
    console.log("reset", { clientUpdated });
    if (clientUpdated) {
      setValue("name", clientUpdated.name);
      setValue("cpf", clientUpdated.cpf);
      setValue("email", clientUpdated.email);
      setValue("phone", clientUpdated.phone);
    }
  }, [clientUpdated, setValue]);

  return (
    <Container>
      <Box maxWidth="md" textAlign="center" mx="auto">
        <Typography variant="h4" textAlign={"left"}>
          {isRegister
            ? "Inclusao de cadastro de Cliente"
            : "Edição de cadastro de Cliente"}
        </Typography>

        <form onSubmit={handleSubmit(handleValid, handleInvalid)}>
          <Grid container spacing={2}>
            <Grid item sm={12} md={6}>
              {/* <TextField
                variant="standard"
                label="Nome"
                {...register("name")}
              /> */}
              Name
              <input type="text" {...register("name")} />
            </Grid>
            <Grid item sm={12} md={6}>
              {/* <TextMaskCustom
                label="CPF"
                inputProps={{
                  mask: "000.000.000-00",
                  ...register("cpf", {
                    setValueAs: onlyNumbers,
                  }),
                }}
              /> */}
              CPF
              <input
                type="text"
                {...register("cpf", {
                  setValueAs: onlyNumbers,
                  disabled: !isRegister,
                })}
              />
            </Grid>
            <Grid item sm={12} md={6}>
              {/* <TextField
                variant="standard"
                label="E-mail"
                {...register("email")}
              /> */}
              Email
              <input type="email" {...register("email")} />
            </Grid>
            <Grid item sm={12} md={6}>
              {/* <TextMaskCustom
                label="Telefone"
                inputProps={{
                  mask: "(00) 00000-0000",
                  ...register("phone"),
                }}
              /> */}
              Telefone
              <input
                type="text"
                {...register("phone", { setValueAs: onlyNumbers })}
              />
            </Grid>
            <Grid
              item
              xs={12}
              textAlign="right"
              display="flex"
              justifyContent="end"
              gap={2}
            >
              <Button type="button" onClick={handleGoHome}>
                Cancelar
              </Button>

              <Button variant="contained" type="submit">
                {isRegister ? "Cadastrar" : "Atualizar"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}
