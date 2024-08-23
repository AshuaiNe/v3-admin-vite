import { request } from "@/utils/service"
import type * as Contract from "./types/contract"

/** 增 */
export function createContractDataApi(data: Contract.CreateOrUpdateContractRequestData) {
  return request({
    url: "contract/create",
    method: "post",
    data
  })
}

/** 删 */
export function deleteContractDataApi(ids: number) {
  return request({
    url: `contract/delete/${ids}`,
    method: "delete"
  })
}

/** 改 */
export function updateContractDataApi(data: Contract.CreateOrUpdateContractRequestData) {
  return request({
    url: `contract/${data.id}`,
    method: "put",
    data
  })
}

/** 查 */
export function getContractDataApi(params: Contract.ContractListRequestData) {
  return request<Contract.ContractResponseData>({
    url: "contract/all",
    method: "get",
    params
  })
}
