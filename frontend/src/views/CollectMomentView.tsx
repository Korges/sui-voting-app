import { Tilt } from '@jdion/tilt-react'
import { MintModal } from '../components/moment/MintModal';
import { useState } from "react";

const CollectMomentView = () => {
  const [isModelOpen, setIsModelOpen] = useState(false);

  const moment = {
    id: 'someId'
  };

  return (
    <div className="flex h-full p-10">
      <div className="flex w-2/3 justify-center items-center">
        <div className="max-w-[60%]">
          <Tilt>
            <img src="../public/547.webp" alt="No image" />
          </Tilt>
        </div>
      </div>

      <div className="flex h-full w-1/3 flex-col justify-center gap-4">
        <div className="text-base text-gray-500">AHAPULCO</div>
        <div className="text-4xl text-white">MOMENT NFT</div>
        <div className="mt-4 text-gray-500">
          Digitally born and blockchain-bound, this NFT is part of a
          decentralized collection redefining ownership. Verified, rare, and
          permanently yours.
        </div>

        <div>
          <div className="my-10 flex  gap-6 text-white">
            <div>
              <div className="text-lg font-semibold">100 / 1000</div>
              <div className="text-sm text-gray-400">Minted</div>
            </div>
            <div>
              <div className="text-lg font-semibold">Minting Complete</div>
              <div className="text-sm text-gray-400">Status</div>
            </div>
          </div>
          <div>
            <button
              onClick={() => setIsModelOpen(true)}
              className="w-full text-base bg-white text-black py-2 rounded hover:shadow-lg"
            >
              MINT
            </button>
          </div>
        </div>
      </div>
      <MintModal
        moment={moment}
        isOpen={isModelOpen}
        onClose={() => setIsModelOpen(false)}
        onMint={
          () => {
            setIsModelOpen(false)
          }
        }
      />
      
    </div>

  );
};

export default CollectMomentView;
