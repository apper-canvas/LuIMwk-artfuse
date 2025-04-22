import {
  FrameCustomization,
  MatCustomization,
  GlassCustomization,
  SizeCustomization,
  MountingCustomization
} from './CustomizationControls';
import { useCustomization } from '../../contexts/CustomizationContext';
import { RotateCcw } from 'lucide-react';

export default function CustomizationPanel() {
  const { resetCustomization } = useCustomization();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-y-auto h-full">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Customize Your Artwork</h2>
        <button
          onClick={resetCustomization}
          className="text-blue-500 flex items-center gap-1 text-sm"
        >
          <RotateCcw size={14} />
          <span>Reset</span>
        </button>
      </div>
      
      <div className="p-4 space-y-4">
        <FrameCustomization />
        <MatCustomization />
        <GlassCustomization />
        <SizeCustomization />
        <MountingCustomization />
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <button
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}