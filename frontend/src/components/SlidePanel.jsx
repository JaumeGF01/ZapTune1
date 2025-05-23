import { createPortal } from 'react-dom';

const SlidePanel = ({ isOpen, position = 'right', onClose, children }) => {
  const justifyClass = position === 'right' ? 'justify-end' : 'justify-start';
  const translateClass =
    position === 'right'
      ? isOpen ? 'translate-x-0' : 'translate-x-full'
      : isOpen ? 'translate-x-0' : '-translate-x-full';
  const backgroundClass = position === 'right' ? 'panel' : 'panelLeft';

  return createPortal(
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Overlay oscuro */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black transition-opacity duration-300 
            ${isOpen ? 'opacity-50 pointer-events-auto' : 'opacity-0'}`}
      />

      {/* Panel */}
      <div className={`flex ${justifyClass} h-full`}>
        <div
          className={`${backgroundClass} w-full max-w-md bg-white shadow-xl h-full transition-transform duration-300 
                      ease-in-out transform ${translateClass} pointer-events-auto relative`}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-black z-10"
          >
            &times;
          </button>
          <div className="p-6 mt-10">{children}</div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SlidePanel;
