import React from 'react';
import{Button, TextField, FormControlLabel, Checkbox, Link, Box, Typography, Container, CssBaseline} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import firebase from '../../connection';
import logo from './img/logo.png';
import './style.css';
class Login extends React.Component {

  state = {
    email: '',
    password: '',
    error: null
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged((authenticated)=>{
     if(authenticated) return this.props.history.push('/');
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const {email, password} = this.state;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user)=>{
        this.props.history.push('/');
      })
      .catch((error)=>{
        //this.setState({error});
        alert(error);
      });
  }

  render(){
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="box">
          
          <figure className="figure">
            <img width="100%" height="auto" src={logo} alt="Saúde na Hora"/>
          </figure>

          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange = {e => this.setState({email: e.target.value})}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange = {e => this.setState({password: e.target.value})}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Lembre-me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
                          >
              Entrar
            </Button>
  
          </form>
        </div>
  
        <Box mt={8}>
          <Copyright />
        </Box>
  
      </Container>
    );
  }
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="">
        Secretaria Municipal de Saúde de Arapiraca
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



export default withRouter(Login);