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

    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      v-bind:color="snackbarColor ? 'success':'error' "
    >
    <div style="text-align: center;">{{ message }}</div>
      

    </v-snackbar>
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
        snackbar: false,
        message:'',
        timeout: 2000,
        snackbarColor:''
    }),

    methods: {
    setTokenCookies(accessToken) {
        this.$cookies.set('accessToken',accessToken)
      },
      islemYap () {      
        var router = this.$router; 
        var self=this;      
        

        if (this.isLoggin) {
            if (this.email === "" || this.password === "") {
                this.snackbar = true
                this.snackbarColor = false
                this.message = 'Lütfen boş alanları doldurunuz!'
            }else{
                this.loading = true;
                axios.post(dbUrl+"login",{
                    email : this.email,
                    password : this.password
                })
                .then(function (response) {
                    // handle success
                    if (response.status == 200){                        
                        self.setTokenCookies(response.data.accessToken)
                        self.snackbar = true
                        self.snackbarColor = true
                        self.message = 'Başarılı!'
                        router.push('/profile')
                    }
                })
                .catch(function (error) {
                    // handle error
                    self.snackbar = true
                    self.snackbarColor = false
                    self.message = error.response.data
                    alert(error.response.data);
                })
                .then(function () {
                    // always executed
                });
            }
                       
        }else{         
            if (this.name === "" || this.surname === "" || this.email === "" || this.password === "") {
                this.snackbar = true
                this.snackbarColor = false
                this.message = 'Lütfen boş alanları doldurunuz!'
            }else{
                this.loading = true;
                axios.post(dbUrl+'register',{
                    firstname:this.name,
                    lastname:this.surname,
                    email:this.email,
                    password:this.password
                })
                .then(function (response) {
                    console.log(response.data)
                    if (response.data.accessToken != null){
                        self.$cookies.get('accessToken')
                        self.snackbar = true
                        self.snackbarColor = true
                        self.message = 'Başarılı!'
                        window.location.reload()
                    }
                    
                    // handle success
                })
                .catch(function (error) {
                    // handle error
                    self.snackbar = true
                    self.snackbarColor = false
                    self.message = error.response.data
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });
            }           
        }    
        
        setTimeout(() => (this.loading = false), 2000)
      },

    },
  }
</script>