import { useState } from "react";
import {
  DndContext,
  PointerSensor,
  type DragEndEvent,
  type DragStartEvent,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  PREDEFINED_COLORS,
  normalizeHexColor,
  normalizePalette,
} from "./lib/paletteUtils";

type PaletteEditorProps = {
  palette: string[];
  onChange: (palette: string[]) => void;
};

type PaletteRowProps = {
  color: string;
  index: number;
  isActive: boolean;
  onUpdateColor: (index: number, color: string) => void;
  onRemoveColor: (index: number) => void;
};

type DropSlotProps = {
  index: number;
  isVisible: boolean;
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

const getDragIndex = (id: string | null) => {
  if (!id?.startsWith("color-")) {
    return null;
  }

  const index = Number.parseInt(id.slice(6), 10);
  return Number.isNaN(index) ? null : index;
};

const getSlotIndex = (id: string | null) => {
  if (!id?.startsWith("slot-")) {
    return null;
  }

  const index = Number.parseInt(id.slice(5), 10);
  return Number.isNaN(index) ? null : index;
};

const getInsertionIndex = (dragIndex: number, slotIndex: number) =>
  slotIndex > dragIndex ? slotIndex - 1 : slotIndex;

function DropSlot({ index, isVisible }: DropSlotProps) {
  const { setNodeRef } = useDroppable({
    id: `slot-${index}`,
  });

  return (
    <div
      ref={setNodeRef}
      className={`palette-editor__drop-slot${isVisible ? " is-visible" : ""}`}
      aria-hidden="true"
    >
      <span className="palette-editor__drop-line" />
    </div>
  );
}

function PaletteRow({
  color,
  index,
  isActive,
  onUpdateColor,
  onRemoveColor,
}: PaletteRowProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `color-${index}`,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`palette-editor__row${isDragging || isActive ? " is-dragging" : ""}`}
    >
      <button
        type="button"
        className="palette-editor__handle"
        aria-label={`Drag palette colour ${index + 1}`}
        {...listeners}
        {...attributes}
      >
        <span />
        <span />
        <span />
      </button>

      <label
        className="palette-editor__picker-circle"
        aria-label={`Palette color ${index + 1}`}
      >
        <span
          className="palette-editor__picker-circle-fill"
          style={{ backgroundColor: color }}
        />
        <input
          aria-label={`Palette color ${index + 1}`}
          className="palette-editor__picker-input"
          type="color"
          value={color}
          onChange={(event) => onUpdateColor(index, event.target.value)}
        />
      </label>

      <div className="palette-editor__meta">
        <span>Stop {index + 1}</span>
        <code>{color}</code>
      </div>

      <div className="palette-editor__row-actions">
        <span className="palette-editor__drag-hint">Drag handle to reorder</span>
        <button
          type="button"
          className="button button--ghost"
          onClick={() => onRemoveColor(index)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

function PaletteEditor({ palette, onChange }: PaletteEditorProps) {
  const [customColor, setCustomColor] = useState("#e4e4db");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overSlotIndex, setOverSlotIndex] = useState<number | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6,
      },
    }),
  );

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

  const addCustomColor = () => {
    onChange([...palette, normalizeHexColor(customColor)]);
  };

  const addPresetColor = (color: string) => {
    onChange([...palette, normalizeHexColor(color)]);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const dragIndex = getDragIndex(activeId);
    const slotIndex = getSlotIndex(event.over ? String(event.over.id) : null);

    setActiveId(null);
    setOverSlotIndex(null);

    if (dragIndex === null || slotIndex === null) {
      return;
    }

    const insertionIndex = getInsertionIndex(dragIndex, slotIndex);
    if (insertionIndex === dragIndex) {
      return;
    }

    onChange(movePaletteColor(palette, dragIndex, insertionIndex));
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

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragMove={(event) =>
          setOverSlotIndex(getSlotIndex(event.over ? String(event.over.id) : null))
        }
        onDragOver={(event) =>
          setOverSlotIndex(getSlotIndex(event.over ? String(event.over.id) : null))
        }
        onDragCancel={() => {
          setActiveId(null);
          setOverSlotIndex(null);
        }}
        onDragEnd={handleDragEnd}
      >
        <div className="palette-editor__list">
          {palette.map((color, index) => (
            <div key={`${color}-${index}`}>
              <DropSlot index={index} isVisible={overSlotIndex === index} />
              <PaletteRow
                color={color}
                index={index}
                isActive={activeId === `color-${index}`}
                onUpdateColor={updateColor}
                onRemoveColor={removeColor}
              />
            </div>
          ))}
          <DropSlot
            index={palette.length}
            isVisible={overSlotIndex === palette.length}
          />
        </div>
      </DndContext>

      <div className="palette-editor__adders">
        <div className="palette-editor__adder">
          <label
            className="palette-editor__picker-circle"
            aria-label="Custom color to add"
          >
            <span
              className="palette-editor__picker-circle-fill"
              style={{ backgroundColor: customColor }}
            />
            <input
              aria-label="Custom color to add"
              className="palette-editor__picker-input"
              type="color"
              value={customColor}
              onChange={(event) => setCustomColor(event.target.value)}
            />
          </label>
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
