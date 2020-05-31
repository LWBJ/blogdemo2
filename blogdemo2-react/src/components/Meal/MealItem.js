import React from 'react'
import MealUpdate from './MealUpdate.js'
import MealDelete from './MealDelete.js'

function MealItem(props) {
    let meal = props.meal
    
    let dayList = meal.days_text.map(day => <li key={day}>{day}</li>) 
    
    return(
      <div className='col border rounded border-primary p-4 h-100'>
        <div className='row mb-2'><div className='col-12'>
          <h4><strong>{meal.name}</strong></h4>
        </div></div>
          
        <div className='row mb-4'>
          <MealUpdate 
            setLoading = {props.setLoading}
            refreshList = {props.refreshList}
            meal = {meal}
            id = {meal.name.split(' ').join('-') + '-id'}
          />
          <MealDelete 
            setLoading = {props.setLoading}
            refreshList = {props.refreshList}
            meal = {meal}
            id = {meal.name.split(' ').join('-') + '-id'}
          />
        </div>
        
        <div className='row'><div className='col-12'>
          <p>Calories: {meal.calories}</p>
          <span>Days:</span>
          <ul>
            {dayList}
          </ul>
        </div></div>
      </div>
    )
}

export default MealItem