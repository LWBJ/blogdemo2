import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'

class MealCreate extends React.Component {
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
    
    async handleSubmit(values) {
        this.props.setLoading()
        let url = 'https://lwbjblogdemo2.herokuapp.com/apidata/MainMeal/'
        let access = await this.props.checkAuth()
        
        if (!access) {
            alert('Authentication failed. Please login again')
            this.props.handleLogout()
            this.props.refreshList()
            return null
        }
        
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}`
            },
            body: JSON.stringify(values)
        })
        .then(res => {
            let responseOK
            if (res.status===201) {
                responseOK = <p>Item Created</p>  
            } else if (res.status === 401) {
                responseOK = <p className='text-danger'>Error Occured. Check login again.</p>  
            } else {
                responseOK = <p className='text-danger'>Error Occured. Check if the meal name already exists.</p>   
            }
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
      return(
        <Formik
          initialValues = {{
              name: '',
              calories: ''
          }}
          validate = {values => this.validate(values)}
          onSubmit = {(values, {setSubmitting}) => {
              this.handleSubmit(values)
              setSubmitting(false)
          }}
        >
          {props => (
            <div className='row border rounded border-primary p-4 mb-4'><div className='col-12'>
              
              <div className='row'>
                <div className='col'>
                  <h3>Add New Meal</h3>
                </div>
                <div className='col-auto'>
                  <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#meal-create" aria-expanded="false" aria-controls="meal-create">
                    Expand
                  </button>
                </div>
              </div>
              
              <div class="collapse" id="meal-create">
              <Form>
                <div className='form-row'>
                  <div className='form-group col-12 col-sm-6'>
                    <label htmlFor='mealCreate-name'>Name:</label>
                    <Field id='mealCreate-name' name='name' type='text' className='form-control' />
                    <span className='text-danger'><ErrorMessage name='name' /></span>
                  </div>
                  <div className='form-group col-12 col-sm-6'>
                    <label htmlFor='mealCreate-calories'>Calories:</label>
                    <Field id='mealCreate-calories' name='calories' type='number' className='form-control' />
                    <span className='text-danger'><ErrorMessage name='calories' /></span>
                  </div>
                  {this.state.responseOK}
                </div>
                
                <div className='form-row'>
                  <button className='btn btn-primary mr-1' type='submit' disabled={props.isSubmitting}>Create</button>
                  <button className='btn btn-secondary' type='reset' disabled={!props.dirty || props.isSubmitting}>Reset</button>
                </div>
              </Form>
              </div>
              
            </div></div>
          )}
        </Formik>
      )
    }
}

export default MealCreate