import request from '@/utils/request'

export function settasks(params){
    return request({
        url:"setasks",
        method:"post",
        params
    })
}

export function settags(params){
    return request({
        url:"settags",
        method:"post",
        params
    })
}