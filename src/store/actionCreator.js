import {
  CHANGE_INPUT_VALUE,
  CHANGE_CHOOSE,
  UPDATE_LIST,
  CHANGE_TOTALPAGE,
  CHANGE_CURRENT,
  SORT_BY_PRIORITY,
  SORT_BY_EXPIREDATE,
  CHANGE_ITEM,
  CHANGE_PRIORITY
} from './actionTypes'

export const updateListAction = (list) => ({
    type: UPDATE_LIST,
    list
})

export const getInputChangeAction = (value) => ({
    type: CHANGE_INPUT_VALUE,
    value
})

export const chooseChangeAction = (choose) => ({
    type: CHANGE_CHOOSE,
    choose
})

export const totalPageChangeAction = (totalPage) => ({
    type: CHANGE_TOTALPAGE,
    totalPage
})

export const currentChangeAction = (current) => ({
    type: CHANGE_CURRENT,
    current
})
export const sortByPriorityAction = (current) => ({
    type: SORT_BY_PRIORITY,
    current
})
export const sortByExpireDateAction = (current) => ({
    type: SORT_BY_EXPIREDATE,
    current
})
export const updateItemAction = (value,index) => ({
    type: CHANGE_ITEM,
    value,
    index
})
export const updatePriorityAction = (value,index) => ({
    type: CHANGE_PRIORITY,
    value,
    index
})