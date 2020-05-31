import React from 'react'
import DayItem from './Day/DayItem.js'
import DayFilter from './Day/DayFilter.js'
import DayCreate from './Day/DayCreate.js'
import Paginator from './Paginator.js'

class DayDisplay extends  React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            data: [],
            filters: {
                before: '',
                after: '',
                lower: '',
                higher: '',
                meal: '',
                snack: '',
                drink: '',
                order: 'date',
                ascending: false,
            },
            page: 1,
        }
    }
    
    changeFilter(values) {
        this.setState({
            loading: true,
            page: 1,
            filters: {
                before: values.before,
                after: values.after,
                lower: values.lower,
                higher: values.higher,
                meal: values.meal,
                snack: values.snack,
                drink: values.drink,
                order: values.order.toLowerCase(),
                ascending: values.ascending==='Ascending',
            }
        }, this.refreshList)
    }
    
    setLoading() {
        this.setState({
            loading: true
        })
    }
    
    changePage(pageNo) {
        this.setState({
            loading: true,
            page: parseInt(pageNo),
        }, this.refreshList)
    }
    
    refreshList() {
        let url = 'http://127.0.0.1:8000/apidata/Day/?page=' + this.state.page + '&'
        url += 'before=' + this.state.filters.before + '&'
        url += 'after=' + this.state.filters.after + '&'
        url += 'lower=' + this.state.filters.lower + '&'
        url += 'higher=' + this.state.filters.higher + '&'
        url += 'meal=' + this.state.filters.meal + '&'
        url += 'snack=' + this.state.filters.snack + '&'
        url += 'drink=' + this.state.filters.drink + '&'
        url += 'order=' + (this.state.filters.ascending ? '' : '-') + this.state.filters.order
        
        fetch(url)
        .then(results => results.json())
        .then(data => this.setState({
            loading: false,
            data: data
        }))
        .catch(err => this.setState({
            loading: false,
            data: [],
        }))
    }
    
    componentDidMount() {
        this.refreshList()
    }
    
    render() {
      let count      
      let queryset
      let loadingIndicator = null
      
      if (this.state.loading) {
          loadingIndicator = <div className='loading-indicator border border-secondary'><h1>LOADING</h1></div>
      }
      
      if (this.state.data.count && this.state.data.results && this.state.data.results.length > 0) {
          count = this.state.data.count
          queryset = this.state.data.results.map(result => {
              return (
                <div className='col-12 col-md-6 col-xl-4 p-2' key={result.url}>
                  <DayItem 
                    day={result}
                    setLoading = {() => this.setLoading()}
                    refreshList = {() => this.refreshList()}                       
                  />
                </div>
              )
          })
      } else {
          count = 0          
          queryset = <div className='col-12'><p>No Data</p></div>     
      }
        
      return (
        <div className='row my-4'><div className='col-12'>
          {loadingIndicator}
          
          <div className='row mb-4'><div className='col-12'>
              <h2><strong>Days</strong></h2>
          </div></div>
          
          <DayCreate 
            setLoading={()=> this.setLoading()} 
            refreshList={()=>this.refreshList()}
          />
          
          
          <DayFilter filterFunction={(values) => this.changeFilter(values)} />
          
          <div className='row mb-1'>
            <div className='col-auto'>
              <button 
                className='btn-primary btn'
                type='button' 
                onClick={() => {
                    this.setLoading()
                    this.refreshList()
                }}>
                Refresh
              </button>
            </div>
            <div className='col-auto'>
              <p className='mt-1'>Count: {count}</p>
            </div>
          </div>
          
          <Paginator 
            count = {count}
            current = {this.state.page}
            id = 'day-top'
            pagination = {20}
            changePage = {(pageNo) => this.changePage(pageNo)}
          />
          
          <div className='row'>
            {queryset}
          </div>
          
          <Paginator 
            count = {count}
            current = {this.state.page}
            id = 'day-bottom'
            pagination = {20}
            changePage = {(pageNo) => this.changePage(pageNo)}
          />
          
        </div></div>
      )
    }
}

export default DayDisplay