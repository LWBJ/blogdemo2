import React from 'react'
import MealInstanceCreate from './MealInstanceCreate.js'
import MealInstanceDelete from './MealInstanceDelete.js'
import SnackInstanceCreate from './SnackInstanceCreate.js'
import SnackInstanceDelete from './SnackInstanceDelete.js'
import DrinkInstanceCreate from './DrinkInstanceCreate.js'
import DrinkInstanceDelete from './DrinkInstanceDelete.js'
import DayDelete from './DayDelete.js'

function DayItem(props) {
    let day = props.day
    let instanceCreateDelete
    if (props.username) {
      instanceCreateDelete = (
        <div>
        <div className='row my-1 mt-4'>
          <div className='col-4'>
            <h5 className='mt-1'><strong>Meals:</strong></h5>
          </div>
          <MealInstanceCreate 
            day={day.url}
            id = {day.date}
            setLoading={props.setLoading} 
            refreshList={props.refreshList}
            checkAuth = {props.checkAuth}
          />
          <MealInstanceDelete 
            id={day.date}
            options={day.main_meal_instances}
            setLoading={props.setLoading} 
            refreshList={props.refreshList}
            checkAuth = {props.checkAuth}
          />
        </div>  
        <div className='row my-1'>
          <div className='col-4'>
            <h5 className='mt-1'><strong>Snacks:</strong></h5>
          </div>
          <SnackInstanceCreate 
            day={day.url}
            id = {day.date}
            setLoading={props.setLoading} 
            refreshList={props.refreshList}
            checkAuth = {props.checkAuth}
          />
          <SnackInstanceDelete 
            id={day.date}
            options={day.snack_instances}
            setLoading={props.setLoading} 
            refreshList={props.refreshList}
            checkAuth = {props.checkAuth}
          />
        </div>  
        <div className='row my-1'>
          <div className='col-4'>
            <h5 className='mt-1'><strong>Drinks:</strong></h5>
          </div>
          <DrinkInstanceCreate 
            day={day.url}
            id = {day.date}
            setLoading={props.setLoading} 
            refreshList={props.refreshList}
            checkAuth = {props.checkAuth}
          />
          <DrinkInstanceDelete 
            id={day.date}
            options={day.drink_instances}
            setLoading={props.setLoading} 
            refreshList={props.refreshList}
            checkAuth = {props.checkAuth}
          />
        </div>
        
        <div className='row my-2'><div className='col'>
          <DayDelete 
            day={day} 
            setLoading={props.setLoading} 
            refreshList={props.refreshList}
            checkAuth = {props.checkAuth}
          />
        </div></div>
        
        </div>
      )
    }
    
    return(
      <div className='col-12 border rounded border-primary p-4 h-100'>
        
        <div className='row'><div className='col-12'>  
          <h4><strong>Date: {day.date}</strong></h4>
        </div></div>
      
        <div className='row my-2 mb-2'><div className='col-12'>
          <p>Meals: {day.meals_set.join(', ')}</p>
          <p>Snacks: {day.snacks_set.join(', ')}</p>
          <p>Drinks: {day.drinks_set.join(', ')}</p>
          <p>Calories: {day.calories}</p>
        </div></div>
        
        {instanceCreateDelete}
        
      </div>
    )
}

export default DayItem