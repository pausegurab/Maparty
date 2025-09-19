<script>
import LoginServices from '@/services/LoginServices';
import { Toast } from 'bootstrap';

export default {
  data() {
    return {
      email: '',
      contrasenya: '',
      showContrasenya: false,
    };
  },
  methods:{
    showToast(id)
    {
      let toastElement = document.getElementById(id);
      let toast = new Toast(toastElement);
      toast.show();
    },
    toggleShowPassword () {
      this.showContrasenya = !this.showContrasenya
    },
    login()
    {
      if (!this.email || !this.contrasenya) {
        this.showToast('warningToast');
        return;
      }
      const data = {
        username: this.email,
        password: this.contrasenya
      }

      LoginServices.login(data).then(response => {
        console.log(response);
        if (response.access_token) {
          this.showToast('successToast');
          localStorage.setItem('access_token', response.access_token);

          setTimeout(() => {
            window.location.href = '/';
          }, 2000);
        } else {
          this.showToast('errorToast');
        }
      }).catch(error => {
        console.error(error);
        this.showToast('errorToast');
      });
    }

  }

}

</script>
<template>
    <div class="login-screen">
      <h2 class="title">Inicia Sessió</h2>
      
      <div class="input-group">
        <div class="label-container">
          <label for="email" class="label">Correu electrònic</label>
        </div>
        <input
          type="email"
          class="input-field rounded-3"
          id="email"
          v-model="email"
          placeholder="Introdueix el teu correu"
          required
        />
      </div>
  
      <div class="input-group">
        <div class="label-container">
          <label for="contrasenya" class="label">Contrasenya</label>
        </div>
        <div class="input-wrapper">
          <input
            :type="showContrasenya ? 'text' : 'password'"
            class="input-field rounded-3"
            id="contrasenya"
            v-model="contrasenya"
            required
            placeholder="Introdueix la teva contrasenya"
          />
          <span class="toggle-password" @click="toggleShowPassword">
            <i :class="showContrasenya ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
          </span>
        </div>
      </div>
  
      <button type="submit" class="submit-button" @click="login">Inicia Sessió</button>
      
      <div class="login-link">
        <span>No tens un compte? <a href="/registre" class="login-link-text">Registra't</a></span>
      </div>
  
      <div id="successToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-content success">
          ✅ Sessió inciada amb èxit!
        </div>
      </div>
  
      <div id="errorToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-content error">
          ❌ Error! Correu o contrassenya equivocades.
        </div>
      </div>
  
      <div id="warningToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-content warning">
          ⚠️ Hi ha camps incomplerts!
        </div>
      </div>
    </div>
  </template>
<style scoped>
.login-screen {
  width: 50%;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: center;
}

.title {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 28px;
  text-align: center;
  color: #2d2d2d;
}

.input-group {
  margin-bottom: 20px;
  width: 100%;
}

.label-container {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.label {
  font-weight: bold;
  color: #333;
  margin-right: 8px;
}

.input-field {
  width: 100%;
  padding: 12px 15px;
  font-size: 16px;
  border: 2px solid#000;
  color: #333;
  background-color: transparent;
  margin-bottom: 5px;
}
.password-container {
  position: relative;
  display: flex;
  align-items: center;
}

.password-container .input-field {
  margin-bottom: 0;
}

.toggle-password {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #000;
}

.info-text {
  font-size: 14px;
  color: #666;
  margin-top: 5px;
  display: block;
}

.submit-button {
  width: 100%;
  background-color: #d4a017;
  color: white;
  padding: 16px;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 20px;
}

.submit-button:hover {
  background-color: #8b6508;
}

.login-link {
  text-align: center;
  margin-top: 15px;
}

.login-link-text {
  color: #b8860b;
  font-weight: 700;
  text-decoration: none;
}

.toast {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 400px;
  z-index: 1000;
}

.toast-content {
  padding: 15px;
  border-radius: 8px;
  color: white;
  font-weight: bold;
}

.toast-content.success {
  background-color: #28a745;
}

.toast-content.error {
  background-color: #dc3545;
}

.toast-content.warning {
  background-color: #ffc107;
  color: #2d2d2d;
}

.input-wrapper {
  position: relative;
  width: 100%;
}

.input-wrapper .input-field {
  width: 100%;
  padding-right: 40px;
}

@media (max-width: 600px) {
  .login-screen {
    justify-content: center;
    width: 100%;
    padding: 16px;
    margin: 0;
  }
  
  .title {
    font-size: 22px;
    margin-bottom: 20px;
  }
  
  .input-field {
    padding: 10px 12px;
    font-size: 14px;
  }
  
  .submit-button {
    padding: 14px;
    font-size: 16px;
  }
}
</style>