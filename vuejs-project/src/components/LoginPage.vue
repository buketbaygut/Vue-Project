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
                :rules="[() => !!email || 'This field is required']"
                label="Email"
                placeholder="John Doe"
                icon="user"
                required
            ></v-text-field>
            <v-text-field
                ref="password"
                v-model="password"
                :rules="[() => !!password || 'This field is required']"
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
                :rules="[() => !!name || 'This field is required']"
                label="Name"
                placeholder="Buket"
                required
            ></v-text-field>
            <v-text-field
                ref="surname"
                v-model="surname"
                :rules="[() => !!surname || 'This field is required']"
                label="Surname"
                placeholder="Bayğut"
                required
            ></v-text-field>
            <v-text-field
                ref="email"
                type="email"
                v-model="email"
                :rules="[() => !!email || 'This field is required']"
                label="Email"
                placeholder="John Doe"
                required
            ></v-text-field>
            <v-text-field
                ref="password"
                v-model="password"
                :rules="[() => !!password || 'This field is required']"
                label="Password"
                type="password"
                required
            ></v-text-field>
            <!-- <v-text-field
                ref="passwordCheck"
                v-model="passwordCheck"
                label="Password"
                type="password"
                required
            ></v-text-field> -->
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
            @click="isLoggin = !isLoggin;"
        >
            {{isLoggin == true ? register : signIn}}
        </v-btn>
        </v-card-actions>
    </v-card>
  </v-card>
</template>
<script>
const axios = require('axios').default;
const dbUrl = "http://localhost:3000/"
  export default {
    data: () => ({   
        name:'',  
        surname:'',  
        email:'',
        password: 'Password',
        passwordCheck : 'Password',
        signIn:"Login",
        register:"Register",
        isLoggin:true,
        loading: false,
    }),

    methods: {
      islemYap () {
        var inputName = this.name;
        var inputSurname = this.surname;
        var inputEmail = this.email;
        var inputPassword = this.password;        
        var router = this.$router;
        this.loading = true;

        if (this.isLoggin) {
            
            axios.get(dbUrl+'user?email='+inputEmail+'&password='+inputPassword)
                .then(function (response) {
                    
                    if (response.data.length >= 1) {
                        console.log("Giriş başarılı")
                        router.push('/user')
                    }else{
                        alert("Email veya password yanlış");
                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });           
                 
        }else{         

            axios.get(dbUrl+'user?email='+inputEmail)
            .then(function (response) {
                if (response.data.length>=1) {
                    alert("Bu mail sistemde kayıtlı")
                }else{
                    axios.post(dbUrl+'user',{
                        firstname:inputName,
                        lastname:inputSurname,
                        email:inputEmail,
                        password:inputPassword
                    })
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
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {

            });

            
            
        }    
        
        setTimeout(() => (this.loading = false), 2000)
      },

    },
  }
</script>