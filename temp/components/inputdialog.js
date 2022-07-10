const inputdialog = {
  template: `
        <div class="post input-dialog">
          <textarea class="input-content" placeholder="请输入消息" v-model="content"></textarea>
          <div class="bottom">
            <div class="buttons">
              <div class="button confirm" @click="confirm">确认</div>
              <div class="button cancel" @click="cancel">取消</div>
            </div>
          </div>
        </div>
      `,
  data() {
    return {
      content: '',
    };
  },
  methods: {
    cancel() {
      this.$emit('quxiao', '我是子组件传来的值，给我接好');
    },
    async confirm() {
      //console.log(this.textInput);
      this.$emit('queren', this.content);
    },
  },
};
