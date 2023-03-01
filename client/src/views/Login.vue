<script setup>
    import { useRouter, useRoute } from 'vue-router'
    import axios from 'axios'
    import { ref, onMounted } from "vue"
    import router from '../router';
    const email = ref('')
    const password = ref('')
    const error = ref('')
    async function Login() {
        let user = {
            email: email.value,
            password: password.value
        }
        await axios.post('https://todo-app-mevn.onrender.com/login', user)
            .then( res => {
                if (res.status === 200) {
                    localStorage.setItem('token', res.data.token)
                }
                router.push('/home')
            }, err => {
                error.value = err.response.data.error
            })
    }
    onMounted( () => {
        if (localStorage.getItem('token') !== null) {
            router.push('/home')
        }
    })
    function togglePassword() {
        var element = document.getElementById('password');
        var eye = document.getElementById('eye');
        element.type = (element.type == 'password' ? 'text' : 'password');
        if (element.type === 'password') {
            eye.setAttribute('class', 'bi bi-eye-fill')
        }
        else {
            eye.setAttribute('class', 'bi bi-eye-slash-fill')
        }
    }
</script>


<template>            
    <div class="login">
        <h1>Login</h1>
        <label for="email">E-mail</label>
        <div class="input-group mb-3">
            <span class="input-group-text">@</span>
            <input type="email" v-model="email" id="email" class="form-control" aria-label="Password" placeholder="Enter your e-mail adress">
        </div>
        <label for="password">Password</label>
        <div class="input-group mb-3">
            <span class="input-group-text">
                <i class="bi bi-key-fill"></i>
            </span>
            <input type="password" id="password" v-model="password" class="form-control" aria-label="Password" placeholder="Enter your password">
            <span  class="input-group-text" @click="togglePassword()">
                <i id="eye" class="bi bi-eye-fill"></i>
            </span>
        </div>
        <p class="error">{{ error }}</p>
        <div class="buttons">
            <button class="btn btn-primary" @click="Login()" :disabled="password.length <= 8">LOGIN</button>
            <div>
                <a href="/forgotpassword">Forgot password?</a>
            </div>
        </div>
        <br>
        <a href="/signup" id="signup" class="btn btn-dark">SIGN UP</a>
    </div>      
</template>

<style scoped lang="scss">
    @import '../../public/Login.scss'
</style>