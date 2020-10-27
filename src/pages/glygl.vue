<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
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
          <el-select v-model="formdata.roleid" placeholder="请选择">
            <el-option
              v-for="item in rolelist"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formdata.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formdata.password"></el-input>
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
        label="用户编号"
        width="180"
        prop="uid"
      ></el-table-column>
      <el-table-column
        label="角色"
        width="180"
        prop="rolename"
      ></el-table-column>
      <el-table-column
        label="用户名"
        width="180"
        prop="username"
      ></el-table-column>
      <!-- 当前列的数据，
            scope：代表包含每一行的数据对象
            row:行
      -->
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
    <!-- 分页器 
            background:设置背景
            layout:布局
            total:总条数
            page-size:每一页数据量
            current-change:当前页面发生变化触发的事件
            current-page:当前的页数
    -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="pageChange"
      :current-page="page"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      size: 2,
      total: 0,
      page: 1,
      dialogVisible: false,
      tableData: [],
      formdata: {
        roleid: "",
        username: "",
        password: "",
        status: true,
      },
      rules: {
        username: [
          {
            required: true,
            message: "请填写用户名称",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请填写角色密码",
            trigger: "blur",
          },
        ],
      },
      rolelist: [],
    };
  },
  mounted() {
    this.getgly();
    // console.log(this.jslist);
  },
  methods: {
    getgly() {
      this.$http.get("/api/usercount").then((res) => {
        if (res.code == 200) {
          this.total = res.list[0].total;
        }
      });
      this.$http
        .get("/api/userlist", { size: this.size, page: this.page })
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.tableData = res.list ? res.list : [];
          }
        });
    },
    getlist() {
      this.$http.get("/api/rolelist").then((res) => {
        if (res.code == 200) {
          // console.log(res);
          this.rolelist = res.list ? res.list : [];
        }
      });
    },
    cz() {
      this.formdata = {
        roleid: "",
        username: "",
        password: "",
        status: true,
      };
    },
    Delete(row) {
      // console.log(row);
      let id = row.id;
      this.$http.post("/api/userdelete", { id }).then((res) => {
        if (res.code == 200) {
          this.page = 1;
          this.$message.success("您删除成功");
          this.getgly();
        }
      });
    },
    bj(row) {
      this.dialogVisible = true;
      this.formdata = {
        ...row,
      };
      this.formdata.status = this.formdata.status == 1 ? true : false;
    },
    sbmi() {
      let url = this.formdata.id ? "/api/useredit" : "/api/useradd";
      this.formdata.status = this.formdata.status ? 1 : 2;
      console.log(this.formdata);
      console.log(url);
      this.$http.post(url, this.formdata).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.$message.success("您已操作成功");
          this.dialogVisible = false;
          this.getgly();
        }
      });
    },
    pageChange(page) {
      //   console.log(page);
      this.page = page;
      this.getgly();
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