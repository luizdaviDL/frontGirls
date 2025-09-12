import React from 'react'

export const Button = ({text, onClick}) => {
  return (
    <div>
        <button onClick={onClick} type="button" class="btn" style={{backgroundColor:"#2F8689", color:"#FFFFFF", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)", width:"14rem"}}>{text}</button>
    </div>
  )
}
