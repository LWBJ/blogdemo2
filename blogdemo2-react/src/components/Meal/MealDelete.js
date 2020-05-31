import React from 'react'

function MealDelete(props) {
    let deleteMeal = ()=>{
        props.setLoading()
        fetch(props.meal.url, {method: 'DELETE'})
        .then(res => alert('Meal deleted'))
        .then(res => props.refreshList())
        .catch(err => {
            alert('Oops, something went wrong')
            props.refreshList()
        })
    }
    
    return (
        <div className='col-auto'>
          <button className='btn btn-danger' type='button' data-toggle='modal' data-target={'#mealDeleteModal'+ props.id}>
            Delete Meal
          </button>
                
          <div class="modal fade" id={'mealDeleteModal'+ props.id} tabindex="-1" role="dialog" aria-labelledby={'mealDeleteModalLabel'+ props.id} aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content">
            
            <div class="modal-header">
              <h5 class="modal-title" id={'mealDeleteModalLabel'+ props.id}>Delete {props.meal.name}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            
            <div class="modal-body">
              <p>Delete the meal {"'" + props.meal.name + "'"}? This action cannot be undone.</p>
              <button onClick={deleteMeal} type='button' className='btn btn-danger' data-dismiss="modal">
                Delete
              </button>
            </div>
            
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
            
          </div></div></div>        
        </div>  
    )     
}

export default MealDelete