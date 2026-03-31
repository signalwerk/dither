import { useState, useEffect, useRef } from "react";
import "./App.css";
import generateDither from "./lib/generateDither";

function App() {
  const [pattern, setPattern] = useState<number[]>([]);
  const [config, setConfig] = useState({
    width: 20,
    height: 40,
    seed: 42
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generatePattern = () => {
    const newPattern = generateDither({
      width: config.width,
      height: config.height,
      seed: config.seed
    });
    setPattern(newPattern);
  };

  const drawPattern = () => {
    if (!canvasRef.current || pattern.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.createImageData(config.width, config.height);
    
    for (let i = 0; i < pattern.length; i++) {
      const value = Math.floor(pattern[i]);
      const pixelIndex = i * 4;
      imageData.data[pixelIndex] = value;     // R
      imageData.data[pixelIndex + 1] = value; // G
      imageData.data[pixelIndex + 2] = value; // B
      imageData.data[pixelIndex + 3] = 255;   // A
    }

    ctx.putImageData(imageData, 0, 0);
  };

  useEffect(() => {
    generatePattern();
  }, []);

  useEffect(() => {
    drawPattern();
  }, [pattern]);

  return (
    <>
      <h1>Scarf</h1>
      <p>Pattern Generator</p>
      
      <div style={{ marginBottom: '20px' }}>
        <div>
          <label>
            Width: 
            <input 
              type="number" 
              value={config.width} 
              onChange={(e) => setConfig(prev => ({ ...prev, width: parseInt(e.target.value) || 20 }))}
              style={{ marginLeft: '10px', marginRight: '20px' }}
            />
          </label>
          <label>
            Height: 
            <input 
              type="number" 
              value={config.height} 
              onChange={(e) => setConfig(prev => ({ ...prev, height: parseInt(e.target.value) || 40 }))}
              style={{ marginLeft: '10px', marginRight: '20px' }}
            />
          </label>
          <label>
            Seed: 
            <input 
              type="number" 
              value={config.seed} 
              onChange={(e) => setConfig(prev => ({ ...prev, seed: parseInt(e.target.value) || 42 }))}
              style={{ marginLeft: '10px', marginRight: '20px' }}
            />
          </label>
        </div>
        <button onClick={generatePattern} style={{ marginTop: '10px' }}>
          Generate New Pattern
        </button>
      </div>

      <div>
        <canvas 
          ref={canvasRef}
          width={config.width}
          height={config.height}
          style={{ 
            border: '1px solid #ccc',
            imageRendering: 'pixelated',
            width: `${config.width * 10}px`,
            height: `${config.height * 10}px`
          }}
        />
        <p>10× scaled</p>
      </div>
    </>
  );
}

export default App;
