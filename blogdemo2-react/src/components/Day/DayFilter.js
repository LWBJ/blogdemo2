import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'



function DayFilter(props) {
    let handleSubmit = (values, {setSubmitting}) => {
        props.filterFunction(values)
        setSubmitting(false)
    }
    
    let handleReset = () => {
        props.filterFunction({
            before: '',
            after: '',
            lower: '',
            higher: '',
            meal: '',
            snack: '',
            drink: '',
            order: 'Date',
            ascending: 'Descending'
            
        })
    }
    
    let  validate = (values)=>{
        let errors = {}
        if (values.before && values.after && values.before < values.after) {
            errors.before = 'This value cannot be before the date in the "after" filter'
            errors.after = 'This value cannot be after the date in the "before" filter'
        }
    
        if (typeof values.lower==='number' && typeof values.higher==='number' && values.lower < values.higher) {
            errors.lower = 'This value cannot be lower than the value in the "Calories above" filter'
            errors.higher = 'This value cannot be higher than the value in the "Calories below" filter'
        }
    
        return errors
    }
    
    return(
      <Formik
        initialValues={{
            before: '',
            after: '',
            lower: '',
            higher: '',
            meal: '',
            snack: '',
            drink: '',
            order: 'Date',
            ascending: 'Descending'
        }}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <div className='row border rounded border-primary p-4 mb-4'><div className='col-12'>
          
          <div className='row'>
            <div className='col'>
              <h3>Filters</h3>
            </div>
          
            <div className='col-auto'>
              <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#day-filter" aria-expanded="false" aria-controls="day-filter">
                Expand
              </button>
            </div>
          </div>
          
          <div class="collapse" id="day-filter">
          <Form>
            <div className='form-row'>
          
            <div className='form-group col-12 col-md-6 col-lg-4'>
              <label htmlFor='day-filter-before'>Before: </label>
              <Field id='day-filter-before' name='before' type='date' className='form-control'/>
              <span className='text-danger' ><ErrorMessage name='before' /></span>
            </div>
            
            <div className='form-group col-12 col-md-6 col-lg-4'>
              <label htmlFor='day-filter-after'>After: </label>
              <Field id='day-filter-after' name='after' type='date' className='form-control'/>
              <span className='text-danger' ><ErrorMessage name='after' /></span>
            </div>
            
            <div className='form-group col-12 col-md-6 col-lg-4'>
              <label htmlFor='day-filter-lower'>Calories below: </label>
              <Field id='day-filter-lower' name='lower' type='number' className='form-control'/>
              <span className='text-danger' ><ErrorMessage name='lower' /></span>
            </div>
            
            <div className='form-group col-12 col-md-6 col-lg-4'>
              <label htmlFor='day-filter-higher'>Calories above: </label>
              <Field id='day-filter-higher' name='higher' type='number' className='form-control'/>
              <span className='text-danger' ><ErrorMessage name='higher' /></span>
            </div>
            
            <div className='form-group col-12 col-lg-4'>
              <label htmlFor='day-filter-meal'>Meal: </label>
              <Field id='day-filter-meal' name='meal' type='text' className='form-control'/>
            </div>
            
            <div className='form-group col-12 col-md-6  col-lg-4'>
              <label htmlFor='day-filter-snack'>Snack: </label>
              <Field id='day-filter-snack' name='snack' type='text' className='form-control'/>
            </div>
            
            <div className='form-group col-12 col-md-6 col-lg-4'>
              <label htmlFor='day-filter-drink'>Drink: </label>
              <Field id='day-filter-drink' name='drink' type='text' className='form-control'/>
            </div>
            
            <div className='form-group col-12 col-sm-6 col-lg-4'>
              <label htmlFor='day-filter-order'>Order: </label>
              <Field id='day-filter-order' name='order' as='select' className='form-control'>
                <option calue='date'>Date</option>
                <option value='calories'>Calories</option>
              </Field>
            </div>
            
            <div className='form-group col-12 col-sm-6 col-lg-4'>
              <label htmlFor='day-filter-ascending'>Ascending or Descending: </label>
              <Field id='day-filter-ascending' name='ascending' as='select' className='form-control'>
                <option>Ascending</option>
                <option>Descending</option>
              </Field>
            </div>
            
            </div>
            
            <div className='form-row'>
              <button type='submit' disabled={props.isSubmitting} className='btn btn-primary mr-1'>Filter</button>
              <button type='reset' onClick={handleReset} disabled={!props.dirty || props.isSubmitting} className='btn btn-secondary'>Reset</button>
            </div>
          </Form>
          </div>
          
          
          </div></div>
        )}
      </Formik>
    )
}

export default DayFilter