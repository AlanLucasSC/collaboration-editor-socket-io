import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';

import Users from './users'
import socket from './socket'
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = { 
      content: '',
      user: Math.round((Math.random() * 100) + 1)+" - User",
      docId: 'room_1',
      users: []
    };
    
    this.handleEditorChange = this.handleEditorChange.bind(this)
    this.updateEditor = this.updateEditor.bind(this)
    this.newUserConnect = this.newUserConnect.bind(this)
    this.addOldUsers = this.addOldUsers.bind(this)
    this.removeUser = this.removeUser.bind(this)

    socket.emit('user connect', {
      user: this.state.user,
      docId: this.state.docId
    });

    socket.on('new user', this.newUserConnect)
    socket.on('update document', this.updateEditor)
    socket.on('users on room', this.addOldUsers)
    socket.on('user disconnected', this.removeUser)
  }

  removeUser(user){
    var localUsers = this.state.users
    var newUsers = localUsers.filter( (localUser) => localUser.name !== user.name )
    this.setState({
      users: newUsers
    })
  }

  addOldUsers(users){
    var localUsers = this.state.users
    users.forEach(user => {
      localUsers.push(user)
    })
    this.setState({
      users: localUsers
    })
  }

  newUserConnect(user){
    var users = this.state.users
    var toUser = user.clientId
    socket.emit('others users on room', {
      users,
      toUser
    })
    users.push(user)
    this.setState({
      users: users
    })
  }

  updateEditor(content){
    this.setState({ content })
  }
  
  handleEditorChange(content) {
    socket.emit('update document', content);
  }
  
  render() {
    return (
      <div className="container p-2">
        <Users users={ this.state.users }/>
        <Editor apiKey='11mawuf4s296afp379jcddiaf0t6bb1buhxyipc2xwzfgeb5' value={this.state.content} onEditorChange={this.handleEditorChange} />
      </div>
    );
  }
}

export default App;
