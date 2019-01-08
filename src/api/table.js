import request from '@/utils/request'

export function getTaskList(params) {
  return request({
    url: '/table/tasks',
    method: 'get',
    params
  })
}

export function getResultsList(params) {
  return request({
    url: '/table/results',
    method: 'get',
    params
  })
}

export function initResult(params) {
  return request({
    url: '/table/initresult',
    method: 'get',
    params
  })
}