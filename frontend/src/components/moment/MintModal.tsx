import { useRef } from "react";
import type { Moment } from "../../types";
import {
  useCurrentWallet,
  useSignAndExecuteTransaction,
  useSuiClient,
} from "@mysten/dapp-kit";
import { useNetworkVariable } from "../../config/networkConfig";
import { Transaction } from "@mysten/sui/transactions";
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui/utils";
import { toast } from "react-toastify";

type MintModalProps = {
  moment: Moment;
  isOpen: boolean;
  onClose: () => void;
  onMint: () => void;
};

export const MintModal = ({
  moment,
  isOpen,
  onClose,
  onMint,
}: MintModalProps) => {
  const { connectionStatus } = useCurrentWallet();
  const suiClient = useSuiClient();
  const {
    mutate: signAndExecute,
    isPending,
    isSuccess,
    reset,
  } = useSignAndExecuteTransaction();
  const packageId = useNetworkVariable("packageId");
  const toastId = useRef<number | string>("");

  if (!isOpen) return null;

  const showToast = (message: string) =>
    (toastId.current = toast(message, { autoClose: false }));

  const dismissToast = (message: string) => {
    toast.dismiss(toastId.current);
    toast(message, { autoClose: 2000 });
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const mint = () => {
    const tx = new Transaction();
    tx.moveCall({
      target: `${packageId}::moment::mint`,
      arguments: [tx.object(moment.id), tx.object(SUI_CLOCK_OBJECT_ID)],
    });

    showToast("Processing Transaction");
    signAndExecute(
      {
        transaction: tx,
      },
      {
        onError: () => {
          dismissToast("Tx Failed!");
        },
        onSuccess: async ({ digest }) => {
          await suiClient.waitForTransaction({
            digest,
            options: {
              showEffects: true,
            },
          });

          const eventResult = await suiClient.queryEvents({
            query: { Transaction: digest },
          });

          if (eventResult.data.length > 0) {
            const firstEvent = eventResult.data[0]
            console.log("Event Captured!");
            console.log(firstEvent)
          } else {
            console.log("No events found!");
          }

          reset();
          dismissToast("Tx Succesful!");
          onMint();
        },
      },
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={handleOverlayClick}
    >
      <div className=" bg-black p-6 rounded-lg max-w-md w-full border border-gray-600">
        <div className="flex justify-between space-x-4 text-2xl text-white font-bold mb-6">
          <div>Confirm Mint</div>
          <div>
            <button onClick={onClose} className="px-2 bg-transparent">
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
            onClick={() => mint()}
            className="w-full border border-gray-300 dark:border-gray-600 px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Mint
          </button>
        </div>
      </div>
    </div>
  );
};
