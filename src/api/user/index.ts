import { request } from "@/utils/service"
import type * as User from "./types/user"

/** 增 */
export function createUserDataApi(data: User.CreateOrUpdateUserRequestData) {
  return request({
    url: "user/register",
    method: "post",
    data
  })
}

/** 删 */
export function deleteUserDataApi(ids: number) {
  return request({
    url: `user/delete/${ids}`,
    method: "delete"
  })
}

/** 改 */
export function updateUserDataApi(data: User.CreateOrUpdateUserRequestData) {
  return request({
    url: `user/${data.id}`,
    method: "put",
    data
  })
}

/** 查 */
export function getUserDataApi(params: User.UserInfoRequestData) {
  return request<User.UserResponseData>({
    url: "user/all/info",
    method: "get",
    params
  })
}

/** 批量删除 */
export function bulkDeleteUserDataApi(ids: number[]) {
  return request({
    url: "user/bulk/delete",
    method: "delete",
    data: ids
  })
}
