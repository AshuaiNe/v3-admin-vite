<script lang="ts" setup>
import { reactive, ref, watch } from "vue"
import { type FormInstance, type FormRules, ElMessage, ElMessageBox } from "element-plus"
import { Search, Refresh, CirclePlus, RefreshRight } from "@element-plus/icons-vue"
import { usePagination } from "@/hooks/usePagination"
import { cloneDeep } from "lodash-es"
import {
  createFunctionDataApi,
  deleteFunctionDataApi,
  executeFunctionDataApi,
  getFunctionDataApi,
  updateFunctionDataApi
} from "@/api/ah/function"
import { CreateOrUpdateFunctionRequestData, ExecuteFunctionRequestData, FunctionData } from "@/api/ah/types/function"

defineOptions({
  // 命名当前组件
  name: "ElementPlus"
})

const loading = ref<boolean>(false)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

//#region 增
const DEFAULT_FORM_DATA: CreateOrUpdateFunctionRequestData = {
  id: undefined,
  name: "",
  contract: "",
  abi: {}
}
const dialogVisible = ref<boolean>(false)
const dialogExecute = ref<boolean>(false)
const formRef = ref<FormInstance | null>(null)
const formData = ref<CreateOrUpdateFunctionRequestData>(cloneDeep(DEFAULT_FORM_DATA))
const formRules: FormRules<CreateOrUpdateFunctionRequestData> = {
  name: [{ required: true, trigger: "blur", message: "请输入名称" }],
  contract: [{ required: true, trigger: "blur", message: "请选择合约" }],
  abi: [{ required: true, trigger: "blur", message: "请输入ABI" }]
}
const handleCreateOrUpdate = () => {
  formRef.value?.validate((valid: boolean, fields) => {
    if (!valid) return console.error("表单校验不通过", fields)
    loading.value = true
    const api = formData.value.id === undefined ? createFunctionDataApi : updateFunctionDataApi
    api(formData.value)
      .then(() => {
        ElMessage.success("操作成功")
        dialogVisible.value = false
        getFunctionData()
      })
      .finally(() => {
        loading.value = false
      })
  })
}
const resetForm = () => {
  formRef.value?.clearValidate()
  formData.value = cloneDeep(DEFAULT_FORM_DATA)
}
//#endregion

