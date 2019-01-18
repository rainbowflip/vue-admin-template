import request from '@/utils/request'

export function getTaskList(params) {
  return request({
    url: '/table/tasks',
    method: 'post',
    data:params
  })
}

export function getResultsList(params) {
  return request({
    url: '/table/results',
    method: 'get',
    params
  })
}

export function delSelected(params) {
  return request({
    url:"/table/delresults",
    method:"post",
    data:{
      params
    }
  })
}