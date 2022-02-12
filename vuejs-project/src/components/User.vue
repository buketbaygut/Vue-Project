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
          v-for="item in guest"
          :key="item.name"
        >
          <td>{{ item.name }}</td>
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
            dense
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
        <!-- <v-autocomplete
            ref="city"
            v-model="city"
            :rules="[() => !!city || 'This field is required']"
            :items="city"
            label="City"
            placeholder="Select..."
            required
          ></v-autocomplete> -->
          <select
            class="form-control"
            v-model="city"
            >
            <option :value="city.id" v-for="(city) in city" :key="city.id">{{city.name}}</option>
            </select>
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


            </v-container>
        </v-form>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
// const axios = require('axios').default;
// const dbUrl = "http://localhost:3000/"
import cityJson from '../json/city_list.json'
  export default {
    data: () => ({   
      //city: ['Diyarbakır','Ankara','İstanbul'],
      city:cityJson,
      fromWho : ['Buket','Umut','Both'],
      relation : ['Family','Friends','Relative'],
      guest: [
        {
          name: 'Seda',
          city: 'İstanbul',
          fromWho: 'Both',
          relation: 'Friends'
        }
      ],
    }), 

    }
</script>
