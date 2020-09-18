<template>
  <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">

    <el-form-item label="版本号:" prop="mqVersion">
    <span>{{this.ruleForm.version}}</span>
  </el-form-item>

    <el-form-item label="架构类型:" prop="instanceType">
      <span>{{this.ruleForm.type}}</span>
    </el-form-item>

    <el-form-item label="从节点数量:" prop="instanceType">
      <span>{{this.ruleForm.count}}</span>
    </el-form-item>

    <el-form-item label="单节点内存:" prop="instanceType">
      <span>{{this.ruleForm.memorySize}}</span>
    </el-form-item>

    <el-form-item label="实例名称:" prop="instanceType">
      <span>{{this.ruleForm.instanceName}}</span>
    </el-form-item>

    <el-form-item label="描述:" prop="instanceType">
      <el-input type="textarea" v-model="ruleForm.description" readonly="true"></el-input>
    </el-form-item>

    <el-form-item label="单节点内存:" prop="instanceType">
      <span>{{this.ruleForm.redisPassword}}</span>
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
        version: '1.6',
        type: '读写分离',
        count: '28',
        memorySize: '13',
        mqSize: '12',
        instanceName: 'redis-123123',
        redisPassword: '33333',
        description: '123123123123',
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
