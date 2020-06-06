import React from 'react'
import Menu from './Menu'

const Layout = ({title="TODO",description="TASK MANAGEMENT APPLICATION",className,children}) =>(
    <div>
        <Menu />
        <div className="jumbotron jumbotron-fluid ">
            <div className="container">
                <h3 className="display-4"> {title} </h3>
                <p className="lead">{description}</p>
            
            </div>
        </div>

        <div className={className}>{children}</div>
    </div>
)

export default Layout;