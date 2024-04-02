import * as React from "react";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Grid } from "@mui/material";
import { useState } from "react";

interface TeamListProps {
  items: {
    name: string;
    id: number;
  }[];
  onClick: (id: number) => void;
  onDelete: (id: number) => void;
  onAddUser: (id: number) => void;
  onDeleteUser: (id: number) => void;
  searchValue: string;
}

export default function TeamList({
  items,
  onClick,
  onDelete,
  onAddUser,
  onDeleteUser,
  searchValue,
}: TeamListProps) {
  return (
    <Box
      overflow={"auto"}
      sx={{
        maxHeight: "19rem",
        bgcolor: "background.paper",
        borderRadius: "1rem",
      }}
    >
      <List
        sx={{
          width: "100%",
        }}
      >
        {items
          .filter((item) => item.name.includes(searchValue))
          .map((value) => {
            const labelId = `list-label-${value.id}`;
            return (
              <ListItem
                key={value.id}
                sx={{ boxShadow: "0px 1px 1px 0px rgba(0,0,0,0.20)" }}
                secondaryAction={
                  <>
                    <Grid container gap={1.5}>
                      <IconButton
                        edge="end"
                        aria-label="add-user"
                        onClick={() => onAddUser(value.id)}
                      >
                        <PersonAddIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="remove-user"
                        onClick={() => onDeleteUser(value.id)}
                      >
                        <PersonRemoveIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => onDelete(value.id)}
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                    </Grid>
                  </>
                }
                disablePadding
              >
                <ListItemButton
                  role={undefined}
                  onClick={() => onClick(value.id)}
                  dense
                >
                  <ListItemText id={labelId} primary={`${value.name}`} />
                </ListItemButton>
              </ListItem>
            );
          })}
      </List>
    </Box>
  );
}
