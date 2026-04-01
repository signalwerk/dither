import { useState } from "react";
import {
  PREDEFINED_COLORS,
  normalizeHexColor,
  normalizePalette,
} from "./lib/paletteUtils";

type PaletteEditorProps = {
  palette: string[];
  onChange: (palette: string[]) => void;
};

const movePaletteColor = (
  palette: string[],
  index: number,
  nextIndex: number,
) => {
  const nextPalette = [...palette];
  const [color] = nextPalette.splice(index, 1);
  nextPalette.splice(nextIndex, 0, color);
  return nextPalette;
};

function PaletteEditor({ palette, onChange }: PaletteEditorProps) {
  const [customColor, setCustomColor] = useState("#e4e4db");

  const updateColor = (index: number, nextColor: string) => {
    const nextPalette = [...palette];
    nextPalette[index] = normalizeHexColor(nextColor);
    onChange(normalizePalette(nextPalette));
  };

  const removeColor = (index: number) => {
    if (palette.length <= 2) {
      return;
    }

    onChange(palette.filter((_, paletteIndex) => paletteIndex !== index));
  };

  const moveColor = (index: number, direction: -1 | 1) => {
    const nextIndex = index + direction;

    if (nextIndex < 0 || nextIndex >= palette.length) {
      return;
    }

    onChange(movePaletteColor(palette, index, nextIndex));
  };

  const addCustomColor = () => {
    onChange([...palette, normalizeHexColor(customColor)]);
  };

  const addPresetColor = (color: string) => {
    onChange([...palette, normalizeHexColor(color)]);
  };

  return (
    <section className="panel palette-editor">
      <div className="panel__header">
        <h2>Palette Builder</h2>
        <p>
          Build the gradient with custom colours or add swatches from the
          predefined set, then reorder the stops to steer the split.
        </p>
      </div>

      <div className="palette-editor__list">
        {palette.map((color, index) => (
          <div className="palette-editor__row" key={`${color}-${index}`}>
            <input
              aria-label={`Palette color ${index + 1}`}
              className="palette-editor__picker"
              type="color"
              value={color}
              onChange={(event) => updateColor(index, event.target.value)}
            />

            <div className="palette-editor__meta">
              <span>Stop {index + 1}</span>
              <code>{color}</code>
            </div>

            <div className="palette-editor__row-actions">
              <button
                type="button"
                className="button button--secondary"
                onClick={() => moveColor(index, -1)}
                disabled={index === 0}
              >
                Move left
              </button>
              <button
                type="button"
                className="button button--secondary"
                onClick={() => moveColor(index, 1)}
                disabled={index === palette.length - 1}
              >
                Move right
              </button>
              <button
                type="button"
                className="button button--ghost"
                onClick={() => removeColor(index)}
                disabled={palette.length <= 2}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="palette-editor__adders">
        <div className="palette-editor__adder">
          <input
            aria-label="Custom color to add"
            className="palette-editor__picker"
            type="color"
            value={customColor}
            onChange={(event) => setCustomColor(event.target.value)}
          />
          <button type="button" onClick={addCustomColor}>
            Add custom colour
          </button>
        </div>

        <div>
          <p className="palette-editor__caption">Predefined colours</p>
          <div className="palette-editor__presets">
            {PREDEFINED_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                className="palette-editor__preset"
                onClick={() => addPresetColor(color)}
                title={`Add ${color}`}
              >
                <span
                  className="palette-editor__preset-swatch"
                  style={{ backgroundColor: color }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PaletteEditor;
