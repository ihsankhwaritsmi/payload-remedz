<template>
    <div class="card position-absolute top-50 start-50 translate-middle" style="width: 50rem;">
        <div class="vue-template m-5">
        <form v-on:submit.prevent="handleLogin">
            <h3>Sign In</h3>
            <div class="mb-3">
                <label>Email address</label>
                <input type="email" class="form-control form-control-lg" v-model="email" required />
            </div>
            <div class="mb-3">
                <label>Password</label>
                <input type="password" class="form-control form-control-lg" v-model="password" required />
            </div>
           
            <button type="submit" class="btn btn-dark btn-lg btn-block">Sign In</button>
        </form>
    </div>
    </div>
    
 </template>
 
 <script>

 import { ref } from 'vue';
 export default {
     name: 'LoginView',
     data() {
         return {
            email : ref(''),
            password :ref('')
         }
     },
     methods: {
       async handleLogin () {
     try {
         const res = await fetch('http://localhost:3100/api/accounts/login', {
            credentials: 'include',
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify({
                 email: this.email,
                 password: this.password
             })
         });
 
         if (!res.ok) {
             const errorMsg = (await res.json())?.errors[0]?.message;
             throw new Error(errorMsg || 'Unknown error');
         } 
 
         const user = await res.json();
         console.log(user);
         if(res.ok){
            this.$router.push( "/channel" );
         }
     } catch (err) {
         alert("Login error: " + err.message);
     }
 }
     }
 }
 </script>
 