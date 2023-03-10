<template>
  <form action="/dist/index.html" method="">
    <div class="groupForm">
      <i class="far fa-envelope"></i>
      <input
        type="email"
        name="email"
        placeholder="E-mail"
        v-model="email"
        required
      />
    </div>
    <div class="groupForm">
      <i class="far fa-key"></i>
      <input
        :type="typePassword"
        name="password"
        placeholder="Senha"
        v-model="password"
        required
      />
      <i class="far fa-eye buttom" @click.prevent="toggleTypePassword"></i>
    </div>
    <button
      :class="['btn', 'primary', loading ? 'loading' : '']"
      type="submit"
      @click.prevent="resetPassword"
    >
      <span v-if="loading">Alterando...</span>
      <span v-else>Mudar Senha</span>
    </button>
  </form>
</template>

<script>
import { ref } from "vue";
import { notify } from "@kyvg/vue3-notification"
import router from "@/router";

import ResetPasswordService from "@/services/password.reset.service";

export default {
  name: "ResetPassword",
  props: {
    token: {
      require: true,
    },
  },

  setup(props) {
    const email = ref("");
    const password = ref("");
    const loading = ref(false);

    const typePassword = ref('password')

    const toggleTypePassword = () => typePassword.value = typePassword.value === 'password' ? 'text' : 'password'

    const resetPassword = () => {
      loading.value = true;

      ResetPasswordService.reset({
        email: email.value,
        password: password.value,
        token: props.token,
      })
        .then(() => {
          notify({
                title: "Sucesso",
                text: "Senha atualizada com sucesso",
             })

            router.push({ name: "auth" })
        })
        .catch(() =>  notify({
                title: "Falha",
                text: "Falha ao alterar senha",
                type: "warn"
             }))
        .finally(() => (loading.value = false));
    };

    return {
      email,
      loading,
      password,
      resetPassword,
      typePassword,
      toggleTypePassword
    };
  },
};
</script>