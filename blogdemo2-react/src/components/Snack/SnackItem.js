import React from 'react'
import SnackUpdate from './SnackUpdate.js'
import SnackDelete from './SnackDelete.js'

function SnackItem(props){
    let days = props.snack.days_text.map(day => <li key={day}>{day}</li>)
    
    return(
      <div className='col-12 border rounded border-primary h-100 p-4'>
        
        <div className='row mb-2'><div className='col'>
          <h4><strong>{props.snack.name}</strong></h4>
        </div></div>
        
        <div className='row mb-4'>
          <SnackUpdate 
            setLoading = {props.setLoading}
            refreshList = {props.refreshList}
            snack = {props.snack}
            id = {props.snack.name.split(' ').join('-')}
          />
          <SnackDelete
            setLoading = {props.setLoading}
            refreshList = {props.refreshList}
            snack = {props.snack}
            id = {props.snack.name.split(' ').join('-')}
          />
        </div>
        
        <div className='row'><div className='col'>
          <p>Calories: {props.snack.calories}</p>
          <ul>
            {days}
          </ul>
        </div></div>
      </div>
    )
}

export default SnackItem