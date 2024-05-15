import axios from "axios";
import { makeAutoObservable } from "mobx"


const fetchProducts = async () => {
    return (await axios.get("http://127.0.0.1:8000/api/v1/products/"))
}


class ProductsStore {
    products = null
    isLoading = true
    isError = false
    alterProduct = null

    constructor() {
        makeAutoObservable(this)
    }
    remove = async (index) => {
        const response = await axios.delete("http://127.0.0.1:8000/api/v1/products/" + this.products[index].id + "/")
        if (response && response.status === 204){
            this.products.splice(index)
        }
    }
    add = async (data) => {
        await axios.post("http://127.0.0.1:8000/api/v1/products/", data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        window.location.reload()
    }
    setAlterProduct = async (index) => {
        if (index !== null && this.alterProduct === null) {
            this.alterProduct = this.products[index]
        } else if (index === null) {
            this.alterProduct = null
        }
    }
    alter = async (data) => {
        await axios.put("http://127.0.0.1:8000/api/v1/products/" + data.get("id") + "/", data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        this.alterProduct = null
        window.location.reload()
    }
    getProductsAction = () => {
        this.isLoading = true
        fetchProducts().then(response => {
            this.products = response.data
            this.isError = false
            this.isLoading = false
        }).catch((error) => {
            this.isLoading = false
            this.isError = true
        })
    }
}

export default new ProductsStore()