<template>
  <div style="background-color: #31708f" class="custom-tree-container hello">
    <div class="block">
      <p>使用 render-content</p>
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="true"
        :render-content="renderContent"
      >
      </el-tree>
    </div>
    <div class="block">
      <p>使用 scoped slot</p>
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="true">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => append(data)">
            Append
          </el-button>
          <el-button
            class="btn btn-info ztree-node-span tree-span-edit"
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            <span class="glyphicon glyphicon-edit"></span>
          </el-button>
          <span class="btn btn-info ztree-node-span tree-span-edit" @click="put()" style="margin-left: 10px;" data-toggle="popover" data-trigger="hover" data-html="true" data-content="<span class='span-tip'>编辑</span>" data-placement="bottom">
            <span class="glyphicon glyphicon-edit"></span>
          </span>
          <span class="btn btn-primary ztree-node-span tree-span-plus" data-toggle="popover" data-trigger="hover" data-html="true" data-content="<span class='span-tip'>添加</span>" data-placement="bottom">
            <span class="glyphicon glyphicon-plus"></span>
          </span>
          <span class="btn btn-warning ztree-node-span tree-span-delete-part" data-toggle="popover" data-trigger="hover" data-html="true" data-content="<span class='span-tip'>删除已选子分类</span>" data-placement="bottom">
            <span class="glyphicon glyphicon-minus"></span>
          </span>
          <span class="btn label-danger ztree-node-span tree-span-delete-all" style="color: #fff; " data-toggle="popover" data-trigger="hover" data-html="true" data-content="<span class='span-tip'>删除</span>" data-placement="bottom">
            <span class="glyphicon glyphicon-trash"></span>
          </span>
        </span>
      </span>
      </el-tree>
    </div>
  </div>
</template>

  <script>
    let id = 1000;

    export default {
      data() {
        const data = [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }];
        return {
          data: JSON.parse(JSON.stringify(data)),
          data: JSON.parse(JSON.stringify(data))
        }
      },

      methods: {
        append(data) {
          const newChild = { id: id++, label: 'testtest', children: [] };
          if (!data.children) {
            this.$set(data, 'children', []);
          }
          data.children.push(newChild);
        },

        remove(node, data) {
          const parent = node.parent;
          const children = parent.data.children || parent.data;
          const index = children.findIndex(d => d.id === data.id);
          children.splice(index, 1);
        },

        renderContent(h, { node, data, store }) {
          return (
            <span class="custom-tree-node">
            <span>{node.label}</span>
          <span>
          <el-button size="mini" type="text" on-click={ () => this.append(data) }>Append</el-button>
          <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
          </span>
          </span>);
        }
      }
    };
  </script>

  <style>
    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
    }
    .hello{
      position: absolute;
      width: 500px;
      left: 280px;
    }
  </style>
