import { request } from "@/utils/service"
import type * as Function from "./types/function"

/** 增 */
export function createFunctionDataApi(data: Function.CreateOrUpdateFunctionRequestData) {
  return request({
    url: "function/create",
    method: "post",
    data
  })
}

/** 删 */
export function deleteFunctionDataApi(ids: number) {
  return request({
    url: `function/delete/${ids}`,
    method: "delete"
  })
}

/** 改 */
export function updateFunctionDataApi(data: Function.CreateOrUpdateFunctionRequestData) {
  return request({
    url: `function/${data.id}`,
    method: "put",
    data
  })
}

/** 查 */
export function getFunctionDataApi(params: Function.FunctionListRequestData) {
  return request<Function.FunctionResponseData>({
    url: "function/all/info",
    method: "get",
    params
  })
}

/** 执行方法 */
export function executeFunctionDataApi(data: Function.ExecuteFunctionRequestData) {
  return request({
    url: "execution/contract",
    method: "post",
    data
  })
}
