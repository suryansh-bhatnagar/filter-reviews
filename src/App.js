import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ListContainer from "./components/ListContainer";
import { REVIEW_DATA } from "./constants/constants";
import Header from "./components/Header";
function App() {
  const [listData, setListData] = useState(REVIEW_DATA);

  return (
    <div>
      <Header />
      <div className="flex gap-2">
        <Sidebar listData={listData} setListData={setListData} />
        <ListContainer listData={listData} setListData={setListData} />
      </div>
    </div>
  );
}

export default App;
