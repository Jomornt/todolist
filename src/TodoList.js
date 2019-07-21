import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
  getInputChangeAction,
  addItemAction,
  deleteItemAction
} from './store/actionCreator'
// import 'antd/dist/antd.css';
// import { List } from 'antd';

class TodoList extends Component {
  render() {
    return (
      <div>
          <div>
            <input
              value={this.props.inputValue}
              onChange={this.props.handleInputChange}
            ></input>
            <button
              onClick={this.props.handleAddItem}
            >submit</button>
          </div>
          <ul>
            {
              this.props.list.map((item,index) => {
                return <li
                  key={index}
                  delete={this.handleDeleteItem}
                  onClick={this.props.handleDeleteItem.bind(this, index)}
                >
                  {item}--{index}</li>
              })
            }
          </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    inputValue: state.inputValue,
    list: state.list
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    handleInputChange: (e) => {
      const action = getInputChangeAction(e.target.value)
      dispatch(action)
    },
    handleAddItem: () => {
      const action = addItemAction()
      dispatch(action)
    },
    handleDeleteItem: (index) => {
      const action = deleteItemAction(index)
      dispatch(action)
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
