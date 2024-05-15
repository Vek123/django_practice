import Main from "./apps/main";
import { useStores } from "./root-store-context"
import AddForm from "./apps/add-form"
import AlterForm from "./apps/alter-form"
import "./static/css/index.css"
import { observer } from "mobx-react-lite"


const App = observer((props) => {
  const { productsStore } = useStores()
  return (
    <div className="app">
      {productsStore.alterProduct ? <AlterForm/> : <AddForm/>}
      <Main/>
    </div>
  )
})

export default App
