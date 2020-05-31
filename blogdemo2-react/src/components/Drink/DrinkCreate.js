import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'

class DrinkCreate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            responseOK: null
        }
    }
    
    validate(values) {
        let errors = {}
        if (values.name === '') {
            errors.name = 'Please input a value'
        }
        
        if (values.calories === '') {
            errors.calories = 'Please input a valid integer'
        } else if (!Number.isInteger(values.calories)) {
            errors.calories = 'Please input a valid integer'
        } else if (values.calories < 0) {
            errors.calories = 'Please input a valid integer greater than or equals to 0'
        }
        
        return errors
    }
    
    handleSubmit(values) {
        this.props.setLoading()
        let url = 'http://127.0.0.1:8000/apidata/Drink/'
        fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type' : 'application/json'  
            },
            body: JSON.stringify(values)
        })
        .then(res => {
            let responseOK = (res.status===201 ? <p>Item Created</p> : <p className='text-danger'>Error Occured. Check if the drink name already exists.</p>)
            this.setState({ responseOK: responseOK })
        })
        .then(res => this.props.refreshList())
        .then(res => {
            setTimeout(()=>this.setState({responseOK: null}) , 3000)
        })
        .catch(err=> {
            alert('Oops, something went wrong')
            this.props.refreshList()
        })
    }
    
    render() {
        let form = (
          <Formik
            initialValues = {{
                name: '',
                calories: '',
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
                  <div className='form-group col-12 col-sm-6'>
                    <label htmlFor='drinkCreate-name'>Name:</label>
                    <Field id='drinkCreate-name' name='name' type='text' className='form-control' />
                    <span className='text-danger'><ErrorMessage name='name'/></span>
                  </div>
                  <div className='form-group col-12 col-sm-6'>
                    <label htmlFor='drinkCreate-calories'>Calories:</label>
                    <Field id='drinkCreate-calories' name='calories' type='number' className='form-control' />
                    <span className='text-danger'><ErrorMessage name='calories'/></span>
                  </div>
                  {this.state.responseOK}
                </div>
                
                <div className='form-row'>
                  <button className='btn btn-primary mr-1' type='submit' disabled={props.isSubmitting}>Create</button>
                  <button className='btn btn-secondary' type='reset' disabled={!props.dirty || props.isSubmitting}>Reset</button>
                </div>
              </Form>
            )}
          </Formik>
        )
        
        return (
          <div className='row border rounded border-primary p-4 mb-4'><div className='col'>
            <div className='row'>
                <div className='col'>
                  <h3>Add New Drink</h3>
                </div>
                <div className='col-auto'>
                  <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#drink-create" aria-expanded="false" aria-controls="drink-create">
                    Expand
                  </button>
                </div>
              </div>
              
              <div class="collapse" id="drink-create">
                {form}
              </div>
          
          </div></div>
        )
    }
}

export default DrinkCreate