import {
  CHANGE_INPUT_VALUE,
  CHANGE_CHOOSE,
  UPDATE_LIST,
  CHANGE_TOTALPAGE,
  CHANGE_CURRENT,
  SORT_BY_PRIORITY,
  CHANGE_ITEM,
  CHANGE_PRIORITY
} from './actionTypes'

const defaultState = {
    inputValue: '',
    choose: 'unfinished',
    totalPage: 0,
    current: 1,
    editVisible: 'false',
    list: []
}

export default (state = defaultState, action) => {
    if(action.type === UPDATE_LIST){
        const newState = JSON.parse(JSON.stringify(state));
        newState.list = action.list;
        newState.inputValue = '';
        return newState;
    }
    if(action.type === CHANGE_INPUT_VALUE){
        const newState = JSON.parse(JSON.stringify(state));
        newState.inputValue = action.value;
        return newState;
    }
    if(action.type === CHANGE_CHOOSE){
        const newState = JSON.parse(JSON.stringify(state));
        newState.choose = action.choose
        return newState;
    }
    if(action.type === CHANGE_TOTALPAGE){
        const newState = JSON.parse(JSON.stringify(state));
        newState.totalPage = action.totalPage
        return newState;
    }
    if(action.type === CHANGE_CURRENT){
        const newState = JSON.parse(JSON.stringify(state));
        newState.current = action.current
        return newState;
    }
    if(action.type === SORT_BY_PRIORITY){
        const newState = JSON.parse(JSON.stringify(state));
        newState.list.sort((a,b)=>{
            return a.priority - b.priority;
        })
        return newState;
    }
    if(action.type === CHANGE_ITEM){
        const newState = JSON.parse(JSON.stringify(state));
        newState.list[action.index].text = action.value
        return newState;
    }
    if(action.type === CHANGE_PRIORITY){
        const newState = JSON.parse(JSON.stringify(state));
        newState.list[action.index].priority = action.value
        return newState;
    }
    return state;
}