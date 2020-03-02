import React, { useEffect } from 'react';
import { Router, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import { createBrowserHistory } from 'history';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../store/userReducer'
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

//websocket
import socket  from '../websocket'

//components
import Header from './Header'

//pages
import Landing from '../pages/Landing'

//history
export const history = createBrowserHistory()

const App = ({ fetchUser, fetchChallengers, newChallenger, user, disconnectChallenger }) => {

  useEffect(() => {
    
    socket.on('newUser', (user)=> {
      newChallenger(user)
    })

    socket.on('userProfile', (user) => {
      fetchUser(user)
    })

    socket.on('currentUsers', (users) => {
      fetchChallengers(users)
    })

    socket.on('userDisconnect', socketId => {
      disconnectChallenger({socketId})
    })

    
    return () => {
      socket.off('newUser')
      socket.off('userProfile')
      socket.off('currentUsers')
      socket.off('userDisconnect')
    }
    
  }, []);

  return (
    <div className="container">
      <Router history={history}>
      <ToastContainer
                position="bottom-center"
                autoClose={1500}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange
                draggable={false}
                pauseOnHover
                />
        <Header />
        {user.me &&<> <p>welcome</p> <h4>{user.me.name}</h4></>}
        <Route exact path="/" component={Landing} />
      </Router>
    </div>
  );
}

const mapStateToProps =({ user }) => {
  return { user }
}

const mapDispatchToProps = dispatch => bindActionCreators(
  actionCreators,
  dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(App);
