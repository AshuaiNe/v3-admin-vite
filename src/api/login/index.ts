import { request } from "@/utils/service"
import type * as Login from "./types/login"

/** 登录并返回 Token */
export function loginApi(data: Login.LoginRequestData) {
  return request<Login.LoginResponseData>({
    url: "user/login",
    method: "post",
    data
  })
}

/** 获取用户权限 */
export function getUserPermissionsApi() {
  return request<Login.UserPermissionsResponseData>({
    url: "user/userPermissions",
    method: "get"
  })
}
