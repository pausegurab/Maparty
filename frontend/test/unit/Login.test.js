import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Login from '@/components/login.vue'; 
import LoginService from '@/services/LoginServices.js';

describe ('Login Component', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(Login, {
            global: {
                stubs: ['router-link'],
            }
        });
    });

    it('renders correctly', () => {
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.find('h2').text()).toContain("Inicia Sessió");
    });

    it('toggles password visibility', async () => {
        const passwordInput = wrapper.find('input#contrasenya');
        const toggleButton = wrapper.find('.toggle-password');
    
        expect(passwordInput.attributes('type')).toBe('password');
    
        await toggleButton.trigger('click');
        expect(passwordInput.attributes('type')).toBe('text');
    
        await toggleButton.trigger('click');
        expect(passwordInput.attributes('type')).toBe('password');
      });

      it('displays success toast when registration is successful', async () => {
          const mockCreate = vi.spyOn(LoginService, 'login').mockResolvedValue({ id: 1 });
        
          await wrapper.setData({
            email: 'test@example.com',
            contrasenya: 'Password123',
          });
        
          await wrapper.find('.submit-button').trigger('click');
          await wrapper.vm.$nextTick();
        
          const successToast = wrapper.find('#successToast');
          expect(successToast.exists()).toBe(true);
          expect(successToast.isVisible()).toBe(true);
        
          mockCreate.mockRestore();
        });

        it('displays warning toast when fields are empty', async () => {
            await wrapper.setData({
              email: '',
              contrasenya: '',
            });
          
            await wrapper.find('.submit-button').trigger('click');
            await wrapper.vm.$nextTick();
          
            const warningToast = wrapper.find('#warningToast');
            expect(warningToast.exists()).toBe(true);
            expect(warningToast.isVisible()).toBe(true);
          });

        
          it('displays error toast when registration fails', async () => {
            const mockCreate = vi.spyOn(LoginService, 'login').mockRejectedValue(new Error('Error en el login'));
          
            await wrapper.setData({
              email: 'test@example.com',
              contrasenya: 'Password123',
            });
          
            await wrapper.find('.submit-button').trigger('click');
            await wrapper.vm.$nextTick();
          
            const errorToast = wrapper.find('#errorToast');
            expect(errorToast.exists()).toBe(true);
            expect(errorToast.isVisible()).toBe(true);
          
            mockCreate.mockRestore();
          });

    


    


});
