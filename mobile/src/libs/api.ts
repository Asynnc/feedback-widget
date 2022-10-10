import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3333/api'
})


// api.interceptors.response.use(async config => {
//     return config;
// }, error => {
//     console.log(error.response.status)
//     if (error.response.status === 500){
//         console.log()
//         alert('Servidor indisponível. Tente novamente mais tarde.')
//     }
// })

export { api }