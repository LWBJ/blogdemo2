import React from 'react';
import DayDisplay from './DayDisplay.js'
import MealDisplay from './MealDisplay.js'
import SnackDisplay from './SnackDisplay.js'
import DrinkDisplay from './DrinkDisplay.js'

function MainDisplay(props) {
  return (
    <div className='row my-4'><div className='col-12'>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item">
          <a className="nav-link active" id="day-tab" data-toggle="tab" href="#day-tab-content" role="tab" aria-controls="day-tab-content" aria-selected="true">Days</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="main-meal-tab" data-toggle="tab" href="#main-meal-tab-content" role="tab" aria-controls="main-meal-tab-content" aria-selected="false">Meals</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="snack-tab" data-toggle="tab" href="#snack-tab-content" role="tab" aria-controls="snack-tab-content" aria-selected="false">Snacks</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="drink-tab" data-toggle="tab" href="#drink-tab-content" role="tab" aria-controls="drink-tab-content" aria-selected="false">Drinks</a>
        </li>
      </ul>
    
      <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active" id="day-tab-content" role="tabpanel" aria-labelledby="day-tab">
          <DayDisplay username={props.username} checkAuth={props.checkAuth} handleLogout={props.handleLogout}/>
        </div>
        
        <div className="tab-pane fade" id="main-meal-tab-content" role="tabpanel" aria-labelledby="main-meal-tab">
          <MealDisplay username={props.username} checkAuth={props.checkAuth} handleLogout={props.handleLogout}/>
        </div>
        
        <div className="tab-pane fade" id="snack-tab-content" role="tabpanel" aria-labelledby="snack-tab">
          <SnackDisplay username={props.username} checkAuth={props.checkAuth} handleLogout={props.handleLogout}/>
        </div>
        
        <div className="tab-pane fade" id="drink-tab-content" role="tabpanel" aria-labelledby="drink-tab">
          <DrinkDisplay username={props.username} checkAuth={props.checkAuth} handleLogout={props.handleLogout}/>
        </div>
      </div>
    </div></div>
  );
}

export default MainDisplay;
