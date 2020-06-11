import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'

function DrinkFilter(props) {
    let handleSubmit = (values, {setSubmitting}) => {
        props.handleFilter(values)
        setSubmitting(false)
    }
    
    let handleReset = ()=>{
        props.handleFilter({
            name: '',
            before: '',
            after: '',
            lower: '',
            greater: '',
            order: 'Name',
            ascending: 'Ascending',
        })
    }
    
    let validate = values=>{
        let errors = {}
        if (values.after && values.before && values.before < values.after) {
            errors.before = 'This value cannot be before the date in the "after" filter'
            errors.after = 'This value cannot be after the date in the "before" filter'
        }
        
        if (typeof values.lower==='number' && typeof values.greater==='number' && values.lower < values.greater) {
            errors.lower = 'This value cannot be lower than the value in the "Calories above" filter'
            errors.greater = 'This value cannot be higher than the value in the "Calories below" filter'
        }
    
        return errors
    }
    
    let form = (
      <Formik
        initialValues= {{
            name: '',
            before: '',
            after: '',
            lower: '',
            greater: '',
            order: 'Name',
            ascending: 'Ascending',  
        }}
        validate = {validate}
        onSubmit = {handleSubmit}
      >
        {props => (
          <Form>
            <div className='form-row'>
              <div className='form-group col-12 col-lg-6'>
                <label htmlFor='drinkFilter-name'>Name:</label>
                <Field id='drinkFilter-name' name='name' type='text' className='form-control'/>
              </div>
              <div className='form-group col-12 col-sm-6 col-lg-3'>
                <label htmlFor='drinkFilter-before'>Date Before:</label>
                <Field id='drinkFilter-before' name='before' type='date' className='form-control'/>
                <span className='text-danger'><ErrorMessage name='before'/></span>
              </div>
              <div className='form-group col-12 col-sm-6 col-lg-3'>
                <label htmlFor='drinkFilter-after'>Date After:</label>
                <Field id='drinkFilter-after' name='after' type='date' className='form-control'/>
                <span className='text-danger'><ErrorMessage name='after'/></span>
              </div>
              <div className='form-group col-12 col-sm-6 col-lg-3'>
                <label htmlFor='drinkFilter-lower'>Calories Below:</label>
                <Field id='drinkFilter-lower' name='lower' type='number' className='form-control'/>
                <span className='text-danger'><ErrorMessage name='lower'/></span>
              </div>
              <div className='form-group col-12 col-sm-6 col-lg-3'>
                <label htmlFor='drinkFilter-greater'>Calories Above:</label>
                <Field id='drinkFilter-greater' name='greater' type='number' className='form-control'/>
                <span className='text-danger'><ErrorMessage name='greater'/></span>
              </div>
              <div className='form-group col-12 col-sm-6 col-lg-3'>
                <label htmlFor='drinkFilter-order'>Order:</label>
                <Field id='drinkFilter-order' name='order' as='select' className='form-control'>
                  <option>Name</option>
                  <option>Calories</option>
                </Field>
              </div>
              <div className='form-group col-12 col-sm-6 col-lg-3'>
                <label htmlFor='drinkFilter-ascending'>Ascending or Descending:</label>
                <Field id='drinkFilter-ascending' name='ascending' as='select' className='form-control'>
                  <option>Ascending</option>
                  <option>Descending</option>
                </Field>
              </div>
            </div>
            
            <div className='form-row'>
              <button className='btn btn-primary mr-1' type='submit' disabled={props.isSubmitting}>Filter</button>
              <button className='btn btn-secondary' type='reset' disabled={!props.dirty || props.isSubmitting} onClick={handleReset}>Reset</button>
            </div>
          </Form>
        )}
      </Formik>
    )
    
    return (
      <div className='row border rounded border-primary p-4 mb-4'><div className='col-12'>
        <div className='row'>
          <div className='col'>
            <h3>Filters</h3>
          </div>
          <div className='col-auto'>
            <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#drink-filter" aria-expanded="false" aria-controls="drink-filter">
              Expand
            </button>
          </div>
        </div>
        
        <div class="collapse" id="drink-filter">
          {form}
        </div>
      </div></div>
    )
}

export default DrinkFilter