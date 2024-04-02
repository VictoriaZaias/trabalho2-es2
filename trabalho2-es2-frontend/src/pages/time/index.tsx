import {
  Box,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Fab,
  Typography,
  Autocomplete,
} from "@mui/material";
import SearchBar from "@/components/SearchBar";
import AddIcon from "@mui/icons-material/Add";
import CustomList from "@/components/List";
import { useState, useEffect } from "react";
import Image from "next/image";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import FormDialog from "@/components/FormDialog";
import { SelectChangeEvent } from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import React from "react";
import { Time } from "@/models/Time";
import { fetchDados } from "@/fetch";
import { Profissional } from "@/models/Profissional";
import TeamList from "@/components/TeamList";
import TeamUserEditDialog from "@/components/TeamUserEditDialog";

const PageTime = () => {
  const [searchValue, setSearchValue] = useState("");
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [openUserAddDialog, setOpenUserAddDialog] = useState(false);
  const [openUserDeleteDialog, setOpenUserDeleteDialog] = useState(false);
  const [confirmationDeleteId, setConfirmationDeleteId] = useState<
    number | null
  >(null);
  const [userAddTimeId, setUserAddTimeId] = useState<number | null>(null);
  const [userDeleteTimeId, setUserDeleteTimeId] = useState<number | null>(null);
  const [confirmationSaveId, setConfirmationSaveId] = useState<number | null>(
    null
  );
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [name, setName] = useState("");
  const [times, setTimes] = useState<Time[]>([]);
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [profissionaisTime, setProfissionaisTime] = useState<Profissional[]>(
    []
  );
  const [bornDate, setBornDate] = useState<Date | null>(dayjs().toDate());
  const [formattedBornDate, setFormattedBornDate] = useState("");
  const [selectedProfissional, setSelectedProfissional] =
    useState<Profissional | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseTimes = await fetchDados("time/listar", "GET");
        setTimes(responseTimes.result);
      } catch (error) {
        console.error("Erro ao listar times:", error);
      }
    };
    const fetchProfissionais = async () => {
      try {
        const responseProfissionais = await fetchDados(
          "profissional/listar",
          "GET"
        );
        setProfissionais(responseProfissionais.result);
      } catch (error) {
        console.error("Erro ao listar profissionais", error);
      }
    };
    fetchData();
    fetchProfissionais();
  }, []);

  const handleClickCadastrar = async () => {
    try {
      const responseProfissionais = await fetchDados(
        "profissional/listar",
        "GET"
      );
      const profissionais = responseProfissionais.result;
      const profissionaisLivres = profissionais.filter(
        (profissional: Profissional) => profissional.idTime !== null
      );
      setProfissionais(profissionaisLivres);
    } catch (error) {
      console.error("Erro ao buscar time:", error);
    }
    const responseCadastro = await fetchDados("time/inserir", "POST", {
      nomeTime: name,
    });
    console.log("Cadastrou time");
    const responseListar = await fetchDados("time/listar", "GET");
    setTimes(responseListar.result);
  };

  const handleClickBuscar = async (id: number) => {
    const fetchData = async () => {
      try {
        const responseProjetos = await fetchDados(`time/buscar/${id}`, "GET");
        const time = responseProjetos.result;
        setName(time.nomeTime);
      } catch (error) {
        console.error("Erro ao buscar time:", error);
      }

      try {
        const responseProfissionaisTime = await fetchDados(
          `profissional/listarPorTime/${id}`,
          "GET"
        );
        setProfissionaisTime(responseProfissionaisTime.result);
      } catch (error) {
        console.error("Erro ao buscar time:", error);
      }
    };
    fetchData();
  };

  const handleClickAlterar = async (id: number) => {
    const responseAlteracao = await fetchDados(`time/alterar/${id}`, "PUT", {
      nomeTime: name,
    });
  };

  const handleClickAdicionarProfissionalTime = async (id: number) => {
    const responseAlteracao = await fetchDados(
      `profissional/${selectedProfissional?.idProfissional}/alterarTime/${id}`,
      "PUT",
      {
        nomeTime: name,
      }
    );
    console.log("Alterou papel do profissional", responseAlteracao);
  };

  const handleClickRemoverProfissionalTime = async () => {
    const responseAlteracao = await fetchDados(
      `profissional/${selectedProfissional?.idProfissional}/alterarTime/null`,
      "PUT",
      {
        nomeTime: name,
      }
    );
    console.log("Removeu profissional do time", responseAlteracao);
  };

  const handleClickExcluir = async (id: number) => {
    const responseExclusao = await fetchDados(`time/excluir/${id}`, "DELETE");
    console.log("Excluiu time");
    const responseListar = await fetchDados("time/listar", "GET");
    setTimes(responseListar.result);
  };

  return (
    <>
      <Grid container gap={3}>
        <Grid
          container
          padding={"1rem"}
          sx={{ backgroundColor: "#fff" }}
          width={"50rem"}
          borderRadius={"2rem"}
          gap={1}
        >
          <Grid item xs={12}>
            <SearchBar
              placeHolder="Buscar time"
              value={searchValue}
              setValue={setSearchValue}
            ></SearchBar>
          </Grid>
          <Grid
            container
            item
            sx={{
              backgroundColor: "#edf2fb",
              padding: "1rem",
              borderRadius: "1rem",
              minHeight: "28rem",
              boxShadow: "0px 1px 1px 0px rgba(0,0,0,0.20)",
            }}
            xs={12}
            gap={1}
            flexDirection={"column"}
          >
            <Typography sx={{ marginLeft: "0.1rem" }}>Times</Typography>
            <Box
              padding={1}
              sx={{
                backgroundColor: "background.paper",
                borderRadius: "1rem",
              }}
            >
              <TeamList
                items={times.map((time) => ({
                  name: time.nomeTime,
                  id: time.idTime,
                }))}
                onClick={(id) => {
                  setConfirmationSaveId(id);
                  handleClickBuscar(id);
                  setOpenFormDialog(true);
                }}
                onDelete={(id) => {
                  setConfirmationDeleteId(id);
                  setOpenConfirmationDialog(true);
                }}
                onAddUser={(id) => {
                  setUserAddTimeId(id);
                  setOpenUserAddDialog(true);
                }}
                onDeleteUser={(id) => {
                  setUserDeleteTimeId(id);
                  setOpenUserDeleteDialog(true);
                }}
                searchValue={searchValue}
              />

              <ConfirmationDialog
                dialogText="Confirme a exclusão do time"
                open={openConfirmationDialog}
                setOpen={setOpenConfirmationDialog}
                setConfirmation={(confirmed) => {
                  if (confirmed && confirmationDeleteId !== null) {
                    handleClickExcluir(confirmationDeleteId);
                  }
                  setConfirmationDeleteId(null);
                }}
              />
              <FormDialog
                formTitle="Dados do Time"
                open={openFormDialog}
                setOpen={setOpenFormDialog}
                setConfirmation={(confirmed) => {
                  if (confirmed && confirmationSaveId !== null) {
                    handleClickAlterar(confirmationSaveId);
                  } else if (confirmed && confirmationSaveId === null) {
                    handleClickCadastrar();
                  }
                  setConfirmationSaveId(null);
                }}
              >
                <Grid
                  container
                  width={"32rem"}
                  justifyContent={"center"}
                  gap={2}
                >
                  <Typography variant="h5">Dados do Time</Typography>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Nome do Time"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Box
                    sx={{
                      width: "100%",
                      backgroundColor: "#edf2fb",
                      borderRadius: "1rem",
                      padding: "1rem",
                    }}
                  >
                    <Box
                      maxHeight={"15rem"}
                      sx={{
                        overflowY: "auto",
                        backgroundColor: "#edf2fb",
                      }}
                    >
                      <Typography>Integrantes do Time:</Typography>
                      <List
                        dense
                        sx={{
                          width: "100%",
                          bgcolor: "#edf2fb",
                        }}
                      >
                        {profissionaisTime.map((value) => {
                          const labelId = `checkbox-list-secondary-label-${value}`;
                          return (
                            <ListItem
                              key={value.idProfissional}
                              sx={{
                                boxShadow: "0px 1px 1px 0px rgba(0,0,0,0.20)",
                              }}
                              disablePadding
                            >
                              <ListItemButton>
                                <ListItemAvatar>
                                  <Avatar
                                    alt={`Avatar`}
                                    // src={`/static/images/avatar/${value + 1}.jpg`}
                                  />
                                </ListItemAvatar>
                                <ListItemText
                                  id={labelId}
                                  primary={`${value.nomeCompleto} - ${value.especialidade}`}
                                />
                              </ListItemButton>
                            </ListItem>
                          );
                        })}
                      </List>
                    </Box>
                  </Box>
                </Grid>
              </FormDialog>
              <TeamUserEditDialog
                selectText="Selecione o profissional"
                title="Adicionar Profissional ao Time"
                setSelectedProfissional={setSelectedProfissional}
                selectedProfissional={selectedProfissional}
                open={openUserAddDialog}
                profissionais={profissionais}
                setOpen={setOpenUserAddDialog}
                setConfirmation={(confirmed) => {
                  if (confirmed && userAddTimeId !== null) {
                    handleClickAdicionarProfissionalTime(userAddTimeId);
                    console.log("adicionar profissional ");
                  }
                  setUserAddTimeId(null);
                  setSelectedProfissional(null);
                }}
              />
              <TeamUserEditDialog
                selectText="Selecione o profissional"
                title="Remover Profissional do Time"
                setSelectedProfissional={setSelectedProfissional}
                selectedProfissional={selectedProfissional}
                open={openUserDeleteDialog}
                profissionais={profissionaisTime}
                setOpen={setOpenUserDeleteDialog}
                setConfirmation={(confirmed) => {
                  if (confirmed && userDeleteTimeId !== null) {
                    handleClickRemoverProfissionalTime();
                    console.log("remover profissional");
                  }
                  setUserDeleteTimeId(null);
                  setSelectedProfissional(null);
                }}
              />
            </Box>
            <Fab
              color="secondary"
              aria-label="add"
              onClick={async (id) => {
                setConfirmationSaveId(null);
                setOpenFormDialog(true);
                setName("");
                setProfissionais([]);
              }}
            >
              <AddIcon />
            </Fab>
          </Grid>
        </Grid>
        <Grid item>
          <Image
            src={"/team.svg"}
            alt="team-ilustration"
            width={500}
            height={500}
          ></Image>
          <Typography sx={{ fontSize: "0.6rem" }}>
            <a
              href="https://storyset.com/people"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "grey", textDecoration: "none" }}
            >
              People illustrations by Storyset
            </a>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};
export default PageTime;
