<script setup lang="ts">
    import { ref, reactive } from 'vue'
    import { toast } from 'vue3-toastify';
    import axios from 'axios';

    // components
    import BackButton from '@/components/BackButton.vue';

    // for the company
    const compName = ref('')
    const compDesc = ref('')

    const errors = reactive(Array())

    // defines an company
    interface Company {
        name:String,
        description:String
    }

    const createCompany = ():void => {
        errors.length = 0

        const comp:Company = {
            name: compName.value,
            description: compDesc.value
        }

        axios
            .post('/api/company/create/', comp)
            .then(response => {
                toast.success('Company created', { autoClose: 3000 })
            })
            .catch(error => {
                if (error.response) {
                    // Loops the server errors and push it in the errors array
                    for (const property in error.response.data) {
                        errors.push(
                            `${property}: ${error.response.data[property]}`
                        );
                    }
                }
            })
        
        // Resets the input fields
        compName.value = ''
        compDesc.value = ''
    }
</script>

<template>
    <div>
        <h5 class="text-lg font-semibold text-center">Create Company</h5>

        <div class="flex justify-center md:border p-3 mt-3 rounded-md">
            <div>
                <form @submit.prevent="createCompany">
                    <input type="text" class="input w-80 mb-3 md:w-96" required placeholder="Company Name" v-model="compName"/> <br/>
                    <textarea class="input w-80 mb-3 md:w-96" cols="30" required rows="10" placeholder="Description" v-model="compDesc"></textarea> <br/>

                    <div class="bg-red-500 text-white rounded p-3 mb-3" v-if="errors.length">
                        <p v-for="error in errors">{{ error }}</p>
                    </div>

                    <button class="bg-green-500 p-3 rounded-md w-full"><font-awesome-icon icon="fa-solid fa-plus" /> Add</button>
                </form>
            </div>
        </div>

        <BackButton url="/companies"/>
    </div>
</template>

<style scoped>
@import '@/assets/style/input.css';
</style>
