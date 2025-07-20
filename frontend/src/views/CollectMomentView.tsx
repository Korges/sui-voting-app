import { Tilt } from '@jdion/tilt-react'

const CollectMomentView = () => {
  const handleMint = () => {
    console.log("Mintujemy NFT");
  };

  return (
    <div className="flex h-screen bg-black p-10">
      <div className="w-2/3 flex items-center justify-center">
        <div className="max-w-[60%]">

          <Tilt>
            <img src="../public/547.webp" alt="No image" />
          </Tilt>
        </div>
      </div>

      <div className="w-1/3  flex flex-col gap-4">
        <div className="text-base text-gray-500">AHAPULCO</div>
        <div className="text-4xl text-white">MOMENT NFT</div>
        <div className="mt-4 text-gray-500">
          Digitally born and blockchain-bound, this NFT is part of a
          decentralized collection redefining ownership. Verified, rare, and
          permanently yours.
        </div>

        <div>
          <div className="my-10 flex flex-1 gap-6 text-white">
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
              onClick={handleMint}
              className="w-full text-base bg-white text-black py-2 rounded hover:shadow-lg"
            >
              MINT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectMomentView;
