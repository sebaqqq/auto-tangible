import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useToastStore } from "../store/toastStore";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card } from "../components/ui/Card";
import Logo from "../images/logo.png";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const { addToast } = useToastStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        addToast({
          type: "success",
          title: "Sesión iniciada",
          message: "Bienvenido de vuelta",
        });
        navigate("/app");
      } else {
        addToast({
          type: "error",
          title: "Error de autenticación",
          message: "Email o contraseña incorrectos",
        });
      }
    } catch (error) {
      addToast({
        type: "error",
        title: "Error",
        message: "Ocurrió un error inesperado",
      });
    } finally {
      setIsLoading(false);
    }
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
              <img src={Logo} alt="Logo Letras" className="h-20" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">
              Iniciar sesión
            </h1>
            <p className="text-gray-400">Accede a tu cuenta empresarial</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email empresarial"
              type="email"
              placeholder="admin@demo.cl"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />

            <div className="relative">
              <Input
                label="Contraseña"
                type={showPassword ? "text" : "password"}
                placeholder="demo123"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
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

            <Button type="submit" isLoading={isLoading} className="w-full">
              Iniciar sesión
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              ¿No tienes cuenta?{" "}
              <Link to="/registro" className="text-[#42E2E8] hover:underline">
                Crear cuenta
              </Link>
            </p>
          </div>

          {/* Demo credentials */}
          <div className="mt-6 p-4 bg-[#0D0D0D] rounded-lg border border-[#222222]">
            <p className="text-xs text-gray-400 mb-2">Credenciales de demo:</p>
            <p className="text-xs text-gray-300">Email: admin@demo.cl</p>
            <p className="text-xs text-gray-300">Contraseña: demo123</p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
