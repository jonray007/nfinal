import React, {Component} from 'react'
class NoteForm extends Component {
    constructor(props) {
      super(props)
      this.state = {
        newNoteContent: ''
      }
      this.handleUserInput = this.handleUserInput.bind(this)
      this.writeNote = this.writeNote.bind(this)
    }
    handleUserInput(e) {
        this.setState({
        newNoteContent: e.target.value
      })
    }
    writeNote() {
      this.props.aNote(this.state.newNoteContent)
      this.setState({
        newNoteContent:''
      })
  
    }
      render(){
        return (
          <div>
           <textarea cols="30" rows="10" placeholder="enter" value={this.state.newNoteContent}
            onChange={this.handleUserInput} />
            <button className= "noteButton menu" onClick= {this.writeNote}>Add Note </button>
          </div>
        )
  
    }
  }
  export default NoteForm