import { useState } from 'react';
import { useCustomization } from '../../contexts/CustomizationContext';
import { ChevronDown, ChevronUp } from 'lucide-react';
import {
  frameStyles,
  frameColors,
  matColors,
  glassTypes,
  sizeOptions,
  aspectRatios,
  mountingOptions
} from '../../utils/customizationOptions';

export function ColorOption({ color, label, selected, onClick }) {
  return (
    <button
      className={`flex flex-col items-center space-y-1 ${selected ? 'ring-2 ring-blue-500' : ''}`}
      onClick={onClick}
    >
      <div 
        className="w-8 h-8 rounded-full border border-gray-300"
        style={{ backgroundColor: color.hex }}
      />
      <span className="text-xs">{label}</span>
    </button>
  );
}

export function OptionButton({ label, selected, onClick }) {
  return (
    <button
      className={`px-4 py-2 rounded-lg border ${
        selected ? 'bg-blue-500 text-white border-blue-600' : 'bg-white text-gray-800 border-gray-300'
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export function Slider({ label, value, min, max, step, onChange }) {
  return (
    <div className="flex flex-col space-y-2 w-full">
      <div className="flex justify-between">
        <label className="text-sm font-medium">{label}</label>
        <span className="text-sm text-gray-500">{value}%</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(parseInt(e.target.value))}
        className="w-full"
      />
    </div>
  );
}

export function ToggleSwitch({ label, checked, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium">{label}</span>
      <button
        className={`relative inline-flex h-6 w-11 items-center rounded-full ${
          checked ? 'bg-blue-500' : 'bg-gray-200'
        }`}
        onClick={() => onChange(!checked)}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}

export function AccordionSection({ title, children }) {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        className="flex w-full items-center justify-between bg-gray-50 px-4 py-3 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-medium">{title}</h3>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {isOpen && (
        <div className="p-4 bg-white">
          {children}
        </div>
      )}
    </div>
  );
}

export function FrameCustomization() {
  const { options, updateOption } = useCustomization();
  
  return (
    <AccordionSection title="Frame">
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-2">Style</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(frameStyles).map(([key, style]) => (
              <OptionButton
                key={key}
                label={style.name}
                selected={options.frame.style === key}
                onClick={() => updateOption('frame', 'style', key)}
              />
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">Color</h4>
          <div className="flex flex-wrap gap-3">
            {Object.entries(frameColors).map(([key, color]) => (
              <ColorOption
                key={key}
                color={color}
                label={color.name}
                selected={options.frame.color === key}
                onClick={() => updateOption('frame', 'color', key)}
              />
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">Width</h4>
          <div className="flex gap-2">
            <OptionButton
              label="Thin"
              selected={options.frame.width === 'thin'}
              onClick={() => updateOption('frame', 'width', 'thin')}
            />
            <OptionButton
              label="Medium"
              selected={options.frame.width === 'medium'}
              onClick={() => updateOption('frame', 'width', 'medium')}
            />
            <OptionButton
              label="Thick"
              selected={options.frame.width === 'thick'}
              onClick={() => updateOption('frame', 'width', 'thick')}
            />
          </div>
        </div>
      </div>
    </AccordionSection>
  );
}

export function MatCustomization() {
  const { options, updateOption } = useCustomization();
  
  return (
    <AccordionSection title="Mat">
      <div className="space-y-4">
        <ToggleSwitch
          label="Include Mat"
          checked={options.mat.enabled}
          onChange={(value) => updateOption('mat', 'enabled', value)}
        />
        
        {options.mat.enabled && (
          <>
            <div>
              <h4 className="text-sm font-medium mb-2">Color</h4>
              <div className="flex flex-wrap gap-3">
                {Object.entries(matColors).map(([key, color]) => (
                  <ColorOption
                    key={key}
                    color={color}
                    label={color.name}
                    selected={options.mat.color === key}
                    onClick={() => updateOption('mat', 'color', key)}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Width</h4>
              <div className="flex gap-2">
                <OptionButton
                  label="Narrow"
                  selected={options.mat.width === 'narrow'}
                  onClick={() => updateOption('mat', 'width', 'narrow')}
                />
                <OptionButton
                  label="Standard"
                  selected={options.mat.width === 'standard'}
                  onClick={() => updateOption('mat', 'width', 'standard')}
                />
                <OptionButton
                  label="Wide"
                  selected={options.mat.width === 'wide'}
                  onClick={() => updateOption('mat', 'width', 'wide')}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </AccordionSection>
  );
}

export function GlassCustomization() {
  const { options, updateOption } = useCustomization();
  
  return (
    <AccordionSection title="Glass">
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-2">Type</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(glassTypes).map(([key, type]) => (
              <OptionButton
                key={key}
                label={type.name}
                selected={options.glass.type === key}
                onClick={() => updateOption('glass', 'type', key)}
              />
            ))}
          </div>
        </div>
        
        <ToggleSwitch
          label="Glare Reduction"
          checked={options.glass.glareReduction}
          onChange={(value) => updateOption('glass', 'glareReduction', value)}
        />
      </div>
    </AccordionSection>
  );
}

export function SizeCustomization() {
  const { options, updateOption } = useCustomization();
  
  return (
    <AccordionSection title="Size">
      <div className="space-y-4">
        <Slider
          label="Size Scale"
          value={options.size.scale}
          min={50}
          max={200}
          step={5}
          onChange={(value) => updateOption('size', 'scale', value)}
        />
        
        <div>
          <h4 className="text-sm font-medium mb-2">Aspect Ratio</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(aspectRatios).map(([key, ratio]) => (
              <OptionButton
                key={key}
                label={ratio.name}
                selected={options.size.aspectRatio === key}
                onClick={() => updateOption('size', 'aspectRatio', key)}
              />
            ))}
          </div>
        </div>
      </div>
    </AccordionSection>
  );
}

export function MountingCustomization() {
  const { options, updateOption } = useCustomization();
  
  return (
    <AccordionSection title="Mounting">
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-2">Mount Type</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(mountingOptions).map(([key, option]) => (
              <OptionButton
                key={key}
                label={option.name}
                selected={options.mounting.type === key}
                onClick={() => updateOption('mounting', 'type', key)}
              />
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">Hardware</h4>
          <div className="flex gap-2">
            <OptionButton
              label="Standard"
              selected={options.mounting.hardware === 'standard'}
              onClick={() => updateOption('mounting', 'hardware', 'standard')}
            />
            <OptionButton
              label="Premium"
              selected={options.mounting.hardware === 'premium'}
              onClick={() => updateOption('mounting', 'hardware', 'premium')}
            />
            <OptionButton
              label="Hidden"
              selected={options.mounting.hardware === 'hidden'}
              onClick={() => updateOption('mounting', 'hardware', 'hidden')}
            />
          </div>
        </div>
      </div>
    </AccordionSection>
  );
}