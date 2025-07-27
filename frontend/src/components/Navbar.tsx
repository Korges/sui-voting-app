import { ConnectButton } from "@mysten/dapp-kit";

export const Navbar = () => {
  return (
    <nav className="bg-gray-200 dark:bg-gray-800 p-4 shadow-md">
      <div className="flex justify-between">
        <ul className="flex space-x-6">
          <li>
            Home
          </li>
          <li>
            Wallet
          </li>
        </ul>
        <ConnectButton />
      </div>
    </nav>
  );
};
