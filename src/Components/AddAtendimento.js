import React, {Component} from 'react';
import firebase from '../connection';
import {Grid, TextField, Button} from '@material-ui/core';
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
    this.adicionarUsuario = this.adicionarUsuario.bind(this);
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
  adicionarUsuario(e){
    e.preventDefault();
    let banco = firebase.database().ref('Atendimentos');
    let chave = banco.push().key;
    banco.child(chave).set({
      nomeFuncionario: this.state.nomeProfissional,
      UBS: this.state.ubs,
      nomePaciente: this.state.nomePaciente,
      procedencia: this.state.procedencia,
      motivo: this.state.motivo,
      tipoAtendimento: this.state.atendimento
    });
    e.target.reset();
  }

  render(){
    return(

      <div>
        <div>
          <h1>Olá. {this.state.nomeProfissional}</h1>
          <h2>Você está cadastrando atendimentos realizados na Unidade: {this.state.ubs}</h2>
        </div>

        <form onSubmit={this.adicionarUsuario}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField fullWidth required label="Nome do Paciente" variant="outlined" margin="normal" onChange = {e => this.setState({nomePaciente: e.target.value})} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth required label="Procedência" variant="outlined" margin="normal" onChange = {e => this.setState({procedencia: e.target.value})} />
            </Grid>
            <Grid item sm={6}xs={12}>
              <TextField fullWidth required label="Motivo" variant="outlined" margin="normal" onChange = {e => this.setState({motivo: e.target.value})} />
            </Grid>
            <Grid item sm={6}xs={12}>
              <TextField fullWidth required label="Atendimento" variant="outlined" margin="normal" onChange = {e => this.setState({atendimento: e.target.value})} />
            </Grid>
            <Button type="submit" variant="contained" color="primary">Adicionar </Button>
          </Grid>
        </form>
      </div>

    );
  }


} 