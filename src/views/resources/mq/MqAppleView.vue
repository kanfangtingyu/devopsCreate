<template>
  <el-container>
    <el-header>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="状态">
          <el-select v-model="formInline.status" placeholder="状态">
            <el-option label="运行中" value="2"></el-option>
            <el-option label="审核中" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="formInline.type" placeholder="类型">
            <el-option label="集群" value="shanghai"></el-option>
            <el-option label="单机" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="info"  @click="handleEdit">重置</el-button>
          <el-button type="success" @click="onAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <template>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            label="序号"
            type="index"
            width="50">
          </el-table-column>
          <!-- 这里先隐藏，ID后面操作用 -->
          <el-table-column
            label="申请ID"
            width="180"
            property="id"
            v-if="false">
          </el-table-column>

          <el-table-column
            label="实例名称"
            width="180"
            property="instanceName">
          </el-table-column>

          <el-table-column
            label="版本号"
            width="100"
            property="mqVersion">
          </el-table-column>

          <el-table-column
            label="实例类型"
            width="100"
            property="instanceType">
          </el-table-column>

          <el-table-column
            label="内存模型"
            width="100"
            property="memoryType">
          </el-table-column>

          <el-table-column
            label="状态"
            width="100">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.status == 1 ? '审核中' : '运行中' }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="创建时间"
            width="180"
            property="createTime"
            :formatter="dateFormat">
          </el-table-column>

          <el-table-column
            label="更新时间"
            width="180"
            property="updateTime"
            :formatter="dateFormat">
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.row.id)">审核
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete()">操作
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-main>
    <page-nation :total="page_total" @pageChange="pageChange"  :page_index="page_index"></page-nation>
    <el-dialog
      title="审核页面"
      :visible.sync="dialogVisible"
      width="30%"
      center><mq-detail ref="MqDetail" v-bind:id="this.currentId"></mq-detail></el-dialog>
  </el-container>
</template>

<script>
import PageNation from '@/components/common/pageNation.vue';
import MqDetail from '@/views/resources/mq/MqDetailView.vue';
import moment from 'moment';

export default {
  name: 'MqAppleView',
  components: { PageNation, MqDetail },
  data() {
    return {
      mqListUrl: '/api/apply/rabbitmqList',
      dialogVisible: false,
      page_index: 1, // 页数
      page_total: 1, // 总数
      page_size: 3,
      currentId: '',
      formInline: {
        type: '',
        status: '',
      },
      tableData: [],
    };
  },
  methods: {
    pageChange(item) {
      console.log(item);
      this.page_index = item.page_index;
      this.page_size = item.page_limit;
      this.initData(); // 改变页码，重新渲染页面
    },
    handleEdit(id) {
      console.log('审核开始');
      console.log(id);
      this.currentId = id;
      this.dialogVisible = true;
      // this.$refs.MqDetail.initData()
      this.$refs.MqDetail.$emit('childMethod', '发送给方法一的数据');

      // this.$router.push({path: '/mqDetailView'})
    },
    handleDelete() {
    },
    onSubmit() {
      const _this = this;
      const params = new URLSearchParams();
      params.append('type', this.formInline.type);
      params.append('status', this.formInline.status);
      this.axios({
        url: this.mqListUrl,
        method: 'post',
        data: '',
      }).then((response) => {
        if (response.data.msgCd === 'URM00000') {
          // 版本赋值
          _this.tableData = response.data.list;
          console.log('mqList');
          console.log(response.data.list);
        } else {
          _this.$message({
            message: '初始化数据失败!!!',
            type: 'warning',
          });
        }
      }).catch((error) => {
        _this.$message({
          message: '初始化数据失败!!!',
          type: 'warning',
        });
        console.log(error);
      });
    },
    onAdd() {
      console.log('add!');
      this.$router.push({ path: '/mqAddView' });
    },
    initData() {
      const _this = this;
      const params = new URLSearchParams();
      params.append('pageNum', this.page_index);
      params.append('pageSize', this.page_size);
      this.axios({
        url: this.mqListUrl,
        method: 'post',
        data: params,
      }).then((response) => {
        if (response.data.msgCd === 'URM00000') {
          // 版本赋值
          _this.tableData = response.data.list;
          // 分页更新
          _this.page_total = response.data.total;
          console.log('mqList');
          console.log(response.data.list);
        } else {
          _this.$message({
            message: '初始化数据失败!!!',
            type: 'warning',
          });
        }
      }).catch((error) => {
        _this.$message({
          message: '初始化数据失败!!!',
          type: 'warning',
        });
        console.log(error);
      });
    },
    dateFormat(row, column) {
      const b = row[column.property] === null;
      if (b) {
        return '';
      }
      const date = row[column.property];
      if (date === undefined) {
        return '';
      }
      return moment(date).format('YYYY-MM-DD');
    },
  },
  // 页面初始化渲染
  created() {
    this.initData();
  },

};
</script>
