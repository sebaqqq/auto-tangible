import React, { useState } from "react";
import { motion } from "framer-motion";
import { Car, Plus, Eye, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAutosStore } from "../store/autosStore";
import { useToastStore } from "../store/toastStore";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Modal } from "../components/ui/Modal";
import { Input } from "../components/ui/Input";
import { Auto } from "../types";

export const MisAutos: React.FC = () => {
  const navigate = useNavigate();
  const { autos, addAuto, removeAuto } = useAutosStore();
  const { addToast } = useToastStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [autoToDelete, setAutoToDelete] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    patente: "",
    vin: "",
    marca: "",
    modelo: "",
    año: new Date().getFullYear(),
    color: "",
    kilometros: "",
    notas: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newAuto = {
      ...formData,
      patente: formData.patente.toUpperCase(),
      kilometros: formData.kilometros
        ? parseInt(formData.kilometros)
        : undefined,
      documentos: {
        permiso: { fecha: "", vencimiento: "", vigente: false },
        rt: { fecha: "", vencimiento: "", vigente: false },
        soap: { fecha: "", vencimiento: "", vigente: false },
      },
    };

    addAuto(newAuto);
    addToast({
      type: "success",
      title: "Auto agregado",
      message: `${formData.marca} ${formData.modelo} registrado exitosamente`,
    });

    setFormData({
      patente: "",
      vin: "",
      marca: "",
      modelo: "",
      año: new Date().getFullYear(),
      color: "",
      kilometros: "",
      notas: "",
    });
    setShowAddModal(false);
  };

  const handleDelete = (id: string) => {
    removeAuto(id);
    addToast({
      type: "success",
      title: "Auto eliminado",
      message: "El vehículo ha sido eliminado del sistema",
    });
    setAutoToDelete(null);
  };

  const getDocumentStatus = (auto: Auto) => {
    const { permiso, rt, soap } = auto.documentos;
    const statuses = [];

    if (permiso.vigente)
      statuses.push(
        <Badge key="permiso" variant="success">
          Permiso
        </Badge>
      );
    if (rt.vigente)
      statuses.push(
        <Badge key="rt" variant="success">
          RT
        </Badge>
      );
    if (soap.vigente)
      statuses.push(
        <Badge key="soap" variant="success">
          SOAP
        </Badge>
      );

    if (!permiso.vigente)
      statuses.push(
        <Badge key="permiso-exp" variant="error">
          Permiso
        </Badge>
      );
    if (!rt.vigente)
      statuses.push(
        <Badge key="rt-exp" variant="error">
          RT
        </Badge>
      );
    if (!soap.vigente)
      statuses.push(
        <Badge key="soap-exp" variant="error">
          SOAP
        </Badge>
      );

    return statuses;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Mis Autos</h1>
          <p className="text-gray-400">Gestiona tu flota de vehículos</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus size={16} className="mr-2" />
          Agregar Auto
        </Button>
      </div>

      {/* Cars Grid */}
      {autos.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {autos.map((auto, index) => (
            <motion.div
              key={auto.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hoverable>
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-white text-lg">
                        {auto.patente}
                      </h3>
                      <p className="text-gray-400">
                        {auto.marca} {auto.modelo}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => navigate(`/app/autos/${auto.id}`)}
                        className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-[#0D0D0D] transition-colors"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => setAutoToDelete(auto.id)}
                        className="p-2 text-gray-400 hover:text-red-400 rounded-lg hover:bg-[#0D0D0D] transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Año:</span>
                      <span className="text-white">{auto.año}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Color:</span>
                      <span className="text-white">{auto.color}</span>
                    </div>
                    {auto.kilometros && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Kilometros:</span>
                        <span className="text-white">
                          {auto.kilometros.toLocaleString("es-CL")} km
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Document Status */}
                  <div className="space-y-2">
                    <p className="text-sm text-gray-400">
                      Estado de documentos:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {getDocumentStatus(auto)}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-[#222222]">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full"
                      onClick={() =>
                        navigate("/app/verificar", {
                          state: { patente: auto.patente },
                        })
                      }
                    >
                      Verificar ahora
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <Card>
          <div className="text-center py-12">
            <Car size={64} className="text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No tienes autos registrados
            </h3>
            <p className="text-gray-400 mb-6">
              Comienza agregando tu primer vehículo
            </p>
            <Button onClick={() => setShowAddModal(true)}>
              <Plus size={16} className="mr-2" />
              Agregar primer auto
            </Button>
          </div>
        </Card>
      )}

      {/* Add Car Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Agregar Nuevo Auto"
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Patente"
              placeholder="ABC123"
              value={formData.patente}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  patente: e.target.value.toUpperCase(),
                })
              }
              required
            />
            <Input
              label="VIN (opcional)"
              placeholder="WBA3A5G54DNS12345"
              value={formData.vin}
              onChange={(e) =>
                setFormData({ ...formData, vin: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Marca"
              placeholder="Toyota"
              value={formData.marca}
              onChange={(e) =>
                setFormData({ ...formData, marca: e.target.value })
              }
              required
            />
            <Input
              label="Modelo"
              placeholder="Corolla"
              value={formData.modelo}
              onChange={(e) =>
                setFormData({ ...formData, modelo: e.target.value })
              }
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Año"
              type="number"
              min="1950"
              max={new Date().getFullYear() + 1}
              value={formData.año}
              onChange={(e) =>
                setFormData({ ...formData, año: parseInt(e.target.value) })
              }
              required
            />
            <Input
              label="Color"
              placeholder="Blanco"
              value={formData.color}
              onChange={(e) =>
                setFormData({ ...formData, color: e.target.value })
              }
              required
            />
          </div>

          <Input
            label="Kilometraje (opcional)"
            type="number"
            placeholder="50000"
            value={formData.kilometros}
            onChange={(e) =>
              setFormData({ ...formData, kilometros: e.target.value })
            }
          />

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Notas (opcional)
            </label>
            <textarea
              placeholder="Información adicional sobre el vehículo..."
              value={formData.notas}
              onChange={(e) =>
                setFormData({ ...formData, notas: e.target.value })
              }
              className="w-full bg-[#0D0D0D] border border-[#222222] rounded-lg px-3 py-2
                       text-white placeholder:text-gray-500 resize-none h-24
                       focus:outline-none focus:ring-2 focus:ring-[#42E2E8]/20 focus:border-[#42E2E8]"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="submit" className="flex-1">
              Agregar Auto
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowAddModal(false)}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!autoToDelete}
        onClose={() => setAutoToDelete(null)}
        title="Eliminar Auto"
      >
        <div className="space-y-4">
          <p className="text-gray-300">
            ¿Estás seguro que deseas eliminar este vehículo? Esta acción no se
            puede deshacer.
          </p>
          <div className="flex space-x-3">
            <Button
              variant="danger"
              onClick={() => handleDelete(autoToDelete!)}
              className="flex-1"
            >
              Eliminar
            </Button>
            <Button variant="secondary" onClick={() => setAutoToDelete(null)}>
              Cancelar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
