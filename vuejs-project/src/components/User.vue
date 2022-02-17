<template>
  <v-card>
    <v-toolbar
      flat
      color="primary"
      dark
    >
      <v-toolbar-title>User Profile</v-toolbar-title>
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
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            LastName
          </th>
          <th class="text-left">
            City
          </th>
          <th class="text-left">
            Relation
          </th>
          <th class="text-left">
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
          <td>{{ item.city }}</td>
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
            :items="guestCity"
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
            :rules="[() => !!fromWho || 'This field is required']"
            :items="fromWho"
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
            :rules="[() => !!relation || 'This field is required']"
            :items="relation"
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
  </v-card>
  
</template>

<script>
const axios = require('axios').default;
//const dbUrl = "http://localhost:3000/"

import cityJson from '../json/city_list.json'
  export default {
    data: () => ({   
      //city: ['Diyarbakır','Ankara','İstanbul'],
      guestCity:[],
      guestName:'',
      guestSurname:'',
      fromWho : ['Buket','Umut','Both'],
      relation : ['Family','Friends','Relative'],
      guestList: [
        // {
        //   name: 'Seda',
        //   city: 'İstanbul',
        //   fromWho: 'Both',
        //   relation: 'Friends'
        // }
      ],
    }), 

    mounted: function(){

      var self=this

      cityJson.forEach(element => {
        this.guestCity.push(element.name);
      });
      
      axios.get("http://localhost:3000/guests")
      .then(function (response) {
            for (var i=0; i<response.data.length; i++) {
                
              self.guestList.push(response.data[i])             
            
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
                console.log(response.data);
              for (var i=0; i<response.data.length; i++) {                
                  
                  self.guestList.push(response.data[i])             
              
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
        axios.post("http://localhost:3000/guests",{
                    firstName:this.guestName,
                    surname:this.guestSurname,
                    fromWho:this.fromWho,
                    city:this.guestCity,
                    relation:this.relation
                })
                .then(function (response) {
                    // handle success
                    console.log(response);
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
    })

    }
</script>
