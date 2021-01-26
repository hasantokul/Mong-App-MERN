import React from 'react'
import {Input,InputGroup,InputGroupAddon,InputGroupText} from "reactstrap"

function InputItem({value, name,label,placeholder,onChange}) {
    return (
        <div>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText >{label}</InputGroupText>
            </InputGroupAddon>
            <Input className="form-control" value={value} name={name} placeholder={placeholder} onChange={onChange} />     
        </InputGroup>
        </div>
    )
}

export default InputItem
