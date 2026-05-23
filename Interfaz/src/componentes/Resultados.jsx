// Resultados.jsx
import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// 1. REGISTRAR MÓDULOS DE CHART.JS
// En React, Chart.js es "tree-shakeable", lo que significa que debes 
// importar y registrar solo las partes del gráfico que vas a usar.
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

export default function Resultados({ data }) {
  // 2. ESTADOS PARA LOS MODALES
  // Guardamos los detalles del escenario seleccionado (o null si está cerrado)
  const [detallesModal, setDetallesModal] = useState(null);
  // Booleano para mostrar/ocultar el modal del gráfico
  const [mostrarGrafico, setMostrarGrafico] = useState(false);

  // Helper para formato de moneda
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(value);
  };

  // 3. PREPARACIÓN DE DATOS PARA EL GRÁFICO
  // Extraemos arreglos paralelos a partir de data.escenarios
  const labels = data.escenarios.map(e => `${e.n_empleados} emp.`);
  const values = data.escenarios.map(e => e.rentabilidad);
  
  const bgColors = data.escenarios.map(e => {
    if (e.es_optimo) return 'rgba(22,163,74,0.85)';
    if (!e.factible || e.rentabilidad < 0) return 'rgba(220,38,38,0.55)';
    return 'rgba(22,163,74,0.45)';
  });

  const borderColors = data.escenarios.map(e => {
    if (e.es_optimo) return '#15803d';
    if (!e.factible || e.rentabilidad < 0) return '#dc2626';
    return '#16a34a';
  });

  const chartData = {
    labels,
    datasets: [{
      label: 'Rentabilidad ($)',
      data: values,
      backgroundColor: bgColors,
      borderColor: borderColors,
      borderWidth: 2,
      borderRadius: 7,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#052e16',
        titleColor: '#86efac',
        bodyColor: '#dcfce7',
        padding: 12,
        cornerRadius: 10,
        callbacks: {
          label: ctx => ' ' + formatCurrency(ctx.raw)
        }
      }
    },
    scales: {
      x: { grid: { display: false } },
      y: { 
        grid: { color: 'rgba(187,247,208,0.5)' },
        ticks: {
          callback: v => {
            const abs = Math.abs(v);
            if (abs >= 1e6) return (v / 1e6).toFixed(1) + 'M';
            if (abs >= 1e3) return (v / 1e3).toFixed(0) + 'k';
            return v;
          }
        }
      }
    }
  };

  // Tu plugin personalizado para la línea del cero
  const zeroLinePlugin = {
    id: 'zeroLine',
    beforeDraw(chart) {
      const { ctx, scales: { y } } = chart;
      if (!y) return;
      const yZero = y.getPixelForValue(0);
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(chart.chartArea.left, yZero);
      ctx.lineTo(chart.chartArea.right, yZero);
      ctx.strokeStyle = 'rgba(220,38,38,0.5)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 4]);
      ctx.stroke();
      ctx.restore();
    }
  };

  return (
    <section className="results-container active">
      {/* --- KPIs PRINCIPALES --- */}
      <div className="kpi-grid">
        <div className="kpi-card highlight">
          <div className="kpi-label">Mejor Escenario</div>
          <div className="kpi-value">{data.optimo_n_empleados || 'N/A'}</div>
          <div className="kpi-label" style={{ marginTop: '5px' }}>Empleados</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Ingreso Total</div>
          <div className="kpi-value">{formatCurrency(data.ingreso_total)}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Costo Total</div>
          <div className="kpi-value">{formatCurrency(data.optimo_costo_total || 0)}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Rentabilidad Neta</div>
          <div className={`kpi-value ${data.optimo_rentabilidad >= 0 ? 'positive' : 'negative'}`}>
            {formatCurrency(data.optimo_rentabilidad || 0)}
          </div>
        </div>
      </div>

      {/* --- MÉTRICAS OPERATIVAS --- */}
      <div className="card" style={{ marginBottom: 0 }}>
        <h2 style={{ fontSize: '0.9rem', marginBottom: '1.1rem', paddingBottom: '0.6rem' }}>
          Métricas Operativas — Totales
        </h2>
        <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(145px, 1fr))' }}>
          <div className="kpi-card">
            <div className="kpi-label">Perif. Reciclados</div>
            <div className="kpi-value">{data.cant_reciclados}</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Perif. Reutilizados</div>
            <div className="kpi-value">{data.cant_reutilizados}</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Piezas Desechadas</div>
            <div className="kpi-value">{data.cant_piezas_desechadas}</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Tiempo Total</div>
            <div className="kpi-value">{data.tiempo_total_horas}</div>
            <div className="kpi-label" style={{ marginTop: '5px' }}>Horas</div>
          </div>
        </div>
      </div>

      {/* --- TABLA DE ESCENARIOS --- */}
      <div className="card">
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          Análisis de Escenarios
          <button className="btn-chart" onClick={() => setMostrarGrafico(true)}>
             Ver Gráfico
          </button>
        </h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Empleados</th>
                <th>Factible</th>
                <th>Días Necesarios</th>
                <th>Jornales Totales</th>
                <th>Costo Laboral</th>
                <th>Costo Fijo</th>
                <th>Costo Total</th>
                <th>Rentabilidad</th>
                <th>Detalles</th>
              </tr>
            </thead>
            <tbody>
              {/* Iteramos sobre los escenarios usando map */}
              {data.escenarios.map((esc, index) => (
                <tr key={esc.n_empleados}>
                  <td style={{ fontWeight: 700,  }}>
                    {esc.n_empleados}
                    <br />
                    {esc.es_optimo && <span className="badge-optimal">ÓPTIMO</span>}
                  </td>
                  <td>
                    {esc.factible 
                      ? <span style={{ color: 'var(--success)', fontWeight: 700 }}>  Sí</span> 
                      : <span className="badge-infeasible">No</span>}
                  </td>
                  <td>{esc.dias_necesarios}</td>
                  <td>{esc.jornales_totales}</td>
                  <td>{formatCurrency(esc.costo_laboral)}</td>
                  <td>{formatCurrency(esc.costo_fijo_total)}</td>
                  <td>{formatCurrency(esc.costo_total)}</td>
                  <td className={esc.rentabilidad >= 0 ? 'positive' : 'negative'} style={{ fontWeight: 700 }}>
                    {formatCurrency(esc.rentabilidad)}
                  </td>
                  <td>
                    {/* Al hacer clic, guardamos el detalle completo de este escenario en el estado */}
                    <button className="btn-sm" onClick={() => setDetallesModal(esc)}>
                      Ver Cálculo
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODAL DE DETALLES --- */}
      {/* Solo se renderiza si detallesModal tiene datos (no es null) */}
      {detallesModal && (
        <div className="modal active" onClick={() => setDetallesModal(null)}>
          {/* El stopPropagation evita que al hacer clic dentro de la caja se cierre el modal */}
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setDetallesModal(null)}>&times;</button>
            <h2 style={{ marginBottom: '1.25rem' }}>Cálculo — {detallesModal.n_empleados} Empleado(s)</h2>
            
            <div className="formula-group"><span>Tiempo Paralelo</span><code>{detallesModal.detalles.formula_tiempo_paralelo}</code></div>
            <div className="formula-group"><span>Días Necesarios</span><code>{detallesModal.detalles.formula_jornales_x_emp}</code></div>
            <div className="formula-group"><span>Jornales a Pagar</span><code>{detallesModal.detalles.formula_jornales_totales}</code></div>
            <div className="formula-group" style={{ borderColor: '#f59e0b' }}><span>Costo Laboral</span><code>{detallesModal.detalles.formula_costo_laboral}</code></div>
            <div className="formula-group" style={{ borderColor: '#dc2626' }}><span>Costo Fijo (Galpón)</span><code>{detallesModal.detalles.formula_costo_fijo}</code></div>
            <div className="formula-group" style={{ borderColor: 'var(--text)' }}><span>Costo Total</span><code>{detallesModal.detalles.formula_costo_total}</code></div>
            <div className="formula-group" style={{ borderColor: 'var(--primary)', background: '#f0fdf4' }}><span>Rentabilidad Neta</span><code>{detallesModal.detalles.formula_rentabilidad}</code></div>
          </div>
        </div>
      )}

      {/* --- MODAL DEL GRÁFICO --- */}
      {mostrarGrafico && (
        <div className="modal modal-chart active" onClick={() => setMostrarGrafico(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setMostrarGrafico(false)}>&times;</button>
            <h2 style={{ marginBottom: 0 }}>Rentabilidad por N° de Empleados</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.35rem', marginBottom: 0 }}>
              Ingreso fijo vs. costo según cantidad de empleados. El punto óptimo maximiza la ganancia neta.
            </p>
            
            <div className="chart-wrapper">
              {/* Aquí inyectamos el componente de react-chartjs-2 */}
              <Bar data={chartData} options={chartOptions} plugins={[zeroLinePlugin]} />
            </div>

            <div className="chart-legend">
              <div className="legend-item"><div className="legend-dot" style={{ background: '#16a34a' }}></div> Rentabilidad neta</div>
              <div className="legend-item"><div className="legend-dot" style={{ background: '#86efac', border: '2px solid #16a34a' }}></div> Escenario óptimo</div>
              <div className="legend-item"><div className="legend-dot" style={{ background: '#fca5a5', border: '2px dashed #dc2626' }}></div> No factible / pérdida</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}