import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'

class SnackInstanceCreate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            data: [],
            responseOK: null,
        }
    }
    
    async getSnacks() {
      let snackSet = []
      let pageNo = 1
      let data
      
      do {
          let url = 'http://127.0.0.1:8000/apidata/Snack/?page=' + pageNo
          data= await fetch(url)
            .then(results => results.json())
            .catch(err => {
                alert('Something went wrong') 
                return {next: false}
            })
          
          if (data.results && data.results.length > 0) {
            snackSet = snackSet.concat(data.results)    
          } else {
            snackSet = ['Error']
            data = {next: false}
          }
          
          pageNo++
      }
      while (data.next)
      
      this.setState({
          loading: false,
          data: snackSet
      })
    }
    
    validate(values) {
        let errors = {}
        if (values.snack === '') {
            errors.snack = 'Please select a value'
        }
        return errors
    }
    
    async handleSubmit(values) {
        this.props.setLoading()
        let url = 'http://127.0.0.1:8000/apidata/SnackInstance/'
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
            setTimeout(() => this.setState({ responseOK: null }), 3000)
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
            options = this.state.data.map( option => {
              return <option value={option.url}>{option.name}</option>
            })
            options.push(<option>{''}</option>)
        } else {
            options = <option>{''}</option>
        }
        
        let form = (
          <Formik
            initialValues = {{ snack: '', day: this.props.day }}
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
                    <Field className='form-control' name='snack' as='select'>
                      {options}
                    </Field>
                    <span className='text-danger'><ErrorMessage name='snack' /></span>
                    {this.state.responseOK}
                  </div>
                  
                  <div className='col-auto'>
                    <button className='btn btn-primary' type='submit' disabled={props.isSubmitting}>Add</button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )
        
        return (
          <div className='col-auto'>
            <button onClick={() => this.getSnacks()} className='btn btn-secondary' type='button' data-toggle='modal' data-target={'#snackInstanceCreateModal'+this.props.id}>
              Add
            </button>
        
            <div class="modal fade" id={'snackInstanceCreateModal'+this.props.id} tabindex="-1" role="dialog" aria-labelledby={'snackInstanceCreateModalLabel'+this.props.id} aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content">
            
              <div class="modal-header">
                <h5 class="modal-title" id={'snackInstanceCreateModalLabel'+this.props.id}>Add snack for {this.props.id}</h5>
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

export default SnackInstanceCreate