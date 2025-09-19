import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Registre from '@/components/registre.vue';
import RegistreService from '@/services/RegistreServices.js';


describe('Registre Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Registre, {
      global: {
        stubs: ['router-link'],
      }
    });
  });

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('h2').text()).toContain("Registra't");
  });

  it('validates email regex', async () => {
    wrapper.setData({ email: 'invalid-email' });
    wrapper.vm.validateMail();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.emailValid).toBe(false);
    expect(wrapper.find('.error-message').text()).toContain('Format de correu electrònic no vàlid, ha de contenir una  "@". Exemple: exemple@exemple.exemple');

    wrapper.setData({ email: 'test@example.com'});
    wrapper.vm.validateMail();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.emailValid).toBe(true);
    expect(wrapper.find('.mail-error').exists()).toBe(false);
  });

  it('validates name regex', async () => {
    wrapper.setData({ nom: 'Casal;;' });
    wrapper.vm.validateNom();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.nameValid).toBe(false);
    expect(wrapper.find('.name-error').text()).toContain('El nom només pot contenir lletres espais i apòstrofs');

    wrapper.setData({ nom: 'Casal Joves'});
    wrapper.vm.validateNom();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.nameValid).toBe(true);
    expect(wrapper.find('.name-error').exists()).toBe(false);
  });

  it('validates password regex', async () => {
    wrapper.setData({ contrasenya: '123456' });
    wrapper.vm.validateContrasenya();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.contrasenyaValid).toBe(false);
    expect(wrapper.find('.password-error').text()).toContain('La contrasenya ha de tenir mímin 8 caràcters, una minúscula, una majúscula i un número');

    wrapper.setData({ contrasenya: 'password123' });
    wrapper.vm.validateContrasenya();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.contrasenyaValid).toBe(false);
    expect(wrapper.find('.password-error').text()).toContain('La contrasenya ha de tenir mímin 8 caràcters, una minúscula, una majúscula i un número');

    wrapper.setData({ contrasenya: 'Password123' });
    wrapper.vm.validateContrasenya();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.contrasenyaValid).toBe(true);
    expect(wrapper.find('.password-error').exists()).toBe(false);
  });

  it('validates password confirmation', async () => {
    wrapper.setData({ contrasenya: 'Password123', confirmaContrasenya: 'Password1234' });
    wrapper.vm.validateConfirmPassword();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.confirmContrasenyaValid).toBe(false);
    expect(wrapper.find('.confirm-error').text()).toContain('Les contrasenyes no coincideixen');
    
    wrapper.setData({ confirmaContrasenya: 'Password123' });
    wrapper.vm.validateConfirmPassword();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.confirmContrasenyaValid).toBe(true);
    expect(wrapper.find('.confirm-error').exists()).toBe(false);
  });

  it('checks if all fields are valid', async () => {
    wrapper.setData({
      emailValid: true,
      nameValid: true,
      contrasenyaValid: true,
      confirmContrasenyaValid: true,
    });
    expect(wrapper.vm.canRegister).toBe(true);

    wrapper.setData({ emailValid: false });
    expect(wrapper.vm.canRegister).toBe(false);
  });

  it('toggles password visibility', async () => {
    const passwordInput = wrapper.find('input#contrasenya');
    const toggleButton = wrapper.find('.toggle-contrasenya');

    expect(passwordInput.attributes('type')).toBe('password');

    await toggleButton.trigger('click');
    expect(passwordInput.attributes('type')).toBe('text');

    await toggleButton.trigger('click');
    expect(passwordInput.attributes('type')).toBe('password');
  }
  );

  it('displays success toast when registration is successful', async () => {
    const mockCreate = vi.spyOn(RegistreService, 'create').mockResolvedValue({ id: 1 });
  
    await wrapper.setData({
      email: 'test@example.com',
      nom: 'Test User',
      contrasenya: 'Password123',
      emailValid: true,
      nameValid: true,
      contrasenyaValid: true,
      confirmContrasenyaValid: true,
    });
  
    await wrapper.find('.submit-button').trigger('click');
    await wrapper.vm.$nextTick();
  
    const successToast = wrapper.find('#successToast');
    expect(successToast.exists()).toBe(true);
    expect(successToast.isVisible()).toBe(true);
  
    mockCreate.mockRestore();
  });

  it('displays error toast when registration fails', async () => {
    const mockCreate = vi.spyOn(RegistreService, 'create').mockRejectedValue(new Error('Error en el registro'));
  
    await wrapper.setData({
      email: 'test@example.com',
      nom: 'Test User',
      contrasenya: 'Password123',
      emailValid: true,
      nameValid: true,
      contrasenyaValid: true,
      confirmContrasenyaValid: true,
    });
  
    await wrapper.find('.submit-button').trigger('click');
    await wrapper.vm.$nextTick();
  
    const errorToast = wrapper.find('#errorToast');
    expect(errorToast.exists()).toBe(true);
    expect(errorToast.isVisible()).toBe(true);
  
    mockCreate.mockRestore();
  });

  it('displays warning toast when fields are empty', async () => {
    await wrapper.setData({
      email: '',
      nom: '',
      contrasenya: '',
      emailValid: false,
      nameValid: false,
      contrasenyaValid: false,
      confirmContrasenyaValid: false,
    });
  
    await wrapper.find('.submit-button').trigger('click');
    await wrapper.vm.$nextTick();
  
    const warningToast = wrapper.find('#warningToast');
    expect(warningToast.exists()).toBe(true);
    expect(warningToast.isVisible()).toBe(true);
  });

  it('initializes tooltips', async () => {
    const tooltipTrigger = wrapper.find('[data-bs-toggle="tooltip"]');
    await tooltipTrigger.trigger('focus');
    expect(tooltipTrigger.exists()).toBe(true);
  });
  
});


