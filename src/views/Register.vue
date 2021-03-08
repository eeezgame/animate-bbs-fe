<template>
  <div class="mt-8 mx-auto bg-miku-1100" style="width:600px;">
    <div class="px-4 py-2 ">
      <form ref="form" class="space-y-4" @submit.prevent="onSubmit">
        <h2 class=" text-3xl font-bold text-center">注册用户</h2>
        <t-input-group label="用户昵称:" feedback="">
          <t-input variant="" v-model="form.name" type="text" required />
        </t-input-group>
        <t-input-group label="电子邮箱:" feedback="">
          <t-input variant="" v-model="form.email" type="email" required />
        </t-input-group>
        <t-input-group
          label="手机号码:"
          :variant="formState.phone.variant"
          :feedback="formState.phone.feedback"
        >
          <t-input
            v-model="form.phone"
            :variant="formState.phone.variant"
            type="text"
            required
          />
        </t-input-group>
        <t-input-group label="用户密码:" feedback="">
          <t-input
            variant=""
            v-model="form.password"
            type="password"
            required
          />
        </t-input-group>
        <button
          class="w-full px-2 py-1 bg-miku-700 text-gray-100 font-bold rounded hover:bg-miku-500 "
        >
          注册并登录
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { addUser } from "@/api/user-manage";
const defalutForm = {
  //   avatar: "",
  email: "",
  name: "",
  password: "",
  phone: ""
};
const rules = {
  phone: {
    pattern: /^(?:(?:\+|00)86)?1\d{10}$/
  }
};
const defalutFormState = {
  phone: {
    variant: "",
    feedback: ""
  }
};
export default {
  name: "Register",
  data() {
    return {
      form: defalutForm,
      formState: defalutFormState
    };
  },
  methods: {
    onSubmit() {
      let result = true;
      if (!rules.phone.pattern.test(this.form.phone)) {
        result = false;
        this.formState.phone = Object.assign({}, this.formState.phone, {
          variant: "error",
          feedback: "请输入正确的手机号码"
        });
      }
      /*  Object.keys(this.form).forEach(key => {
        if (rules[key]) {
          if (rules[key].pattern) {
            if (!rules[key].pattern.test(this.form[key])) {
              result = false;
            }
          }
        }
      }); */
      result &&
        addUser(this.form).then(res => {
          console.log(res, "res");
          //   this.resetForm();
        });
    },
    resetForm() {
      this.form = defalutForm;
      this.formState = defalutForm;
    }
  }
};
</script>
