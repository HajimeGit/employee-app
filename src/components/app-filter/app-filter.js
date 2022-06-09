import "./app-filter.css";
import { Component } from "react";

class AppFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: 'all'
        }
    }

    onClickChange = (e) => {
        const filters = e.target.getAttribute('data-filter');
        this.setState({filters});
        this.props.onFilters(filters);
    }


    render() {
        return (
            <div className="btn-group">
                <button type="button"
                        className={`btn btn-outline-light ${this.state.filters === 'all' ? "btn-light" : ""}`}
                        data-filter="all"
                        onClick={this.onClickChange}>
                        Все сотрудники
                </button>
                <button type="button"
                        className={`btn btn-outline-light ${this.state.filters === 'increased' ? "btn-light" : ""}`}
                        data-filter="increased"
                        onClick={this.onClickChange}>
                        На повышение
                </button>
                <button type="button"
                        className={`btn btn-outline-light ${this.state.filters === 'more' ? "btn-light" : ""}`}
                        data-filter="more"
                        onClick={this.onClickChange}>
                        З/П больше 1000$
                </button>
            </div>
        )
    }  
}

export default AppFilter;