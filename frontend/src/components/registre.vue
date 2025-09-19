<script>
  import { onMounted } from 'vue';
  import { Tooltip } from 'bootstrap';
  import { Toast } from 'bootstrap';
  import checkIcon from '../assets/succes-icon.png';
  import errorIcon from '../assets/error-icon.png';
  import RegistreService from '@/services/RegistreServices';

  export default {
    data() {
      return {
        email: '',
        emailValid: null,
        emailErrorMessage: 'Format de correu electrònic no vàlid, ha de contenir una  "@". Exemple: exemple@exemple.exemple',
        checkIcon,
        errorIcon,
        nom: '',
        nameValid: null,
        nameErrorMessage: 'El nom només pot contenir lletres espais i apòstrofs',
        contrasenya: '',
        contrasenyaValid: null,
        showContrasenya: false,
        showConfirmaContrasenya: false, 
        contrasenyaErrorMessage: 'La contrasenya ha de tenir mímin 8 caràcters, una minúscula, una majúscula i un número',
        confirmaContrasenya: '',
        confirmContrasenyaValid: null,
        confirmErrorMessage: 'Les contrasenyes no coincideixen'
      };
    },
    computed: {
    canRegister () {
      return (
        this.nameValid &&
        this.emailValid &&
        this.contrasenyaValid &&
        this.confirmContrasenyaValid
      )
    }
  },
    methods: {
      showToast(id) {
        let toastElement = document.getElementById(id);
        let toast = new Toast(toastElement);
        toast.show();
      },
      validateMail () {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      this.emailValid = emailRegex.test(this.email)
      console.log('Email:', this.email, 'Valid:', this.emailValid);
      },
      validateNom (){
        const nomRegex = /^[a-zA-ZÀ-ÿ0-9' ]+$/
        this.nameValid = nomRegex.test(this.nom)
        console.log(this.nameValid)
      },
      validateContrasenya () {
        console.log("S'ha cridat validateContrasenya! Valor actual:", this.contrasenya);
        const length = /^.{8,40}$/
        const hasUppercase = /[A-Z]/
        const hasLowercase = /[a-z]/
        const hasDigit = /[0-9]/
        const isValidLength = length.test(this.contrasenya)
        const containsUppercase = hasUppercase.test(this.contrasenya)
        const containsLowerCase = hasLowercase.test(this.contrasenya)
        const containsDigit = hasDigit.test(this.contrasenya)
        this.contrasenyaValid = isValidLength && containsUppercase && containsLowerCase && containsDigit
        this.validateConfirmPassword()
      },
      validateConfirmPassword () {
      this.confirmContrasenyaValid = this.contrasenya === this.confirmaContrasenya
      },
      toggleShowPassword () {
      this.showContrasenya = !this.showContrasenya
      },
      toggleShowConfirmPassword () {
        this.showConfirmaContrasenya = !this.showConfirmaContrasenya
      },
      registrar() {
        if (this.canRegister) {
          const data = {
            nom: this.nom,
            email: this.email,
            contrasenya: this.contrasenya
          }
          RegistreService.create(data)
          .then((res) => {
            const userId = res.id
            this.showToast("successToast");
            setTimeout(() => {
            this.$router.push({ path: "/login" });
          }, 2000);
          })
          .catch((error) => {
            this.showToast("errorToast");
          })
        } else {
          this.showToast("warningToast");
        }
      }
    },
    mounted() {
      var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
      tooltipTriggerList.forEach(el => {
      new Tooltip(el, {
        trigger: 'focus'
      });
    });
  }
}
</script>

<template>
  <div class="register-screen">
    <h2 class="title">Registra't</h2>
    
    <div class="input-group">
      <div class="label-container">
        <label for="email" class="label">Correu electrònic</label>
        <button type="button" class="tooltip-btn" data-bs-toggle="tooltip" title="Escriviu el vostre correu electrònic vàlid (exemple@example.com)">
          ?
        </button>
      </div>
      <input
        type="email"
        class="input-field rounded-3"
        id="email"
        v-model="email"
        placeholder="Introdueix el teu correu"
        required
        @input="validateMail"
      />
      <span v-if="emailValid === false" class="error-message mail-error">{{ emailErrorMessage }}</span>
    </div>

    <div class="input-group">
      <div class="label-container">
        <label for="nom" class="label">Nom</label>
        <button type="button" class="tooltip-btn" data-bs-toggle="tooltip" data-bs-placement="right" title="Escriviu el vostre nom complet. Aquest nom serà l'utilitzat amb el que els usuaris us cercaran. Es pot canviar més endavant">
          ?
        </button>
      </div>
      <input
        type="text"
        class="input-field rounded-3"
        id="nom"
        v-model="nom"
        placeholder="Introdueix el teu nom"
        @input="validateNom"
        required
      />
      <span v-if="nameValid === false" class="error-message name-error">{{ nameErrorMessage }}</span>
      <span class="info-text">Aquest serà el teu nom d'usuari visible i podràs modificar-lo més endavant.</span>
    </div>

    <div class="input-group">
      <div class="label-container">
        <label for="contrasenya" class="label">Contrasenya</label>
        <button type="button" class="tooltip-btn" data-bs-toggle="tooltip" data-bs-trigger="click" data-bs-placement="right" title="La contrasenya ha de tenir almenys 8 caràcters, incloent números, minúsucules i majúsucules.">
          ?
        </button>
      </div>
      <div class="input-wrapper">
        <input
          :type="showContrasenya ? 'text' : 'password'"
          class="input-field rounded-3"
          id="contrasenya"
          v-model="contrasenya"
          @input="validateContrasenya"
          required
          placeholder="Crea una contrasenya"
        />
        <span class="toggle-password toggle-contrasenya" @click="toggleShowPassword">
          <i :class="showContrasenya ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
        </span>
      </div>
      <span v-if="contrasenyaValid === false" class="error-message password-error">{{ contrasenyaErrorMessage }}</span>
    </div>

    <div class="input-group">
      <div class="label-container">
        <label for="confirmaContrasenya" class="label">Confirma la contrasenya</label>
        <button type="button" class="tooltip-btn" data-bs-toggle="tooltip" data-bs-placement="right" title="Confirmeu la mateixa contrasenya introduïda anteriorment.">
          ?
        </button>
      </div>
      <div class="input-wrapper">
        <input
          :type="showConfirmaContrasenya ? 'text' : 'password'"
          class="input-field rounded-3"
          id="confirmaContrasenya"
          v-model="confirmaContrasenya"
          required
          @input="validateConfirmPassword"
          placeholder="Repeteix la contrasenya"
        />
        <span class="toggle-password" @click="toggleShowConfirmPassword">
          <i :class="showConfirmaContrasenya ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
        </span>
      </div>
      <span v-if="confirmContrasenyaValid === false" class="error-message confirm-error">{{ confirmErrorMessage }}</span>
    </div>

    <button type="submit" class="submit-button" @click="registrar">Registra't</button>
    
    <div class="login-link">
      <span>Ja tens un compte? <a href="/login" class="login-link-text">Inicia sessió</a></span>
    </div>

    <div id="successToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-content success">
        ✅ Registre completat amb èxit!
      </div>
    </div>

    <div id="errorToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-content error">
        ❌ Error en el registre! Aquest correu ja està registrat.
      </div>
    </div>

    <div id="warningToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-content warning">
        ⚠️ Hi ha camps incorrectes!
      </div>
    </div>
  </div>
</template>

<style scoped>
.register-screen {
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

.tooltip-btn {
  color: #000;
  border: 1px solid #000;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  padding: 0;
  background-color: transparent;
  cursor: pointer;
}

.tooltip-btn:hover {
  background-color: #f0f0f0;
}

.toggle-password {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #000;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 5px;
  display: block;
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
  .register-screen {
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



