<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>规格列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary" @click="dialogVisible = true" round
      >添加</el-button
    >
    <el-dialog
      title="新增菜单"
      :visible.sync="dialogVisible"
      width="50%"
      @open="getlist"
      @close="cz"
    >
      <el-form
        label-width="100px"
        :model="formdata"
        ref="jsform"
        :rules="rules"
      >
        <el-form-item prop="rolename" label="角色">
          <!-- 将被选中role的id,作为新增的管理员的roleid -->
          <el-select v-model="formdata.pid" placeholder="请选择">
            <el-option :key="0" :value="0" label="顶级分类"> </el-option>
            <el-option
              v-for="item in rolelist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" prop="catename">
          <el-input v-model="formdata.catename"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <!-- 上传组件主题
                action:自动上传的地址
                auto-upload: 是否自动上传
                list-type:照片墙
                on-preview:设置预览时的 回调函数
                on-remove:设置移除时的 回调函数
                on-change:设置选择上传图片时的回调函数
           -->
          <el-upload
            action="#"
            :auto-upload="false"
            list-type="picture-card"
            :on-preview="handlePreview"
            :on-change="fileChange"
            :file-list="fileList"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <!-- 放大图片设置 
            visible：显示状态
            apped-to-body:多个对话框的堆叠顺序问题
          -->
          <el-dialog :visible.sync="preVisible" append-to-body>
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
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
      <el-table-column
        label="分类名称"
        width="180"
        prop="catename"
      ></el-table-column>
      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
          <el-tag effect="dark" type="success" v-if="scope.row.status == 1"
            >启用</el-tag
          >
          <el-tag effect="dark" type="danger" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="bj(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="Delete(scope.row)"
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
      dialogVisible: false, //对话框显示
      tableData: [], //列表数据
      dialogImageUrl: "", //放大图片的地址
      preVisible: false, //放大图片对话库显示状态
      fileList: [], //上传的文件列表
      formdata: {
        pid: "",
        catename: "",
        img: "",
        status: true,
      },
      rules: {
        catename: [
          {
            required: true,
            message: "请填写分类名称",
            trigger: "blur",
          },
        ],
      },
      rolelist: [],
    };
  },
  mounted() {
    this.getspfl();
    // console.log(this.jslist);
  },
  methods: {
    getspfl() {
      this.$http.get("/api/catelist", { istree: true }).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.tableData = res.list ? res.list : [];
        }
      });
    },
    getlist() {
      this.$http.get("/api/catelist", { pid: 0 }).then((res) => {
        if (res.code == 200) {
          console.log(res);
          this.rolelist = res.list ? res.list : [];
        }
      });
    },
    cz() {
      this.formdata = {
        pid: "",
        username: "",
        password: "",
        status: true,
      };
      this.fileList = [];
    },
    Delete(row) {
      console.log(row);
      let id = row.id;
      this.$http.post("/api/catedelete", { id }).then((res) => {
        if (res.code == 200) {
          this.$message.success("您删除成功");
          this.getspfl();
        }
      });
    },
    bj(row) {
      this.dialogVisible = true;
      console.log(row);
      this.formdata = {
        ...row,
      };
      this.formdata.status = this.formdata.status == 1 ? true : false;
      this.fileList = [
        {
          name: "",
          url: "http://localhost:3000" + this.formdata.img,
        },
      ];
    },
    sbmi() {
      let url = this.formdata.id ? "/api/cateedit" : "/api/cateadd";
      this.formdata.status = this.formdata.status ? 1 : 2;
      console.log(this.formdata);
      this.$http.upload(url, this.formdata).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.$message.success("您已操作成功");
          this.dialogVisible = false;
          this.getspfl();
        }
      });
    },
    // file：选中的上传图片对象
    handlePreview(file) {
      // console.log("handlePreview")
      this.dialogImageUrl = file.url; // 设置放大图片地址
      this.preVisible = true; //显示放大框
    },
    // @file:上传文件信息对象 file.raw就是被上传的文件数据
    // @fileList: 上传文件列表
    fileChange(file, fileList) {
      console.log(file, fileList);
      this.formdata.img = file.raw;
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