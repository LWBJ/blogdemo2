import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'

class SnackUpdate extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            responsOK: null
        }
    }
    
    validate(values) {
        let errors = {}
        if (values.name === '') {
            errors.name = 'Please input a value'
        }
        
        if (values.calories === '') {
            errors.calories = 'Please input a value'
        } else if (!Number.isInteger(values.calories)) {
            errors.calories = 'Please input a valid integer'
        } else if (values.calories <= 0) {
            errors.calories = 'Please input a valid integer greater than zero'
        }
        
        return errors
    }
    
    handleSubmit(values){
        this.props.setLoading()
        fetch(this.props.snack.url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        .then(res=>{
            let responseOK = (res.status===200 ? <p>Item Updated</p> : <p className='text-danger'>Error Occured. Check if the snack name already exists.</p>)
            this.setState({ responseOK: responseOK })
        })
        .then(res=>this.props.refreshList())
        .then(res => {
            setTimeout(()=>this.setState({ responseOK: null }), 3000)
        })
        .catch(err => {
            alert('Oops, something went wrong')
            this.props.refreshList()
        })
    }
    
    render() {
        let form = (
          <Formik
            initialValues = {{
                name: this.props.snack.name,
                calories: this.props.snack.calories,
            }}
            validate = {values=>this.validate(values)}
            onSubmit = {(values, {setSubmitting})=>{
                this.handleSubmit(values)
                setSubmitting(false)
            }}
          >
            {props => (
              <Form>
                <div className='form-row'>
                  <div className='form-group col-12 col-md-6'>
                    <label htmlFor={'snackUpdate-name' + this.props.id}>Name:</label>
                    <Field id={'snackUpdate-name' + this.props.id} name='name' type='text' className='form-control'/>
                    <span className='text-danger'><ErrorMessage name='name' /></span>
                  </div>
                  <div className='form-group col-12 col-md-6'>
                    <label htmlFor={'snackUpdate-calories' + this.props.id}>Calories:</label>
                    <Field id={'snackUpdate-calories' + this.props.id} name='calories' type='number' className='form-control'/>
                    <span className='text-danger'><ErrorMessage name='calories' /></span>
                  </div>
                  {this.state.responseOK}
                </div>
                
                <div className='form-row'>
                  <button className='btn btn-primary mr-1' type='submit' disabled={props.isSubmitting}>Update</button>
                  <button className='btn btn-secondary' type='reset' disabled={!props.dirty || props.isSubmitting}>Reset</button>
                </div>
              </Form>
            )}
          </Formik>
        )
        
        return(
            <div className='col-auto'>
              <button className='btn btn-primary' type='button' data-toggle='modal' data-target={'#snackUpdateModal'+this.props.id}>
                Edit Snack
              </button>
                
              <div class="modal fade" id={'snackUpdateModal'+this.props.id} tabindex="-1" role="dialog" aria-labelledby={'snackUpdateModalLabel'+this.props.id} aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content">
            
                <div class="modal-header">
                  <h5 class="modal-title" id={'snackUpdateModalLabel'+this.props.id}>Update {this.props.snack.name}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
            
                <div class="modal-body p-4">
                  {form} 
                </div>
            
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            
              </div></div></div>
                
            </div>   
        )
    }
}

export default SnackUpdate