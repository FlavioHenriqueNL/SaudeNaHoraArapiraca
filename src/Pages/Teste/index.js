import React, {Component} from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container} from '@material-ui/core';
import firebase from '../../connection';
import { makeStyles } from '@material-ui/core/styles';

import Fc from '../../Components/AddAtendimento';

export default class Tabela extends Component{

  constructor(props){
    super(props);
    
    this.state = {
      nome: 'Carregando...',
      ubs: '...',
      atendimentos: [],
    };

    firebase.auth().onAuthStateChanged((logged) => {
      if(logged){        
        firebase.database().ref('Usuarios').child(logged.uid).once('value').then((snapshot)=> {
          let s = this.state;
          s.ubs = snapshot.val().UBS;
          s.nome = snapshot.val().nome;
          
          console.log(s.ubs + 'dentro de database Users');
          this.setState(s);
        });      
      }
    })  
  }
   
  render(){
    firebase.database().ref('Atendimentos').orderByChild('UBS').equalTo('Secretaria de Saúde').once('value', (snapshot)=>{
      console.log(this.state.ubs + 'Dentro de Database');
      let s = this.state;
      s.atendimentos = [];
      snapshot.forEach((childSnapshot)=>{
        this.state.atendimentos.push({
          key: childSnapshot.key,
          nome: childSnapshot.val().nomePaciente,
          procedencia: childSnapshot.val().procedencia,
          motivo: childSnapshot.val().motivo,
          atendimento: childSnapshot.val().tipoAtendimento
        });

      });
      this.setState(s);
    })
    return(
      <Container>
        <div>
          <h1>Seja bem vindo! {this.state.ubs}</h1>
        </div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nome do Paciente</TableCell>
                <TableCell align="right">Procedência</TableCell>
                <TableCell align="right">Motivo</TableCell>
                <TableCell align="right">Atendimento</TableCell>
                <TableCell align="right">Editar</TableCell>
                <TableCell align="right">Excluir</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.atendimentos.map(row => (
                <TableRow key={row.key}>
                  
                  <TableCell align="left">{row.nome}</TableCell>
                  <TableCell align="right">{row.procedencia}</TableCell>
                  <TableCell align="right">{row.motivo}</TableCell>
                  <TableCell align="right">{row.atendimento}</TableCell>
                  <TableCell align="right">Botão editar</TableCell>
                  <TableCell align="right">Botão Excluir</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Fc/>
      </Container>

    );
  }
}

