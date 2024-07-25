import React from 'react'

const Alert = (props) => {
  return (
    <div style={{height:'50px'}} >
        {props.alert && 
            <div className="alert alert-warning alert-dismissible fade show" role="alert" >
                <strong>{props.alert.typ}</strong> : {props.alert.msg}
            </div>
        }
    </div>
  )
}

export default Alert
