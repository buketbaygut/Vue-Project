<template>
  <v-card>
    <v-toolbar
      flat
      color="primary"
      dark
    >
      <v-toolbar-title class="flex text-center">User Profile</v-toolbar-title>      
      <button @click="signOut()" >Sign Out</button>
    </v-toolbar>
    <v-tabs vertical>
      <v-tab>
        <v-icon left>
        </v-icon>
        List
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-plus
        </v-icon>
        Add
      </v-tab>

      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center">
            Name
          </th>
          <th class="text-center">
            LastName
          </th>
          <th class="text-center">
            City
          </th>
          <th class="text-center">
            Relation
          </th>
          <th class="text-center">
            From Who
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in guestList"
          :key="item.id"
        >
          <td>{{ item.firstName }}</td>
          <td>{{ item.surname }}</td>
          <td>{{ cities.find(a=>a.id === item.city).name }}</td>
          <td>{{ item.relation }}</td>
          <td>{{ item.fromWho }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-form>
    <v-container>
      <v-row>
        <v-col
          cols="4"
        >
          <v-subheader style="justify-content: right;">Name :</v-subheader>
        </v-col>
        <v-col
          cols="4"
        >
          <v-text-field
            outlined
            dense v-model="guestName"
            :rules="[() => !!guestName || 'This field is required']"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="4"
        >
          <v-subheader style="justify-content: right;">Surname :</v-subheader>
        </v-col>
        <v-col
          cols="4"
        >
          <v-text-field
            outlined
            dense v-model="guestSurname"
            :rules="[() => !!guestSurname || 'This field is required']"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="4"
        >
          <v-subheader style="justify-content: right;">City :</v-subheader>
        </v-col>

        <v-col
          cols="4"
        >
        <v-autocomplete
            ref="city"
            v-model="guestCity"
            :rules="[() => !!guestCity || 'This field is required']"
            :items="cities"
            item-text="name"
            item-value="id"
            label="City"
            placeholder="Select..."
            required
          ></v-autocomplete>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="4"
        >
          <v-subheader style="justify-content: right;">From Who :</v-subheader>
        </v-col>

        <v-col
          cols="4"
        >
          <v-autocomplete
            ref="fromWho"
            v-model="fromWho"
            :rules="[() => !!fromWhoList || 'This field is required']"
            :items="fromWhoList"
            placeholder="Select..."
            required
          ></v-autocomplete>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="4"
        >
          <v-subheader style="justify-content: right;">Relation :</v-subheader>
        </v-col>

        <v-col
          cols="4"
        >
          <v-autocomplete
            ref="relation"
            v-model="relation"
            :rules="[() => !!relationList || 'This field is required']"
            :items="relationList"
            placeholder="Select..."
            required
          ></v-autocomplete>
        </v-col>
      </v-row>
      <div class="text-center">
        <v-btn
          elevation="2"
          @click="addGuest()"
        >ADD</v-btn>
      </div>


            </v-container>
        </v-form>
        </v-card>
      </v-tab-item>
    </v-tabs>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      v-bind:color="snackbarColor ? 'success':'error' "
    >
      {{ message }}

    </v-snackbar>
  </v-card>
  
</template>

<script>
const axios = require('axios').default;
//const dbUrl = "http://localhost:3000/"

import cityJson from '../json/city_list.json'
  export default {
    data: () => ({   
      //city: ['Diyarbakır','Ankara','İstanbul'],   
      guestCity:'',
      cities:[],
      guestName:'',
      guestSurname:'',
      fromWho:'',
      relation:'',
      fromWhoList : ['Buket','Umut','Both'],
      relationList : ['Family','Friends','Relative'],
      guestList: [],
      snackbar: false,
      message:'',
      timeout: 2000,
      snackbarColor:''
    }), 

    mounted: function(){

      var self=this

      cityJson.forEach(element => {
        this.cities.push(element);
      });
      
      axios.get("http://localhost:3000/guests")
      .then(function (response) {
            for (var i=0; i<response.data.length; i++) {
              const temp = response.data[i];
              //temp.city = self.cities.find(a => a.id === temp.city).name;
              self.guestList.push(temp)               
            
            }
      })                
      .catch(function (error) {
          // handle error
          console.log(error);
      })
      .then(function () {
          // always executed
      });
    },

    methods: ({
      setGuestList(){
        var self=this
        axios.get("http://localhost:3000/guests")
        .then(function (response) {
              for (var i=0; i<response.data.length; i++) {                
                const temp = response.data[i];
                temp.city = self.cities.find(a => a.id = temp.city).name;
                self.guestList.push(temp)             
              }
        })                
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });

      },

      addGuest(){
        var firstName=this.guestName;
        var surname=this.guestSurname;
        var fromWho=this.fromWho;
        var city=this.guestCity;
        var relation=this.relation;
        var self=this;

        if (firstName === "" || surname === "" || fromWho === "" || city === "" || relation === "") {
          this.snackbar = true
          this.snackbarColor = false
          this.message = 'Lütfen boş alanları doldurunuz!'
        } else {
          axios.post("http://localhost:3000/guests",{
                    firstName:firstName,
                    surname:surname,
                    fromWho:fromWho,
                    city:city,
                    relation:relation
                })
                .then(function () {
                    // handle success
                    self.snackbar = true
                    self.snackbarColor = true
                    self.message = 'Başarılı!'
                    window.location.reload()
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });
        }        
      },

      signOut(){
        var router = this.$router;
        router.go(-1) 
      }
    })

    }
</script>
