import { X } from 'lucide-react';
const CustomCloseButton = ({ closeToast }: { closeToast: () => void }) => (
  <button onClick={closeToast} className="cursor-pointer">
    <X />
  </button>
);

export default CustomCloseButton;