import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { updatePage } from './myAxios'
import { 
  getInputChangeAction,
  chooseChangeAction,
  updateListAction,
  totalPageChangeAction,
  currentChangeAction,
  sortByPriorityAction,
  updateItemAction,
  updatePriorityAction
} from './store/actionCreator'
import {
  HeaderWrapper,
  InputWrapper,
  BtnWrapper,
  ListWrapper,
  SortWrapper,
  ItemWrapper,
  OperateWrapper,
  PriorityWrapper
} from './style';
import 'antd/dist/antd.css';
import {
  Input, 
  Button,
  Radio,
  Pagination,
  Icon
} from 'antd';

class TodoList extends Component {
  render(){
    const { inputValue, choose, totalPage, list, current,
      handleInputChange, handleItemTextChange, handleItemTextBlur,
      handleAddItem, handleDeleteItem, handleFinish, handleChooseChange, 
      handleSortByPriority, handlePriorityChange, handlePriorityBlur,  handleCurrentChange
    } = this.props;
    return (
      <div>
          <HeaderWrapper>Todo List</HeaderWrapper>
          <InputWrapper>
            <Input
              placrholder="请输入你的计划"
              value={inputValue}
              onChange={handleInputChange}
            ></Input>
            <Button
              type="primary"
              onClick={handleAddItem.bind(this,inputValue,current,choose)}
            >submit</Button>
          </InputWrapper>
          <BtnWrapper>
            <Radio.Group value={choose} onChange={handleChooseChange}>
              <Radio.Button value="unfinished">未完成</Radio.Button>
              <Radio.Button value="finished">已完成</Radio.Button>
            </Radio.Group>
            <SortWrapper>
              <Button type="dashed" icon="down" onClick={handleSortByPriority}>
                优先级
              </Button>
            </SortWrapper>
          </BtnWrapper>
          <ListWrapper>
            {
              list.map((item,index) => {
                return <ItemWrapper
                  key={index}
                >
                  <Icon
                    type="check-circle"
                    onClick={handleFinish.bind(this, index,list,current,choose)}
                  />
                  <input
                    value={item.text}
                    style={{height: '20px',border: 'none',marginLeft:'10px'}}
                    onBlur={handleItemTextBlur.bind(this, index,list,current,choose)}
                    onChange={handleItemTextChange.bind(this, index)}
                  ></input>
                  <OperateWrapper>
                    <PriorityWrapper>
                      <Icon type="flag" />
                      <input
                        value={item.priority}
                        style={{height: '20px',border: 'none',marginLeft:'10px',width:'20px'}}
                        onBlur={handlePriorityBlur.bind(this, index,list,current,choose)}
                        onChange={handlePriorityChange.bind(this, index,list,current,choose)}
                      ></input>
                    </PriorityWrapper>
                    <Button
                      type='danger'
                      icon="delete"
                      onClick={handleDeleteItem.bind(this, index, list, current,choose)}
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
            current={Number(current)}
            pageSize={7}
            simple
            onChange={handleCurrentChange.bind(this, choose)}
            total={totalPage} />
      </div>
    );
  }
  componentDidMount() {
    axios.get('/list/tododata',{
      params: { 
        'page': 1,
        'choose': 'unfinished'
      }
    }).then((res) => {
        const data = res.data;
        this.props.handleTotalPageChange(data.count);
        this.props.updateList(data.results);
      }).catch((error) => {
        console.log(error);
      });
  }
}

const mapStateToProps = (state) => {
  return {
    inputValue: state.inputValue,
    choose: state.choose,
    totalPage: state.totalPage,
    list: state.list,
    current: state.current
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateList: (list) => {
      const action = updateListAction(list)
      dispatch(action)
    },
    handleInputChange: (e) => {
      const action = getInputChangeAction(e.target.value)
      dispatch(action)
    },
    handleItemTextChange: (index, e) => {
      console.log(e.target.value)
      const action = updateItemAction(e.target.value,index)
      dispatch(action)
    },
    handleItemTextBlur: (index, list, current, choose, e)=>{
      const json = new URLSearchParams()
      json.append('text', e.target.value)
      json.append('expire_date', list[index].expire_date)
      json.append('state', list[index].state)
      json.append('priority', list[index].priority)
      const url = `/list/tododata/${list[index].todo_id}/`
      updatePage('put', json, current, choose, dispatch, url)
    },
    handleAddItem: (input, current, choose) => {
      const json = new URLSearchParams()
      json.append('text', input)
      json.append('expire_date', '不限')
      json.append('state', 'unfinished')
      json.append('priority', 5)
      updatePage('post', json, current, choose, dispatch,'/list/tododata/')
    },
    handleFinish: (index, list, current, choose, e) => {
      const json = new URLSearchParams()
      json.append('text', list[index].text)
      json.append('expire_date', list[index].expire_date)
      json.append('state', 'finished')
      json.append('priority', list[index].priority)
      const url = `/list/tododata/${list[index].todo_id}/`
      updatePage('put', json, current, choose, dispatch, url)
    },
    handleDeleteItem: (index, list, current, choose) => {
      const json = new URLSearchParams()
      const url = `/list/tododata/${list[index].todo_id}/`
      updatePage('delete', json, current, choose, dispatch, url)
    },
    handleChooseChange: (e) => {
      const action = chooseChangeAction(e.target.value)
      dispatch(action)
      axios.get('/list/tododata',{
        params: { 
          'page': 1,
          'choose': e.target.value
        }
      }).then((res) => {
          const data = res.data;
          dispatch(currentChangeAction('1'))
          dispatch(updateListAction(data.results))
          dispatch(totalPageChangeAction(data.count))
        }).catch((error) => {
          console.log(error);
        });
    },
    handleSortByPriority: () => {
      const action = sortByPriorityAction()
      dispatch(action)
    },
    handlePriorityChange: (index, list, current, choose, e) => {
      const action = updatePriorityAction(e.target.value,index)
      dispatch(action)
    },
    handlePriorityBlur: (index, list, current, choose, e) => {
      const json = new URLSearchParams()
      json.append('text', list[index].text)
      json.append('expire_date', list[index].expire_date)
      json.append('state', list[index].state)
      json.append('priority', e.target.value)
      const url = `/list/tododata/${list[index].todo_id}/`
      updatePage('put', json, current, choose, dispatch, url)
    },
    handleTotalPageChange: (totalPage) => {
      const action = totalPageChangeAction(totalPage)
      dispatch(action)
    },
    handleCurrentChange: (choose, current) => {
      const action = currentChangeAction(current)
      axios.get('/list/tododata',{
        params: { 
          'page': current,
          'choose': choose
        }
      }).then((res) => {
          const data = res.data;
          dispatch(updateListAction(data.results))
        }).catch((error) => {
          console.log(error);
        });
      dispatch(action)
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
