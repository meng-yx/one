<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
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
        <el-form-item label="角色名称" prop="rolename">
          <el-input v-model="formdata.rolename"></el-input>
        </el-form-item>
        <!-- 通过pid 的值来判断 显示的输入框 -->
        <el-form-item label="菜单权限">
          <!-- 
                data:绑定的数组数据
                show-checkbox:是否显示选择框
                node-key:节点key 标识节点（选择时使用）

                :default-expanded-keys="[2, 3]"
                


                props:数状结构设置
                        children：数组结构子节点的数据名称
                        label:每一项的文本的属性
          -->
          <el-tree
            :data="date"
            show-checkbox
            check-strictly
            :default-checked-keys="checkedKeys"
            ref="tree"
            node-key="id"
            :props="defaultProps"
          >
          </el-tree>
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
      :data="jslist"
      style="width: 100%"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column
        label="名称"
        width="180"
        prop="rolename"
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
      jslist: [],
      dialogVisible: false,
      checkedKeys: [], //编辑时的预先选中项
      formdata: {
        rolename: "",
        menus: [],
        status: true,
      },
      rules: {
        rolename: [
          {
            required: true,
            message: "请填写角色名称",
            trigger: "blur",
          },
        ],
      },
      topcd: {},
      date: [],
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  mounted() {
    this.getjs();
    // console.log(this.jslist);
  },
  methods: {
    getjs() {
      this.$http.get("/api/rolelist").then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.jslist = res.list ? res.list : [];
        }
      });
    },
    getlist() {
      this.list();
    },
    bj(row) {
      console.log(row);
      this.dialogVisible = true;
      this.formdata = {
        ...row,
      };
      this.formdata.status = this.formdata.status == 1 ? true : false;
      this.formdata.menus = row.menus ? row.menus.split(",") : [];
      this.checkedKeys = row.menus ? row.menus.split(",") : [];
      console.log(this.formdata.menus);
    },
    Delete(row) {
      console.log(row);
      this.$http.post("/api/roledelete", { id: row.id }).then((res) => {
        if (res.code == 200) {
          this.$message.success("您删除成功");
          this.getjs();
        }
      });
    },
    cz() {
      this.formdata= {
        rolename: "",
        menus: [],
        status: true,
      }
    },
    sbmi() {
      console.log(this.$refs.tree.getCheckedKeys());

      // 被选中项的id构成的数组
      this.formdata.menus = this.$refs.tree.getCheckedKeys().join(",");
      let url = this.formdata.id ? "/api/roleedit" : "/api/roleadd";
      this.formdata.status = this.formdata.status ? 1 : 2;
      console.log(this.formdata);
      this.$http.post(url, this.formdata).then((res) => {
        if (res.code == 200) {
          this.$message.success("您已操作成功");
          this.dialogVisible = false;
          this.getjs();
        }
      });
    },
    list() {
      this.$http.get("/api/menulist", { istree: true }).then((res) => {
        // console.log(res);
        this.date = res.list ? res.list : [];
      });
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