import { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { useStores } from "../root-store-context"
import { ClockLoader } from "react-spinners"
import { TbPlugConnectedX } from "react-icons/tb"
import { FaPaintBrush } from "react-icons/fa"
import { ImBin } from "react-icons/im"


function NumberWithSpaces(number) {
    return <>{number.toLocaleString('ru-RU', { useGrouping: true })}</>
}


const Products = observer((props) => {
    const { productsStore } = useStores()
    const isActiveItem = productsStore.alterProduct ?? ""

    useEffect(() => {
        productsStore.getProductsAction()
    }, [])
    const removeProduct = (index) => {
        productsStore.remove(index)
    }
    const alterProduct = (index) => {
        productsStore.setAlterProduct(index)
    }
    if (productsStore.isLoading) {
        return <div className="app_products-container_loader"><ClockLoader color="rgba(54, 215, 183, 1)" size={150}/></div>
    }
    else if (productsStore.isError) {
        return <div className="app_products-container_error"><TbPlugConnectedX color="rgba(54, 215, 183, 1)" size={150}/></div>
    }
    if (!productsStore.products){
        return null
    }
    return (productsStore.products.length > 0 ? 
    <>
        {productsStore.products.map((item, index) => (
        <div className={"app_products-container_item" + (isActiveItem === item ? " app_products-container_item_active" : "")} key={index}>
            <div className="app_products-container_item_activities">
                <div className="app_products-container_activities_edit" onClick={() => alterProduct(index)}><FaPaintBrush color="black"/></div>
                <div className="app_products-container_activities_delete" onClick={() => removeProduct(index)}><ImBin color="black"/></div>
            </div>
            <div className="app_products-container_item-image-container">
                <img className="app_products-container_item-image-container_item_image" src={item.image} alt="Item"/>
            </div>
            <div className="app_products-container_item_title">{item.title}</div>
            <div className="app_products-container_item_description"><strong>Описание:</strong> {item.description}</div>
            <div className="app_products-container_item_price">{NumberWithSpaces(item.price)} $</div>
        </div>
        ))}
    </>
    : <img className="app_products_container_empty" src="http://127.0.0.1/media/images/default/default.png" alt="Error"/>)
})

export default Products