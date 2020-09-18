<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

    <el-form-item label="版本号" prop="mqVersion">
      <el-radio-group v-model="ruleForm.mqVersion" size="medium">
        <el-radio-button :label="item.id" :key="item.id" v-for="item in versions">{{item.value}}</el-radio-button>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="实例类型" prop="instanceType">
      <el-radio-group v-model="ruleForm.instanceType" size="medium">
        <el-radio-button :label="item.id" :key="item.id" v-for="item in instanceTypes">{{item.value}}</el-radio-button>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="规格" prop="mqSize">
      <el-radio-group v-model="ruleForm.mqSize" size="medium">
        <el-radio-button :label="item.id" :key="item.id" v-for="item in mqSizes">{{item.value}}</el-radio-button>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="存储空间" prop="memorySpace" style="width: 30%">
      <el-slider
        v-model="ruleForm.memorySpace"
        :max="memorySpace"
        :step="5"
      show-input="">
      </el-slider>
    </el-form-item>

    <el-form-item label="实例名称" prop="instanceName" style="width: 300px">
      <el-input v-model="ruleForm.instanceName" size="small"></el-input>
    </el-form-item>

    <el-form-item label="使用时长" style="width: 300px">
      <el-input value="长期" :disabled="true"></el-input>
    </el-form-item>

    <el-form-item label="描述" prop="description" style="width: 600px">
      <el-input type="textarea" v-model="ruleForm.description"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">申请</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
      <el-button type="warning" @click="back()">返回</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'MqAddView',
  data() {
    return {
      mqAppleUrl: '/api/apply/applyRabbitMQ',
      initUrl: '/api/apply/diclist',
      versions: [],
      instanceTypes: [],
      mqSizes: [],
      memorySpace: 0,
      ruleForm: {
        mqVersion: '',
        instanceType: '',
        mqSize: '',
        memorySpace: '',
        instanceName: '',
        description: '',
      },
      rules: {
        memorySpace: [
          { required: true, message: '请选择存储空间', trigger: 'change' },
        ],
        description: [
          { required: true, message: '描述不能为空', trigger: 'change' },
        ],
        mqVersion: [
          { required: true, message: '请选择版本号', trigger: 'change' },
        ],
        instanceType: [
          { required: true, message: '请选择实例类型', trigger: 'change' },
        ],
        instanceName: [
          { required: true, message: '实例名称不能为空', trigger: 'change' },
        ],
        mqSize: [
          { required: true, message: '请选择规格', trigger: 'change' },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      const _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$refs[formName].validate(() => {
            this.$confirm('确认申请该资源?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            }).then(() => {
              // ajax 发起申请工单
              const params = new URLSearchParams();
              params.append('mqVersion', this.ruleForm.mqVersion);
              params.append('mqSize', this.ruleForm.mqSize);
              params.append('instanceType', this.ruleForm.instanceType);
              params.append('memoryType', this.ruleForm.mqSize);
              params.append('description', this.ruleForm.description);
              params.append('instanceName', this.ruleForm.instanceName);
              this.axios({
                url: this.mqAppleUrl,
                method: 'post',
                data: params,
              }).then((response) => {
                // 请求之后的逻辑
                if (response.data.msgCd === 'URM00000') {
                  _this.$message({
                    type: 'success',
                    message: '申请成功，请等待管理员审批!',
                  });
                  _this.$router.push({ path: '/mqAppleView' });
                } else {
                  this.$message({
                    type: 'warning',
                    message: '资源申请请求失败，请联系管理员进行处理。',
                  });
                }
                console.log(response.data);
              }).catch((error) => {
                console.log(error);
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消操作',
              });
            });
          });
        } else {
          this.$message({
            type: 'warning',
            message: '请按要求填写数据',
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    back() {
      this.$router.push({ path: '/mqAppleView' });
    },
    initData(id, value) {
      const _this = this;
      this.axios({
        url: `${this.initUrl}?id=${id}`,
        method: 'get',
        data: '',
      }).then((response) => {
        if (response.data.msgCd === 'URM00000') {
          if (value === '1') {
            // 版本赋值
            _this.versions = response.data.list;
          } else if (value === '2') {
            _this.instanceTypes = response.data.list;
          } else if (value === '3') {
            _this.mqSizes = response.data.list;
          } else if (value === '4') {
            console.log(response.data.list);
            _this.memorySpace = Number(response.data.list[0].value);
          }
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
  },
  // 界面初始化之前的加载走这儿
  created() {
    this.initData('0003', '1');
    this.initData('0007', '2');
    this.initData('0008', '3');
    this.initData('0009', '4');
  },

};
</script>

<style scoped>

</style>
