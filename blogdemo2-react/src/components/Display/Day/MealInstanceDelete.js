import React from 'react'
import {Formik, Field, Form, ErrorMessage} from 'formik'

class MealInstanceDelete extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            responseOK: null,
        }
    }
    
    validate(values) {
        let errors = {}
        if (values.mainMealInstance === '') {
            errors.mainMealInstance = 'Please select a value'
        }
        
        return errors
    }
    
    async onSubmit(values) {
        this.props.setLoading()
        let access = await this.props.checkAuth()
        
        if (!access) {
            alert('Authentication failed. Please login again')
            window.location.reload()
        }
        
        fetch(values.mainMealInstance, {
            method: 'DELETE',
            headers: {'Authorization': `Bearer ${access}`},
        })
        .then(res => {
            let responseOK 
            if (res.status===204) {
                responseOK = <p>Item Deleted</p>
            } else if (res.status===401) {
                responseOK = <p className='text-danger'>Error Occured. Check login again.</p>
            } else {
                responseOK = <p className='text-danger'>Oops, something went wrong</p>
            }
            this.setState({responseOK : responseOK})
        })
        .then(res => this.props.refreshList())
        .then(res => {
            setTimeout(() => this.setState({responseOK: null}), 3000)   
        })
        .catch(err => {
            alert('Oops, something went wrong')
            this.props.refreshList()
        })
    }
    
    render(){
        let options = this.props.options.map(option => {
            return <option value={option.url}>{option.meal_name}</option>
        })
        options.push( <option>{''}</option> )
        
        let form = (
            <div className='col'>
            <Formik
              initialValues = {{
                  mainMealInstance: ''
              }}
              onSubmit = {(values, {setSubmitting, resetForm}) => {
                  this.onSubmit(values)
                  setSubmitting(false)
                  resetForm()
              }}
              validate = {values => this.validate(values)}
            > 
              {props => { return (
                  <Form>
                    <div className='form-row'>
                      <div className='form-group col'>
                        <Field className='form-control' name='mainMealInstance' as='select'>
                          {options}
                        </Field>
                        <span className='text-danger'><ErrorMessage name='mainMealInstance' /></span>
                        {this.state.responseOK}
                      </div>
                    
                      <div className='col-auto'>
                        <button className='btn btn-danger' type='submit' disabled={props.isSubmitting}>Delete</button>
                      </div>
                    </div>
                  </Form>
              )}}
            </Formik>
            </div>
            )
        
        return(
          <div className='col-auto'>
          
            <button className='btn btn-secondary' type='button' data-toggle='modal' data-target={'#mealInstanceDeleteModal'+this.props.id}>
              Delete
            </button>

            
            <div class="modal fade" id={'mealInstanceDeleteModal'+this.props.id} tabindex="-1" role="dialog" aria-labelledby={'mealInstanceDeleteModalLabel'+this.props.id} aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content">
            
              <div class="modal-header">
                <h5 class="modal-title" id={'mealInstanceDeleteModalLabel'+this.props.id}>Delete meal for {this.props.id}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            
              <div class="modal-body">
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

export default MealInstanceDelete