<template>
        <v-form v-model="valid" ref="form" lazy-validation>
            <v-layout justify-center align-center>
                <v-flex xs12 sm5>
                    <v-text-field
                        label="Movies Name"
                        v-model="name"
                        :rules="nameRules"
                        required
                    ></v-text-field>
                </v-flex>
            </v-layout>
             <v-layout justify-center align-center> 
                 <v-flex xs12 sm5 >              
            <v-textarea
                name="input-7-1"
                label="Movie Description"
                v-model="description"
            ></v-textarea>
            </v-flex>
             </v-layout>
             <v-layout justify-center align-center>
                 <v-flex xs12 sm5>
            <v-select
                label="Movie Release year"
                v-model="releaseYear"
                :rules="releaseRules"
                :items="years"
                required
            ></v-select>
            </v-flex>
             </v-layout>
             <v-layout justify-center align-center>
                 <v-flex xs12 sm5>
            <v-text-field
                label="Movie Genre"
                v-model="genre"
                :rules="genreRules"
                required
            ></v-text-field>
            </v-flex>
             </v-layout>
            <v-layout justify-center align-center>
            <v-btn
                @click="submit"
                :disabled="!valid"
                flat
                color="pink"
            > Submit</v-btn>
            <v-btn 
                @click="clear"
                color="blue"
                flat
            >Clear</v-btn>
            </v-layout>
        </v-form>

</template>
<script>
import axios from 'axios'
    export default {
        data:()=>{
            return{
                valid: true,
                name: '',
                description: '',
                genre: '',
                releaseYear: '',
                nameRules: [
                    v => !!v || 'movie name is rquired',
                ],
                releaseRules:[
                    v => !!v || 'movie release year should be set',
                ],
                genreRules:[
                    v => !!v || 'movie genre year should be set',
                    v => (v.length <= 50) || 'movie genre should be less than 80 characters'
                ],
                select: null,
                years:[
                    '2018',
                    '2017',
                    '2016',
                    '2014',
                ],
            }
        },
        methods:{
            submit() {
                if(this.$refs.form.validate()){
                    return axios({
                            method: 'post',
                            data:{
                                name: this.name,
                                description: this.description,
                                release_year: this.releaseYear,
                                genre: this.genre,
                            },
                            url: 'http://127.0.0.1:8083/movies',
                            headers:{
                                'Content-Type': 'application/json',
                            }
                            })
                            .then(()=>{
                                this.$store.commit('setAlert',true)
                                
                                this.$router.push({ name: 'Home'})
                                this.$refs.form.reset()
                                this.$store.dispatch('resetAlert',false)
                            })
                            .catch((err)=>{
                                console.log(err)
                            })
                }
                return true
            },
            clear(){
                this.$refs.form.reset()
            }
        }
    }
</script>