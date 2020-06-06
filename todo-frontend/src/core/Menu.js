import React, { Fragment } from 'react'
import {isAuthenticated} from '../auth/index'
import {withRouter,Link} from 'react-router-dom'
import {signout} from '../auth/index'


const isActive = (history,path)=>{
    if(history.location.pathname === path){
        return {color: '#ff9900'};
    }
    else{
        return {color: '#ffffff'};
    }
}

const Menu = ({history}) =>(
    <div>
        <ul className="nav nav-tab bg-primary">

        <li className="nav-item">
                <Link className="nav-link" style={isActive(history,"/")} to="/">HOME</Link>
        </li>

        {!isAuthenticated() && (
            <Fragment>
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history,"/signin")} to="/signin">SIGN IN</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link"  style={isActive(history,"/signup")} to="/signup">SIGN UP</Link>
                </li>
            </Fragment>
        )}
            
        {isAuthenticated() && (
            <li className="nav-item">
                <span className="nav-link" style={{cursor:'pointer',color:"#ffffff"}}onClick={()=>signout(()=>{history.push('/')})}>SIGN OUT</span>
            </li>
        )}
             
        
        </ul>
    
    </div>
)

export default withRouter(Menu);    