import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'

class SnackInstanceDelete extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            responseOK: null
        }
    }
    
    handleSubmit(values) {
        this.props.setLoading()
        fetch(values.snackInstance, {method: 'DELETE'})
        .then(res => {
            let responseOK = (res.status===204? <p>Item Deleted</p> : <p>Error occured</p>)
            this.setState({ responseOK: responseOK })
        })
        .then(res => this.props.refreshList())
        .then(res => {
            setTimeout(()=>this.setState({ responseOK: null }), 3000)
        })
        .catch(err => {
            alert('Oops, something went wrong.')
            this.props.refreshList()
        })
    }
    
    validate(values) {
        let errors = {}
        if (values.snackInstance === '') {
            errors.snackInstance = 'Please select an option'
        }
        
        return errors
    }
    
    render() {
        let options = this.props.options.map(option => {
            return <option value={option.url}>{option.snack_name}</option>
        })
        options.push(<option>{''}</option>)
        
        let form = (
          <Formik
            initialValues = {{ snackInstance: '' }}
            validate = {values => this.validate(values)}
            onSubmit = {(values, {setSubmitting}) => {
                this.handleSubmit(values)
                setSubmitting(false)
            }}
          >
            {props => (
              <Form>
                <div className='form-row'>
                  <div className='form-group col'>
                    <Field name='snackInstance' as='select' className='form-control'>
                      {options}
                    </Field>
                    <span className='text-danger'><ErrorMessage name='snackInstance' /></span>
                    {this.state.responseOK}
                  </div>
                  
                  <div className='col-auto'>
                    <button type='submit' className='btn btn-danger' disabled={props.isSubmitting}>Delete</button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )
        
        return(
          <div className='col-auto'>
            <button className='btn btn-secondary' type='button' data-toggle='modal' data-target={'#snackInstanceDeleteModal'+this.props.id}>
              Delete
            </button>
        
            <div class="modal fade" id={'snackInstanceDeleteModal'+this.props.id} tabindex="-1" role="dialog" aria-labelledby={'snackInstanceDeleteModalLabel'+this.props.id} aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content">
            
              <div class="modal-header">
                <h5 class="modal-title" id={'snackInstanceDeleteModalLabel'+this.props.id}>Delete snack for {this.props.id}</h5>
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

export default SnackInstanceDelete