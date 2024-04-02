import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Profissional } from "@/models/Profissional";
import { Autocomplete, TextField } from "@mui/material";

interface TeamUserEditDialogProps {
  selectText: string;
  title: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedProfissional: (profissional: Profissional | null) => void;
  selectedProfissional: Profissional | null;
  profissionais: Profissional[];
}

export default function TeamUserEditDialog({
  selectText,
  title,
  open,
  setOpen,
  setConfirmation,
  setSelectedProfissional,
  selectedProfissional,
  profissionais,
}: TeamUserEditDialogProps) {
  const handleCancel = () => {
    setConfirmation(false);
    setOpen(false);
  };

  const handleDelete = () => {
    setConfirmation(true);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    setConfirmation(false);
  };

  const handleChangeProfissional: (
    event: React.ChangeEvent<{}>,
    newValue: Profissional | null
  ) => void = (event, newValue) => {
    setSelectedProfissional(newValue);
  };
  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="dialog-title">{title}</DialogTitle>
        <DialogContent>
          <Autocomplete
            fullWidth
            disablePortal
            options={profissionais}
            value={selectedProfissional}
            getOptionLabel={(option) => option.nomeCompleto}
            onChange={(event, newValue) => {
              handleChangeProfissional(event, newValue);
              //console.log(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Selecione o profissional" />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancelar</Button>
          <Button onClick={handleDelete} autoFocus>
            Salvar Alteração
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
