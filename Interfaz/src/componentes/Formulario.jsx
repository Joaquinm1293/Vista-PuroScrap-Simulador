import "../styless/Formulario.css";
export default function Formulario({ onSimular, isLoading }) {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Captura todos los inputs que tengan el atributo "name"
    const formData = new FormData(e.target);
    const parametros = Object.fromEntries(formData.entries());
    
    // Elimina la semilla si está vacía para no mandarla al backend
    if (!parametros.semilla) delete parametros.semilla;
    
    onSimular(parametros);
  };
  const preventInvalidChars = (e) => {
    if (['e', 'E', '+', '-', '.'].includes(e.key)) {
      e.preventDefault();
    }
  };

  const enforceMaxValue = (e) => {
    // Usamos 'let' para permitir que 'value' sea modificado más abajo
    let { value, max } = e.target;

    // 1. Limpiar ceros a la izquierda
    if (value.length > 1 && value.startsWith('0')) {
      value = value.replace(/^0+(?=\d)/, '');
      e.target.value = value; 
    }
    
    // Si el input está vacío o no tiene un máximo definido, no hacemos nada
    if (value === "" || !max) return;

    // 2. Clavar el número en el máximo permitido
    if (parseInt(value, 10) > parseInt(max, 10)) {
      e.target.value = max; 
    }
  };

  return (
    <section className="card">
      <h2>Parámetros de Simulación</h2>
      <form onSubmit={handleSubmit}>
        
        <div className="form-section-label">Inventario</div>
        <div className="form-group">
          <label>Cantidad de Mouses</label>
          <input type="number" name="cant_mouses" min="0" defaultValue="100" min="1" required max="10000" onKeyDown={preventInvalidChars} onInput={enforceMaxValue} />
        </div>
        <div className="form-group">
          <label>Cantidad de Teclados</label>
          <input type="number" name="cant_teclados" min="0" defaultValue="50" min="1" required max="10000" onKeyDown={preventInvalidChars} onInput={enforceMaxValue} />
        </div>

        <div className="section-divider"></div>
        <div className="form-section-label">Personal & Capacidad</div>

        <div className="row">
          <div className="form-group">
            <label>Min Empleados</label>
            <input type="number" name="min_empleados" min="0" defaultValue="1" min="1" max="1000" onKeyDown={preventInvalidChars} onInput={enforceMaxValue} required/>
          </div>
          <div className="form-group">
            <label>Max Empleados</label>
            <input type="number" name="max_empleados" min="0" defaultValue="8" min="1" max="1000" onKeyDown={preventInvalidChars} onInput={enforceMaxValue} required />
          </div>
        </div>

        <div className="form-group">
          <label>Capacidad Mesas (Máx)</label>
          <input type="number" name="cantidad_mesas" min="0" defaultValue="5" min="1" max="1000"  onKeyDown={preventInvalidChars} onInput={enforceMaxValue} required />
        </div>

        <div className="section-divider"></div>
        <div className="form-section-label">Costos</div>

        <div className="row">
          <div className="form-group">
            <label>Costo Hora ($)</label>
            <input type="number" name="costo_hora" defaultValue="4500" min="0" step="100" max="100000"  onKeyDown={preventInvalidChars} onInput={enforceMaxValue} required/>
          </div>
          <div className="form-group">
            <label>Horas Jorn.</label>
            <input type="number" name="horas_jornada" value={8} readOnly/>
          </div>
        </div>

        <div className="form-group">
          <label>Costo Fijo Diario ($)</label>
          <input type="number" name="costo_fijo_diario" min="0" defaultValue="20000" step="100" max="1000000"  onKeyDown={preventInvalidChars} onInput={enforceMaxValue} required/>
        </div>

        <div className="section-divider"></div>

        <button type="submit" className="btn-primary" disabled={isLoading}>
          {isLoading ? 'Simulando...' : 'Ejecutar Simulación'}
        </button>
      </form>
    </section>
  );
}