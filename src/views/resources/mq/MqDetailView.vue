<template>
  <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">

    <el-form-item label="版本号:" prop="mqVersion">
    <span>{{this.ruleForm.id}}</span>
  </el-form-item>

    <el-form-item label="实例类型:" prop="instanceType">
      <span>{{this.ruleForm.instanceType}}</span>
    </el-form-item>

    <el-form-item label="规格:" prop="instanceType">
      <span>{{this.ruleForm.mqSize}}</span>
    </el-form-item>

    <el-form-item label="存储空间:" prop="instanceType">
      <span>{{this.ruleForm.memorySpace}}</span>
    </el-form-item>

    <el-form-item label="实例名称:" prop="instanceType">
      <span>{{this.ruleForm.instanceName}}</span>
    </el-form-item>

    <el-form-item label="实例名称:" prop="instanceType">
      <span>{{this.ruleForm.instanceName}}</span>
    </el-form-item>

    <el-form-item label="描述:" prop="instanceType">
      <el-input type="textarea" v-model="ruleForm.description" readonly="true"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="pass()">通过</el-button>
      <el-button type="warning" @click="refuse()">驳回</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'MqDetailView',
  props: ['id'],
  data() {
    return {
      mqAppleUrl: '/api/apply/applyRabbitMQ',
      initUrl: '/api/apply/diclist',
      versions: [],
      instanceTypes: [],
      mqSizes: [],
      memorySpace: 0,
      ruleForm: {
        id: '123123123',
        mqVersion: '123',
        instanceType: '123',
        mqSize: '123',
        memorySpace: '123',
        instanceName: '123',
        description: '12312312312',
      },
    };
  },
  methods: {
    monitoring() { // 监听事件
      this.$on('childMethod', (res) => {
        // 查询数据并反显

        console.log(res);
      });
    },
    pass() {
      console.log(this.ruleForm.id);
    },
    refuse() {
      console.log(this.ruleForm.id);
    },
  },
  mounted() {
    this.monitoring();
  },
};
</script>

<style scoped>

</style>
