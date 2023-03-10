<template>
  <form action="/dist/index.html" method="">
    <div class="groupForm">
      <i class="far fa-envelope"></i>
      <input type="email" name="email" placeholder="E-mail" v-model="email" required />
    </div>
    <div class="groupForm">
      <i class="far fa-key"></i>
      <input :type="typePassword" name="password" placeholder="Senha" v-model="password" required />
      <i class="far fa-eye buttom" @click.prevent="toggleTypePassword"></i>
    </div>
    <button 
      :class="[
          'btn',
          'primary',
          loading ? 'loading' : ''
      ]" 
      type="submit" 
      @click.prevent="auth">
        <span v-if="loading">Enviando...</span>
        <span v-else>Login</span>
    </button>
  </form>
  <span>
    <p class="fontSmall">
      Esqueceu sua senha?
      <router-link :to="{ name: 'forgot.password' }" class="link primary"
        >Clique aqui</router-link
      >
    </p>
  </span>
</template>

<script>
import { ref } from 'vue'
import { notify } from "@kyvg/vue3-notification"
import { useStore } from 'vuex'

import router from '@/router';

export default {
  name: "Auth",
  setup() {
    const store = useStore()
    const email = ref("")
    const password = ref("")
    const loading = ref(false)

    const typePassword = ref('password')
    const toggleTypePassword = () => typePassword.value = typePassword.value === 'password' ? 'text' : 'password'

    const auth = () => {
      loading.value = true

      store.dispatch('auth', {
          email: email.value,
          password: password.value,
          device_name: 'vue3_web'
      })
      .then(() => router.push({name: 'campus.home'}))
      .catch(error => {
          let msgError = "Falha na requisição"

          if(error.status === 422) msgError = 'Dados Inválidos'
          if(error.status === 404) msgError = 'usuário não encontrado'

          notify({
            title: "Falha ao autenticar",
            text: msgError,
            type: "warn"
          });
      })
      .finally(() => loading.value = false)
    }

    return {
      auth,
      email,
      password,
      loading,
      typePassword,
      toggleTypePassword
    }
  }
};
</script>