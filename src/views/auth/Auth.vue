<template>
  <form action="/dist/index.html" method="">
    <div class="groupForm">
      <i class="far fa-envelope"></i>
      <input type="email" name="email" placeholder="Email" required />
    </div>
    <div class="groupForm">
      <i class="far fa-key"></i>
      <input type="password" name="password" placeholder="Senha" required />
      <i class="far fa-eye buttom"></i>
    </div>
    <button class="btn primary" type="submit" @click.prevent="auth">Login</button>
  </form>
  <span>
    <p class="fontSmall">
      Esqueceu sua senha?
      <router-link :to="{ name: 'forget.password' }" class="link primary"
        >Clique aqui</router-link
      >
    </p>
  </span>
</template>

<script>
//import router from '@/router'
import { useStore } from 'vuex'

export default {
  name: "Auth",
  setup() {
    const store = useStore()

    const auth = () => {
      store.dispatch('auth', {
          email: 'izaiasmneto@gmail.com',
          password: '123456',
          device_name: 'authbyvue3'
      })
    }

    return {
      auth
    }
  }
};
</script>