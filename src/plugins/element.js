import Vue from 'vue'
import { Button, Input, Message,MessageBox } from 'element-ui'

Vue.use(Button)
Vue.use(Input)
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm