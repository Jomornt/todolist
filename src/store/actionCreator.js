import {
  CHANGE_INPUT_VALUE,
  ADD_ITEM,
  DELETE_ITEM,
  CHANGE_CHOOSE
} from './actionTypes'

export const getInputChangeAction = (value) => ({
    type: CHANGE_INPUT_VALUE,
    value
})

export const addItemAction = () => ({
    type: ADD_ITEM,
})

export const deleteItemAction = (index) => ({
    type: DELETE_ITEM,
    index
})

export const chooseChangeAction = (choose) => ({
    type: CHANGE_CHOOSE,
    choose
})