//#region 删
const handleDelete = (row: FunctionData) => {
  ElMessageBox.confirm(`正在删除合约：${row.name}，确认删除？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    deleteFunctionDataApi(row.id).then(() => {
      ElMessage.success("删除成功")
      getFunctionData()
    })
  })
}
//#endregion

//#region 改
const handleUpdate = (row: FunctionData) => {
  dialogVisible.value = true
  if (row.is_selected !== undefined) {
    delete row.is_selected
  }
  formData.value = cloneDeep(row)
}
//#endregion

//#region 执行
const options = [
  {
    value: "56",
    label: "bsc正式链"
  },
  {
    value: "97",
    label: "bsc测试链"
  }
]
const DEFAULT_EXECUTE_DATA: ExecuteFunctionRequestData = {
  name: "",
  contract: "",
  abi: {},
  chain: 0,
  inputs: [],
  private_key: ""
}
const executeData = ref<ExecuteFunctionRequestData>(cloneDeep(DEFAULT_EXECUTE_DATA))
const executeRules: FormRules<ExecuteFunctionRequestData> = {
  private_key: [{ required: true, trigger: "blur", message: "请输入私钥" }],
  chain: [{ required: true, trigger: "blur", message: "请选择链" }]
}

const handleExecute = (row: FunctionData) => {
  dialogExecute.value = true
  if (row.is_selected !== undefined) {
    delete row.is_selected
  }
  // 初始化 `inputs` 数组
  const abi = row.abi as { inputs?: { [key: string]: any } }
  row.inputs =
    abi.inputs?.map((input: any) => {
      return { parameter: input.name, inputValue: "" }
    }) || []
  executeData.value = cloneDeep(row)
}
const resetExecute = () => {
  executeData.value = cloneDeep(DEFAULT_EXECUTE_DATA)
}

const handleExecuteSubmit = () => {
  loading.value = true
  executeFunctionDataApi(executeData.value)
    .then(() => {
      ElMessage.success("执行成功")
      dialogExecute.value = false
    })
    .finally(() => {
      loading.value = false
    })
}
//#endregion

//#region 查
const functionData = ref<FunctionData[]>([])
const searchFormRef = ref<FormInstance | null>(null)
const searchData = reactive({
  name: "",
  ordering: ""
})
const getFunctionData = () => {
  loading.value = true
  getFunctionDataApi({
    page: paginationData.currentPage,
    page_size: paginationData.pageSize,
    ordering: searchData.ordering || undefined,
    search: searchData.name || undefined
  })
    .then(({ data }) => {
      paginationData.total = data.count
      functionData.value = data.items.map((item) => {
        item.is_selected = false
        return item
      })
    })
    .catch(() => {
      functionData.value = []
    })
    .finally(() => {
      loading.value = false
    })
}
const handleSearch = () => {
  paginationData.currentPage === 1 ? getFunctionData() : (paginationData.currentPage = 1)
}
const resetSearch = () => {
  searchFormRef.value?.resetFields()
  handleSearch()
}
//#endregion

//#region 监听复选框的选择状态改变
const handleSelectionChange = (val: FunctionData[]) => {
  functionData.value.forEach((item) => {
    const is_selected = val.some((valItem) => valItem.id === item.id)
    if (item.is_selected !== is_selected) {
      item.is_selected = is_selected
    }
  })
}
//#endregion

//#region 查询合约
//#endregion

/** 监听分页参数的变化 */
watch([() => paginationData.currentPage, () => paginationData.pageSize], getFunctionData, { immediate: true })
</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="name" label="名称">
          <el-input v-model="searchData.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
          <el-button :icon="Refresh" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card v-loading="loading" shadow="never">
      <div class="toolbar-wrapper">
        <div>
          <el-button type="primary" :icon="CirclePlus" @click="dialogVisible = true">新增方法</el-button>
        </div>
        <div>
          <el-tooltip content="刷新当前页">
            <el-button type="primary" :icon="RefreshRight" circle @click="getFunctionData" />
          </el-tooltip>
        </div>
      </div>
      <div class="table-wrapper">
        <el-table :data="functionData" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column prop="name" label="名称" align="center" />
          <el-table-column prop="contract" label="合约地址" align="center" show-overflow-tooltip />
          <el-table-column prop="abi" label="ABI" align="center" show-overflow-tooltip />
          <el-table-column prop="created_at" label="创建时间" align="center" />
          <el-table-column prop="updated_at" label="更新时间" align="center" />
          <el-table-column fixed="right" label="操作" width="200" align="center">
            <template #default="scope">
              <el-button type="primary" text bg size="small" @click="handleExecute(scope.row)">执行</el-button>
              <el-button type="warning" text bg size="small" @click="handleUpdate(scope.row)">修改</el-button>
              <el-button type="danger" text bg size="small" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pager-wrapper">
        <el-pagination
          background
          :layout="paginationData.layout"
          :page-sizes="paginationData.pageSizes"
          :total="paginationData.total"
          :page-size="paginationData.pageSize"
          :currentPage="paginationData.currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    <el-dialog v-model="dialogExecute" title="执行方法" @closed="resetExecute" width="30%">
      <el-form ref="formRef" :model="executeData" :rules="executeRules" label-width="100px" label-position="left">
        <el-form-item prop="name" label="名称">
          <el-input v-model="executeData.name" placeholder="请输入" disabled />
        </el-form-item>
        <el-form-item prop="contract" label="合约地址">
          <el-input v-model="executeData.contract" placeholder="请输入" disabled />
        </el-form-item>
        <el-form-item prop="private_key" label="操作者私钥">
          <el-input v-model="executeData.private_key" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="abi" label="abi">
          <el-input v-model="executeData.abi" placeholder="请输入" disabled />
        </el-form-item>
        <el-form-item label="网络">
          <el-select v-model="executeData.chain" placeholder="Select" style="width: 240px">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <template v-for="(item, index) in executeData.inputs" :key="index">
          <el-form-item :label="'参数' + item.parameter">
            <el-input v-model="item.inputValue" placeholder="请输入" />
          </el-form-item>
        </template>
      </el-form>
      <template #footer>
        <el-button @click="dialogExecute = false">取消</el-button>
        <el-button type="primary" @click="handleExecuteSubmit" :loading="loading">确认</el-button>
      </template>
    </el-dialog>
    <!-- 新增/修改 -->
    <el-dialog
      v-model="dialogVisible"
      :title="formData.id === undefined ? '新增方法' : '修改方法'"
      @closed="resetForm"
      width="30%"
    >
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px" label-position="left">
        <el-form-item prop="name" label="名称">
          <el-input v-model="formData.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="contract" label="合约地址">
          <el-input v-model="formData.contract" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="abi" label="ABI">
          <el-input v-model="formData.abi" placeholder="请输入" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleCreateOrUpdate" :loading="loading">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.search-wrapper {
  margin-bottom: 20px;
  :deep(.el-card__body) {
    padding-bottom: 2px;
  }
}

.toolbar-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.table-wrapper {
  margin-bottom: 20px;
}

.pager-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
