import CollectMomentView from "./views/CollectMomentView";
import { Navbar } from "./components/Navbar";

export const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <Navbar />
      <div className="max-w-screen-full m-auto">
        <CollectMomentView></CollectMomentView>
      </div>
    </div>
  );
};