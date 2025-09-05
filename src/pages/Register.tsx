import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useToastStore } from '../store/toastStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuthStore();
  const { addToast } = useToastStore();
  const [formData, setFormData] = useState({
    razonSocial: '',
    rut: '',
    responsable: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      addToast({
        type: 'error',
        title: 'Error',
        message: 'Las contraseñas no coinciden'
      });
      return;
    }

    setIsLoading(true);

    try {
      const success = await register(formData);
      if (success) {
        addToast({
          type: 'success',
          title: 'Cuenta creada',
          message: 'Tu cuenta ha sido creada exitosamente'
        });
        navigate('/app');
      }
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Error',
        message: 'Ocurrió un error al crear la cuenta'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatRut = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 1) return numbers;
    if (numbers.length <= 8) {
      return numbers.replace(/(\d{1,2})(\d{3})(\d{3})/, '$1.$2.$3');
    }
    return numbers.replace(/(\d{1,2})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4');
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="p-8">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-[#42E2E8] rounded-xl flex items-center justify-center">
                <Shield size={24} className="text-black" />
              </div>
              <span className="text-2xl font-bold text-white">VerifAuto</span>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Crear cuenta</h1>
            <p className="text-gray-400">Registra tu automotora</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Razón social"
              placeholder="Automotora Demo SpA"
              value={formData.razonSocial}
              onChange={(e) => setFormData({...formData, razonSocial: e.target.value})}
              required
            />

            <Input
              label="RUT empresa"
              placeholder="76.123.456-7"
              value={formData.rut}
              onChange={(e) => setFormData({...formData, rut: formatRut(e.target.value)})}
              maxLength={12}
              required
            />

            <Input
              label="Nombre responsable"
              placeholder="Juan Pérez"
              value={formData.responsable}
              onChange={(e) => setFormData({...formData, responsable: e.target.value})}
              required
            />

            <Input
              label="Email empresarial"
              type="email"
              placeholder="contacto@empresa.cl"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />

            <Input
              label="Teléfono"
              placeholder="+56 9 8765 4321"
              value={formData.telefono}
              onChange={(e) => setFormData({...formData, telefono: e.target.value})}
              required
            />

            <div className="relative">
              <Input
                label="Contraseña"
                type={showPassword ? 'text' : 'password'}
                placeholder="Mínimo 6 caracteres"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                minLength={6}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <div className="relative">
              <Input
                label="Confirmar contraseña"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Repite la contraseña"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-8 text-gray-400 hover:text-white transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full mt-6"
            >
              Crear cuenta
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className="text-[#42E2E8] hover:underline">
                Iniciar sesión
              </Link>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};