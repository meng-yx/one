<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>菜单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary" @click="dialogVisible = true" round
      >添加</el-button
    >
    <el-dialog
      title="新增菜单"
      :visible.sync="dialogVisible"
      width="50%"
      @open="gettop"
      @close='cz'
    >
      <el-form label-width="100px" :model="formdata" ref="menuform" :rules="rules">
        <!-- lebel:表单域文本 -->
        <el-form-item label="菜单名称">
          <!-- {{formdata.pid}} -->
          <el-select v-model="formdata.pid" placeholder="请选择" @change="cfn">
            <!-- key:标识
                label:选择项的文本
                value:当前项被选中的value (v-model绑定的值变成选中项的value)
            -->

            <el-option :key="0" label="顶级菜单" :value="0" prop='ppid'></el-option>
            <el-option
              v-for="item in topcd"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单名称" prop="title">
          <el-input v-model="formdata.title"></el-input>
        </el-form-item>
        <!-- 通过pid 的值来判断 显示的输入框 -->
        <el-form-item label="菜单图标" v-if="formdata.pid == 0">
          <el-input v-model="formdata.icon"></el-input>
        </el-form-item>
        <el-form-item label="菜单地址" v-else>
          <el-input v-model="formdata.url"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio
            v-model="formdata.type"
            :disabled="formdata.type !== 1"
            :label="1"
            >目录</el-radio
          >
          <el-radio
            v-model="formdata.type"
            :disabled="formdata.type === 1"
            :label="2"
            >菜单</el-radio
          >
        </el-form-item>
        <el-form-item label="状态">
          <!-- <p>{{formdata.status}}</p> -->
          <el-switch v-model="formdata.status"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sbmi">提交</el-button>
      </span>
    </el-dialog>
    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column label="名称" width="180" prop="title"></el-table-column>
      <el-table-column label="图标" width="180">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <!-- 当前列的数据，
            scope：代表包含每一行的数据对象
            row:行
      -->
      <el-table-column label="类型" width="180">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type === 1">目录</el-tag>
          <el-tag v-else-if="scope.row.type === 2" type="success">菜单</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="菜单URL" width="180" prop="url"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="bj(scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="Delete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],//渲染页面的数据
      formdata: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: true,
      },
      dialogVisible: false, //对话框显示状态,
      topcd: [],
      rules:{
          title:[{
            required:true,
            message:'请填写名称',
            tirgger:"blur",
          },],
          ppid:[{
            required:true,
            message:'请做好选择',
            tirgger:"blur"
          }]
      }
    };
  },
  mounted() {
    this.getcd();
  },
  methods: {
    Delete(row){
      console.log(row.id);
      this.$http.post('/api/menudelete',this.$qs.stringify({ id:row.id })).then(res=>{
        console.log(res);
        if(res.code == 200){
          this.tableData = res.list ? res.list : [];
          this.$message.success(res.msg)
        }
      })
    },
    bj(row){
      console.log(row);
      this.dialogVisible = true;
      this.formdata={
        ...row
      }
      this.formdata.status = this.formdata.status==1? true:false;
    },
    sbmi(){
      //根据是否存在id来判断进行新增还是编辑操作
      let url = this.formdata.id? "/api/menuedit":'/api/menuadd';
      this.formdata.status = this.formdata.status?1:2;
      this.$http.post(url,this.formdata).then(res=>{
        if(res.code == 200){
          this.getcd();
          this.$message.success("您已操作成功");
          this.dialogVisible = false;
        }
      })
    },
    cfn(pid){
      this.formdata.type = pid>0? 2:1 ;
    },
    getcd() {
      this.$http.get("/api/menulist", { istree: true }).then((res) => {
        // console.log(res);
        if (res.code == 200) {
          this.tableData = res.list ? res.list : [];
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    gettop() {
      this.$http.get("/api/menulist", { pid: 0 }).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.topcd = res.list ? res.list : [];
        }
      });
    },
    cz() {
      this.formdata = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: true,
      };
    },
  },
};
</script>
<style lang="less">
.el-breadcrumb {
  margin-bottom: 20px;
}
.el-table {
  margin-top: 20px;
}
</style>