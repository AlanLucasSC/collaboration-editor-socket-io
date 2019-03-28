import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';

import socket from './socket'
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = { 
      content: '',
      user: Math.round((Math.random() * 100) + 1)+"- User",
      docId: 'room_1'
    };
    
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.updateEditor = this.updateEditor.bind(this);

    socket.emit('user connect', {
      user: this.state.user,
      docId: this.state.docId
    });
    //socket.emit('document id', this.state.user);
    socket.on('update document', this.updateEditor);
  }

  updateEditor(content){
    this.setState({ content })
  }
  
  handleEditorChange(content) {
    socket.emit('update document', content);
  }
  
  render() {
    return (
      <div className="App">
        <Editor apiKey='11mawuf4s296afp379jcddiaf0t6bb1buhxyipc2xwzfgeb5' value={this.state.content} onEditorChange={this.handleEditorChange} />
      </div>
    );
  }
}

export default App;
