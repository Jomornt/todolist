import axios from 'axios'
import { 
    updateListAction,
    totalPageChangeAction
  } from './store/actionCreator'

export function updatePage(method, json, current, choose, dispatch, url){
    axios({
        method: method,
        url: url,
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        data: json
        }).then(res => {
            getNewPage(current, choose, dispatch)
        }).catch((err) => {
          console.log(err);
        });
}

export function getNewPage(current, choose, dispatch){
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
}