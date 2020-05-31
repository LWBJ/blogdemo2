import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'

class DayCreate extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            responseOK: null
        }
    }
    
    onSubmit(values) {
        let url = 'http://127.0.0.1:8000/apidata/Day/'
        
        this.props.setLoading()
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        })
        .then(res => {
            let responseOK = (res.status===201? <p>Item Created</p> : <p className='text-danger'>Error Occured. Check if the day already exists</p>)
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
    
    validate(values) {
        let errors = {}
        if (values.date === '') {
            errors.date = 'Please select a date'
        }
        
        return errors
    }
    
    render() {
      return (
        <Formik
          initialValues = {{
              date: ''
          }}
          onSubmit = {(values, {setSubmitting})=> {
              this.onSubmit(values)
              setSubmitting(false)
          }}
          validate = {values=>this.validate(values)}
        >
          {props => 
            <div className='row border rounded border-primary p-4 mb-4'><div className='col-12'>
             
            <div className='row'>
              <div className='col'>
                <h3>Add New Day</h3>
              </div>
              
              <div className='col-auto'>
                <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#day-create" aria-expanded="false" aria-controls="day-create">
                  Expand
                </button>
              </div>
            </div> 
            
            <div class="collapse" id="day-create">
            <Form>
              <div className='form-row'>
                <div className='form-group col-12'>
                  <label htmlFor='day-create-date'>Date:</label>
                  <Field id='day-create-date' name='date' type='date' className='form-control' />
                  <span className='text-danger'><ErrorMessage name='date' /></span>
                  {this.state.responseOK}
                </div>
              </div>
              
              <div className='form-row'>
                <button type='submit' disabled={props.isSubmitting} className='btn btn-primary mr-1'>Create</button>
                <button type='reset' disabled={!props.dirty || props.isSubmitting} className='btn btn-secondary'>Reset</button>
              </div>
            </Form>
            </div>
            
            </div></div>
          }
        </Formik>
      )
    }
}

export default DayCreate