import React from 'react';
import Logout from '../Logout';

import './style.css';

const header = props => (
  <header>
    <nav>
      <div></div>
      <div><a href="/">The Logo</a></div>
      <div>
        <ul>
          <li><a href="/login">Menu1</a></li>
          <li><Logout/></li>
        </ul>
      </div>
    </nav>
  </header>
);

export default header;