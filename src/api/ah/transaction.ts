import { request } from "@/utils/service"
import type * as Transaction from "./types/transaction"

/** 查 */
export function getTransactionDataApi(params: Transaction.TransactionListRequestData) {
  return request<Transaction.TransactionResponseData>({
    url: "execution/getContractLog",
    method: "get",
    params
  })
}
