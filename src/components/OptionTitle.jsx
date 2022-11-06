import React from "react"

export const OptionTitel = ({firstClass, title})=> {
  return (
    <div className={'option-title '+firstClass+`_option-title`}>
      {title}
      {/* <span>{title}</span> */}
    </div>
  )
}