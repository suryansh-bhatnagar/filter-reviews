import { Checkbox, FormControlLabel } from '@mui/material'
import React from 'react'

const CheckboxElement = ({option,changeChecked,stateArray, setStateArray}) => {
    const {checked , id ,label} = option;
  return (
    <div>
        <FormControlLabel
        className=' text-sm w-full'
        control={
            <Checkbox
            className='w-2 h-2 ml-3 scale-75'
            size='small'
            checked={checked}
            onChange={()=>changeChecked(id,stateArray,setStateArray)}
            />
        }
        label={<span className="p-0 text-sm  w-full">{label}</span>}
/>
    </div>
  )
}

export default CheckboxElement