import axios from 'axios'
import React from 'react'
import { USER_DELETE_URL } from '../apiHelper'

const deleteData = () => {
    axios.delete(USER_DELETE_URL).then((response)=>{

    })

}

export default deleteData