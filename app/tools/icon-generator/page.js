'use client';

import { useState } from 'react';

export default function IconGeneratorPage() {
  const [bgColor, setBgColor] = useState('#7c3aed');
  const [textColor, setTextColor] = useState('#ffffff');
  const [gradientColor, setGradientColor] = useState('#764ba2');
  const [iconStyle, setIconStyle] = useState('game');
  const [text, setText] = useState('JC');
  const [useGradient, setUseGradient] = useState(true);

  const iconEmojis = {
    game: '🎮',
    trophy: '🏆',
    star: '⭐',
    rocket: '🚀',
    brain: '🧠',
    lightning: '⚡',
  };

  const drawIcon = (canvas, size) => {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, size, size);

    if (useGradient) {
      const gradient = ctx.createLinearGradient(0, 0, size, size);
      gradient.addColorStop(0, bgColor);
      gradient.addColorStop(1, gradientColor);
      ctx.fillStyle = gradient;
    } else {
      ctx.fillStyle = bgColor;
    }

    ctx.fillRect(0, 0, size, size);

    const emoji = iconEmojis[iconStyle];
    const fontSize = size * 0.45;

    ctx.font = `bold ${fontSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = textColor;

    if (text) {
      ctx.font = `bold ${size * 0.35}px Arial`;
      ctx.fillText(text, size / 2, size * 0.55);
      ctx.font = `${size * 0.3}px Arial`;
      ctx.fillText(emoji, size / 2, size * 0.35);
    } else {
      ctx.fillText(emoji, size / 2, size / 2);
    }
  };

  const updateAllPreviews = () => {
    [192, 256, 384, 512].forEach(size => {
      const canvas = document.getElementById(`canvas${size}`);
      if (canvas) drawIcon(canvas, size);
    });
  };

  const downloadIcon = async (size) => {
    const canvas = document.getElementById(`canvas${size}`);
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `icon-${size}x${size}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAllIcons = async () => {
    const sizes = [192, 256, 384, 512];
    for (const size of sizes) {
      await downloadIcon(size);
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    alert('✅ Todos los iconos han sido descargados. Revisa tu carpeta de descargas.');
  };

  const resetValues = () => {
    setBgColor('#7c3aed');
    setTextColor('#ffffff');
    setGradientColor('#764ba2');
    setIconStyle('game');
    setText('JC');
    setUseGradient(true);
  };

  const handleChange = () => {
    setTimeout(updateAllPreviews, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-purple-800 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🎨 Generador de Iconos PWA</h1>
        <p className="text-gray-500 mb-6">Crea iconos personalizados para tu aplicación web progresiva</p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 text-sm text-blue-800">
          ℹ️ Genera los iconos en los tamaños necesarios (192x192, 256x256, 384x384 y 512x512 px). Descárgalos en una carpeta llamada <strong>/public/icons/</strong> en tu proyecto.
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Color de Fondo</label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => {
                  setBgColor(e.target.value);
                  handleChange();
                }}
                className="w-full h-12 border-2 border-gray-300 rounded cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Color del Texto/Icono</label>
              <input
                type="color"
                value={textColor}
                onChange={(e) => {
                  setTextColor(e.target.value);
                  handleChange();
                }}
                className="w-full h-12 border-2 border-gray-300 rounded cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Color de Gradiente</label>
              <input
                type="color"
                value={gradientColor}
                onChange={(e) => {
                  setGradientColor(e.target.value);
                  handleChange();
                }}
                className="w-full h-12 border-2 border-gray-300 rounded cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Estilo de Icono</label>
              <select
                value={iconStyle}
                onChange={(e) => {
                  setIconStyle(e.target.value);
                  handleChange();
                }}
                className="w-full p-2 border-2 border-gray-300 rounded"
              >
                <option value="game">🎮 Juego (Dado)</option>
                <option value="trophy">🏆 Trofeo</option>
                <option value="star">⭐ Estrella</option>
                <option value="rocket">🚀 Cohete</option>
                <option value="brain">🧠 Cerebro</option>
                <option value="lightning">⚡ Rayo</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Texto (Máx 2 caracteres)</label>
              <input
                type="text"
                value={text}
                onChange={(e) => {
                  setText(e.target.value.slice(0, 2));
                  handleChange();
                }}
                maxLength={2}
                className="w-full p-2 border-2 border-gray-300 rounded"
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={useGradient}
                onChange={(e) => {
                  setUseGradient(e.target.checked);
                  handleChange();
                }}
              />
              <span className="text-sm font-semibold text-gray-700">Usar Gradiente</span>
            </label>

            <div className="flex gap-3 pt-4">
              <button
                onClick={downloadAllIcons}
                className="flex-1 bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
              >
                ⬇️ Descargar Todos
              </button>
              <button
                onClick={resetValues}
                className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-400 transition"
              >
                ↻ Resetear
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Vista Previa</h2>
            <div className="grid grid-cols-2 gap-4">
              {[192, 256, 384, 512].map(size => (
                <div key={size} className="bg-gray-50 p-4 rounded-lg text-center">
                  <canvas
                    id={`canvas${size}`}
                    width={size}
                    height={size}
                    className="w-full border-2 border-gray-300 rounded mb-2"
                  />
                  <p className="text-xs font-semibold text-gray-600 mb-2">{size}x{size}</p>
                  <button
                    onClick={() => downloadIcon(size)}
                    className="w-full bg-purple-600 text-white py-2 text-sm rounded font-semibold hover:bg-purple-700 transition"
                  >
                    ⬇️ Descargar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}