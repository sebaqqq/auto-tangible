import React from 'react';
import { motion } from 'framer-motion';
import { Car, Shield, AlertTriangle, Plus, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAutosStore } from '../store/autosStore';
import { useVerificacionesStore } from '../store/verificacionesStore';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { autos } = useAutosStore();
  const { verificaciones } = useVerificacionesStore();

  // Calculate KPIs
  const totalAutos = autos.length;
  const totalVerificaciones = verificaciones.length;
  const verificacionesConAlertas = verificaciones.filter(v => v.resultado === 'alertas').length;
  const ultimasVerificaciones = verificaciones.slice(-5).reverse();

  const kpis = [
    {
      title: 'Autos Registrados',
      value: totalAutos,
      icon: Car,
      color: 'text-[#42E2E8]',
      bgColor: 'bg-[#42E2E8]/20'
    },
    {
      title: 'Verificaciones Realizadas',
      value: totalVerificaciones,
      icon: Shield,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/20'
    },
    {
      title: 'Verificaciones con Alertas',
      value: verificacionesConAlertas,
      icon: AlertTriangle,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/20'
    }
  ];

  const getResultadoBadge = (resultado: string) => {
    switch (resultado) {
      case 'sin_hallazgos':
        return <Badge variant="success">Sin hallazgos</Badge>;
      case 'alertas':
        return <Badge variant="error">Alertas</Badge>;
      case 'revision_recomendada':
        return <Badge variant="warning">Revisión recomendada</Badge>;
      default:
        return <Badge variant="neutral">Pendiente</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Panel principal de tu automotora</p>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpis.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card hoverable>
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-xl ${kpi.bgColor} flex items-center justify-center`}>
                  <kpi.icon size={24} className={kpi.color} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{kpi.title}</p>
                  <p className="text-2xl font-bold text-white">{kpi.value}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Accesos Rápidos</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/app/autos')}
            className="p-4 bg-[#0D0D0D] rounded-lg border border-[#222222] cursor-pointer hover:border-[#42E2E8] transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#42E2E8]/20 rounded-lg flex items-center justify-center">
                  <Plus size={20} className="text-[#42E2E8]" />
                </div>
                <div>
                  <h3 className="font-medium text-white">Agregar Auto</h3>
                  <p className="text-sm text-gray-400">Registra un nuevo vehículo</p>
                </div>
              </div>
              <ArrowRight size={16} className="text-gray-400" />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/app/verificar')}
            className="p-4 bg-[#0D0D0D] rounded-lg border border-[#222222] cursor-pointer hover:border-[#42E2E8] transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <Shield size={20} className="text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-medium text-white">Verificar Automóvil</h3>
                  <p className="text-sm text-gray-400">Realizar nueva verificación</p>
                </div>
              </div>
              <ArrowRight size={16} className="text-gray-400" />
            </div>
          </motion.div>
        </div>
      </Card>

      {/* Recent Verifications */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Últimas Verificaciones</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/app/verificar')}
          >
            Ver todas
          </Button>
        </div>

        {ultimasVerificaciones.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#222222] text-left">
                  <th className="py-2 text-gray-400 font-medium">Patente</th>
                  <th className="py-2 text-gray-400 font-medium">Fecha</th>
                  <th className="py-2 text-gray-400 font-medium">Resultado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#222222]">
                {ultimasVerificaciones.map((verificacion) => (
                  <motion.tr
                    key={verificacion.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-[#0D0D0D] transition-colors"
                  >
                    <td className="py-3">
                      <span className="font-medium text-white">{verificacion.patente}</span>
                    </td>
                    <td className="py-3 text-gray-400">{verificacion.fecha}</td>
                    <td className="py-3">
                      {getResultadoBadge(verificacion.resultado)}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <Shield size={48} className="text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 mb-4">No hay verificaciones recientes</p>
            <Button onClick={() => navigate('/app/verificar')}>
              Realizar primera verificación
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};