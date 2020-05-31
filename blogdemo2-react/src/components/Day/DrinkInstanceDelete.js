import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'

class DrinkInstanceDelete extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            responseOK: null
        }
    }
    
    validate(values) {
        let errors = {}
        if (values.drinkInstance==='') {
            errors.drinkInstance = 'Please select an option'
        }
        return errors
    }
    
    handleSubmit(values) {
        this.props.setLoading()
        fetch(values.drinkInstance, {method: 'DELETE'})
        .then(res => {
            let responseOK = (res.status===204 ? <p>Item Deleted</p> : <p>Error Occured</p>)
            this.setState({ responseOK: responseOK })
        })
        .then(res => this.props.refreshList())
        .then(res => {
            setTimeout(()=>this.setState({ responseOK: null }) , 3000)
        })
        .catch(err => {
            alert('Oops, something went wrong')
            this.props.refreshList()
        })
    }
    
    render() {
        let options = this.props.options.map(option => {
            return <option value={option.url}>{option.drink_name}</option>
        })
        options.push(<option>{''}</option>)
        
        let form = (
          <Formik
            initialValues = {{
                drinkInstance: ''
            }}
            validate = {values => this.validate(values)}
            onSubmit= {(values, {setSubmitting}) => {
                this.handleSubmit(values)
                setSubmitting(false)
            }}
          >
            {props => (
              <Form>
                <div className='form-row'>
                  <div className='col'>
                    <Field name='drinkInstance' as='select' className='form-control'>
                      {options}
                    </Field>
                    <span className='text-danger'><ErrorMessage name='drinkInstance'/></span>
                    {this.state.responseOK}
                  </div>
                  <div className='col-auto'>
                    <button type='submit' disabled={props.isSubmitting} className='btn btn-danger'>Delete</button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )
        
        return (
          <div className='col-auto'>
            <button className='btn btn-secondary' type='button' data-toggle='modal' data-target={'#drinkInstanceDeleteModal'+this.props.id}>
              Delete
            </button>
        
            <div class="modal fade" id={'drinkInstanceDeleteModal'+this.props.id} tabindex="-1" role="dialog" aria-labelledby={'drinkInstanceDeleteModalLabel'+this.props.id} aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content">
            
              <div class="modal-header">
                <h5 class="modal-title" id={'drinkInstanceDeleteModalLabel'+this.props.id}>Delete drink for {this.props.id}</h5>
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

export default DrinkInstanceDelete