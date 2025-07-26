type MintModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const MintModal = ({
    isOpen,
    onClose
}: MintModalProps) => {
    if (!isOpen) return null;

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleOverlayClick}>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full">
                <p>body</p>
                <button
                    onClick={onClose}
                    className="w-full border border-gray-300 dark:border-gray-600 px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                Mint
                </button>
          </div>
        </div>
    );
};