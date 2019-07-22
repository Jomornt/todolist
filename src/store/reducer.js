import {
  CHANGE_INPUT_VALUE,
  ADD_ITEM,
  DELETE_ITEM,
  CHANGE_CHOOSE
} from './actionTypes'
const defaultState = {
    inputValue: '',
    choose: 'all',
    totalPage: 1,
    editVisible: 'false',
    list: [{
        text: 'do homework',
        expireDate: '3月1日',
        priority: 4
    },{
        text: 'play game',
        expireDate: '4月4日',
        priority: 5
    },{
        text: 'watch TV',
        expireDate: '5月1日',
        priority: 5
    }]   
}
export default (state = defaultState, action) => {
    if(action.type === CHANGE_INPUT_VALUE){
        const newState = JSON.parse(JSON.stringify(state));
        newState.inputValue = action.value;
        return newState;
    }
    if(action.type === ADD_ITEM){
        const newState = JSON.parse(JSON.stringify(state));
        const json = {
            text: newState.inputValue,
            expireDate: '不限',
            priority: 5
        } 
        newState.list.push(json)
        newState.inputValue = ''
        return newState;
    }
    if(action.type === DELETE_ITEM){
        const newState = JSON.parse(JSON.stringify(state));
        newState.list.splice(action.index,1)
        return newState;
    }
    if(action.type === CHANGE_CHOOSE){
        const newState = JSON.parse(JSON.stringify(state));
        newState.choose = action.choose
        return newState;
    }
    return state;
}