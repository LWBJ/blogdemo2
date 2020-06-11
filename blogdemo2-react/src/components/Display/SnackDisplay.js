import React from 'react'
import SnackItem from './Snack/SnackItem.js'
import SnackFilter from './Snack/SnackFilter.js'
import SnackCreate from './Snack/SnackCreate.js'
import Paginator from './Paginator.js'

class SnackDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            data: [],
            page: 1,
            filters: {
              name: '',
              lower: '',
              greater: '',
              before: '',
              after: '',
              order: 'name',
              ascending: true,
            },
        }
    }
    
    changeFilter(values) {
        this.setState({
            loading: true,
            page: 1,
            filters: {
              name: values.name,
              lower: values.lower,
              greater: values.greater,
              before: values.before,
              after: values.after,
              order: values.order.toLowerCase(),
              ascending: (values.ascending === 'Ascending'),
            }
        }, this.refreshList)
    }
    
    changePage(pageNo) {
        this.setState({
            loading: true,
            page: parseInt(pageNo)
        }, this.refreshList)
    }
    
    setLoading() {
        this.setState({ loading: true })
    }
    
    refreshList() {
        let url = 'https://lwbjblogdemo2.herokuapp.com/apidata/Snack/?page=' + this.state.page + '&'
        url += 'name=' + this.state.filters.name + '&'
        url += 'lower=' + this.state.filters.lower + '&'
        url += 'greater=' + this.state.filters.greater + '&'
        url += 'before=' + this.state.filters.before + '&'
        url += 'after=' + this.state.filters.after + '&'
        url += 'name=' + this.state.filters.name + '&'
        url += 'order=' + (this.state.filters.ascending?'':'-') + this.state.filters.order
        
        fetch(url)
        .then(res => res.json())
        .then(data => this.setState({
            loading: false,
            data: data,
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
        let loadingIndicator = null
        if (this.state.loading) {
            loadingIndicator = <div className='loading-indicator border border-secondary'><h1>LOADING</h1></div>
        }
        
        let queryset
        let count
        if (this.state.data.results && this.state.data.count && this.state.data.results.length > 0) {
            queryset = this.state.data.results.map(result => {
                return (
                  <div key={result.url} className='col-12 col-md-6 col-lg-4 p-2'>
                    <SnackItem 
                      snack = {result}
                      setLoading = {() =>this.setLoading()}
                      refreshList = {() =>this.refreshList()}
                      checkAuth={this.props.checkAuth}
                      username = {this.props.username}
                    />
                  </div>
                )
            })
            count = this.state.data.count
        } else {
            queryset = <div className='col-12'><p>No Data</p></div>
            count = 0
        }
        
        let snackCreate
        if (this.props.username) {
            snackCreate = (
              <SnackCreate
                refreshList = {()=>this.refreshList()}
                setLoading = {()=>this.setLoading()} 
                checkAuth={this.props.checkAuth}
                handleLogout={this.props.handleLogout}
              />
            )
        }
        
        return(
          <div className='row my-4'><div className='col-12'>
            {loadingIndicator}
            
            <div className='row mb-4'><div className='col-12'>
              <h2><strong>Snacks</strong></h2>
            </div></div>
            
            {snackCreate}
            
            <SnackFilter handleFilter={values => this.changeFilter(values)} />
            
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
                <p className='mt-2'>Count: {count}</p>
              </div>
            </div>
            
            <Paginator 
              count = {count}
              current = {this.state.page}
              id = 'snack-top'
              pagination = {20}
              changePage = {(pageNo) => this.changePage(pageNo)}
            />
            
            <div className='row'>
              {queryset}
            </div>
            
            <Paginator 
              count = {count}
              current = {this.state.page}
              id = 'snack-bottom'
              pagination = {20}
              changePage = {(pageNo) => this.changePage(pageNo)}
            />
          
          </div></div>
        )
    }
}

export default SnackDisplay