import React, {Component} from 'react';
import firebase from '../../connection';
import {Grid, TextField, Button, Modal, InputLabel, FormControl, Select, MenuItem} from '@material-ui/core';
import moment from 'moment';

import './style.css';

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
      data: '',
      modalOpen: false,
      listaAtendimentos: ['Médico', 'Enfermagem', 'Odontológico', 'Vacinas',
                         'Curativos', 'Citologia', 'Teste rápido', 'Outros']
    }
    this.adicionarUsuario = this.adicionarUsuario.bind(this);
    this.abrirModal = this.abrirModal.bind(this);
    this.fecharModal = this.fecharModal.bind(this);
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
  abrirModal(){
    let state = this.state;
    state.modalOpen = true;
    state.atendimento = state.listaAtendimentos[0];
    this.setState(state);
  }
  fecharModal(){
    let state = this.state;
    state.modalOpen = false;
    this.setState(state);
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
      tipoAtendimento: this.state.atendimento,
      dataAtendimento: moment().format('L')
    });
    e.target.reset();
  }


  render(){
    return(

      <div className="atendimentoComponent">
        <Button type="button" onClick={this.abrirModal} variant="contained" color="primary">Adicionar Atendimento</Button>
        <Modal 
          open={this.state.modalOpen}
          onClose={this.fecharModal}
          aria-labelledby="Adicionar atendimento"
          aria-describedby="Formulário de inscrição de atendimento"
        >
           

            <form className="formulario" onSubmit={this.adicionarUsuario}>
              <h1>Adicionar atendimento</h1>
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
                  <FormControl required label="Atendimento" variant="filled" fullWidth margin="normal">
                    <InputLabel id="atendimentoLabel">Atendimento</InputLabel>
                    <Select
                      labelId = "atendimentoLabel"
                      id="atendimento"
                      onChange = {e => this.setState({atendimento: e.target.value})}
                      value={this.state.atendimento}
                    >
                      {this.state.listaAtendimentos.map(tipo => (
                        <MenuItem value={tipo}>{tipo}</MenuItem>
                      ))}
                    
                    </Select>
                  </FormControl>
                </Grid>
                <Button type="submit" variant="contained" color="primary">Adicionar </Button>
              </Grid>
            </form>

        </Modal>
        
      </div>

    );
  }
} 