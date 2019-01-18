import request from '@/utils/request'

export function starttask(params) {
  return request({
    url: '/starttask/',
    method: 'get',
    params
  })
}

export function stoptask() {
  return request({
    url: '/stoptask/',
    method: 'get'
  })
}

export function deltask(params) {
  return request({
    url: '/deltask/',
    method: 'get',
    params
  })
}

export function set_and_start(params){
  return request({
    url:"/set_and_start/",
    method: 'post',
    data:params
  })
}

