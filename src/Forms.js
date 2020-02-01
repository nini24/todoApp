import React, {Component} from 'react';
import './Forms.css'
import auth from './Auth'


class Forms extends Component {
  
    state = {
      fullName:"",
      email: '',
      phoneNumber:'',
      password:"", 
      error:false

    }

    handleChange = ({target}) => {
      const {name,value} =target

      this.setState(previousState => ({
        ...previousState, [name]:value
      }))
    }

    handleValidation = ({target}) => {
      const {name,value} = target;

      if (name === "fullName") {
        if (value.length < 2) {
          this.setState(previousState => ({
            ...previousState,error:true
          }))
          
          document.querySelector(`#${name}`).style.borderColor = "red"
          document.querySelector('.errorMsg').innerHTML ="Why?"
          document.querySelector('.btn').disabled = true;
        }
        else {
          this.setState(previousState => ({
            ...previousState, 
            error:false,
          }))
          document.querySelector(`#${name}`).style.borderColor = "black"
          document.querySelector('.errorMsg').innerHTML =""
          document.querySelector('.btn').disabled = false;
        }
      }
    }

    handleSubmit = () => {
      const {fullName, email, password, phoneNumber} = this.state
      localStorage.setItem('fullName', fullName)
      localStorage.setItem('email', email)
      localStorage.setItem('phoneNumber', phoneNumber)
      localStorage.setItem('password', password)

    }

    componentDidMount() {
      const fullName = localStorage.getItem('fullName')
      const email = localStorage.getItem('email')
      const phoneNumber = localStorage.getItem('phoneNumber')
      const password = localStorage.getItem('password')
      this.setState({fullName,email,phoneNumber,password})
    }
 
     

  

render() {
  const {fullName,email, phoneNumber, password} = this.state;

  return(
    <section className ="formSection">
    <div className = "card">
       <form onSubmit = {this.handleSubmit}>
      <label>
        Full Name
        <input type = "text"
        className ="formControl" 
        name ="fullName"
        id = "fullName"
        value = {fullName}
        onChange = {e => this.handleChange(e)}
        onBlur = {e => this.handleValidation(e)}
        required
        />
        <small className ="errorMsg" ></small>
      </label>

      <label>
        Email
        <input type = "text"
         className ="formControl" 
         name = "email"
         id ="email"
         value = {email}
         onChange = {e => this.handleChange(e)}
         autoComplete = "off"
         required
        />
      </label>

      <label>
        Phone Number
        <input type = "text"
         className ="formControl"
         name = "phoneNumber"
         id = "phoneNumber" 
         value = {phoneNumber}
         onChange = {e => this.handleChange(e)}
         required
        />
      </label>

      <label>
        Password
        <input type ="password"
         className ="formControl"
         name ="password"
         id ="password"
         value = {password} 
         onChange = {e => this.handleChange(e)}
         required
        />
      </label>

      <button onClick = {() => {auth.login(() => { this.props.history.push('/App')})}} 
      type = "submit" className = "btns">
        Login
      </button>

    </form>
    
      
       </div>
       </section>
      
   

  );
  }
}




export default Forms;
