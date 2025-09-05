import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, AlertTriangle, Clock, Copy, Save, AlertCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useVerificacionesStore } from '../store/verificacionesStore';
import { useAutosStore } from '../store/autosStore';
import { useToastStore } from '../store/toastStore';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Verificacion } from '../types';

export const VerificarAuto: React.FC = () => {
  const location = useLocation();
  const { verificarAuto } = useVerificacionesStore();
  const { getAutoByPatente } = useAutosStore();
  const { addToast } = useToastStore();
  
  const [formData, setFormData] = useState({
    patente: location.state?.patente || '',
    vin: '',
    nombrePropietario: '',
    email: '',
    telefono: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [resultado, setResultado] = useState<Verificacion | null>(null);

  const checklist = [
    { id: 1, label: 'Historial Criminal', completed: true },
    { id: 2, label: 'Historial Vehicular', completed: true },
    { id: 3, label: 'Múltiples Propietarios', completed: true }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      const verificacion = verificarAuto(formData);
      setResultado(verificacion);
      
      addToast({
        type: 'success',
        title: 'Verificación completada',
        message: `Verificación de ${formData.patente} realizada exitosamente`
      });
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Error',
        message: 'Ocurrió un error durante la verificación'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getResultIcon = (estado: string) => {
    switch (estado) {
      case 'sin_registros':
      case 'sin_siniestros':
        return <CheckCircle size={20} className="text-emerald-400" />;
      case 'alertas':
      case 'incidentes_menores':
        return <AlertTriangle size={20} className="text-red-400" />;
      case 'sin_datos':
      case 'falta_registros':
        return <AlertCircle size={20} className="text-amber-400" />;
      default:
        return <Clock size={20} className="text-gray-400" />;
    }
  };

  const getResultBadge = (resultado: string) => {
    switch (resultado) {
      case 'sin_hallazgos':
        return <Badge variant="success">Sin hallazgos</Badge>;
      case 'alertas':
        return <Badge variant="error">Alertas detectadas</Badge>;
      case 'revision_recomendada':
        return <Badge variant="warning">Revisión recomendada</Badge>;
      default:
        return <Badge variant="neutral">Procesando</Badge>;
    }
  };

  const handleCopyResults = () => {
    if (!resultado) return;

    const text = `
VERIFICACIÓN DE VEHÍCULO - ${resultado.patente}
Fecha: ${resultado.fecha}
Resultado: ${resultado.resultado.replace(/_/g, ' ').toUpperCase()}

HISTORIAL CRIMINAL:
${resultado.historialCriminal.detalle}

HISTORIAL VEHICULAR:
${resultado.historialVehicular.detalle}

MÚLTIPLES PROPIETARIOS:
${resultado.multiplesPropietarios.detalle}

Generado por VerifAuto
    `.trim();

    navigator.clipboard.writeText(text);
    addToast({
      type: 'success',
      title: 'Copiado',
      message: 'Resumen copiado al portapapeles'
    });
  };

  const handleSaveToHistory = () => {
    if (!resultado) return;

    addToast({
      type: 'success',
      title: 'Guardado',
      message: 'Verificación guardada en el historial'
    });
  };

  if (resultado) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Resultado de Verificación</h1>
            <p className="text-gray-400">Patente: {resultado.patente} • {resultado.fecha}</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="secondary" onClick={() => setResultado(null)}>
              Nueva Verificación
            </Button>
            <Button variant="secondary" onClick={handleCopyResults}>
              <Copy size={16} className="mr-2" />
              Copiar Resumen
            </Button>
            <Button onClick={handleSaveToHistory}>
              <Save size={16} className="mr-2" />
              Guardar en Historial
            </Button>
          </div>
        </div>

        {/* Overall Result */}
        <Card>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#42E2E8] to-[#3FD0DD] rounded-xl flex items-center justify-center">
                <Shield size={28} className="text-black" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Verificación Completada</h2>
                <div className="mt-2">
                  {getResultBadge(resultado.resultado)}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Results Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Criminal History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  {getResultIcon(resultado.historialCriminal.estado)}
                  <h3 className="font-semibold text-white">Historial Criminal</h3>
                </div>
                <p className="text-gray-300 text-sm">
                  {resultado.historialCriminal.detalle}
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Vehicle History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  {getResultIcon(resultado.historialVehicular.estado)}
                  <h3 className="font-semibold text-white">Historial Vehicular</h3>
                </div>
                <p className="text-gray-300 text-sm">
                  {resultado.historialVehicular.detalle}
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Multiple Owners */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  {getResultIcon('owners')}
                  <h3 className="font-semibold text-white">Múltiples Propietarios</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Cantidad:</span>
                    <span className="text-white font-medium">{resultado.multiplesPropietarios.cantidad}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Último cambio:</span>
                    <span className="text-white font-medium">{resultado.multiplesPropietarios.ultimoCambio}</span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">
                  {resultado.multiplesPropietarios.detalle}
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Verificar Automóvil</h1>
        <p className="text-gray-400">Realiza una verificación completa del vehículo</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <Card>
          <h2 className="text-xl font-semibold text-white mb-6">Datos del Vehículo</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Patente"
              placeholder="ABC123"
              value={formData.patente}
              onChange={(e) => setFormData({...formData, patente: e.target.value.toUpperCase()})}
              required
            />

            <Input
              label="VIN (opcional)"
              placeholder="WBA3A5G54DNS12345"
              value={formData.vin}
              onChange={(e) => setFormData({...formData, vin: e.target.value})}
            />

            <Input
              label="Nombre propietario (opcional)"
              placeholder="Juan Pérez"
              value={formData.nombrePropietario}
              onChange={(e) => setFormData({...formData, nombrePropietario: e.target.value})}
            />

            <Input
              label="Email (opcional)"
              type="email"
              placeholder="contacto@ejemplo.cl"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />

            <Input
              label="Teléfono (opcional)"
              placeholder="+56 9 1234 5678"
              value={formData.telefono}
              onChange={(e) => setFormData({...formData, telefono: e.target.value})}
            />

            <div className="pt-4">
              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full"
                disabled={!formData.patente}
              >
                {isLoading ? 'Verificando...' : 'Iniciar Verificación'}
              </Button>
            </div>
          </form>
        </Card>

        {/* Checklist */}
        <Card>
          <h2 className="text-xl font-semibold text-white mb-6">Proceso de Verificación</h2>
          
          <div className="space-y-6">
            <p className="text-gray-400 text-sm">
              El proceso incluye la revisión de las siguientes fuentes:
            </p>

            <div className="space-y-4">
              {checklist.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: item.id * 0.1 }}
                  className="flex items-center space-x-3 p-3 bg-[#0D0D0D] rounded-lg"
                >
                  <div className="flex-shrink-0">
                    {item.completed ? (
                      <CheckCircle size={20} className="text-emerald-400" />
                    ) : (
                      <div className="w-5 h-5 border-2 border-gray-600 rounded-full" />
                    )}
                  </div>
                  <span className="text-white font-medium">{item.label}</span>
                </motion.div>
              ))}
            </div>

            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-start space-x-2">
                <Shield size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-blue-400 font-medium text-sm">Información importante</p>
                  <p className="text-blue-300 text-xs mt-1">
                    La verificación utiliza datos mock para fines demostrativos. 
                    Los resultados varían según la patente ingresada.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};