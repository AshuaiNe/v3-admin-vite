<script lang="ts" setup>
import { reactive, ref, watch } from "vue"
import { type FormInstance } from "element-plus"
import { Search, Refresh, RefreshRight } from "@element-plus/icons-vue"
import { usePagination } from "@/hooks/usePagination"
import { TransactionData } from "@/api/ah/types/transaction"
import { getTransactionDataApi } from "@/api/ah/transaction"

defineOptions({
  // 命名当前组件
  name: "ElementPlus"
})

const loading = ref<boolean>(false)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

//#region 查
const transactionData = ref<TransactionData[]>([])
const searchFormRef = ref<FormInstance | null>(null)
const searchData = reactive({
  from_address: "",
  to_address: "",
  ordering: ""
})
const getTransactionData = () => {
  loading.value = true
  getTransactionDataApi({
    page: paginationData.currentPage,
    page_size: paginationData.pageSize,
    ordering: searchData.ordering || undefined,
    search: searchData.from_address || searchData.to_address || undefined
  })
    .then(({ data }) => {
      paginationData.total = data.count
      transactionData.value = data.items.map((item) => {
        item.is_selected = false
        return item
      })
    })
    .catch(() => {
      transactionData.value = []
    })
    .finally(() => {
      loading.value = false
    })
}
const handleSearch = () => {
  paginationData.currentPage === 1 ? getTransactionData() : (paginationData.currentPage = 1)
}
const resetSearch = () => {
  searchFormRef.value?.resetFields()
  handleSearch()
}
//#endregion

//#region 监听复选框的选择状态改变
const handleSelectionChange = (val: TransactionData[]) => {
  transactionData.value.forEach((item) => {
    const is_selected = val.some((valItem) => valItem.id === item.id)
    if (item.is_selected !== is_selected) {
      item.is_selected = is_selected
    }
  })
}
//#endregion

/** 监听分页参数的变化 */
watch([() => paginationData.currentPage, () => paginationData.pageSize], getTransactionData, { immediate: true })
</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="from_address" label="from_address">
          <el-input v-model="searchData.from_address" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="to_address" label="to_address">
          <el-input v-model="searchData.to_address" placeholder="请输入" />
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
          <el-tooltip content="刷新当前页">
            <el-button type="primary" :icon="RefreshRight" circle @click="getTransactionData" />
          </el-tooltip>
        </div>
      </div>
      <div class="table-wrapper">
        <el-table :data="transactionData" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column prop="chain" label="链" align="center" />
          <el-table-column prop="transaction_hash" label="交易哈希" align="center" show-overflow-tooltip />
          <el-table-column prop="method" label="方法" align="center" />
          <el-table-column prop="block_number" label="区块号" align="center" />
          <el-table-column prop="timestamp" label="时间戳" align="center" />
          <el-table-column label="状态" align="center">
            <template #default="{ row }">
              <el-tag v-if="row.status === '1'" type="success">成功</el-tag>
              <el-tag v-else type="danger">失败</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="from_address" label="from_address" align="center" show-overflow-tooltip />
          <el-table-column prop="to_address" label="to_address" align="center" show-overflow-tooltip />
          <el-table-column prop="value" label="value" align="center" />
          <el-table-column prop="txn_fee" label="txn_fee" align="center" />
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
