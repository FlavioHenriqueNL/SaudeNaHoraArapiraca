import React from 'react';
import Firebase from '../connection';

export default function Logout(){
  return(
    <button onClick={e => Firebase.auth().signOut()}>Sair do sistema</button>
  );
}