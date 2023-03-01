<script setup >
    import Navbar from '../components/Navbar.vue'
    import { useRouter, useRoute } from 'vue-router'
    import axios from 'axios'
    import { ref, onMounted } from "vue"
    import router from '../router'
    const items = ref([])
    const description = ref('')
    const selected = ref('')
    const editedDescription = ref('')
    async function getItems() {
        if (localStorage.getItem('token') === null) {
            router.push('/')
        } else {
            axios.get(`http://localhost:2020/todo/${localStorage.getItem('token')}`)
                .then(res => {
                    items.value = res.data.user.todoList
                })
        }
    }
    onMounted(async () => {
        await getItems()
    })
    async function addItem() {
        const response = await axios.post(`http://localhost:2020/todo/${localStorage.getItem('token')}`, {
            description: description.value
        })
        items.value.push(response.data)
        description.value = ""
        getItems()
    }

    function select(item) {
        selected.value = item
        editedDescription.value = item.description
    }
    function unselect() {
        selected.value = {}
        editedDescription.value = ""
    }
    
    async function updateItem(select) {
        const response = await axios.put(`https://todo-app-mevn.onrender.com/todo/${localStorage.getItem('token')}/` + select._id, {
            description: editedDescription.value
        })
        unselect()
        await getItems()
    }
    
    async function removeItem(item, i) {
        await axios.delete(`https://todo-app-mevn.onrender.com/todo/${localStorage.getItem('token')}/` + item._id)
        items.value.splice(i, 1)
    }
</script>

<template>
    <Navbar /> 
    <div class="circles">
        <div class="circle-1"></div>
        <div class="circle-2"></div>
        <div class="circle-3"></div>
        <div class="circle-4"></div>
    </div>

    <div class="header-form">
        <input type="text" class="note-input" v-model="description" placeholder="Input your task">
        <button class="add" @click="addItem()">Add</button>
    </div>
    <div class="body">
        <div class="notes" >
            <div class="items" v-for="(item, i) in items" :key="item._id">
                <p>
                    <span  @click="item._id === selected._id ? unselect() : select(item)">
                        <span class="description"> {{ item.description }} </span>
                    </span>
                    <span class="icons">
                        <span class="pencil">
                        <i id="pencil" class="bi bi-pencil-fill" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="item._id === selected._id ? unselect() : select(item)"></i>
                        </span>
                        <span class="remote" @click="item._id === selected._id ? updateItem(item, i) : removeItem(item, i)">
                        <i class="bi bi-trash-fill"></i>
                        </span>
                    </span>
                </p>
                <hr>
            </div>
        </div>
    </div>

    <div class="modal fade modal-dialog modal-dialog-centered" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                    <button type="button" class="btn bi bi-x-lg" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <textarea name="edit" id="edit" cols="50" rows="5" v-model="editedDescription"></textarea>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" @click="updateItem(selected)" data-bs-dismiss="modal">Save changes</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import '../../public/Home.scss'
</style>