import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to = "/">Inicio</Link></li>
          <li><Link to = "/prueba">Prueba</Link></li>
        </ul>
      </div>
    );
  }
}

export default Menu;
