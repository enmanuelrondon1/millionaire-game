'use client';

import { useState, useRef, useEffect } from 'react';

export default function LogoGeneratorPage() {
  const [bgColor, setBgColor] = useState('#7c3aed');
  const [textColor, setTextColor] = useState('#ffffff');
  const [gradientColor, setGradientColor] = useState('#764ba2');
  const [borderStyle, setBorderStyle] = useState('rounded');
  const [shadow, setShadow] = useState('medium');
  const [useGradient, setUseGradient] = useState(true);
  const [currentSize, setCurrentSize] = useState('logo-512');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    updateLogo();
  }, [bgColor, textColor, gradientColor, borderStyle, shadow, useGradient]);

  const updateLogo = () => {
    const logo = document.getElementById('logoPreview');
    if (!logo) return;

    let bgStyle = bgColor;
    if (useGradient) {
      bgStyle = `linear-gradient(135deg, ${bgColor} 0%, ${gradientColor} 100%)`;
    }

    logo.style.background = bgStyle;
    logo.style.color = textColor;

    switch (borderStyle) {
      case 'square':
        logo.style.borderRadius = '8px';
        break;
      case 'circle':
        logo.style.borderRadius = '50%';
        break;
      default:
        logo.style.borderRadius = '20px';
    }

    let shadowValue = '0 8px 20px rgba(102, 126, 234, 0.3)';
    switch (shadow) {
      case 'low':
        shadowValue = '0 4px 12px rgba(102, 126, 234, 0.2)';
        break;
      case 'high':
        shadowValue = '0 16px 40px rgba(102, 126, 234, 0.5)';
        break;
    }
    logo.style.boxShadow = shadowValue;
  };

  const roundRect = (ctx, x, y, width, height, radius) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };

  const downloadLogo = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const sizeMap = {
      'logo-512': 512,
      'logo-256': 256,
      'logo-192': 192,
      'logo-128': 128,
    };

    const size = sizeMap[currentSize];
    canvas.width = size;
    canvas.height = size;

    let bgGradient = ctx.createLinearGradient(0, 0, size, size);
    if (useGradient) {
      bgGradient.addColorStop(0, bgColor);
      bgGradient.addColorStop(1, gradientColor);
      ctx.fillStyle = bgGradient;
    } else {
      ctx.fillStyle = bgColor;
    }

    const radius = borderStyle === 'circle' ? size / 2 : borderStyle === 'square' ? 8 : 20;
    roundRect(ctx, 0, 0, size, size, radius);
    ctx.fill();

    const shineGradient = ctx.createLinearGradient(0, 0, size, size);
    shineGradient.addColorStop(0, 'rgba(255,255,255,0.15)');
    shineGradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = shineGradient;
    roundRect(ctx, 0, 0, size, size, radius);
    ctx.fill();

    ctx.fillStyle = textColor;
    ctx.font = `bold ${size * 0.35}px Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('ER', size / 2, size / 2);

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `logo-er-${size}x${size}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert(`✅ Logo ${size}x${size} descargado exitosamente`);
  };

  const resetLogo = () => {
    setBgColor('#7c3aed');
    setTextColor('#ffffff');
    setGradientColor('#764ba2');
    setBorderStyle('rounded');
    setShadow('medium');
    setUseGradient(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-purple-800 py-12 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🎨 Generador de Logo - ER</h1>
        <p className="text-gray-500 mb-6">Crea tu logo personalizado con efecto hover expandible</p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 text-sm text-blue-800">
          ℹ️ Personaliza tu logo y previsualiza el efecto hover. Cuando pases el mouse verás cómo se expande mostrando tu nombre completo "Enmanuel Rondón".
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controles */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Color de Fondo</label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-full h-12 border-2 border-gray-300 rounded cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Color del Texto</label>
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-full h-12 border-2 border-gray-300 rounded cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Color de Gradiente</label>
              <input
                type="color"
                value={gradientColor}
                onChange={(e) => setGradientColor(e.target.value)}
                className="w-full h-12 border-2 border-gray-300 rounded cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Estilo de Borde</label>
              <select
                value={borderStyle}
                onChange={(e) => setBorderStyle(e.target.value)}
                className="w-full p-2 border-2 border-gray-300 rounded"
              >
                <option value="rounded">Redondeado</option>
                <option value="square">Cuadrado</option>
                <option value="circle">Circular</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Intensidad de Sombra</label>
              <select
                value={shadow}
                onChange={(e) => setShadow(e.target.value)}
                className="w-full p-2 border-2 border-gray-300 rounded"
              >
                <option value="low">Baja</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
              </select>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={useGradient}
                onChange={(e) => setUseGradient(e.target.checked)}
              />
              <span className="text-sm font-semibold text-gray-700">Usar Gradiente</span>
            </label>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tamaños de Descarga</label>
              <div className="grid grid-cols-2 gap-2">
                {['logo-512', 'logo-256', 'logo-192', 'logo-128'].map(size => (
                  <button
                    key={size}
                    onClick={() => setCurrentSize(size)}
                    className={`p-2 rounded text-sm font-semibold transition ${
                      currentSize === size
                        ? 'bg-gradient-to-r from-purple-600 to-purple-800 text-white'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                  >
                    {size.split('-')[1]}x{size.split('-')[1]}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={downloadLogo}
                className="flex-1 bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
              >
                ⬇️ Descargar Logo
              </button>
              <button
                onClick={resetLogo}
                className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-400 transition"
              >
                ↻ Resetear
              </button>
            </div>
          </div>

          {/* Vista Previa */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Vista Previa (Pasa el mouse)</h2>
            <div className="bg-gray-50 p-12 rounded-lg flex justify-center items-center min-h-80">
              <div
                className="relative group cursor-pointer transition-all duration-300"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div
                  id="logoPreview"
                  className={`w-40 h-40 rounded-lg flex items-center justify-center font-bold text-white transition-all duration-300 ${
                    isHovered ? 'scale-110 shadow-lg' : 'shadow-md'
                  }`}
                >
                  <span
                    className={`text-5xl font-black transition-all duration-300 ${
                      isHovered ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                    }`}
                  >
                    ER
                  </span>

                  <div
                    className={`absolute inset-0 flex flex-col items-center justify-center rounded-lg transition-all duration-300 ${
                      isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                    }`}
                  >
                    <span className="text-2xl font-black">ER</span>
                    <span className="text-xs font-semibold tracking-widest whitespace-nowrap">
                      Enmanuel
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Información del Logo</h3>
              <p className="text-sm text-gray-700"><strong>Nombre:</strong> Enmanuel Rondón</p>
              <p className="text-sm text-gray-700"><strong>Iniciales:</strong> ER</p>
              <p className="text-sm text-gray-700"><strong>Efecto:</strong> Hover expandible</p>
              <p className="text-sm text-gray-700"><strong>Uso:</strong> Navbar, Favicon, Branding</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}