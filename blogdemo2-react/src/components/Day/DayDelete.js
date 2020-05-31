import React from 'react'

function DayCreate(props) {
    let handleDelete = () =>{
        props.setLoading()
        fetch(props.day.url, {method: 'DELETE'})
        .then(res => alert('Day deleted'))
        .then(res => props.refreshList())
        .catch(err => {
            alert('Oops, something went wrong')
            props.refreshList()
        })
    }
    
    return(
      <div>
        <button type="button" class="btn btn-danger" data-toggle="modal" data-target={'#dayDeleteModal' + props.day.date}>
          Delete Day
        </button>


        <div class="modal fade" id={'dayDeleteModal' + props.day.date} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
        <div class="modal-content">
            
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Confirm Delete</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
      
            <div class="modal-body">
                <p>Delete the day {props.day.date}?</p>
                <p>This action cannot be undone.</p>
                <button className='btn btn-lg btn-danger' onClick={handleDelete} data-dismiss="modal">
                  Delete
                </button>
            </div>
      
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
        </div>
        </div>
      </div>
    )
}

export default DayCreate