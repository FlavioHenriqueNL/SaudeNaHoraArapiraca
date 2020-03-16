import React from 'react';
import {Paper, TableContainer, Table, TableHead, TableRow, 
        TableBody, TableCell, Button} from '@material-ui/core';
import firebase from '../../connection';

const TabelaAtendimento  = ({lista}) => {
  const excluirAtendimento = (key)=>{
    let confirmar = window.confirm('Você realmente deseja excluir esse atendimento?');
    if(confirmar) firebase.database().ref('Atendimentos').child(key).remove();
  }

  return(
    <TableContainer component={Paper}>
    <Table aria-label="simple table">
      <TableHead className="tableHead">
        <TableRow>
          <TableCell className="tableCell">Nome do Paciente</TableCell>
          <TableCell className="tableCell" align="right">Procedência</TableCell>
          <TableCell className="tableCell" align="right">Motivo</TableCell>
          <TableCell className="tableCell" align="right">Atendimento</TableCell>
          <TableCell className="tableCell" align="right">Excluir</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {lista.map(row => (
          <TableRow key={row.key}>
            
            <TableCell align="left">{row.nome}</TableCell>
            <TableCell align="right">{row.procedencia}</TableCell>
            <TableCell align="right">{row.motivo}</TableCell>
            <TableCell align="right">{row.atendimento}</TableCell>
            <TableCell align="right">
              <Button color="secondary" variant="contained" onClick={() => excluirAtendimento(row.key)}>Excluir</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  );
};

export default TabelaAtendimento;