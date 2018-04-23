import React, { Component } from 'react';
import database from '../../database/firebase';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import {
  Paper,
  RaisedButton,
  Divider,
  FlatButton,
  Dialog } from 'material-ui';
import Edit from 'material-ui/svg-icons/image/edit';
import Delete from 'material-ui/svg-icons/action/delete';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Contacto: [],
      alert: false,
        open: false,
      alertData: {}
    };
  }
  componentWillMount () {

    database.database().ref('Contacto').on('child_added', snapshot => {
      this.setState({
        Contacto: this.state.Contacto.concat(snapshot.val())
      });
    });
  }

  handleRemove() {
    return database.database().ref('Contacto').child('ITEM_KEY').remove();

}

handleUpdate() {
    var updates = {};
    updates['/nombre'] = 1;
    updates['/correo'] = 'Apple';
    updates['/ciudad'] = 'Apple';
    updates['/telefono'] = 'Apple';

    return database.database().ref('Contacto').child('ITEM_KEY').update(updates);
}

  showAlert(type, message) {
    this.setState({
      alert: true,
      alertData: { type, message }
    });
    setTimeout(() => {
      this.setState({ alert: false });
    }, 4000)
  }

  resetForm() {
    this.refs.contactForm.reset();
  }

  sendMessage(e) {
    e.preventDefault();

    const params = {
      nombre: this.inputNombre.value,
      correo: this.inputCorreo.value,
      ciudad: this.inputCiudad.value,
      telefono: this.inputTelefono.value
    };

    if (params.nombre && params.correo && params.ciudad && params.telefono ) {

      database.database().ref('Contacto').push(params).then(() => {
      this.showAlert('Datos guardados');
      }).catch(() => {
        this.showAlert('Datos no guardados');
      });
      this.resetForm();
    } else {
      this.showAlert('rellene el formulario');
    };
  }

    handleOpen = () => {
      this.setState({open: true});
    };

    handleClose = () => {
      this.setState({open: false});
    };
  render() {
    const actions = [
      <FlatButton
        label="Cerrar"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];
    return (
      <div>
        <div style = {{ display: 'flex', justifyContent: 'center' }}>
          <div>

          <Paper style = {{
            height: 450,
            width: 300,
            margin: 20,
            display: 'flex'}}>

              <div className='container' style={{ marginLeft: 30 , width: '100%'}}>
                <div className='row'>
                  <div className='col-sm-4'>
                  <div style={{ height:10 }}><p1></p1></div>
                    <h2>Contacto</h2>

                    <form onSubmit={this.sendMessage.bind(this)} ref='contactForm' >

                      <div className='form-group' style={{ width: 200 }}>
                        <p1>Nombre</p1><br/>
                        <input type='text' className='form-control' id='nombre'
                          placeholder='Name' ref={nombre => this.inputNombre = nombre }/>
                      </div>

                      <div className='form-group' style={{ width: 200 }}>
                        <p1>Correo</p1><br/>
                        <input type='email' className='form-control' id='correo'
                          placeholder='Email' ref={correo => this.inputCorreo = correo }/>
                      </div>

                      <div className='form-group' style={{ width: 200 }}>
                        <p1>Ciudad</p1><br/>
                        <input type='text' className='form-control' id='ciudad'
                          placeholder='Ciudad' ref={ciudad => this.inputCiudad = ciudad }/>
                      </div>

                      <div className='form-group' style={{ width: 200 }}>
                        <p1>Telefono</p1><br/>
                        <input type='number' className='form-control' id='telefono'
                          placeholder='Telefono' ref={ telefono => this.inputTelefono = telefono }/>
                      </div>

                      <div style = {{ marginTop: 20 }}>
                        <RaisedButton style={{ width: 200 }} type='submit' >Agregar</RaisedButton>
                      </div>
                    </form>

                  </div>
                </div>
              </div>
              </Paper>
            </div>


          <div className="border" style = {{ marginTop: 20, marginLeft: 20, width: '60%', height: 500 }}>
              {this.state.Contacto.map(Contacto =>(

                  <Paper style = {{ width: '99%', height: 50, display: 'flex', marginTop: 5, marginLeft: 5 }}>

                        <div style = {{ width: 180, marginLeft: 20, marginTop: 15 }}>{Contacto.nombre}</div>
                        <div style = {{ width: 200, marginTop: 15 }}>{Contacto.correo}</div>
                        <div style = {{ width: 150, marginTop: 15 }}>{Contacto.ciudad}</div>
                        <div style = {{ width: 80, marginTop: 15, marginLeft: -10 }}>{Contacto.telefono}</div>
                        <div style = {{ width: 100, marginTop: 5,  marginLeft: 30 }}><FlatButton onClick={this.handleOpen} icon = {<Edit/>}/></div>
                        <div style = {{ width: 100, marginTop: 5 }}><FlatButton onClick = { this.handleRemove } icon = {<Delete/>}/>{Contacto.ITEM_KEY}</div>

                    </Paper>
              )).reverse()
            }
            <div>
            <Dialog
               title="Modificar contacto"
               actions={actions}
               modal={false}
               open={this.state.open}
               onRequestClose={this.handleClose}
               style = {{ width: '50%', marginLeft: '30%' }}
             >
             <div className='container' style = {{ display: 'flex', justifyContent: 'center' }}>
               <div className='row'>
                 <div className='col-sm-4'>
                 <div style={{ height:10 }}><p1></p1></div>

                   <form onSubmit={this.sendMessage.bind(this)} ref='contactForm' >

                     <div className='form-group' style={{ width: 200 }}>
                       <p1>Nombre</p1><br/>
                       <input type='text' className='form-control' id='nombre'
                         placeholder='Name' ref={nombre => this.inputNombre = nombre }/>
                     </div>

                     <div className='form-group' style={{ width: 200 }}>
                       <p1>Correo</p1><br/>
                       <input type='email' className='form-control' id='correo'
                         placeholder='Email' ref={correo => this.inputCorreo = correo }/>
                     </div>

                     <div className='form-group' style={{ width: 200 }}>
                       <p1>Ciudad</p1><br/>
                       <input type='text' className='form-control' id='ciudad'
                         placeholder='Ciudad' ref={ciudad => this.inputCiudad = ciudad }/>
                     </div>

                     <div className='form-group' style={{ width: 200 }}>
                       <p1>Telefono</p1><br/>
                       <input type='number' className='form-control' id='telefono'
                         placeholder='Telefono' ref={ telefono => this.inputTelefono = telefono }/>
                     </div>

                     <div style = {{ marginTop: 20 }}>
                       <RaisedButton style={{ width: 200 }} type='submit' >Actualizar</RaisedButton>
                     </div>
                   </form>

                 </div>
               </div>
             </div>
             </Dialog>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
