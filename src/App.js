import React, {
  Component
} from 'react';
import firebase from 'firebase/app'
import 'firebase/database'
import './App.css';
import NoteForm from './component/noteForm'
import Note from './component/note'
const DB_CONFIG = require('./config.js')
class App extends Component {
  constructor() {
    super()
   
    this.updateResponse = this.updateResponse.bind(this)
    this.up = this.up.bind(this)
    this.de = this.de.bind(this)
    this.addNote = this.addNote.bind(this)
    this.removeNoteId=this.removeNoteId.bind(this)
    firebase.initializeApp(DB_CONFIG.DB_CONFIG);
    this.ref = firebase.database().ref()
    this.state = {
        posts: []
    }
  }
  componentWillMount() {
    alert("mount")
    const previousNotes = this.state.posts;
    this.ref.on('child_added', snapshot => {
      const {
        updateResponse
      } = this;
      const response = {
        id: snapshot.key,
        name: snapshot.val().name
      }
      const posts = this.state.posts;
      posts.push(response);
      this.setState({
        posts: posts,
      })
      console.log(this.state)
      // updateResponse(response)
    })
    this.ref.on('child_removed', snap => {
      for(var i=0; i < previousNotes.length; i++){
        if(previousNotes[i].id === snap.key){
          previousNotes.splice(i, 1);
        }
      }

      this.setState({
        notes: previousNotes
      })
    })
    document.addEventListener('keydown', function(a) {
      if (a.keyCode===65) {
      alert(a.keyCode)
      }
      })
  }
  updateResponse(response) {
    const posts = this.state.posts;
    posts.push(response);
    this.setState({
      posts: posts,
    })
   
  }
  addNote(note)
  {
    this.ref.push({
      name: note
    }) 

  }
  up() {
    this.ref.push({
      name: "the lord is my shephard"
    })
  }
  de() {
    this.ref.set({})
  }
  removeNoteId(id){
    console.log("parent : " + id)
   
    this.ref.child(id).remove();
  }
  render() {
    return ( 
    <div className="App">
    <div className = "con">
    <div className="one">
      {

        this.state.posts.map((a) => {
            return (<Note note={a.name} id={a.id} key={a.id} removeNote={this.removeNoteId}/>)
          })
        }
         {/* <Note note={this.state.posts} /> */}
    </div>

      <div className="two">
        <button className="noteButton" onClick = {this.up} > Update</button> 
        <button className="noteButton"onClick = {this.de} > Delete </button>
      
      <NoteForm aNote={this.addNote}/>

        </div>
        
      </div>
      <textarea className="con" cols="30" rows="10" placeholder="enter" value={this.state.newNoteContent}
      onChange={this.handleUserInput} />
    </div>
    );
  }
}
export default App;