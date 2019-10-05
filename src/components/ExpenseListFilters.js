import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter,sortByDate,sortByAmount,setStartDate, setEndDate } from '../actions/filters'

//dispatch will be given by connect by default(check in dev tools chrome)

class ExpenseListFilters extends React.Component{
    state={
        calanderFocused: null
    };
    onDatesChange =({ startDate, endDate }) =>{
        console.log(startDate);
        console.log(endDate);
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate));
    }

    onFocusChange=(calanderFocused)=>{ 
        this.setState( ()=> ({ calanderFocused }));
    }

    render(){
        return(
            <div>
                <input type="text" value= {this.props.filters.text} onChange={(e)=>{
                this.props.dispatch(setTextFilter(e.target.value))
            }}/>
            <select  
                value={this.props.filters.sortBy}
                onChange={(e)=>{
                    if(e.target.value === 'date'){
                        this.props.dispatch(sortByDate())
                    }else{
                        this.props.dispatch(sortByAmount())
                    }
                }}
            >
                <option value="date">Date</option>
                <option value="amount">Amount</option>
            </select>

            <DateRangePicker 
                startDate= {this.props.filters.startDate}
                //startDateId={this.props.filters.startDate.toString()}
                endDate= {this.props.filters.endDate}
                //endDateId={this.props.filters.endDate.toString()}
                onDatesChange = {this.onDatesChange}
                focusedInput= {this.state.calanderFocused}
                onFocusChange={this.onFocusChange}
                numberOfMonths={1} //this and below line to get only one month
                isOutsideRange={()=> false}
                showClearDates= {true}
            />
            </div>
           
        )
    }
};


const mapStateToProps=(state)=>{
    return{
        filters: state.filters
    }
}

export default connect(mapStateToProps)(ExpenseListFilters);