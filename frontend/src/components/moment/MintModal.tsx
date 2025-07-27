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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={handleOverlayClick}>
            <div className=" bg-black p-6 rounded-lg max-w-md w-full border border-gray-600">
                <div className="flex justify-between space-x-4 text-2xl text-white font-bold mb-6">
                    <div>Confirm Mint</div>
                    <div>
                        <button
                        onClick={onClose}
                        className="px-2 bg-transparent">
                            x
                        </button>
                    </div>
                </div>
                <div className="rounded-lg bg-gray-600 text-gray-400 p-3">
                    <div className="flex justify-end space-x-4">
                        <div className="">MINT FEE</div>
                        <div className="">-</div>
                        <div className="">SUI</div>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <div className="">PROTOCOL FEE</div>
                        <div className="">0.01</div>
                        <div className="">SUI</div>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <div className="">NETWORK FEE</div>
                        <div className="">0.01</div>
                        <div className="">SUI</div>
                    </div>
                </div>
                <div className="flex justify-end space-x-4 text-gray-400 my-6">
                    <div>TOTAL</div>
                    <div>0.11</div>
                    <div>SUI</div>
                </div>
                <div>
                    <button
                    onClick={onClose}
                    className="w-full border border-gray-300 dark:border-gray-600 px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                    Mint
                    </button>
                </div>
          </div>
        </div>
    );
};