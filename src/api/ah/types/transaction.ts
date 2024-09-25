export interface TransactionListRequestData {
  /** 当前页码 */
  page?: number
  /** 每页条数 */
  page_size?: number
  /** 排序 */
  ordering?: string
  /** 查询 */
  search?: string
}

export interface TransactionData {
  id: number
  chain: string
  transaction_hash: string
  method: string
  block_number: number
  timestamp: string
  status: string
  from_address: string
  to_address: string
  value: string
  txn_fee: string
  is_selected?: boolean
}

export type TransactionResponseData = ApiResponseData<{
  count: number
  items: TransactionData[]
}>
