<script setup>
    import { useRouter, useRoute } from 'vue-router'
    import axios from 'axios'
    import { ref, onMounted } from "vue"
    import router from '../router';
    const email = ref('')
    const password = ref('')
    const fullName = ref('')
    const error = ref('')
    var popup = document.getElementById('popup')
    var validRegexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/
    var validRegexPassword = /^(?=.*\d)(?=.*[.!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/
    async function Sign() {
        let user = {
            fullName: fullName.value,
            email: email.value,
            password: password.value
        }
        if (validRegexEmail.test(email.value)) {
            if (validRegexPassword.test(password.value)) {
                await axios.post('http://localhost:2020/signup', user)
                .then( res => {
                    if (res.status === 200) {
                        function pushing() {
                            router.push('/')
                        }
                        document.getElementById('popup').setAttribute('class', 'popup')
                        setTimeout(pushing, 7500);
                    }
                    //router.push('/home')
                }, err => {
                    error.value = err.response.data.error
                })
            } else {
                error.value = 'Invalid password'
            }
        } else {
            error.value = 'Invalid email'
        }
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
    <div class="sign">
        <h1>Signup</h1>
        <label for="fullName">Full Name</label>
        <div class="input-group mb-3">
            <span class="input-group-text">
                <i class="bi bi-person-fill"></i>
            </span>
            <input type="text" required v-model="fullName" id="fullName" class="form-control" aria-label="Password" placeholder="e.g. John Die">
        </div>
        <label for="email">E-mail</label>
        <div class="input-group mb-3">
            <span class="input-group-text">@</span>
            <input type="email" required v-model="email" id="email" class="form-control" aria-label="Password" placeholder="e.g. johndie@mail.com">
        </div>
        <label for="password">Password</label>
        <div class="input-group mb-3">
            <span class="input-group-text">
                <i class="bi bi-key-fill"></i>
            </span>
            <input type="password" required id="password" v-model="password" class="form-control" aria-label="Password" placeholder="Enter your password">
            <span  class="input-group-text" @click="togglePassword()">
                <i id="eye" class="bi bi-eye-fill"></i>
            </span>
        </div>
        <p class="error">{{ error }}</p>
        <button id="signup" class="btn btn-success" @click="Sign()" :disabled="password.length <=8">SIGN UP</button>
        <br><br>
        <a class="login" href="/">
            <p>You have account?</p>
        </a>
    </div>  
    <!-- Modal -->
    <div class="popup-none" id="popup">
        <div class="head">
            <h1>
                Success
                <i class="bi bi-check-circle"></i>
            </h1>
        </div>
        <div class="content">
            <p>Your register process is successful. You are redirected to the login page...</p>
        </div>
        <div class="bar"></div>
    </div>

    
</template>

<style scoped lang="scss">
    @import '../../public/Sign.scss'
</style>