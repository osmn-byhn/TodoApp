<script setup>
    import { useRouter, useRoute } from 'vue-router'
    import axios from 'axios'
    import { ref, onMounted } from "vue"
    import router from '../router'
    const fullName = ref('')
    const email = ref('')
    onMounted(() => {
        if (localStorage.getItem('token') === null) {
            router.push('/')
        } else {
            axios.get('https://todo-app-mevn.onrender.com/user', { headers: {token: localStorage.getItem('token')}})
                .then(res => {
                    fullName.value = res.data.user.fullName
                })
        }
    })
    function logout() {
        localStorage.clear()
        router.push('/')
    }
</script>

<template>
    <nav class="navbar">
        <ul class="item">
            <li>
                <h1>
                    <i class="bi bi-check2-square"></i>
                    NoteApp
                </h1>
            </li>
            <li>
                <div class="dropstart">
                    <button class="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi bi-person-circle"></i>
                        <span class="fullName">{{ fullName }}</span>
                    </button>
                    <ul class="dropdown-menu">
                        <li class="fullName-drop">
                            <span class="dropdown-item">{{ fullName }}</span>
                            <hr>
                        </li>
                        <li><a class="dropdown-item" href="#">User Setting</a></li>
                        <li><span class="dropdown-item" @click="logout()">Logout</span></li>
                    </ul>
                </div>
            </li>
        </ul>
    </nav>
    
</template>

<style scoped lang="scss">
    @import '../../public/Navbar.scss'
</style>