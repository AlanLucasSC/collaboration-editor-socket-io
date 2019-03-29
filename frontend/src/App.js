import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';

import { getUsersonRoom } from './service/firebaseService'
import { objectToArray } from './utils/document'
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
    
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.updateEditor = this.updateEditor.bind(this);
    this.updateUsers = this.updateUsers.bind(this);

    socket.emit('user connect', {
      user: this.state.user,
      docId: this.state.docId
    });

    getUsersonRoom( this.state.docId, this.updateUsers )
    
    socket.on('update document', this.updateEditor);
  }

  updateEditor(content){
    this.setState({ content })
  }

  updateUsers(snapshot){
    if(snapshot !== undefined){
      var users = objectToArray( snapshot.val() )
      this.setState({ users: users })
    }
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
