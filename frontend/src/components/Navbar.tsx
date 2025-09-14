import { ConnectButton } from "@mysten/dapp-kit";
import { Link } from "@tanstack/react-router";

export const Navbar = () => {
  return (
    <header className="flex items-center justify-between p-4 text-gray-400">
      <div className="flex gap-12">
        <div className="flex gap-2">
          <h1>
            A
          </h1>
          <h1>
            MOMENTARY
          </h1>
        </div>
        <div className="flex gap-8 font-bold ">
          <Link to="/moment" className="[&.active]:text-white hover:text-gray-300 ">
              Home
            </Link>
            <Link to="/creators" className="[&.active]:text-white hover:text-gray-200 ">
              Creators
            </Link>
            <Link to="/portfolio" className="[&.active]:text-white hover:text-gray-200 ">
              Portfolio
            </Link>
        </div>

      </div>
      <div className="flex">
        <ConnectButton />
      </div>

    </header>
  );
};
