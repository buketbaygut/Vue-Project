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
          mdi-format-list-bulleted
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
      <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="guestList"
      :search="search"
    ></v-data-table>
  </v-card>
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
            label="Name"
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
            label="Surname"
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
            label="From Who"
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
            label="Relation"
            placeholder="Select..."
            required
          ></v-autocomplete>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="4"
        >
          <v-subheader style="justify-content: right;">Ankara Count :</v-subheader>
        </v-col>
        <v-col
          cols="4"
        >
          <v-text-field
            outlined
            dense v-model="ankaraCount"
            :rules="[() => !!ankaraCount || 'This field is required']"
            label="ankaraCount"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="4"
        >
          <v-subheader style="justify-content: right;">Diyarbakır Count :</v-subheader>
        </v-col>
        <v-col
          cols="4"
        >
          <v-text-field
            outlined
            dense v-model="diyarbakırCount"
            :rules="[() => !!diyarbakırCount || 'This field is required']"
            label="diyarbakırCount"
            required
          ></v-text-field>
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

import cityJson from '../json/city_list.json'
  export default {
    data: () => ({     
      guestCity:'',
      search: '',
      cities:[],
      guestName:'',
      guestSurname:'',
      fromWho:'',
      relation:'',
      fromWhoList : ['Buket','Umut','Both'],
      relationList : ['Family','Friends','Relative'],
      snackbar: false,
      message:'',
      timeout: 2000,
      snackbarColor:'',
      diyarbakırCount:0,
      ankaraCount:0,
      headers: [
          {
            text: 'Name',
            align: 'start',
            filterable: false,
            value: 'name',
          },
          { text: 'Surname', value: 'surname' },
          { text: 'City', value: 'city' },
          { text: 'Relation', value: 'relation' },
          { text: 'From Who', value: 'fromWho' },
        ],
        guestList: [
        ],
    }), 

    mounted: function(){

      var self=this

      this.cities = cityJson;
      var config = {
        method: 'GET',
        url: 'http://localhost:3000/guests',
        headers: { 
          'Content-Type': 'text/xml;charset=UTF-8', 
          'accessToken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYmlrYXNoLmR1bGFsQHdlc2lvbmFyeS50ZWFtIiwidXNlciI6dHJ1ZSwiZXhwIjoxNjQ3NDI2MzY4LCJpYXQiOjE2NDcyNTM1NjgsImlzcyI6IkJpa2FzaCIsInRleHQiOiJidWtldCJ9.WCl45rk-eZRNaSf7MfuuZ7LS5om_YLaXRx7H7p6638k'
        }
      };
      
      axios.get('http://localhost:3000/guests', {headers:config.headers})
      .then(function (response) {
            for (var i=0; i<response.data.length; i++) {
              self.guestList.push({
                name: response.data[i].firstName,
                surname: response.data[i].surname,
                city: self.cities.find(a=>a.id === response.data[i].city).name,
                relation: response.data[i].relation,
                fromWho: response.data[i].fromWho,
              });      
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

      addGuest(){
        var self=this;
        if (this.guestName === "" || this.guestSurname === "" || this.fromWho === "" || this.guestCity === "" || this.relation === "") {
          this.snackbar = true
          this.snackbarColor = false
          this.message = 'Lütfen boş alanları doldurunuz!'
        } else {
          axios.post("http://localhost:3000/guests",{
                    firstName:this.guestName,
                    surname:this.guestSurname,
                    fromWho:this.fromWho,
                    city:this.guestCity,
                    relation:this.relation,
                    ankaraCount:this.ankaraCount,
                    diyarbakırCount: this.diyarbakırCount
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
        this.$cookies.remove('accessToken')
        this.$router.go("/profile")
      }
    })

    }
</script>
