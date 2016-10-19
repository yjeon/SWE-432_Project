import React, { Component } from 'react';
import Modal from 'react-modal';
import firebase from 'firebase';

class SignInModalTrigger extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.submit = this.submit.bind(this);
  }

  openModal() {
    this.setState({open: true});
  }

  closeModal() {
    this.setState({open: false});
  }

  //this function sends data to firebase server
  submit() {
    const email  = document.getElementById('modal-sign-in-mail-input').value;
    const pass   = document.getElementById('modal-sign-in-password-input').value;
    const promise = firebase.auth().signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));

    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser) {
        this.setState({open: false});
        console.log("hi");
      }
    });
  }

  render () {
    return (
      <div>
        <a className="navbar-items" onClick={this.openModal} href="#">Sign in</a>
        <Modal className="sign-in-modal" isOpen={this.state.open}>
          <h1 className="modal-title">Sign in</h1>
          <div className="modal-inner-form">
            <input className="modal-input" id="modal-sign-in-mail-input" type="email" placeholder="Enter your email here"/>
            <br />
            <br />
            <input className="modal-input" id="modal-sign-in-password-input" type="password" placeholder="Enter your password here" pattern="(?=.*[A-Z]).{6,}"/>
            <br />
            <br />
            <button className="modal-button" id="modal-sign-in-submit-button" onClick={this.submit}>Submit</button>
            <br />
            <br />
            <button className="modal-button" onClick={this.closeModal}>Close</button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default SignInModalTrigger;
