import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Building2, Mail, Phone, Users, Settings, LogOut, Plus } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useToastStore } from '../store/toastStore';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';

interface Usuario {
  id: string;
  nombre: string;
  email: string;
  role: 'admin' | 'operador';
  ultimoAcceso: string;
}

export const Cuenta: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { addToast } = useToastStore();
  const [activeTab, setActiveTab] = useState('perfil');

  // Mock users data
  const [usuarios] = useState<Usuario[]>([
    {
      id: '1',
      nombre: 'Juan Pérez',
      email: 'admin@demo.cl',
      role: 'admin',
      ultimoAcceso: '15/12/24'
    },
    {
      id: '2',
      nombre: 'María González',
      email: 'maria@demo.cl',
      role: 'operador',
      ultimoAcceso: '14/12/24'
    }
  ]);

  const handleSaveProfile = () => {
    addToast({
      type: 'success',
      title: 'Perfil actualizado',
      message: 'Los cambios han sido guardados exitosamente'
    });
  };

  const handleInviteUser = () => {
    addToast({
      type: 'info',
      title: 'Invitación enviada',
      message: 'Se ha enviado una invitación al email especificado'
    });
  };

  const tabs = [
    { id: 'perfil', label: 'Perfil', icon: User },
    { id: 'usuarios', label: 'Usuarios', icon: Users },
    { id: 'preferencias', label: 'Preferencias', icon: Settings }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Cuenta</h1>
          <p className="text-gray-400">Gestiona tu cuenta y configuración</p>
        </div>
        <Button variant="danger" onClick={logout}>
          <LogOut size={16} className="mr-2" />
          Cerrar sesión
        </Button>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#222222]">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center space-x-2 pb-4 border-b-2 transition-colors
                ${activeTab === tab.id
                  ? 'border-[#42E2E8] text-[#42E2E8]'
                  : 'border-transparent text-gray-400 hover:text-white'
                }
              `}
            >
              <tab.icon size={18} />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div>
        {activeTab === 'perfil' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Company Info */}
            <Card>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-[#42E2E8]/20 rounded-xl flex items-center justify-center">
                  <Building2 size={24} className="text-[#42E2E8]" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Información de la Empresa</h2>
                  <p className="text-gray-400">Datos de tu automotora</p>
                </div>
              </div>

              <div className="space-y-4">
                <Input
                  label="Razón Social"
                  value={user?.organizacion.razonSocial || ''}
                  readOnly
                />
                <Input
                  label="RUT"
                  value={user?.organizacion.rut || ''}
                  readOnly
                />
                <Input
                  label="Email"
                  value={user?.email || ''}
                  readOnly
                />
                <Input
                  label="Teléfono"
                  value={user?.organizacion.telefono || ''}
                />

                <Button onClick={handleSaveProfile} className="w-full">
                  Guardar cambios
                </Button>
              </div>
            </Card>

            {/* Account Summary */}
            <Card>
              <h2 className="text-xl font-semibold text-white mb-6">Resumen de Cuenta</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#0D0D0D] rounded-lg">
                  <div className="flex items-center space-x-3">
                    <User size={20} className="text-[#42E2E8]" />
                    <div>
                      <p className="font-medium text-white">Usuario Principal</p>
                      <p className="text-sm text-gray-400">{user?.name}</p>
                    </div>
                  </div>
                  <Badge variant="success">Activo</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#0D0D0D] rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Mail size={20} className="text-emerald-400" />
                    <div>
                      <p className="font-medium text-white">Email Verificado</p>
                      <p className="text-sm text-gray-400">{user?.email}</p>
                    </div>
                  </div>
                  <Badge variant="success">Verificado</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#0D0D0D] rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Phone size={20} className="text-amber-400" />
                    <div>
                      <p className="font-medium text-white">Teléfono</p>
                      <p className="text-sm text-gray-400">{user?.organizacion.telefono}</p>
                    </div>
                  </div>
                  <Badge variant="info">Contacto</Badge>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {activeTab === 'usuarios' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Usuarios de la Organización</h2>
                <Button onClick={handleInviteUser}>
                  <Plus size={16} className="mr-2" />
                  Invitar Usuario
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#222222] text-left">
                      <th className="py-3 text-gray-400 font-medium">Usuario</th>
                      <th className="py-3 text-gray-400 font-medium">Email</th>
                      <th className="py-3 text-gray-400 font-medium">Rol</th>
                      <th className="py-3 text-gray-400 font-medium">Último acceso</th>
                      <th className="py-3 text-gray-400 font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#222222]">
                    {usuarios.map((usuario) => (
                      <tr key={usuario.id} className="hover:bg-[#0D0D0D] transition-colors">
                        <td className="py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-[#42E2E8] rounded-full flex items-center justify-center">
                              <span className="text-black text-sm font-medium">
                                {usuario.nombre.charAt(0)}
                              </span>
                            </div>
                            <span className="font-medium text-white">{usuario.nombre}</span>
                          </div>
                        </td>
                        <td className="py-4 text-gray-400">{usuario.email}</td>
                        <td className="py-4">
                          <Badge variant={usuario.role === 'admin' ? 'info' : 'neutral'}>
                            {usuario.role === 'admin' ? 'Administrador' : 'Operador'}
                          </Badge>
                        </td>
                        <td className="py-4 text-gray-400">{usuario.ultimoAcceso}</td>
                        <td className="py-4">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              Editar
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                              Eliminar
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        )}

        {activeTab === 'preferencias' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <Card>
              <h2 className="text-xl font-semibold text-white mb-6">Preferencias Generales</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white">Notificaciones por email</p>
                    <p className="text-sm text-gray-400">Recibir alertas de vencimientos</p>
                  </div>
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-[#42E2E8] bg-[#0D0D0D] border-[#222222] rounded focus:ring-[#42E2E8]"
                    defaultChecked
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white">Recordatorios automáticos</p>
                    <p className="text-sm text-gray-400">Notificar 30 días antes del vencimiento</p>
                  </div>
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-[#42E2E8] bg-[#0D0D0D] border-[#222222] rounded focus:ring-[#42E2E8]"
                    defaultChecked
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Formato de fecha
                  </label>
                  <select className="w-full bg-[#0D0D0D] border border-[#222222] rounded-lg px-3 py-2 text-white">
                    <option value="DD/MM/YY">DD/MM/AA (15/12/24)</option>
                    <option value="MM/DD/YY">MM/DD/AA (12/15/24)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Zona horaria
                  </label>
                  <select className="w-full bg-[#0D0D0D] border border-[#222222] rounded-lg px-3 py-2 text-white">
                    <option value="America/Santiago">Chile Continental (UTC-3)</option>
                    <option value="Pacific/Easter">Isla de Pascua (UTC-5)</option>
                  </select>
                </div>

                <Button className="w-full">
                  Guardar preferencias
                </Button>
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-semibold text-white mb-6">Configuración Regional</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Moneda
                  </label>
                  <div className="flex items-center space-x-3 p-3 bg-[#0D0D0D] rounded-lg">
                    <span className="text-2xl">💰</span>
                    <div>
                      <p className="font-medium text-white">Peso Chileno (CLP)</p>
                      <p className="text-sm text-gray-400">$1.000.000</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Idioma
                  </label>
                  <div className="flex items-center space-x-3 p-3 bg-[#0D0D0D] rounded-lg">
                    <span className="text-2xl">🇨🇱</span>
                    <div>
                      <p className="font-medium text-white">Español (Chile)</p>
                      <p className="text-sm text-gray-400">es-CL</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-blue-400 font-medium text-sm mb-2">Configuración fija</p>
                  <p className="text-blue-300 text-xs">
                    El formato de fecha DD/MM/AA, moneda CLP e idioma es-CL están configurados 
                    por defecto para el mercado chileno.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};