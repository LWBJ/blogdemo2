import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'

function SnackFilter(props) {
    let handleSubmit = (values, {setSubmitting}) => {
        props.handleFilter(values)
        setSubmitting(false)
    }
    
    let handleReset = ()=> {
        props.handleFilter({
            name: '',
            lower: '',
            greater: '',
            before: '',
            after: '',
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
        initialValues = {{
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
               <label htmlFor='snackFilter-name'>Name:</label>
               <Field id='snackFilter-name' name='name' type='text' className='form-control' />
             </div>
             <div className='form-group col-12 col-sm-6 col-lg-3'>
               <label htmlFor='snackFilter-before'>Date before:</label>
               <Field id='snackFilter-before' name='before' type='date' className='form-control' />
               <span className='text-danger'><ErrorMessage name='before' /></span>
             </div>
             <div className='form-group col-12 col-sm-6 col-lg-3'>
               <label htmlFor='snackFilter-after'>Date after:</label>
               <Field id='snackFilter-after' name='after' type='date' className='form-control' />
               <span className='text-danger'><ErrorMessage name='after' /></span>
             </div>
             <div className='form-group col-12 col-sm-6 col-lg-3'>
               <label htmlFor='snackFilter-lower'>Calories below:</label>
               <Field id='snackFilter-lower' name='lower' type='number' className='form-control' />
               <span className='text-danger'><ErrorMessage name='lower' /></span>
             </div>
             <div className='form-group col-12 col-sm-6 col-lg-3'>
               <label htmlFor='snackFilter-greater'>Calories above:</label>
               <Field id='snackFilter-greater' name='greater' type='number' className='form-control' />
               <span className='text-danger'><ErrorMessage name='greater' /></span>
             </div>
             <div className='form-group col-12 col-sm-6 col-lg-3'>
               <label htmlFor='snackFilter-order'>Order:</label>
               <Field id='snackFilter-order' name='order' as='select' className='form-control'>
                 <option>Name</option>
                 <option>Calories</option>
               </Field>
             </div>
             <div className='form-group col-12 col-sm-6 col-lg-3'>
               <label htmlFor='snackFilter-ascending'>Ascending or Descending:</label>
               <Field id='snackFilter-ascending' name='ascending' as='select' className='form-control'>
                 <option>Ascending</option>
                 <option>Descending</option>
               </Field>
             </div>
           </div>
           
           <div className='form-row'>
             <button type='submit' disabled={props.isSubmitting} className='btn btn-primary mr-1'>Filter</button>
             <button type='reset' disabled={!props.dirty || props.isSubmitting} className='btn btn-secondary' onClick={handleReset}>Reset</button>
           </div>
         </Form>
       )}
      </Formik>
    )
    
    return(
      <div className='row border rounded border-primary p-4 mb-4'><div className='col'>
      
        <div className='row'>
          <div className='col'>
            <h3>Filters</h3>
          </div>
          <div className='col-auto'>
            <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#snack-filter" aria-expanded="false" aria-controls="snack-filter">
              Expand
            </button>
          </div>
        </div>
      
        <div class="collapse" id="snack-filter">
          {form}
        </div>
        
      </div></div>
    )
}

export default SnackFilter