import {
  CHANGE_INPUT_VALUE,
  ADD_ITEM,
  DELETE_ITEM,
  CHANGE_CHOOSE
} from './actionTypes'
const defaultState = {
    inputValue: '',
    choose: 'all',
    list: []
}
export default (state = defaultState, action) => {
    if(action.type === CHANGE_INPUT_VALUE){
        const newState = JSON.parse(JSON.stringify(state));
        newState.inputValue = action.value;
        return newState;
    }
    if(action.type === ADD_ITEM){
        const newState = JSON.parse(JSON.stringify(state));
        newState.list.push(newState.inputValue)
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