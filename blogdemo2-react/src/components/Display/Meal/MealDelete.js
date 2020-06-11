import React from 'react'

function MealDelete(props) {
    let deleteMeal = async ()=>{
        props.setLoading()
        let access = await props.checkAuth()
        
        if (!access) {
            alert('Authentication failed. Please login again')
            window.location.reload()
        }
        
        fetch(props.meal.url, {
            method: 'DELETE',
            headers: {'Authorization': `Bearer ${access}`}
        })
        .then(res => {
          if (res.status === 204) {
              alert('Meal deleted')
          } else if (res.status === 401){
              alert('Error Occured. Check login again.')
          } else {
              alert('Oops, something went wrong')
          }
        })
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