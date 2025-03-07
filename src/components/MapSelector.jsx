import React, { useState, useContext } from 'react';
import { Context } from '../js/store/appContext.js';
import hierarchicalData from '../hierarchical_data.json';
import hierarchical_data_federal from '../hierarchical_data_federal.json';
import './MapSelector.css';
// import { MdWidthNormal } from 'react-icons/md';
import RedirectToHome from './RedirectHome.jsx';

const MapSelector = () => {
    const { actions } = useContext(Context);

    // Estados locales
    const [ambito, setAmbito] = useState('');
    const [entidad, setEntidad] = useState('');
    const [distrito, setDistrito] = useState('');
    const [seccion, setSeccion] = useState('');

    // Sistema de selección dinámico
    const [selectedEntidad, setSelectedEntidad] = useState('');
    const [selectedDistrito, setSelectedDistrito] = useState('');
    const [selectedSeccion, setSelectedSeccion] = useState('');


    const entidades =
        ambito === "fed"
            ? Object.keys(hierarchical_data_federal)
            : Object.keys(hierarchicalData);

    const distritos =
        selectedEntidad &&
            (ambito === "fed"
                ? hierarchical_data_federal[selectedEntidad]
                : hierarchicalData[selectedEntidad])
            ? Object.keys(
                ambito === "fed"
                    ? hierarchical_data_federal[selectedEntidad]
                    : hierarchicalData[selectedEntidad]
            )
            : [];

    const secciones =
        selectedDistrito &&
            selectedEntidad &&
            (ambito === "fed"
                ? hierarchical_data_federal[selectedEntidad][selectedDistrito]
                : hierarchicalData[selectedEntidad][selectedDistrito])
            ? ambito === "fed"
                ? hierarchical_data_federal[selectedEntidad][selectedDistrito]
                : hierarchicalData[selectedEntidad][selectedDistrito]
            : [];


    const handleAmbitoChange = (e) => {
        setAmbito(e.target.value); // Guardar ambito (loc o fed)
    };

    const handleEntidadChange = (e) => {
        const value = e.target.value;
        setSelectedEntidad(value); // Actualizar la selección visible
        setEntidad(value); // Guardar en el estado local
        setSelectedDistrito(''); // Reset distritos al cambiar entidad
        setDistrito(''); // Reset distrito en el estado local
        setSelectedSeccion(''); // Reset secciones al cambiar entidad
        setSeccion(''); // Reset seccion en el estado local
    };

    const handleDistritoChange = (e) => {
        const value = e.target.value;
        setSelectedDistrito(value); // Actualizar la selección visible
        setDistrito(value); // Guardar en el estado local
        setSelectedSeccion(''); // Reset secciones al cambiar distrito
        setSeccion(''); // Reset seccion en el estado local
    };

    const handleSeccionChange = (e) => {
        const value = e.target.value;
        setSelectedSeccion(value); // Actualizar la selección visible
        setSeccion(value); // Guardar en el estado local
    };

    const buildUrl = () => {
        const entidadMapping = {
            AGUASCALIENTES: 1,
            "BAJA CALIFORNIA": 2,
            "BAJA CALIFORNIA SUR": 3,
            CAMPECHE: 4,
            "COAHUILA DE ZARAGOZA": 5,
            COLIMA: 6,
            CHIAPAS: 7,
            CHIHUAHUA: 8,
            "CIUDAD DE MEXICO": 9,
            DURANGO: 10,
            GUANAJUATO: 11,
            GUERRERO: 12,
            HIDALGO: 13,
            JALISCO: 14,
            MEXICO: 15,
            "MICHOACAN DE OCAMPO": 16,
            MORELOS: 17,
            NAYARIT: 18,
            "NUEVO LEON": 19,
            OAXACA: 20,
            PUEBLA: 21,
            QUERETARO: 22,
            "QUINTANA ROO": 23,
            "SAN LUIS POTOSI": 24,
            SINALOA: 25,
            SONORA: 26,
            TABASCO: 27,
            TAMAULIPAS: 28,
            TLAXCALA: 29,
            VERACRUZ: 30,
            YUCATAN: 31,
            ZACATECAS: 32,
        };

        const entidadNumero = entidadMapping[entidad] || ''; // Convertir el nombre de la entidad a su número
        console.log('Entidad convertida a número:', entidadNumero); // Debugging

        return `https://cartografia.ine.mx/sige8/api/planosMapas?producto=psi&ambito=${ambito}&corte_mes=dic&corte=2022&entidad=${entidadNumero}&distrito=${distrito}&seccion=${seccion}`;
    };

    const handleDownload = async () => {
        if (!ambito) {
            alert("Te faltan completar el ámbito")
            return;
        }
        if (!entidad) {
            alert("Te faltan completar la entidad")
            return;
        }
        if (!distrito) {
            alert("Te faltan completar el distrito")
            return;
        }
        if (!seccion) {
            alert("Te faltan completar la sección")
            return;
        }
        const url = buildUrl(); // URL inicial
        console.log('URL inicial:', url);

        try {
            // Obtener la URL de descarga desde el action
            const downloadUrl = await actions.getMapUrl(url);

            console.log('Descargando desde URL:', downloadUrl);

            // Extraer el nombre del archivo desde la URL
            const filename = downloadUrl.split('/').pop(); // Obtiene el último segmento de la URL

            // Crear un enlace temporal para forzar la descarga
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = filename; // Usar el nombre del archivo dinámicamente
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            console.log('Descarga iniciada con éxito');
        } catch (error) {
            console.error('Error al intentar descargar el archivo:', error);
            alert('Ocurrió un error al intentar descargar el archivo.');
        }
    };

    const token = localStorage.getItem('token');

    return (
        <div>
            {token ? (
                <div className='container'>
                    <h3 className='heading'>Cartografía</h3>

                    {/* Selección de ámbito */}
                    <div className='fondos'>
                    <h5 className='subheading'>Ámbito</h5>
                        <select
                            value={ambito}
                            onChange={handleAmbitoChange}
                            className="input"
                        >
                            <option value="">Seleccionar Ámbito</option>
                            <option value="fed">Federal</option>
                            <option value="loc">Local</option>
                        </select>
                    </div>
                    <br />

                    {/* Selección de entidad */}
                    <div className='fondos'>
                    <h5 className='subheading'>Entidad</h5>
                        <select
                            value={selectedEntidad}
                            onChange={handleEntidadChange}
                            className="input"                        >
                            <option value="">Seleccionar Entidad</option>
                            {entidades.map((entidad) => (
                                <option key={entidad} value={entidad}>
                                    {entidad}
                                </option>
                            ))}
                        </select>
                    </div>
                    <br />
                    {/* Selección de distrito */}
                    <div className='fondos'>
                    <h5 className='subheading'>Distrito</h5>
                        <select
                            value={selectedDistrito}
                            onChange={handleDistritoChange}
                            className="input"                            disabled={!selectedEntidad}
                        >
                            <option value="">Seleccionar Distrito</option>
                            {distritos.map((distrito) => (
                                <option key={distrito} value={distrito}>
                                    {`Distrito ${distrito}`}
                                </option>
                            ))}
                        </select>
                    </div>
                    <br />
                    {/* Selección de sección */}
                    <div className='fondos'>
                    <h5 className='subheading'>Sección</h5>
                        <select
                            value={selectedSeccion}
                            onChange={handleSeccionChange}
                            className="input"                            disabled={!selectedDistrito}
                        >
                            <option value="">Seleccionar Sección</option>
                            {secciones.map((seccion) => (
                                <option key={seccion} value={seccion}>
                                    {seccion}
                                </option>
                            ))}
                        </select>
                    </div>
                    <br />
                    {/* Botón para descargar */}
                    <div className='fondos'>
                    <button
                        type="button"
                        onClick={handleDownload}
                        className="login-button"
                    >
                        Descargar
                    </button>
                    </div>
                </div>

            ) : (
                <RedirectToHome />
            )}







        </div>
    );
};

export default MapSelector;
