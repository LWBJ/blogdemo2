import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'

class DrinkInstanceCreate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            data: [],
            responseOK: null
        }
    }
    
    async getDrinks() {
        let url = 'http://127.0.0.1:8000/apidata/Drink/?page='
        let drinkSet = []
        
        let pageNo = 1
        let data
        do {
            data = await fetch(url+pageNo)
            .then(res => res.json())
            .catch(err => {
                alert('Oops, something went wrong')
                return {next: false}
            })
                 
            if (data.results && data.results.length > 0) {
                drinkSet = drinkSet.concat(data.results)
            } else {
                drinkSet = ['Error']
                data = {next:false}
            }
        
            pageNo++
        }
        while (data.next)
            
        this.setState({ data: drinkSet, loading: false })
    }
    
    validate(values) {
        let errors = {}
        if (values.drink === '') {
            errors.drink = 'Please select an option'
        }
        return errors
    }
    
    handleSubmit(values) {
        this.props.setLoading()
        let url = 'http://127.0.0.1:8000/apidata/DrinkInstance/'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        })
        .then(res => {
            let responseOK = (res.status===201 ? <p>Item Created</p> : <p>Error Occured</p>)
            this.setState({responseOK: responseOK})
        })
        .then(res => this.props.refreshList())
        .then(res => {
            setTimeout(()=>this.setState({responseOK: null}) , 3000)
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
            options = this.state.data.map(option => {
                return <option value={option.url}>{option.name}</option>
            })
            options.push(<option>{''}</option>)
        } else {
            options = <option>{''}</option>   
        }
        
        let form = (
          <Formik
            initialValues = {{
                day: this.props.day,
                drink: '',
            }}
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
                    <Field name='drink' as='select' className='form-control'>
                      {options}
                    </Field>
                    <span className='text-danger'><ErrorMessage name='drink' /></span>
                    {this.state.responseOK}
                  </div>
                  <div className='col-auto'>
                    <button type='submit' className='btn btn-primary' disabled={props.isSubmitting}>Add</button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )
        
        return (
            <div className='col-auto'>
              <button className='btn btn-secondary' onClick={()=> this.getDrinks()} type='button' data-toggle='modal' data-target={'#drinkInstanceCreateModal'+this.props.id}>
                Add
              </button>
        
              <div class="modal fade" id={'drinkInstanceCreateModal'+this.props.id} tabindex="-1" role="dialog" aria-labelledby={'drinkInstanceCreateModalLabel'+this.props.id} aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content">
            
                <div class="modal-header">
                  <h5 class="modal-title" id={'drinkInstanceCreateModalLabel'+this.props.id}>Add meal for {this.props.id}</h5>
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

export default DrinkInstanceCreate