<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

    <el-form-item label="版本号" prop="version">
      <el-radio-group v-model="ruleForm.version" size="medium" @change="onRadioChange">
          <el-radio-button :label="item.id" :key="item.id" v-for="item in versions">{{item.value}}</el-radio-button>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="架构类型" prop="type">
      <el-radio-group v-model="ruleForm.type" size="medium" @change="onRadioChange">
        <el-radio-button :label="item.id" :key="item.id" v-for="item in types">{{item.value}}</el-radio-button>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="从节点数量" prop="count" style="width: 30%">
      <el-slider
        v-model="ruleForm.count"
        :max="counts"
        :step="1"
        show-input="">
      </el-slider>
    </el-form-item>

    <el-form-item label="单节点内存" prop="memorySize" style="width: 30%">
      <el-slider
        v-model="ruleForm.memorySize"
        :max="memorySizes"
        :step="1"
        show-input="">
      </el-slider>
    </el-form-item>

    <el-form-item label="实例名称" prop="instanceName" style="width: 300px">
      <el-input v-model="ruleForm.instanceName" size="small"></el-input>
    </el-form-item>

    <el-form-item label="描述" prop="description" style="width: 600px">
      <el-input type="textarea" v-model="ruleForm.description"></el-input>
    </el-form-item>

    <el-form-item label="密码设置" prop="redisPassword" style="width: 300px">
      <el-input v-model="ruleForm.redisPassword"></el-input>
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
  name: 'RedisAddView',
  data() {
    return {
      redisAppleUrl: '/api/apply/applyRedis',
      initUrl: '/api/apply/diclist',
      versions: [],
      types: [],
      counts: 0,
      memorySizes: 0,
      ruleForm: {
        version: '',
        type: '',
        count: '',
        memorySize: '',
        mqSize: '',
        instanceName: '',
        redisPassword: '',
        description: '',
      },
      rules: {
        count: [
          { required: true, message: '请选择从节点数量', trigger: 'change' },
        ],
        description: [
          { required: true, message: '描述不能为空', trigger: 'change' },
        ],
        version: [
          { required: true, message: '请选择版本号', trigger: 'change' },
        ],
        instanceName: [
          { required: true, message: '实例名称不能为空', trigger: 'change' },
        ],
        memorySize: [
          { required: true, message: '请选择单节点内存', trigger: 'change' },
        ],
        type: [
          { required: true, message: '请选择架构类型', trigger: 'change' },
        ],
        mqSize: [
          { required: true, message: '请选择规格', trigger: 'change' },
        ],
        redisPassword: [
          { required: true, message: '密码不能为空', trigger: 'change' },
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
              params.append('version', this.ruleForm.version);
              params.append('type', this.ruleForm.type);
              params.append('count', this.ruleForm.count);
              params.append('memorySize', this.ruleForm.memorySize);
              params.append('mqSize', this.ruleForm.mqSize);
              params.append('instanceName', this.ruleForm.instanceName);
              params.append('redisPassword', this.ruleForm.redisPassword);
              params.append('description', this.ruleForm.description);

              _this.axios({
                url: this.redisAppleUrl,
                method: 'post',
                data: params,
              }).then((response) => {
                // 请求之后的逻辑
                if (response.data.msgCd === 'URM00000') {
                  _this.$message({
                    type: 'success',
                    message: '申请成功，请等待管理员审批!',
                  });
                  _this.$router.push({ path: '/redisAppleView' });
                } else {
                  _this.$message({
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
      this.$router.push({ path: '/redisAppleView' });
    },
    onRadioChange(item) {
      console.log('item', item);
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
            _this.types = response.data.list;
          } else if (value === '3') {
            _this.counts = Number(response.data.list[0].value);
          } else if (value === '4') {
            _this.memorySizes = Number(response.data.list[0].value);
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
  created() {
    this.initData('0001', '1');
    this.initData('0002', '2');
    this.initData('0006', '3');
    this.initData('0005', '4');
  },
};
</script>

<style scoped>

</style>
