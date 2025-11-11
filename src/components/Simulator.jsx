import { useState, useEffect } from 'react';

/**
 * Componente de simulador financiero
 * Calcula el crecimiento del ahorro con interés compuesto
 */
export default function Simulator() {
  // Valores guardados en localStorage
  const savedValues = JSON.parse(localStorage.getItem('finast-simulator-values') || '{}');
  
  const [initialAmount, setInitialAmount] = useState(savedValues.initialAmount || '');
  const [monthlySavings, setMonthlySavings] = useState(savedValues.monthlySavings || '');
  const [timePeriod, setTimePeriod] = useState(savedValues.timePeriod || '12');
  const [timeUnit, setTimeUnit] = useState(savedValues.timeUnit || 'months');
  const [annualRate, setAnnualRate] = useState(savedValues.annualRate || '5');
  const [results, setResults] = useState(null);
  const [viewMode, setViewMode] = useState('monthly'); // 'monthly' o 'yearly'

  // Guardar valores en localStorage cuando cambien
  useEffect(() => {
    const values = {
      initialAmount,
      monthlySavings,
      timePeriod,
      timeUnit,
      annualRate
    };
    localStorage.setItem('finast-simulator-values', JSON.stringify(values));
  }, [initialAmount, monthlySavings, timePeriod, timeUnit, annualRate]);

  /**
   * Calcula el interés compuesto mensual
   */
  const calculateCompoundInterest = () => {
    const principal = parseFloat(initialAmount) || 0;
    const monthly = parseFloat(monthlySavings) || 0;
    const months = timeUnit === 'years' ? parseFloat(timePeriod) * 12 : parseFloat(timePeriod);
    const annualRateDecimal = parseFloat(annualRate) / 100;
    const monthlyRate = annualRateDecimal / 12;

    if (months <= 0 || isNaN(principal) || isNaN(monthly) || isNaN(monthlyRate)) {
      return null;
    }

    const data = [];
    let currentAmount = principal;
    let totalInterest = 0;

    for (let month = 0; month <= months; month++) {
      if (month > 0) {
        // Aplicar interés del mes anterior
        const interest = currentAmount * monthlyRate;
        currentAmount += interest;
        totalInterest += interest;
        
        // Agregar ahorro mensual
        currentAmount += monthly;
      }

      data.push({
        month,
        amount: currentAmount,
        interest: totalInterest
      });
    }

    return {
      finalAmount: currentAmount,
      totalInterest: totalInterest,
      totalContributed: principal + (monthly * months),
      data
    };
  };

  const handleCalculate = () => {
    const calculation = calculateCompoundInterest();
    if (calculation) {
      setResults(calculation);
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  };

  const handleReset = () => {
    setInitialAmount('');
    setMonthlySavings('');
    setTimePeriod('12');
    setTimeUnit('months');
    setAnnualRate('5');
    setResults(null);
    localStorage.removeItem('finast-simulator-values');
  };

  // Preparar datos para el gráfico según el modo de vista
  const getChartData = () => {
    if (!results) return null;

    if (viewMode === 'yearly') {
      // Agrupar por años
      const yearlyData = [];
      for (let i = 0; i < results.data.length; i += 12) {
        if (results.data[i]) {
          yearlyData.push({
            period: Math.floor(i / 12),
            amount: results.data[i].amount,
            label: `Año ${Math.floor(i / 12) + 1}`
          });
        }
      }
      // Agregar el último punto si no es año completo
      if (results.data.length % 12 !== 0) {
        const lastIndex = results.data.length - 1;
        yearlyData.push({
          period: Math.floor(lastIndex / 12),
          amount: results.data[lastIndex].amount,
          label: `Mes ${lastIndex + 1}`
        });
      }
      return yearlyData;
    } else {
      // Vista mensual (mostrar cada mes o muestrear si son muchos)
      const maxPoints = 24; // Máximo de puntos en el gráfico
      const step = Math.max(1, Math.floor(results.data.length / maxPoints));
      return results.data
        .filter((_, index) => index % step === 0 || index === results.data.length - 1)
        .map((item, index) => ({
          period: item.month,
          amount: item.amount,
          label: `Mes ${item.month + 1}`
        }));
    }
  };

  const chartData = getChartData();

  return (
    <div className="simulator-container">
      <div className="simulator-header">
        <h1>💰 Simulador Financiero</h1>
        <p className="simulator-subtitle">
          Calcula cuánto crecerán tus ahorros con interés compuesto
        </p>
      </div>

      <div className="simulator-content">
        {/* Formulario de entrada */}
        <div className="simulator-form">
          <div className="form-group">
            <label htmlFor="initialAmount" className="form-label">
              💵 Monto Inicial
            </label>
            <div className="input-wrapper">
              <span className="input-prefix">$</span>
              <input
                id="initialAmount"
                type="number"
                className="form-input"
                value={initialAmount}
                onChange={(e) => setInitialAmount(e.target.value)}
                placeholder="0"
                min="0"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="monthlySavings" className="form-label">
              💰 Ahorro Mensual
            </label>
            <div className="input-wrapper">
              <span className="input-prefix">$</span>
              <input
                id="monthlySavings"
                type="number"
                className="form-input"
                value={monthlySavings}
                onChange={(e) => setMonthlySavings(e.target.value)}
                placeholder="0"
                min="0"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="timePeriod" className="form-label">
              ⏳ Tiempo
            </label>
            <div className="time-input-group">
              <input
                id="timePeriod"
                type="number"
                className="form-input time-input"
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                placeholder="12"
                min="1"
              />
              <select
                className="form-select"
                value={timeUnit}
                onChange={(e) => setTimeUnit(e.target.value)}
              >
                <option value="months">Meses</option>
                <option value="years">Años</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="annualRate" className="form-label">
              📈 Tasa de Interés Anual
            </label>
            <div className="input-wrapper">
              <input
                id="annualRate"
                type="number"
                className="form-input"
                value={annualRate}
                onChange={(e) => setAnnualRate(e.target.value)}
                placeholder="5"
                min="0"
                max="100"
                step="0.1"
              />
              <span className="input-suffix">%</span>
            </div>
          </div>

          <div className="form-actions">
            <button className="simulator-button calculate-btn" onClick={handleCalculate}>
              💹 Calcular
            </button>
            <button className="simulator-button reset-btn" onClick={handleReset}>
              🔄 Reiniciar
            </button>
          </div>
        </div>

        {/* Resultados */}
        {results && (
          <div className="simulator-results">
            <div className="results-summary">
              <div className="result-card">
                <div className="result-label">Total Final</div>
                <div className="result-value">${results.finalAmount.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</div>
              </div>
              <div className="result-card">
                <div className="result-label">Intereses Ganados</div>
                <div className="result-value interest-value">
                  +${results.totalInterest.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </div>
              </div>
              <div className="result-card">
                <div className="result-label">Total Aportado</div>
                <div className="result-value">
                  ${results.totalContributed.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </div>
              </div>
            </div>

            {/* Selector de vista */}
            <div className="view-mode-selector">
              <button
                className={`view-mode-btn ${viewMode === 'monthly' ? 'active' : ''}`}
                onClick={() => setViewMode('monthly')}
              >
                Vista Mensual
              </button>
              <button
                className={`view-mode-btn ${viewMode === 'yearly' ? 'active' : ''}`}
                onClick={() => setViewMode('yearly')}
              >
                Vista Anual
              </button>
            </div>

            {/* Gráfico */}
            {chartData && chartData.length > 0 && (
              <div className="chart-container">
                <h3 className="chart-title">📊 Crecimiento del Ahorro</h3>
                <div className="chart-wrapper">
                  <svg className="chart-svg" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet">
                    {/* Ejes */}
                    <line x1="50" y1="350" x2="750" y2="350" stroke="#e0e0e0" strokeWidth="2" />
                    <line x1="50" y1="350" x2="50" y2="50" stroke="#e0e0e0" strokeWidth="2" />
                    
                    {/* Etiquetas del eje Y */}
                    {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                      const value = results.finalAmount * ratio;
                      const y = 350 - (ratio * 300);
                      return (
                        <g key={i}>
                          <line x1="45" y1={y} x2="50" y2={y} stroke="#e0e0e0" strokeWidth="1" />
                          <text x="40" y={y + 5} textAnchor="end" fontSize="12" fill="#666">
                            ${(value / 1000).toFixed(0)}k
                          </text>
                        </g>
                      );
                    })}
                    
                    {/* Línea del gráfico */}
                    <polyline
                      points={chartData.map((point, i) => {
                        const x = 50 + (i / (chartData.length - 1)) * 700;
                        const y = 350 - (point.amount / results.finalAmount) * 300;
                        return `${x},${y}`;
                      }).join(' ')}
                      fill="none"
                      stroke="var(--theme-primary, #6366f1)"
                      strokeWidth="3"
                    />
                    
                    {/* Puntos del gráfico */}
                    {chartData.map((point, i) => {
                      const x = 50 + (i / (chartData.length - 1)) * 700;
                      const y = 350 - (point.amount / results.finalAmount) * 300;
                      return (
                        <g key={i}>
                          <circle
                            cx={x}
                            cy={y}
                            r="5"
                            fill="var(--theme-primary, #6366f1)"
                            className="chart-point"
                          />
                          <title>{point.label}: ${point.amount.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</title>
                        </g>
                      );
                    })}
                    
                    {/* Etiquetas del eje X */}
                    {chartData.map((point, i) => {
                      if (i % Math.ceil(chartData.length / 6) === 0 || i === chartData.length - 1) {
                        const x = 50 + (i / (chartData.length - 1)) * 700;
                        return (
                          <g key={`label-${i}`}>
                            <line x1={x} y1="350" x2={x} y2="355" stroke="#e0e0e0" strokeWidth="1" />
                            <text x={x} y="370" textAnchor="middle" fontSize="11" fill="#666">
                              {viewMode === 'yearly' ? `Año ${point.period + 1}` : `M${point.period + 1}`}
                            </text>
                          </g>
                        );
                      }
                      return null;
                    })}
                  </svg>
                </div>
              </div>
            )}

            {/* Tabla resumida */}
            <div className="results-table-container">
              <h3 className="table-title">📋 Resumen por {viewMode === 'yearly' ? 'Año' : 'Mes'}</h3>
              <div className="results-table">
                <div className="table-header">
                  <div className="table-cell">Período</div>
                  <div className="table-cell">Monto Acumulado</div>
                  <div className="table-cell">Intereses</div>
                </div>
                {(() => {
                  const tableData = viewMode === 'yearly' 
                    ? results.data.filter((_, i) => i % 12 === 0 || i === results.data.length - 1)
                    : results.data.filter((_, i) => i % 3 === 0 || i === results.data.length - 1);
                  
                  return tableData.map((item, index) => {
                    const prevInterest = index > 0 ? tableData[index - 1].interest : 0;
                    const periodInterest = item.interest - prevInterest;
                    return (
                      <div key={item.month} className="table-row">
                        <div className="table-cell">
                          {viewMode === 'yearly' 
                            ? `Año ${Math.floor(item.month / 12) + 1}`
                            : `Mes ${item.month + 1}`
                          }
                        </div>
                        <div className="table-cell amount-cell">
                          ${item.amount.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </div>
                        <div className="table-cell interest-cell">
                          +${periodInterest.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>

            {/* Explicación educativa */}
            <div className="educational-tip">
              <div className="tip-icon">💡</div>
              <div className="tip-content">
                <strong>Interés Compuesto:</strong> El interés compuesto hace que tus ahorros crezcan más rápido, 
                porque ganas intereses sobre los intereses que ya has ganado. Cuanto más tiempo ahorres, 
                mayor será el efecto del interés compuesto.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

