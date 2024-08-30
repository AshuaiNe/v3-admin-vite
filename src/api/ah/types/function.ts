export interface CreateOrUpdateFunctionRequestData {
  id?: number
  name: string
  contract: string
  abi: object
}

export interface ExecuteFunctionRequestData {
  name: string
  contract: string
  abi: object
  chain: number
  inputs?: { [key: string]: any } // 用于动态输入项
  private_key: string
}

export interface FunctionListRequestData {
  /** 当前页码 */
  page?: number
  /** 每页条数 */
  page_size?: number
  /** 排序 */
  ordering?: string
  /** 查询 */
  search?: string
}

export interface FunctionData {
  id: number
  name: string
  contract: string
  abi: object
  is_selected?: boolean
  inputs?: { [key: string]: any } // 用于动态输入项
  private_key: string
  chain: number
  created_at: string
  updated_at: string
}

export type FunctionResponseData = ApiResponseData<{
  count: number
  items: FunctionData[]
}>
