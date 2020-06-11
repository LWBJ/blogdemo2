import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'

class MealInstanceCreate extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
          data: [],
          loading: true,
          responseOK: ''
      }
  }

  async mealData() {
      let mealSet = []
      let pageNo = 1
      let data
      
      do {
          let url = 'https://lwbjblogdemo2.herokuapp.com/apidata/MainMeal/?page=' + pageNo
          data= await fetch(url)
            .then(results => results.json())
            .catch(err => {
                alert('Something went wrong') 
                return {next: false}
            })
          
          if (data.results && data.results.length > 0) {
            mealSet = mealSet.concat(data.results)    
          } else {
            mealSet = ['Error']
            data = {next: false}
          }
          
          pageNo++
      }
      while (data.next)
      
      this.setState({
          loading: false,
          data: mealSet
      })
  }
  
  validate(values) {
      let errors = {}
      if (values.mainMeal === '') {
          errors.mainMeal = 'Please select an option'
      }
      return errors
  }
  
  async onSubmit(values) {
      let url = 'https://lwbjblogdemo2.herokuapp.com/apidata/MainMealInstance/'
      this.props.setLoading()
      let access = await this.props.checkAuth()
      
      if (!access) {
            alert('Authentication failed. Please login again')
            window.location.reload()
        }
      
      fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${access}`,
          },
          body: JSON.stringify(values)
      })
      .then(res => {
          let responseOK 
          if (res.status===201) {
              responseOK = <p>Item Created</p>
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
  
  render() {
    let options
    
    if (this.state.loading) {
        options = <option value=''>Loading</option>
    } else if (this.state.data.length > 0 && this.state.data[0] !== 'Error') {
        options = this.state.data.map(meal => <option value={meal.url}>{meal.name}</option>)
        options.push(<option value=''>{''}</option>)
    } else {
        options = <option>{''}</option>
    }
    
    let form = (
              <Formik
                initialValues = {{
                  mainMeal: '',
                  day: this.props.day
                }}
                onSubmit = {(values, {setSubmitting})=>{
                  this.onSubmit(values)
                  setSubmitting(false)
                }}
                validate = {this.validate}
              >
              {props => (
                <Form>
                  <div className='form-row'>
                    
                    <div className='form-group col'>
                      <Field name='mainMeal' as='select' className='form-control'>
                        {options}
                      </Field>
                      <span className='text-danger'><ErrorMessage name='mainMeal' /></span>
                      {this.state.responseOK}
                    </div>
            
                    <div className='col-auto'>
                      <button className='btn btn-primary' type='submit' disabled={props.isSubmitting} >Add</button>
                    </div>
                  
                  </div>
                </Form>
              )}
              </Formik>
        )
    
    return (
      <div className='col-auto'>
        <button className='btn btn-secondary' onClick={()=> this.mealData()} type='button' data-toggle='modal' data-target={'#mealInstanceCreateModal'+this.props.id}>
          Add
        </button>
        
        <div class="modal fade" id={'mealInstanceCreateModal'+this.props.id} tabindex="-1" role="dialog" aria-labelledby={'mealInstanceCreateModalLabel'+this.props.id} aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content">
            
            <div class="modal-header">
              <h5 class="modal-title" id={'mealInstanceCreateModalLabel'+this.props.id}>Add meal for {this.props.id}</h5>
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

export default MealInstanceCreate