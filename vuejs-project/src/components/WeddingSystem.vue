<template>
  <v-card>
    <v-toolbar
      flat
      color="primary"
      dark
    >
      <v-toolbar-title class="flex text-center">Wedding System</v-toolbar-title>      
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
        <v-container>
        <v-row class="card-row-class" >
          <v-col
            cols="6"
          >
            <v-card class="mx-lg-auto" max-width="350">
              <v-card-text class="firstCard-background-color">
                <p class="text-h5 text--primary">
                  Total Ankara Guest Count
                </p>
                <p class="text-h4 text--primary">
                  {{totalAnkaraCount}}
                </p>
               </v-card-text>
            </v-card>
          </v-col>
          <v-col
            cols="6"
          >
            <v-card class="mx-lg-auto" max-width="350">
              <v-card-text class="secondCard-background-color">
                <p class="text-h5 text--primary">
                  Total Diyarbakır Guest Count
                </p>
                <p class="text-h4 text--primary">
                  {{totalDiyarbakirCount}}
                </p>
               </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
        <v-card flat>
          <v-card-text>
            <v-simple-table>
              <template v-slot:default>
                <v-card>

      <export-excel
    :data   = guestList>
    <v-btn color="warning"> Download Guest List </v-btn>
</export-excel>
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
          <v-subheader style="justify-content: right;">Guest Count Come to Ankara :</v-subheader>
        </v-col>
        <v-col
          cols="4"
        >
          <v-text-field
            outlined
            dense v-model="ankaraCount"
            label="Ankara Guest Count"
            type="number"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="4"
        >
          <v-subheader style="justify-content: right;">Guest Count Come to Diyarbakır :</v-subheader>
        </v-col>
        <v-col
          cols="4"
        >
          <v-text-field
            outlined
            dense v-model="diyarbakirCount"
            label="Diyarbakır Guest Count"
            type="number"
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
<style>
.card-row-class{
  margin-left: 160px;
}
.firstCard-background-color{
  background-color: #66f5db;
}
.secondCard-background-color{
  background-color: rgba(126, 111, 255, 0.493);
}
</style>

<script>
const axios = require('axios').default;
let dbUrl = "https://wedding.baygut.com/backend/"
if( process.env.NODE_ENV !== "production" ){
    dbUrl ="http://localhost:3000/"
}

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
      relationList : ['Family','Friends','Relative','Family-Friends'],
      snackbar: false,
      message:'',
      timeout: 2000,
      snackbarColor:'',
      diyarbakirCount:0,
      ankaraCount:0,
      headers: [
          {
            text: 'Name',
            align: 'center',
            filterable: false,
            value: 'firstName',
          },
          { text: 'Surname', align: 'center', value: 'lastName' },
          { text: 'City', align: 'center',value: 'city' },
          { text: 'Relation', align: 'center',value: 'relation' },
          { text: 'From Who', align: 'center',value: 'fromWho' },
          { text: 'Ankara Guest Count', align: 'center',value: 'ankaraCount' },
          { text: 'Diyarbakır Guest Count', align: 'center',value: 'diyarbakirCount' },
        ],
      guestList: [],
      filename: '',
      autoWidth: true,
      bookType: 'xlsx',
      totalAnkaraCount:0,
      totalDiyarbakirCount:0,
    }), 

    mounted: function(){

      var self=this

      this.cities = cityJson;
      var config = {
        headers: { 
          'Content-Type': 'text/xml;charset=UTF-8', 
          'accessToken': self.$cookies.get('accessToken'),
        }
      };
      
      axios.get(dbUrl+'guests', {headers:config.headers})
      .then(function (response) {
            for (var i=0; i<response.data.length; i++) {
              self.guestList.push({
                firstName: response.data[i].FirstName,
                lastName: response.data[i].LastName,
                city: self.cities.find(a=>a.id === response.data[i].City).name,
                relation: response.data[i].Relation,
                fromWho: response.data[i].FromWho,
                ankaraCount: parseInt(response.data[i].AnkaraGuestCount),
                diyarbakirCount: parseInt(response.data[i].DiyarbakirGuestCount),                
              });     
              self.totalAnkaraCount += parseInt(response.data[i].AnkaraGuestCount)
              self.totalDiyarbakirCount += parseInt(response.data[i].DiyarbakirGuestCount) 
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
        
        if (this.guestName === "" || this.guestSurname === "" || this.fromWho === "" || this.guestCity === "" || this.relation === "") {
          this.snackbar = true
          this.snackbarColor = false
          this.message = 'Lütfen boş alanları doldurunuz!'
        } else {
          var data = {
            firstName:this.guestName,
            lastName:this.guestSurname,
            fromWho:this.fromWho,
            city:this.guestCity,
            relation:this.relation,
            ankaraGuestCount:this.ankaraCount,
            diyarbakirGuestCount: this.diyarbakirCount
          }
          
          if (data.diyarbakirGuestCount === 0) {
            data.diyarbakirGuestCount = "0"
          }
          if (data.ankaraGuestCount === 0) {
            data.ankaraGuestCount ="0"
          }

          var config = {
            method: 'post',
            url: dbUrl+'guests',
            headers: { 
              'Content-Type': 'text/xml;charset=UTF-8', 
              'accessToken': this.$cookies.get('accessToken'),
            },
            data:data
          };
          axios(config)
                .then(function () {
                    // handle success
                    self.snackbar = true
                    self.snackbarColor = true
                    self.message = 'Başarılı!'
                    //router.push('/')
                    window.location.replace(window.location.origin)
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
        this.$router.go(-1)
      }
    })

    }
</script>
