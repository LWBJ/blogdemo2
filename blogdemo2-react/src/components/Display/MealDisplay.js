import React from 'react'
import MealItem from './Meal/MealItem.js'
import MealFilter from './Meal/MealFilter.js'
import MealCreate from './Meal/MealCreate.js'
import Paginator from './Paginator.js'

class MealDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            data: [],
            filters: {
                name: '',
                before: '',
                after: '',
                lower: '',
                greater: '',
                order: 'name',
                ascending: true
            },
            page: 1
        }
    }
    
    setLoading() {
        this.setState({
            loading: true
        })
    }
    
    changePage(pageNo) {
        this.setState({
            loading: true,
            page: parseInt(pageNo)
        }, this.refreshList())
    }
    
    changeFilter(values) {
        this.setState({
            loading: true,
            filters: {
                name: values.name,
                before: values.before,
                after: values.after,
                lower: values.lower,
                greater: values.greater,
                order: values.order.toLowerCase(),
                ascending: (values.ascending === 'Ascending'),
            },
            page: 1,
        }, this.refreshList)
    }
    
    refreshList() {
        let url = 'http://127.0.0.1:8000/apidata/MainMeal/?page=' + this.state.page + '&'
        url += 'name=' + this.state.filters.name + '&'
        url += 'before=' + this.state.filters.before + '&'
        url += 'after=' + this.state.filters.after + '&'
        url += 'lower=' + this.state.filters.lower + '&'
        url += 'greater=' + this.state.filters.greater + '&'
        url += 'order=' + (this.state.filters.ascending?'':'-') + this.state.filters.order      
        
        fetch(url)
        .then(res => res.json())
        .then(data => this.setState({
          loading: false,
          data: data          
        }))
        .catch(err => this.setState({
            loading: false,
            data: []
        }))
    }
    
    componentDidMount() {
        this.refreshList()
    }
    
    render() {
        let queryset
        let count 
        
        let loadingIndicator = null
        if (this.state.loading) {
            loadingIndicator = <div className='loading-indicator border border-secondary'><h1>LOADING</h1></div>
        }
        
        if (this.state.data.count && this.state.data.results && this.state.data.results.length>0) {
            count = this.state.data.count
            queryset = this.state.data.results.map(result => {
                return (
                  <div className='col-12 col-md-6 col-lg-4 p-2' key={result.url}>
                    <MealItem 
                      meal={result} 
                      setLoading = {()=>this.setLoading()}
                      refreshList = {()=>this.refreshList()}
                      username = {this.props.username}
                      checkAuth={this.props.checkAuth}
                    />
                  </div>
                )
            })
        } else {
            count = 0
            queryset = <div className='col-12'><p>No Data</p></div>
        }
        
        let mealCreate
        if (this.props.username) {
            mealCreate = (
              <MealCreate 
                setLoading = {()=>this.setLoading()}
                refreshList = {()=>this.refreshList()}
                checkAuth={this.props.checkAuth}
                handleLogout={this.props.handleLogout}
              />
            )
        }
        
        return(
          <div className='row my-4'><div className='col-12'>
            {loadingIndicator}
            
            <div className='row mb-4'><div className='col-12'>
              <h2><strong>Meals</strong></h2>
            </div></div>
            
            {mealCreate}
            
            <MealFilter handleFilter={(values)=>{this.changeFilter(values)}} />
            
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
              id = 'meal-top'
              pagination = {20}
              changePage = {(pageNo) => this.changePage(pageNo)}
            />
            
            <div className='row'>
              {queryset}
            </div>
            
            <Paginator 
              count = {count}
              current = {this.state.page}
              id = 'meal-bottom'
              pagination = {20}
              changePage = {(pageNo) => this.changePage(pageNo)}
            />
          </div></div>
        )
    }
}

export default MealDisplay