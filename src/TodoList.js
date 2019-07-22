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
  BtnWrapper,
  ListWrapper,
  SortWrapper,
  ItemWrapper,
  OperateWrapper,
  DateWrapper
} from './style';
import 'antd/dist/antd.css';
import {
  Input, 
  Button,
  Radio,
  Pagination,
  Checkbox,
  Icon,
  DatePicker
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
          <SortWrapper>
            <Button type="dashed" icon="down">
              时间
            </Button>
            <Button type="dashed" icon="down">
              优先级
            </Button>
          </SortWrapper>
        </BtnWrapper>
        <ListWrapper>
          {/* <List
            dataSource={props.list}
            renderItem={item => (
              <List.Item>
                {item}
              </List.Item>
            )}
          /> */}
          {
            props.list.map((item,index) => {
              return <ItemWrapper
                key={index}
              >
                <Checkbox>{item.text}</Checkbox>
                <OperateWrapper>
                  <DateWrapper
                    onClick={props.handleExpireDate.bind(this, index)}
                  >
                    {/* {item.expireDate} */}
                    <DatePicker
                      style={{width: '70px'}}
                      placeholder=""
                      size="small"
                      format="MM-DD"
                      onChange={props.onChange} />
                  </DateWrapper>
                  <DateWrapper
                    onClick={props.handlePriority.bind(this, index)}
                  >
                    <Icon type="flag" />
                    {item.priority}
                  </DateWrapper>
                  <Button
                    type='danger'
                    icon="delete"
                    onClick={props.handleDeleteItem.bind(this, index)}
                    ghost
                  ></Button>
                </OperateWrapper>
              </ItemWrapper>
            })
          }
        </ListWrapper>
        <Pagination
          style={{textAlign: 'right', marginTop: '10px'}}
          defaultCurrent={1}
          simple
          total={props.totalPage} />
    </div>
  );

}

const mapStateToProps = (state) => {
  return {
    inputValue: state.inputValue,
    choose: state.choose,
    totalPage: state.totalPage,
    editVisible: state.editVisible,
    list: state.list,
    expireDate: state.expireDate,
    priority: state.priority,
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
    },
    handleExpireDate: () => {

    },
    handlePriority: () => {

    },
    onChange: () => {

    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
