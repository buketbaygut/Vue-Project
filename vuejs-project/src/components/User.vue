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
            :item-text="cities.name"
            :item-value="cities.id"
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
      cityID:[],
      guestName:'',
      guestSurname:'',
      fromWho:'',
      relation:'',
      fromWhoList : ['Buket','Umut','Both'],
      relationList : ['Family','Friends','Relative'],
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
        this.cities.push(element.name);
        this.cityID.push(element.id);
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
        //TODO:Sor
        // cityJson.forEach(element => {
        //   if (element.name == this.guestCity) {
        //     this.guestCity = element.id
        //   }
        // });

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
