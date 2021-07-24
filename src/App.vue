<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" :value="inputValue" @change="handleInputChange" />
    <a-button type="primary" @click="addItemList">添加事项</a-button>

    <a-list bordered :dataSource="viewInfor" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" @change="checkboxState($event, item.id)" >{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="removeItem(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{total}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="viewKey === 'all'? 'primary': 'defult'" @click="chengeList('all')">全部</a-button>
          <a-button :type="viewKey === 'unfinished'? 'primary': 'defult'"  @click="chengeList('unfinished')">未完成</a-button>
          <a-button :type="viewKey === 'accomplish'? 'primary': 'defult'"  @click="chengeList('accomplish')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clearSuccess">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'app',
  data () {
    return {
    }
  },
  methods: {
    ...mapMutations(['setInputValue', 'addItem', 'removeListItem', 'editListCheckboxState', 'clearListSuccess', 'changeViewKey']),
    ...mapActions(['getList']),
    // 同步input的value值
    handleInputChange (e) {
      this.setInputValue(e.target.value)
    },
    // 添加
    addItemList () {
      // 如果输入的字符串为空 或者空格 就不执行添加操作
      if (!this.inputValue.trim()) {
        this.setInputValue('')
        this.$message.warning('输入框不能为空')
        return
      }
      this.addItem(this.inputValue)
    },
    // 移除
    removeItem (id) {
      this.removeListItem(id)
    },
    // 更改选中项
    checkboxState ($event, id) {
      this.editListCheckboxState({
        id: id,
        state: $event.target.checked
      })
    },
    // 清除已完成的
    clearSuccess () {
      this.clearListSuccess()
    },
    // 修改页面上展示的列表数据
    chengeList (key) {
      this.changeViewKey(key)
    }
  },
  computed: {
    ...mapState(['list', 'inputValue', 'viewKey']),
    ...mapGetters(['total', 'viewInfor'])
  },
  created () {
    this.getList()
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
