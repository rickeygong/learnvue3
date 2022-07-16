const Message = {
  props: ['content', 'publishTime', 'postId'],
  template: `
        <div class="post" v-if="isExist">
            <textarea v-if="isEdit" class="input-content" placeholder="请输入消息" v-model="selfContent"></textarea>
          <div v-else class="content">{{selfContent}}</div>
          <div class="bottom">
            <div class="time">{{formatTime(publishTime)}}</div>
            <div class="buttons">
              <div v-if="isEdit" class="button edit" @click="confirm">确认</div>
              <div v-else class="button edit" @click="edit">编辑</div>
              <div v-if="isEdit" class="button cancel" @click="cancel" >取消</div>
              <div v-else class="button delete" @click="remove" >删除</div>
            </div>
          </div>
        </div>
        `,
  data() {
    return {
      isExist: true,
      //是否为编辑状态
      isEdit: false,
      //内容
      selfContent: this.content,
    };
  },
  methods: {
    formatTime(timestamp) {
      //时间戳转换
      const time = new Date(timestamp * 1000);
      return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}`;
    },
    edit() {
      //切换到编辑状态
      this.isEdit = !this.isEdit;
    },
    async confirm() {
      await this.updatePost(this.postId, this.selfContent);
      //取消编辑状态
      this.edit();
      await this.$emit('updatepageaaa', '我是message组件的confirm()，我来了');
    },
    cancel() {
      this.edit();
      this.selfContent = this.content;
    },
    updatePost(postid, content) {
      // if (content.length <= 0) {
      //   alert('更新的消息不能为空!');
      //   return;
      // }
      let data = {
        content: content,
      };

      return fetch(`https://3yya.com/u/459b08af9653804b/rest/app/posts/${postid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    },
    async remove() {
      await this.deletePost(this.postId);
      //   this.isExist = false;
      //   await this.refresh();
      this.$emit('updatepage', '我是message组件的remove()，我来了');
    },
    deletePost(id) {
      return fetch(`https://3yya.com/u/459b08af9653804b/rest/app/posts/${id}`, {
        method: 'DELETE',
      });
    },
  },
};
