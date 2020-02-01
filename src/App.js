import React, {Component} from 'react';
import TodoItems from './todoItems'
import auth from './Auth'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    }
    this.addItem = this.addItem.bind(this)
    this.deleteItem=this.deleteItem.bind(this)
  }

addItem(e) {
  
  if(this._inputElement.value !== ""){
    var newItem = {
      text: this._inputElement.value,
      key:Date.now()
    }
    this.setState((previousState)=> {
      return {
        items:previousState.items.concat(newItem)
      }
    }
    )
    this._inputElement.value = ""
  
  }
  console.log(this.state.items)
  e.preventDefault()
}
deleteItem(key) {
  var filteredItems = this.state.items.filter(function (item) {
    return (item.key !== key);
  });
 
  this.setState({
    items: filteredItems
  });
}

  render() {
  return (
    <section className="section">
      
      <div className = "cards">
      <h2>Wasola's list</h2>
      <form onSubmit = {this.addItem}>
        <div className = "mine">
      <input className = "taskBar" ref ={(a) => this._inputElement=a}
       placeholder ="task"/>
      <button className = "btn" type ="submit">Add task</button>
      </div>
      </form>
      <TodoItems entries={this.state.items}
                 delete ={this.deleteItem}/>
      <button type = "button" className = "bbtn" onClick = {() => {
        auth.logout(() => {
          this.props.history.push('/')
        })
      }}
      >logout</button>
      </div>
      
    </section>
    
  );
}
}
export default App;
