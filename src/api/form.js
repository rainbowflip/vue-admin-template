import request from '@/utils/request'

export function settasks(params){
    return request({
        url:"settasks/",
        method:"post",
        data:params
    })
}

export function settags(params){
    return request({
        url:"settags/",
        method:"post",
        data:params
    })
}