import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";

import { useDeleteClient, useGetUsers } from "@core/services/client";
import { RoutesPathEnum } from "@core/router/types";
import { useState } from "react";
import type { TClient } from "@core/schemas";

export default function Home() {
  const [modalData, setModalData] = useState<TClient>();
  const navigate = useNavigate();
  const { mutate: mudateDeleteClient } = useDeleteClient();
  const { data, refetch } = useGetUsers();

  const handleAddClientClick = () => {
    navigate(RoutesPathEnum.Cliente);
  };

  const handleEditClientClick = (cpf: string) => () => {
    navigate(`${RoutesPathEnum.Cliente}/${cpf}`);
  };

  const handleDeleteClientClick = (client: TClient) => () => {
    setModalData(client);
  };

  const handleConfirmDeleteClientClick = async () => {
    if (!modalData) return;

    mudateDeleteClient(modalData.cpf);
    refetch();
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Lista de Clientes</Typography>

      <Box textAlign="right">
        <Button onClick={handleAddClientClick}>
          <AddIcon /> Adicionar Cliente
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>CPF</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell width={"120px"}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((client) => (
              <TableRow
                key={client.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {client.cpf}
                </TableCell>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.phone}</TableCell>
                <TableCell>
                  <IconButton onClick={handleEditClientClick(client.cpf)}>
                    <EditOutlinedIcon />
                  </IconButton>
                  <IconButton onClick={handleDeleteClientClick(client)}>
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {data && data.length <= 0 && (
        <Box textAlign="center" sx={{ mt: 2 }}>
          Nenhum Cliente cadastrado
        </Box>
      )}

      <Dialog open={!!modalData} onClose={() => setModalData(undefined)}>
        <DialogTitle>Confirmação</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirma a exclusão do usuário {modalData?.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleConfirmDeleteClientClick}>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
