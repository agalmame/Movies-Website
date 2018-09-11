<template>
    <v-layout row wrap>
        <v-flex xs12 sm5>
            <v-card>
                <v-card-title primary-title>
                    <div>
                        <div class="headline"> {{movie.name}} </div>
                        <span class="grey--text"> {{movie.release_year}} </span>
                    </div>
                </v-card-title>
           
                <v-card-text>
                    {{ movie.description}}
                </v-card-text>
                <v-card-actions>
                    <v-btn class="card-title" v-if="true"  @click="rate">Rate this movie</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script>
import axios from 'axios'
import Vue from 'vue'
import StarRating from 'vue-star-rating'

const wrapper = document.createElement('div')
const state = {
    note: 0,
}
const RatingComponent = Vue.extend({
    data(){
        return { rating:0}
    },
    watch: {
        rating(val){
            state.note = val
        }
    },
    template: `
        <div class= "rating">
            how was your experience getting help with this issues?
             <star-rating v-model="rating" :show-rating="false"></star-rating>
        </div>`,
    components: {'star-rating':StarRating},
})
const component = new RatingComponent().$mount(wrapper)
export default {
        data(){
            return {
                movie:{}
            }
        },
        mounted(){
            this.fetchMovie()
        },
        methods:{
            rate(){
                this.$swal({
                    content: component.$el,
                    buttons: {
                        confirm: {
                            value: 0,
                        }
                    }
                })
                .then(()=>{
                    const movieId = this.$route.params.id
                    return axios({
                        method: 'post',
                        data: {
                            rate: state.note
                        },
                        url: 'http://localhost:8083/movies/rate/'+movieId,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                    .then(()=>{
                        this.$swal('thank you for rating!'+state.note,'success')
                    })
                    .catch(error=>{
                        console.log(error)
                        const message = error.response.data.message
                        this.$swal('oh !',message,'error')
                    })
                })
            },
            fetchMovie(){
                return axios({
                    method: 'get',
                    url: 'http://localhost:8083/movies/'+this.$route.params.id,
                })
                .then(res=>{
                    console.log(res.data)
                    this.movie = res.data
                })
                .catch(err=>{
                    console.log(err)
                })
            }
        },

    }
</script>
