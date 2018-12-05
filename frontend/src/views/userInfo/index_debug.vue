<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="user_img" >
          <img v-if="newImageUrl" :src="newImageUrl" alt="用户头像" >
          <img v-else :src="personalInfo.avatar" alt="用户头像" >
          <el-upload :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/">
            <!--  <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
            <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
            <button type="button" class="el-button filter-item el-button--primary" style="margin-top:10px">
              <i class="fa fa-cloud-upload" aria-hidden="true"/>
              <span>上传头像</span>
            </button>
          </el-upload>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="user_info">
          <h2>
            个人信息
            <el-button v-if="!editable" size="small" style="float:right;" icon="edit" @click="editable=true">编辑</el-button>
          </h2>
          <div v-if="editable" class="user_info_form">
            <el-form :model="personalInfo" label-position="right" label-width="100px">
              <el-form-item label="域账号">
                <el-input v-model="personalInfo.username" disabled=""/>
              </el-form-item>
              <el-form-item label="真实姓名">
                <el-input v-model="personalInfo.truename"/>
              </el-form-item>
              <el-form-item label="性别">
                <el-radio-group v-model="personalInfo.sex">
                  <el-radio label="male">男</el-radio>
                  <el-radio label="female">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="邮件地址" >
                <el-input v-model="personalInfo.email" disabled=""/>
              </el-form-item>
              <el-form-item label="个人简介">
                <el-input v-model="personalInfo.introduction" type="textarea"/>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm()">提交</el-button>
                <el-button @click="resetForm()">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div v-else class="user_info_text">
            <el-form :model="personalInfo" label-position="right" label-width="100px">
              <el-form-item label="域账号：">
                {{ personalInfo.username }}
              </el-form-item>
              <el-form-item label="真实姓名：">
                {{ personalInfo.truename }}
              </el-form-item>
              <el-form-item label="性别：">
                <span v-if="personalInfo.sex == 'female'">女</span>
                <span v-else>男</span>
              </el-form-item>
              <el-form-item label="邮件地址：">
                {{ personalInfo.email }}
              </el-form-item>
              <el-form-item label="个人简介：">
                {{ personalInfo.introduction }}
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top:20px;">
      <el-col :span="8">
        <div id="income"/>
      </el-col>
      <el-col :span="12">
        <div id="interest"/>
      </el-col>
    </el-row>

    <div style="margin-top:30px;">
      <code>In some cases it is not suitable to use v-permission, such as element Tab component  which can only be achieved by manually setting the v-if.
        <br> e.g.
      </code>
      <el-tabs type="border-card" style="width:500px;">
        <el-tab-pane v-if="checkPermission(['guster'])" label="Guster">Guster can see this</el-tab-pane>
        <el-tab-pane v-if="checkPermission(['reporter'])" label="Reporter">Reporter can see this</el-tab-pane>
        <el-tab-pane v-if="checkPermission(['developer'])" label="Developer">Developer can see this</el-tab-pane>
        <el-tab-pane v-if="checkPermission(['master'])" label="Master">Master can see this</el-tab-pane>
        <el-tab-pane v-if="checkPermission(['guster','master'])" label="Guster-OR-Master">Both guster or master can see this</el-tab-pane>
      </el-tabs>
    </div>
    <div style="margin-top:30px;">
      <code>Console test case
        <br> e.g.
      </code>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import checkPermission from '@/utils/permission' // 权限判断函数
var echarts = require('echarts')

export default {
  data() {
    return {
      editable: false,
      personalInfo: {},
      newImageUrl: require('@/assets/images/profile_photos/male_1.jpg')
      // personalInfo_init:store.getters.userInfo
    }
  },
  computed: {
    ...mapGetters({
      // 映射 this.personalInfo_init 为 store.getters.userInfo
      personalInfo_init: 'userInfo'
    })
  },
  mounted() {
    var vm = this
    vm.resetForm()

    // 基于准备好的dom，初始化echarts实例
    var myChart1 = echarts.init(document.getElementById('income'))
    var myChart2 = echarts.init(document.getElementById('interest'))
    // 绘制收入图表
    myChart1.setOption({
      title: { text: '最近收入' },
      tooltip: {},
      xAxis: {
        data: ['3月', '4月', '5月', '6月', '7月', '8月']
      },
      yAxis: {},
      series: [{
        name: '收入',
        type: 'bar',
        data: [800, 1200, 1360, 1100, 1100, 1800]
      }]
    })
    // 绘制兴趣图表
    myChart2.setOption({
      title: { text: '兴趣爱好' },
      series: [
        {
          name: '兴趣',
          type: 'pie',
          radius: '55%',
          data: [
            { value: 500, name: '吃饭' },
            { value: 250, name: '睡觉' },
            { value: 100, name: '打豆豆' },
            { value: 100, name: '看电影' },
            { value: 50, name: '其他' }
          ]
        }
      ]
    })
  },
  methods: {
    // 提交表单
    submitForm() {
      var vm = this
      vm.editable = false
      var par = {
        'username': vm.personalInfo.username,
        'truename': vm.personalInfo.truename,
        'sex': vm.personalInfo.sex,
        'email': vm.personalInfo.email,
        'introduction': vm.personalInfo.introduction
      }
      console.log('修改信息入参为：', par)
    },
    // 重置表单
    resetForm() {
      var vm = this
      vm.editable = false
      vm.personalInfo = JSON.parse(JSON.stringify(vm.personalInfo_init))
    },
    // 上传头像
    uploadAvatar() {
      alert('稍后补上')
    },

    handleAvatarSuccess(res, file) {
      this.newImageUrl = URL.createObjectURL(file.raw)
      alert('修改头像成功')
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    checkPermission
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.user_img{
  /*width: 80%;*/
  padding: 20px;
  text-align: center;
  border: 1px solid #dee1e2;
  img{
    max-width: 200px;
    max-height: 200px;
    border-radius: 50%;
  }
}
.user_info{
  /*padding-bottom: 20px;*/
  border: 1px solid #dee1e2;
  h2{
    margin: 0;
    font-weight: normal;
    padding: 10px 20px;
    border-bottom: 1px solid #dee1e2;
    .i_edit{
      float: right;
      font-size: 16px;
      color: #7ab8ed;
    }
  }
}
.user_info_form,.user_info_text{
  padding: 20px;
}
#income,#interest{
  width: 100%;
  height: 400px;
}

.el-form-item{
  margin-bottom: 0;
}
.avatar-uploader{
  margin-bottom: 32px;
}
</style>
