import { createContext, useContext } from "react";

export const RootStoreContext = createContext(null)

export const useStores = () => {
    const context = useContext(RootStoreContext);

    if (context === 'null'){
        throw new Error("Maybe you need to wrap your app on 'provider'")
    }

    return context
}