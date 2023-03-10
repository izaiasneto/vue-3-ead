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
    <button
      :class="['btn', 'primary', loading ? 'loading' : '']"
      type="submit"
      @click.prevent="forgotPassword"
    >
      <span v-if="loading">Recuperando...</span>
      <span v-else>Recuperar Senha</span>
    </button>
  </form>
  <span>
    <p class="fontSmall">
      Acessar?
      <router-link :to="{ name: 'auth' }" class="link primary"
        >Clique aqui</router-link
      >
    </p>
  </span>
</template>

<script>
import { ref } from 'vue'
import { notify } from "@kyvg/vue3-notification"
import { useStore } from 'vuex'

export default {
  name: "ForgotPassword",
  setup() {
    const store = useStore()
    const email = ref("")
    const loading = ref(false)

    const forgotPassword = () => {
        loading.value = true

        store
            .dispatch('forgotPassword', {email: email.value})
            .then(() => notify({
                title: "Sucesso",
                text: "Confira o seu e-mail",
             }))
            .catch(() =>  notify({
                title: "Falha",
                text: "Falha ao recuperar o usuário",
                type: "warn"
             }))
            .finally(() => loading.value = false)
    }

    return {
      email,
      loading,
      forgotPassword,
      
    }
  }
};
</script>