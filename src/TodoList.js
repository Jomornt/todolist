import React from 'react'
import { connect } from 'react-redux'
import { 
  getInputChangeAction,
  addItemAction,
  deleteItemAction,
  chooseChangeAction
} from './store/actionCreator'
import {
  HeaderWrapper,
  InputWrapper,
  BtnWrapper
} from './style';
import 'antd/dist/antd.css';
import {
  Input, 
  Button,
  List,
  Radio
} from 'antd';

const TodoList = (props) => {
  return (
    <div>
        <HeaderWrapper>Todo List</HeaderWrapper>
        <InputWrapper>
          <Input
            placrholder="请输入你的计划"
            value={props.inputValue}
            onChange={props.handleInputChange}
          ></Input>
          <Button
            type="primary"
            onClick={props.handleAddItem}
          >submit</Button>
        </InputWrapper>
        <BtnWrapper>
          <Radio.Group value={props.choose} onChange={props.handleChooseChange}>
            <Radio.Button value="all">所有任务</Radio.Button>
            <Radio.Button value="unfinished">未完成</Radio.Button>
            <Radio.Button value="finished">已完成</Radio.Button>
          </Radio.Group>
          <Button type="dashed" icon="down">
            时间
          </Button>
          <Button type="dashed" icon="down">
            优先级
          </Button>
        </BtnWrapper>
        {/* <ul>
          {
            props.list.map((item,index) => {
              return <li
                key={index}
                onClick={props.handleDeleteItem.bind(this, index)}
              >
                {item}</li>
            })
          }
        </ul> */}
        <List
          bordered
          style={{height: '400px'}}
          dataSource={props.list}
          renderItem={item => (
            <List.Item>
              {item}
            </List.Item>
          )}
        />
    </div>
  );

}

const mapStateToProps = (state) => {
  return {
    inputValue: state.inputValue,
    list: state.list,
    choose: state.choose
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
    },
    handleChooseChange: (e) => {
      const action = chooseChangeAction(e.target.value)
      dispatch(action)
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
