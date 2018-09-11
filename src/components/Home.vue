<template>
<v-layout row>
    <v-flex>
      <v-alert
        type="success" 
        :value="alerted"  
        dismissible
      >
        Added successefully
      </v-alert>
    </v-flex>
  <v-layout row wrap>
    <v-flex xs5 v-for="movie in movies" :key="movie._id">
      <v-card>
        <v-card-title primary>
          <div>
            <div class="headline">
              <v-btn flat color="purple" :to='"movies/"+movie._id'>{{movie.name}}</v-btn>
              </div>
            <span class="grey--text">{{movie.release_year}} - {{movie.genre}}</span>
          </div>
        </v-card-title>
        <v-card-text>
            {{movie.description}}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-flex>   
  </v-layout>
</v-layout>
</template>

<script>
import axios from 'axios'
export default {
  name: 'movie',
  data(){
    return {
      movies: {}
    }
  },
  mounted(){
    this.fetchAllMovies()

  },
  methods:{
     fetchAllMovies(){
      return axios({
        method:'get',
        url: 'http://localhost:8083/movies',
      })
      .then(res=>{
        console.log(res.data)
        this.movies=res.data.movies
        console.log(movies)
      })
      .catch(err=>{
        console.log(err)
      })
    }
  },
  computed:{
    alerted(){
      return this.$store.getters.alertState
    } ,
  },
}
</script>

<style scoped>

</style>
