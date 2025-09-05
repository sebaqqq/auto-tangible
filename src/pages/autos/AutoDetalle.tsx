import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Car,
  Calendar,
  FileText,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { useAutosStore } from '../../store/autosStore';

const CarDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getAutoById } = useAutosStore();

  const auto = getAutoById(id!);

  if (!auto) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">
            Auto no encontrado
          </h1>
          <p className="text-gray-400 mb-6">
            El vehículo que buscas no existe o ha sido eliminado.
          </p>
          <button
            onClick={() => navigate('/app/autos')}
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors"
          >
            Volver a Mis Autos
          </button>
        </div>
      </div>
    );
  }

  const onBack = () => navigate('/app/autos');
  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const getStatusColor = (vigente: boolean) => {
    return vigente
      ? 'text-green-400 bg-green-400/10'
      : 'text-red-400 bg-red-400/10';
  };

  const getStatusIcon = (vigente: boolean) => {
    return vigente ? CheckCircle : AlertCircle;
  };

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="p-2 hover:bg-zinc-800 rounded-lg transition-colors flex items-center gap-2 text-gray-300 hover:text-white"
          >
            <ArrowLeft size={20} />
            Volver
          </button>
          <div className="flex items-center gap-3">
            <Car size={24} className="text-cyan-400" />
            <h1 className="text-2xl font-bold">Detalle del Vehículo</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Información Principal */}
          <div className="lg:col-span-2 bg-zinc-800/50 rounded-xl p-6 border border-zinc-700/50">
            <h2 className="text-xl font-semibold mb-6 text-cyan-400">
              Información del Vehículo
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400">Patente</label>
                  <p className="text-lg font-mono font-bold text-white bg-zinc-700/50 px-3 py-2 rounded-lg inline-block">
                    {auto.patente}
                  </p>
                </div>

                <div>
                  <label className="text-sm text-gray-400">VIN</label>
                  <p className="text-sm font-mono text-gray-200 bg-zinc-700/50 px-3 py-2 rounded-lg">
                    {auto.vin || 'No especificado'}
                  </p>
                </div>

                <div>
                  <label className="text-sm text-gray-400">Marca</label>
                  <p className="text-lg font-semibold text-white">
                    {auto.marca}
                  </p>
                </div>

                <div>
                  <label className="text-sm text-gray-400">Modelo</label>
                  <p className="text-lg font-semibold text-white">
                    {auto.modelo}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400">Año</label>
                  <p className="text-lg font-semibold text-white">{auto.año}</p>
                </div>

                <div>
                  <label className="text-sm text-gray-400">Color</label>
                  <p className="text-lg font-semibold text-white">
                    {auto.color}
                  </p>
                </div>

                <div>
                  <label className="text-sm text-gray-400">Kilómetros</label>
                  <p className="text-lg font-semibold text-white">
                    {auto.kilometros
                      ? auto.kilometros.toLocaleString() + ' km'
                      : 'No especificado'}
                  </p>
                </div>

                <div>
                  <label className="text-sm text-gray-400">Registrado</label>
                  <p className="text-sm text-gray-200 flex items-center gap-2">
                    <Calendar size={16} />
                    {formatFecha(auto.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Estado de Documentos */}
          <div className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700/50">
            <h2 className="text-xl font-semibold mb-6 text-cyan-400 flex items-center gap-2">
              <FileText size={20} />
              Estado de Documentos
            </h2>

            <div className="space-y-4">
              {Object.entries(auto.documentos).map(([tipo, documento]) => {
                const StatusIcon = getStatusIcon(documento.vigente);
                return (
                  <div
                    key={tipo}
                    className="bg-zinc-700/30 rounded-lg p-4 border border-zinc-600/30"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-white uppercase tracking-wide">
                        {tipo === 'rt'
                          ? 'RT'
                          : tipo === 'soap'
                          ? 'SOAP'
                          : 'Permiso'}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          documento.vigente
                        )} flex items-center gap-1`}
                      >
                        <StatusIcon size={14} />
                        {getStatusStatus(documento.vigente)}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Emisión:</span>
                        <span className="text-gray-200">{documento.fecha}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Vencimiento:</span>
                        <span className="text-gray-200">
                          {documento.vencimiento}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Resumen de estado */}
            <div className="mt-6 pt-4 border-t border-zinc-600/30">
              <div className="flex items-center gap-2 text-sm">
                {Object.values(auto.documentos).every((doc) => doc.vigente) ? (
                  <>
                    <CheckCircle size={16} className="text-green-400" />
                    <span className="text-green-400 font-medium">
                      Todos los documentos vigentes
                    </span>
                  </>
                ) : (
                  <>
                    <AlertCircle size={16} className="text-amber-400" />
                    <span className="text-amber-400 font-medium">
                      Documentos con vencimientos
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="mt-8 flex gap-4">
          <button className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors">
            Editar Información
          </button>
          <button className="px-6 py-3 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg font-medium transition-colors">
            Actualizar Documentos
          </button>
          <button className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors">
            Generar Reporte
          </button>
        </div>
      </div>
    </div>
  );
};

function getStatusStatus(vigente: boolean): string {
  return vigente ? 'Vigente' : 'Vencido';
}

export default CarDetail;
