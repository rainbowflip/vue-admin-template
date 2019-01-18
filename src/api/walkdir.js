import request from '@/utils/request'

export function getfolder(params) {
  return request({
    url: '/getfolder/',
    method: 'get',
    params
  })
}


export function getfiles(params) {
    return request({
      url: '/getfiles/',
      method: 'post',
      data:params
    })
  }