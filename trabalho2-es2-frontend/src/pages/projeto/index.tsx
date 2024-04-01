"use client";
// Material UI
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import SearchBar from "@/components/SearchBar";
import AddIcon from "@mui/icons-material/Add";
import CustomList from "@/components/List";
import { useState, useEffect } from "react";
import Image from "next/image";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import FormDialog from "@/components/FormDialog";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import React from "react";
import { NumericFormat } from "react-number-format";
import { fetchDados } from "@/fetch";
import { Projeto, Cliente } from "@/models/Projeto";
import { Time } from "@/models/Time";

interface PriceInputProps {
  price: string;
  setPrice: (price: string) => void;
}

function PriceInput({ price, setPrice }: PriceInputProps) {
  return (
    <NumericFormat
      value={price}
      thousandSeparator={true}
      prefix={"R$ "}
      onValueChange={(values) => {
        setPrice(values.value);
      }}
      customInput={TextField}
      label="Preço"
      variant="outlined"
      fullWidth
    />
  );
}

const PageProjeto = () => {
  const [searchValue, setSearchValue] = useState("");
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [confirmationDeleteId, setConfirmationDeleteId] = useState<
    number | null
  >(null);
  const [confirmationSaveId, setConfirmationSaveId] = useState<number | null>(
    null
  );
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [beginDate, setBeginDate] = useState<Date | null>(dayjs().toDate());
  const [endDate, setEndDate] = useState<Date | null>(dayjs().toDate());
  const [formattedBeginDate, setFormattedBeginDate] = useState("");
  const [formattedEndDate, setFormattedEndDate] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [times, setTimes] = useState<Time[]>([]);
  const [timeSelecionado, setTimeSelecionado] = useState<number | null>(-1);
  const [clientes, setClientes] = useState<Cliente[]>();
  const [cliente, setCliente] = useState("");
  dayjs.extend(customParseFormat);
  const formatoData = "DD/MM/YYYY";
  const dayjsComFormato = dayjs().format(formatoData);
  const adapter = new AdapterDayjs({ locale: dayjsComFormato });

  /*Lista do modal*/
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  /*Lista do modal*/

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseProjetos = await fetchDados("projeto/listar", "GET");
        setProjetos(responseProjetos.result);
      } catch (error) {
        console.error("Erro ao listar projetos:", error);
      }

      try {
        // Pega a listagem de times para fornecer durante o cadastro
        const responseTimes = await fetchDados("time/listar", "GET");
        setTimes(responseTimes.result);
      } catch (error) {
        console.error("Erro ao listar times:", error);
      }

      try {
        // Pega a listagem de clientes para fornecer durante o cadastro
        const responseClientes = await fetchDados("cliente/listar", "GET");
        setClientes(responseClientes.result);
      } catch (error) {
        console.error("Erro ao listar clientes:", error);
      }
    };
    fetchData();
  }, []);

  const handleClickCadastrar = async () => {
    const formattedBeginDate = beginDate
      ? dayjs(beginDate).format("YYYY-MM-DD")
      : "";
    const formattedEndDate = endDate ? dayjs(endDate).format("YYYY-MM-DD") : "";
    setFormattedBeginDate(formattedBeginDate);
    setFormattedEndDate(formattedEndDate);

    console.log("LOG DO REGISTRO", {
      nomeProjeto: name,
      cliente: cliente,
      objetivo: description,
      dataInicio: formattedBeginDate,
      dataTermino: formattedEndDate,
      valor: price,
      idTime: timeSelecionado,
    });

    const responseCadastro = await fetchDados("projeto/inserir", "POST", {
      nomeProjeto: name,
      nomeCliente: cliente,
      objetivo: description,
      dataInicio: formattedBeginDate,
      dataTermino: formattedEndDate,
      valor: price,
      idTime: timeSelecionado,
    });
    console.log("Cadastrou projeto");
    const responseListar = await fetchDados("projeto/listar", "GET");
    setProjetos(responseListar.result);
    console.log(projetos);
  };

  const handleClickBuscar = async (id: number) => {
    const fetchData = async () => {
      try {
        const responseBusca = await fetchDados(`projeto/buscar/${id}`, "GET");
        const projeto = responseBusca.result;

        setName(projeto.nomeProjeto);
        setDescription(projeto.objetivo);
        setFormattedBeginDate(projeto.dataInicio);
        setFormattedEndDate(projeto.dataTermino);
        setBeginDate(new Date(projeto.dataInicio));
        setEndDate(new Date(projeto.dataTermino));
        setPrice(projeto.valor);
        setCliente(projeto.cliente);

        const responseTimes = await fetchDados(`time/listar`, "GET");
        setTimes(responseTimes.result);

        const timeSelect = await times.find(
          (time) => time.nomeTime === projeto.time
        );

        setTimeSelecionado(timeSelect?.idTime ?? null);
      } catch (error) {
        console.error("Erro ao buscar projeto:", error);
      }
    };
    fetchData();
  };

  const handleClickAlterar = async (id: number) => {
    const formattedBeginDate = beginDate
      ? dayjs(beginDate).format("YYYY-MM-DD")
      : "";
    const formattedEndDate = endDate ? dayjs(endDate).format("YYYY-MM-DD") : "";
    setFormattedBeginDate(formattedBeginDate);
    setFormattedEndDate(formattedEndDate);

    const responseAlteracao = await fetchDados(`projeto/alterar/${id}`, "PUT", {
      nomeProjeto: name,
      nomeCliente: cliente,
      objetivo: description,
      dataInicio: formattedBeginDate,
      dataTermino: formattedEndDate,
      valor: price,
      idTime: timeSelecionado,
    });
    console.log("Alterou projeto");
    const responseListar = await fetchDados("projeto/listar", "GET");
    setProjetos(responseListar.result);
  };

  const handleClickExcluir = async (id: number) => {
    const responseExclusao = await fetchDados(
      `projeto/excluir/${id}`,
      "DELETE"
    );
    console.log("Excluiu projeto");
    const responseListar = await fetchDados("projeto/listar", "GET");
    setProjetos(responseListar.result);
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
              placeHolder="Buscar projeto"
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
            <Typography sx={{ marginLeft: "0.1rem" }}>Projetos</Typography>
            <Box
              padding={1}
              sx={{ backgroundColor: "background.paper", borderRadius: "1rem" }}
            >
              <CustomList
                items={projetos.map((projeto) => ({
                  name: projeto.nomeProjeto,
                  id: projeto.idProjeto,
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
                searchValue={searchValue}
              ></CustomList>
              <ConfirmationDialog
                dialogText="Confirme a exclusão do projeto"
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
                formTitle="Dados do Projeto"
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
                <Grid container width={"32rem"} justifyContent={"left"} gap={2}>
                  <Grid item xs={12}>
                    <Typography variant="h5">Dados do Projeto</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="Nome do Projeto"
                      variant="outlined"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="Cliente"
                      variant="outlined"
                      value={cliente}
                      onChange={(e) => setCliente(e.target.value)}
                    />
                  </Grid>
                  <Grid item width={"19.5rem"}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="Objetivo do Projeto"
                      variant="outlined"
                      multiline
                      rows={4.1}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Grid>
                  <Grid
                    container
                    item
                    width={"11.5rem"}
                    flexDirection={"column"}
                    gap={2}
                  >
                    <Grid item width={"11.5rem"}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Data de Início"
                          defaultValue={dayjs(beginDate)}
                          format="DD/MM/YYYY"
                          onChange={(newDate: Dayjs | null) =>
                            setBeginDate(newDate?.toDate() ?? null)
                          }
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item width={"11.5rem"}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Data de Término"
                          defaultValue={dayjs(endDate)}
                          format="DD/MM/YYYY"
                          onChange={(newDate: Dayjs | null) =>
                            setEndDate(newDate?.toDate() ?? null)
                          }
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                  <Grid item width={"10rem"}>
                    <PriceInput price={price} setPrice={setPrice} />
                  </Grid>
                  <Grid item width={"21rem"}>
                    <FormControl fullWidth>
                      <InputLabel id="team-select-label">
                        Time Responsável
                      </InputLabel>
                      <Select
                        label="Time Responsável"
                        value={timeSelecionado}
                        onChange={(e) => {
                          setTimeSelecionado(e.target.value as number);
                        }}
                        MenuProps={{
                          PaperProps: { sx: { maxHeight: "8rem" } },
                        }}
                      >
                        {Array.isArray(times) &&
                          times.length > 0 &&
                          times.map((time: Time) => (
                            <MenuItem key={time.idTime} value={time.idTime}>
                              {time.nomeTime}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </FormDialog>
            </Box>
            <Fab
              color="secondary"
              aria-label="add"
              onClick={(id) => {
                setName("");
                setBeginDate(null);
                setEndDate(null);
                setPrice("");
                setDescription("");
                setConfirmationSaveId(null);
                setOpenFormDialog(true);
                setCliente("");
                setTimeSelecionado(null);
              }}
            >
              <AddIcon />
            </Fab>
          </Grid>
        </Grid>
        <Grid item>
          <Image
            src={"/project.svg"}
            alt="project-ilustration"
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

export default PageProjeto;
