import React, {Component} from 'react';
import firebase from '../connection';
import {Grid, TextField} from '@material-ui/core';
export default class addAtendimento extends Component{

  constructor(props){
    super(props);
    this.state = {
      nomeProfissional: '',
      ubs:'',
      nomePaciente: '',
      procedencia: '',
      motivo: '',
      atendimento: '',
      data: ''
    }
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged((user)=>{
      firebase.database().ref('Usuarios').child(user.uid)
        .on('value', (snapshot) => {

          let s = this.state;
          s.nomeProfissional = snapshot.val().nome;
          s.ubs = snapshot.val().UBS;
          this.setState(s); 
        });
    });
  }

  render(){
    return(

      <div>
        <div>
          <h1>Olá. {this.state.nomeProfissional}</h1>
          <h2>Você está cadastrando atendimentos realizados na Unidade: {this.state.ubs}</h2>
        </div>

        <form action="">
          
          <Grid container spacing={1}>
            <Grid item xs={12}><TextField fullWidth required label="Nome do Paciente" variant="outlined" margin="normal" /></Grid>
            <Grid item sm={6}xs={12}><TextField fullWidth required label="Procedência" variant="outlined" margin="normal" /></Grid>
            <Grid item sm={6}xs={12}><TextField fullWidth required label="Motivo" variant="outlined" margin="normal" /></Grid>
          </Grid>

        </form>
      </div>

    );
  }


} 