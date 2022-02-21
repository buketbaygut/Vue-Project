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
//import Enumerable from 'linq'
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

        var inputEmail = this.email;
        var inputPassword = this.password;

        if (this.isLoggin) {
            
            this.loading = true;

            axios.get(dbUrl+'user?email='+inputEmail+'&password='+inputPassword)
                .then(function (response) {
                    
                    if (response.data.length >= 1) {
                    console.log("Giriş başarılı")
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
            
            // axios.get(dbUrl+'user')
            // .then(function (response) {
            //     let result = Enumerable.from(response.data).where(x=>x.email == inputEmail).toArray();
            //     if (result.length >= 1) {
            //         if (result[0].email == inputEmail && result[0].password == inputPassword) {
            //         console.log("Giriş başarılı");
            //         }else if (result[0].email == inputEmail) {
            //             console.log("Şifre yanlış")
            //         }
            //     }else{
            //         console.log("Kullanıcı bulunamadı")
            //     }
                
            // })
            // .catch(function (error) {
            //     // handle error
            //     console.log(error);
            // })
            // .then(function () {
            //     // always executed
            // });
        }else{
            var inputName = this.name;
            var inputSurname = this.surname;
            let result = this.dbControl(inputEmail);
            if (result) {
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
            }else{
                console.log("hatalı");
            }
            
        }    
        
        setTimeout(() => (this.loading = false), 2000)
      },

      dbControl(inputEmail){
          //senkron yapı kurabilirim!!
          let sonuc = true;
          console.log("girdi")
          axios.get(dbUrl+'user?email='+inputEmail)
            .then(function (response) {
                if (response.data.length>=1) {
                    sonuc = false;
                    console.log("Test ediyprum" + sonuc)
                    return sonuc;
                }
                
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });

            console.log(sonuc+"test");
            
        return sonuc;
      }

    },
  }
</script>