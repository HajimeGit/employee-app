import { Component } from 'react'

import './app.css'
import AppInfo from '../app-info/app-info'
import SearchPanel from '../search-panel/search-panel'
import AppFilter from '../app-filter/app-filter'
import EmployeesList from '../employers-list/employers-list'
import EmployersAddForm from '../employers-add-form/employers-add-form'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data :[
                {name: 'John C.', salary: 800, increase: false,rise:true, id :1},
                {name: 'Alex M.', salary: 3000, increase: true,rise:false, id :2},
                {name: 'Carl W.', salary: 5000, increase: false,rise:false, id :3}
            ],
            term : '',
            filter: ''
        }
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data : data.filter(item => item.id !== id),
            }
        })
    }

    addItem = (name,salary) => {
        if(name !== '' && salary !== '') {
            const newItem = {
                name,
                salary,
                increase: false,
                rise: false,
                id: this.maxId++
            }
            this.setState(({data}) => {
                const newArr = [...data, newItem];
                return {
                    data: newArr,
                }
            })
        }
    }


    onToggleIncrease = (id) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return{...item, increase: !item.increase}
                }
                return item;
            })
        }))
    }

    onToggleRise = (id) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return{...item, rise: !item.rise}
                }
                return item;
            })
        }))
    }

    searchEmp = (items ,term,filter) => {
        if(term.length === 0 && filter === 'all') {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1;
        });

    }

    filterChange = (filter) =>{
       
    }

    onUpdateSearch = (term) => {
        this.setState({term : term});
    }

    filterPost = (items, filter) => {
        switch(filter) {
            case 'increased' : {
                return items.filter(item => {
                    return item.increase;
                })
            }
            case 'more' : {
                return items.filter(item => {
                    return item.salary > 1000;
                })
            }
            default : {
                return items;
            }
        }
    }

    onFilters = (filter) => {
        this.setState({filter});
    } 


    render() {
        const { data,term,filter } = this.state;
        const employees = data.length;
        const increased = data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmp(data,term), filter);
        return (
            <div className="app">
                <AppInfo
                employees = {employees}
                increased = {increased}
                />
    
                <div className="search-panel">
                    <SearchPanel
                    onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter
                    onFilters={this.onFilters}/>
                </div>
    
                <EmployeesList 
                data={visibleData}
                onDelete={this.deleteItem}
                onToggleIncrease={this.onToggleIncrease}
                onToggleRise={this.onToggleRise}
                />
    
                <EmployersAddForm
                onAdd={this.addItem}/>
            </div>
        )
    }
   
    
}

export default App