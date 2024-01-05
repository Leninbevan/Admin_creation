import React from "react";
import { Provider } from "react-redux";
import { Routerpage } from "./routepage";
import { store } from "./service/store";
const App = () => {
    return (
        <>
           <Provider store={store}>
            <Routerpage/>
           </Provider>
        </>
    )
}
export default App