import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom'
import App from './App';
import Forms from './Forms'
import Not from './notfound'
import auth from './Auth'
import * as serviceWorker from './serviceWorker';


const ProtectedRoute = ({component:Component, ...rest}) => {
    return (
    <Route {...rest} render ={
        (props) => {
            if (auth.isAuthenticated()) {
         return <Component {...props}/>
    }
    else {
        return <Redirect to = {
            {
            pathname:'/',
            state: {
                from:props.location
            }
        }  
    }/>
        }
    }}
    />
    )
}


const routing = (
    <Router>
        <div>
            <Switch>
            <Route exact path="/" component= {Forms} />
            <ProtectedRoute path="/App" component ={App} />
            <Route component = {Not} />
            </Switch>
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
