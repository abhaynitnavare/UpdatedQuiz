const express = require('express')
const router = express.Router()
const http = require('http')
const apiendpoint = "http://localhost:4000"

export async function getdata(){
    try{
        const data = await http.get(`${apiendpoint}/getquestion`)
        return data
    }
    catch(error){
        console.log(error,)
    }
}