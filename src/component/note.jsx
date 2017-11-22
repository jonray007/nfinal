import React, { Component } from 'react'
class Note extends Component {
    constructor(props){
      super(props)
      this.exed=this.exed.bind(this)
   
      console.log("note : " +this.props)
      debugger
    }
  exed(m){
    
    this.props.removeNote(m)
  }
  
  
    render() {
      return ( 
      <div >
         {this.props.note}   <span className="closebtn" onClick={()=>this.exed(this.props.id)}> &times;</span>
      </div>
      )
    }
  }
  export default Note