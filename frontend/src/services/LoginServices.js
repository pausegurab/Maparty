import api from '../api.js';

class LoginService {
  login(data) {


    const params = new URLSearchParams();
    params.append('username', data.username);
    params.append('password', data.password);

    return api
      .post('/login/', params, {headers: { "Content-Type": "application/x-www-form-urlencoded" }})
      .then((res) => res.data)
      .catch((err) => {
        console.error('Error en el login:', err);
        throw err;
      });
  }
}

export default new LoginService();