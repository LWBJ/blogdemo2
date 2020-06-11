import React from 'react'
import DrinkItem from './Drink/DrinkItem.js'
import DrinkFilter from './Drink/DrinkFilter.js'
import DrinkCreate from './Drink/DrinkCreate.js'
import Paginator from './Paginator.js'

class DrinkDisplay extends React.Component{
    constructor(props){
        super(props)
        this.state={
            loading: true,
            data: [],
            page: 1,
            filters: {
              name: '',
              before: '',
              after: '',
              lower: '',
              greater: '',
              order: 'name',
              ascending: true,
            },
        }
    }
    
    setLoading(){
        this.setState({ loading: true })
    }
    
    changePage(pageNo){
        this.setState({
            page: parseInt(pageNo),
            loading: true,
        }, this.refreshList)
    }
    
    changeFilter(values) {
        this.setState({
            loading: true,
            page: 1,
            filters: {
              name: values.name,
              before: values.before,
              after: values.after,
              lower: values.lower,
              greater: values.greater,
              order: values.order.toLowerCase(),
              ascending: (values.ascending==='Ascending'),
            },
        }, this.refreshList)
    }
    
    refreshList() {
        let url = 'http://127.0.0.1:8000/apidata/Drink/?page=' + this.state.page + '&'
        url +=  'name=' + this.state.filters.name + '&'
        url +=  'before=' + this.state.filters.before + '&'
        url +=  'after=' + this.state.filters.after + '&'
        url +=  'lower=' + this.state.filters.lower + '&'
        url +=  'greater=' + this.state.filters.greater + '&'
        url +=  'order=' + (this.state.filters.ascending?'':'-') + this.state.filters.order
        
        fetch(url)
        .then(res => res.json())
        .then(data => {
            this.setState({
                loading: false,
                data: data
            })
        })
        .catch(err => {
            this.setState({
                loading: false,
                data: [],
            })
        })
    }
    
    componentDidMount() {
        this.refreshList()
    }
    
    render(){
        let loadingIndicator = (this.state.loading ? <div className='loading-indicator border border-secondary'><h1>LOADING</h1></div> : null)
        let queryset
        let count
        if (this.state.data.results && this.state.data.count && this.state.data.results.length > 0) {
            queryset = this.state.data.results.map(result => {
                return (
                  <div className='col-12 col-md-6 col-lg-4 p-2' key={result.url}>
                    <DrinkItem 
                      drink={result}
                      setLoading = {()=>this.setLoading()}
                      refreshList = {()=>this.refreshList()}
                      checkAuth = {this.props.checkAuth}
                      username = {this.props.username}
                    />
                  </div>
                )
            })
            count = this.state.data.count
        } else {
            count = 0
            queryset = <div className='col-12'><p>No Data</p></div>
        }
        
        let drinkCreate
        if (this.props.username) {
            drinkCreate = (
                <DrinkCreate 
                  setLoading = {()=>this.setLoading()}
                  refreshList = {()=>this.refreshList()}
                  checkAuth={this.props.checkAuth}
                  handleLogout={this.props.handleLogout}
                />
            )
        }
        
        return (
          <div className='row my-4'><div className='col-12'>
            {loadingIndicator}
            
            <div className='row mb-4'><div className='col-12'>
              <h2><strong>Drinks</strong></h2>
            </div></div>
            
            {drinkCreate}
            
            <DrinkFilter handleFilter={values=>this.changeFilter(values)} />
            
            <div className='row'>
              <div className='col-auto'>
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={()=>{
                      this.setLoading()
                      this.refreshList()
                  }}
                >
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
              id = 'drink-top'
              pagination = {20}
              changePage = {(pageNo) => this.changePage(pageNo)}
            />
            
            <div className='row'>
              {queryset}
            </div>
            
            <Paginator 
              count = {count}
              current = {this.state.page}
              id = 'drink-bottom'
              pagination = {20}
              changePage = {(pageNo) => this.changePage(pageNo)}
            />
            
          </div></div>
        )
    }
}

export default DrinkDisplay