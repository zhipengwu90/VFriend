
import { createContext, useState } from "react";
//define useContext
export const DataContext = createContext({
  userData: [],
  setUserData: () => {},
  conversation: [],
  setConversation: () => {},
});

const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [conversation, setConversation] = useState([]);
  

  function setUserData(data) {
    setData(data);
  }
  const value = {
    userData: data,
    setUserData: setUserData,
    conversation: conversation,
    setConversation: setConversation,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataProvider;
