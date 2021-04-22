import request from '/@/utils/request'

// 获取基础数据
export const getbaseData = (params: any): any =>
  request({
    url: '/baseService/getbaseData',
    method: 'get',
    params: params
  })

export const uploadFile = '/baseService/uploadFile'
