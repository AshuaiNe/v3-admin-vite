export interface CreateOrUpdateContractRequestData {
  id?: number
  name: string
  address: string
  abi: string
}

export interface ContractListRequestData {
  /** 当前页码 */
  page?: number
  /** 每页条数 */
  page_size?: number
  /** 排序 */
  ordering?: string
  /** 查询 */
  search?: string
}

export interface ContractData {
  id: number
  name: string
  address: string
  abi: string
  is_selected?: boolean
  created_at: string
  updated_at: string
}

export type ContractResponseData = ApiResponseData<{
  count: number
  items: ContractData[]
}>
