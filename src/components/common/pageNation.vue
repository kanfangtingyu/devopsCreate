<template>
  <div class="pagenation">
    <el-pagination class="text-center"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="page_index" :page-sizes="pageSizes"
                   :page-size="page.limit"
                   layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'pageNation',
  props: {
    total: {
      type: Number,
    }, // 总条数
    page_index: {
      type: Number,
    },
  },
  data() {
    return {
      pageSizes: [3, 20, 50, 100],
      page: {
        page_index: 1,
        page_limit: 3,
      },
    };
  },
  methods: {
    // // 每页查看条数变化
    handleSizeChange(val) {
      this.page.page_limit = val;
      this.$emit('pageChange', this.page);
    },
    // 当前页码变化
    handleCurrentChange(val) {
      this.page.page_index = val;
      this.$emit('pageChange', this.page);
    },
  },

};
</script>

<style scoped>
  .pagenation {
    margin: 20px 0;
  }
</style>
