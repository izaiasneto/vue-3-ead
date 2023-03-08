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
      @click.prevent="forgetPassword"
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
export default {
  name: "ForgetPassword",
};
</script>