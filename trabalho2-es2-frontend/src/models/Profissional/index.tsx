import { Endereco } from "../Endereco";
import { Especialidade } from "../Especialidade";
import { Time } from "../Time";

export interface Profissional {
  idProfissional: number;
  nomeCompleto: string;
  dataNascimento: string;
  raca: string;
  genero: string;
  nroEndereco: number;
  complementoEndereco: string;
  cep: string;
  especialidade: Especialidade;
  idTime: number;
  time: Time;
  idEndereco: number;
  endereco: Endereco;
}
