import api from '../api.js'

class RegistreService {

  create(data){
    return api.post('/signup/', data)
    .then((res) => {
        return res.data
  })
}
    

}

export default new RegistreService()