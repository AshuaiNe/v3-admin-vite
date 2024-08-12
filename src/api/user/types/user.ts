export interface CreateOrUpdateUserRequestData {
  id?: number
  username: string
  email: string
  password?: string
  phone: string
}

export interface UserInfoRequestData {
  /** 当前页码 */
  page?: number
  /** 每页条数 */
  page_size?: number
  /** 排序 */
  ordering?: string
  /** 查询 */
  search?: string
}

export interface UserData {
  id: number
  username: string
  email: string
  phone: string
  is_active: boolean
  is_staff: boolean
  is_superuser: boolean
  is_selected?: boolean
  create_time: string
}

export type UserResponseData = ApiResponseData<{
  count: number
  items: UserData[]
}>
