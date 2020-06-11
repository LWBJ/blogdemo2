import React from 'react'

function Paginator(props) {
    let noPages = 0
    let pageInputOptions = []
    
    if (typeof props.count === 'number' && props.count>0) {
      noPages = Math.ceil(props.count/props.pagination)
      for (let i=0; i<noPages; i++) {
        pageInputOptions.push( <option value={i+1}>{i+1}</option> )
      }
    }

    let previous = (props.current>1 ? <button className='btn btn-secondary mr-1' onClick={()=>props.changePage(props.current - 1)}>Back</button> : <button className='btn btn-secondary mr-1' disabled={true}>Back</button>)
    let forwards = (props.current<noPages ? <button className='btn btn-secondary mr-1' onClick={()=>props.changePage(props.current + 1)}>Next</button> : <button className='btn btn-secondary mr-1' disabled={true}>Next</button>)
    
    return (
      <div className='row'>
        <label className='col-auto col-form-label' for={props.id + 'PageNo'}>Page</label>
        <div className='col-auto'>
          <select id={props.id + 'PageNo'} className='form-control' value={props.current} onChange={ (e)=>props.changePage(e.target.value) }>
              {pageInputOptions}
          </select>
        </div>
        {previous}
        {forwards}
      </div>
    )
}

export default Paginator