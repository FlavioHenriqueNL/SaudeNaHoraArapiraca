import React, {Component} from 'react';
import {Container, Button, Grid } from '@material-ui/core';
import firebase from '../../connection';
import AddAtendimento from './AddAtendimento';
import TabelaAtendimento from './TabelaAtendimento';
import moment from 'moment';

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
          this.setState(s);
        });      
      }
    })  
  }
  
  render(){
    firebase.database().ref('Atendimentos').orderByChild('UBS').equalTo(this.state.ubs).once('value', (snapshot)=>{
      let s = this.state;
      s.atendimentos = [];
      snapshot.forEach((childSnapshot)=>{
        if(childSnapshot.val().dataAtendimento === moment().format('L')){
          this.state.atendimentos.push({
            key: childSnapshot.key,
            nome: childSnapshot.val().nomePaciente,
            procedencia: childSnapshot.val().procedencia,
            motivo: childSnapshot.val().motivo,
            atendimento: childSnapshot.val().tipoAtendimento
          });
        }
      });
      this.setState(s);
    })
    return(
      <Container>
        <Grid className="tituloSecao" container spacing={3} alignItems="center">
          <Grid item xs={9} >
              <h1>Lista de Atendimentos
              da Unidade: <span>{this.state.ubs}</span> </h1>
              <h2>Realizados no dia: <span>{moment().format('DD[/]MM[/]YYYY')}</span> </h2>
          </Grid>
          <Grid item xs={3} >
            <AddAtendimento className="atendimentoComponent"/>
          </Grid>
        </Grid>

        <TabelaAtendimento lista={this.state.atendimentos} />

      </Container>

    );
  }
}

