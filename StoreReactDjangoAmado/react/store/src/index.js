import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import App from './App'
import { RootStoreContext } from "./root-store-context"
import RootStore from "./store/root-store"



const root = ReactDOMClient.createRoot(document.getElementById('root'))
root.render(
  <RootStoreContext.Provider value={new RootStore()}>
    <App />
  </RootStoreContext.Provider>
)

