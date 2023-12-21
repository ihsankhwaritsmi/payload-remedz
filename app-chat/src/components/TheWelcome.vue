<script setup>

</script>

<template>
    <div class="vue-template">
      <form @submit.prevent="login">
        <h3>Sign In</h3>
        <div class="form-group">
          <label>Email address</label>
          <input type="email" class="form-control form-control-lg" v-model="email" />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" class="form-control form-control-lg" v-model="password" />
        </div>
        <button type="submit" class="btn btn-dark btn-lg btn-block">Sign In</button>
      </form>
    </div>
  
</template>
