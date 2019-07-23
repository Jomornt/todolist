import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
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
  DateWrapper
} from './style';
import 'antd/dist/antd.css';
import {
  Input, 
  Button,
  Radio,
  Pagination,
  Checkbox,
  Icon
} from 'antd';

class TodoList extends Component {
  render(){
    return (
      <div>
          <HeaderWrapper>Todo List</HeaderWrapper>
          <InputWrapper>
            <Input
              placrholder="请输入你的计划"
              value={this.props.inputValue}
              onChange={this.props.handleInputChange}
            ></Input>
            <Button
              type="primary"
              onClick={this.props.handleAddItem.bind(this,this.props.inputValue,this.props.current,this.props.choose)}
            >submit</Button>
          </InputWrapper>
          <BtnWrapper>
            <Radio.Group value={this.props.choose} onChange={this.props.handleChooseChange}>
              <Radio.Button value="unfinished">未完成</Radio.Button>
              <Radio.Button value="finished">已完成</Radio.Button>
            </Radio.Group>
            <SortWrapper>
              <Button type="dashed" icon="down" onClick={this.props.handleSortByPriority}>
                优先级
              </Button>
            </SortWrapper>
          </BtnWrapper>
          <ListWrapper>
            {
              this.props.list.map((item,index) => {
                return <ItemWrapper
                  key={index}
                >
                  <Checkbox
                    onChange={this.props.handleFinish.bind(this, index,this.props.list,this.props.current,this.props.choose)}
                  ></Checkbox>
                  <input
                    value={item.text}
                    style={{height: '20px',border: 'none',marginLeft:'10px'}}
                    onBlur={this.props.handleItemTextBlur.bind(this, index,this.props.list,this.props.current,this.props.choose)}
                    onChange={this.props.handleItemTextChange.bind(this, index,this.props.list,this.props.current,this.props.choose)}
                  ></input>
                  <OperateWrapper>
                    <DateWrapper>
                      <Icon type="flag" />
                      <input
                        value={item.priority}
                        style={{height: '20px',border: 'none',marginLeft:'10px',width:'20px'}}
                        onBlur={this.props.handlePriorityBlur.bind(this, index,this.props.list,this.props.current,this.props.choose)}
                        onChange={this.props.handlePriorityChange.bind(this, index,this.props.list,this.props.current,this.props.choose)}
                      ></input>
                    </DateWrapper>
                    <Button
                      type='danger'
                      icon="delete"
                      onClick={this.props.handleDeleteItem.bind(this, index, this.props.list, this.props.current,this.props.choose)}
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
            pageSize={7}
            simple
            onChange={this.props.handleCurrentChange.bind(this, this.props.choose)}
            total={this.props.totalPage} />
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
    editVisible: state.editVisible,
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
    handleItemTextChange: (index, list, current, choose, e) => {
      const action = updateItemAction(e.target.value,index)
      dispatch(action)
    },
    handleItemTextBlur: (index, list, current, choose, e)=>{
      const json = new URLSearchParams()
      json.append('text', e.target.value)
      json.append('expire_date', list[index].expire_date)
      json.append('state', list[index].state)
      json.append('priority', list[index].priority)
      axios({
        method: 'put',
        url:`/list/tododata/${list[index].todo_id}/`,
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        data: json
        }).then(res => {
        axios.get('/list/tododata',{
          params: { 
            'page': current,
            'choose': choose
          }
          }).then((res) => {
            const data = res.data;
            dispatch(updateListAction(data.results))
            dispatch(totalPageChangeAction(data.count))
          }).catch((error) => {
              console.log(error);
          });
        }).catch((err) => {
          console.log(err);
        });
    },
    handleAddItem: (input, current, choose) => {
      const json = new URLSearchParams()
      json.append('text', input)
      json.append('expire_date', '不限')
      json.append('state', 'unfinished')
      json.append('priority', 5)
      axios({
        method: 'post',
        url:'/list/tododata/',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        data: json
        }).then(res => {
        axios.get('/list/tododata',{
          params: { 
            'page': current,
            'choose': choose
          }
          }).then((res) => {
            const data = res.data;
            dispatch(updateListAction(data.results))
            dispatch(totalPageChangeAction(data.count))
          }).catch((error) => {
              console.log(error);
          });
        }).catch((err) => {
          console.log(err);
        });
    },
    handleFinish: (index, list, current, choose, e) => {
      const json = new URLSearchParams()
      json.append('text', list[index].text)
      json.append('expire_date', list[index].expire_date)
      json.append('state', 'finished')
      json.append('priority', list[index].priority)
      if(e.target.checked === true)
        axios({
          method: 'put',
          url:`/list/tododata/${list[index].todo_id}/`,
          headers:{'Content-Type':'application/x-www-form-urlencoded'},
          data: json
          }).then(res => {
          axios.get('/list/tododata',{
            params: { 
              'page': current,
              'choose': choose
            }
            }).then((res) => {
              const data = res.data;
              dispatch(updateListAction(data.results))
              dispatch(totalPageChangeAction(data.count))
            }).catch((error) => {
                console.log(error);
            });
          }).catch((err) => {
            console.log(err);
          });
    },
    handleDeleteItem: (index, list, current, choose) => {
      axios({
        method: 'delete',
        url:`/list/tododata/${list[index].todo_id}`,
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        }).then(res => {
        axios.get('/list/tododata',{
          params: { 
            'page': current,
            'choose': choose
          }
          }).then((res) => {
            const data = res.data;
            dispatch(updateListAction(data.results))
            dispatch(totalPageChangeAction(data.count))
          }).catch((error) => {
              console.log(error);
          });
          console.log(res)
        }).catch((err) => {
          console.log(err);
        });
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
      axios({
        method: 'put',
        url:`/list/tododata/${list[index].todo_id}/`,
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        data: json
        }).then(res => {
        axios.get('/list/tododata',{
          params: { 
            'page': current,
            'choose': choose
          }
          }).then((res) => {
            const data = res.data;
            dispatch(updateListAction(data.results))
            dispatch(totalPageChangeAction(data.count))
          }).catch((error) => {
              console.log(error);
          });
        }).catch((err) => {
          console.log(err);
        });
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
