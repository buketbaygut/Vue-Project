<template>
  <v-card
    :loading="loading"
    class="mx-auto my-12"
    max-width="374"
  >

    <v-card ref="form"> 
        <v-card-text v-if="isLoggin">
        <h1 class="text-center mb-7">Login</h1>          
            <v-text-field
                ref="email"
                v-model="email"
                label="Email"
                placeholder="John Doe"
                icon="user"
                required
            ></v-text-field>
            <v-text-field
                ref="password"
                v-model="password"
                label="Password"
                icon="user"
                type="password"
                required
            ></v-text-field>
        </v-card-text>
        <v-card-text v-else>
        <h1 class="text-center mb-7">Register</h1>          
            <v-text-field
                ref="name"
                v-model="name"
                label="Name"
                placeholder="Buket"
                required
            ></v-text-field>
            <v-text-field
                ref="surname"
                v-model="surname"
                label="Surname"
                placeholder="Bayğut"
                required
            ></v-text-field>
            <v-text-field
                ref="email"
                type="email"
                v-model="email"
                label="Email"
                placeholder="John Doe"
                required
            ></v-text-field>
            <v-text-field
                ref="password"
                v-model="password"
                label="Password"
                type="password"
                required
            ></v-text-field>
            <v-text-field
                ref="passwordCheck"
                v-model="passwordCheck"
                label="Password"
                type="password"
                required
            ></v-text-field>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>
    


        <v-card-actions>
        <v-btn
            color="deep-purple lighten-2"
            text
            @click="islemYap"
        >
            {{isLoggin == true ? signIn : register}}
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
            color="orange lighten-2"
            text
            @click="changeTemplate"
        >
            {{isLoggin == true ? register : signIn}}
        </v-btn>
        </v-card-actions>
    </v-card>
  </v-card>
</template>
<script>
import Enumerable from 'linq'
const axios = require('axios').default;
const dbUrl = "http://localhost:3000/"
  export default {
    data: () => ({   
        name:"",  
        surname:"",   
        email:"",
        password: 'Password',
        passwordCheck : 'Password',
        signIn:"Login",
        register:"Register",
        isLoggin:true,
        loading: false,
    }),

    methods: {
      islemYap () {
        if (this.isLoggin) {
            // let result = Enumerable.range(1, 10).where(i => i % 3 == 0).select(i => i * 10)
            // console.log(result.toArray()) // [ 30, 60, 90 ]
            
            this.loading = true
            axios.get(dbUrl+'user')
            .then(function (response) {
                Enumerable.from(response.data).forEach(x=>console.log(x))
                // handle success
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
        }else{
            axios.get(dbUrl+'guests')
            .then(function (response) {
                // handle success
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
        }
        
        

        setTimeout(() => (this.loading = false), 2000)
      },
      changeTemplate(){
          this.isLoggin = !this.isLoggin;
      }
    },
  }
</script>