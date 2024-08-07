import React from "react"
import { LuFileImage } from "react-icons/lu"
import { RootStoreContext } from "../root-store-context"


class AddForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            price: null,
            fileName: "Фото",
            file: null,
            description: "",
            titleDirty: false,
            priceDirty: false,
            titleError: "Обязательное поле для заполнения",
            priceError: "Обязательное поле для заполнения",
            titleIsValid: false,
            priceIsValid: false,
            formIsValid: false,
        }
    }
    toggleValidForm = async () => {
        if (this.state.titleIsValid && this.state.priceIsValid && !this.state.formIsValid) {
            await this.setState({formIsValid: true})
            const button = document.querySelector(".app_form_form_button_confirm")
            button.classList.toggle("app_form_form_button_confirm_active")
        }
        else if ((!this.state.titleIsValid || !this.state.priceIsValid) && this.state.formIsValid) {
            await this.setState({formIsValid: false})
            const button = document.querySelector(".app_form_form_button_confirm")
            button.classList.toggle("app_form_form_button_confirm_active")
        }
    }
    makeCurrentField = (field) => {
        field.style.borderColor = "rgba(64, 111, 233, 1)"
        field.style.boxShadow = "rgba(64, 111, 233, 0.25) 1px 1px 4px"
        field.style.color = "black"
    }
    makeErrorField = (field) => {
        field.style.borderColor = "rgba(242, 60, 60, 1)"
        field.style.boxShadow = "rgba(242, 60, 60, 0.25) 1px 1px 4px"
        field.style.color = "black"
    }
    makeDefaultField = (field) => {
        field.style.borderColor = "#C6BDBD"
        field.style.color = "#888888"
        field.style.boxShadow = "rgba(0, 0, 0, 0.25) 1px 1px 4px"
    }
    handleFIleChange = (event) => {
        const file = event.target.files[0]
        const field = document.querySelector(".app_form_form_file")
        if (file) {
            this.makeCurrentField(field)
            this.setState({fileName: file.name, file: file})
        } else {
            this.makeDefaultField(field)
            this.setState({fileName: "Фото", file: null})
        }
    }
    handleTitleChange = async (event) => {
        if (!this.state.titleDirty) {
            await this.handleBlur(event)
        }
        await this.setState({title: event.target.value})
        let field = event.target
        if (event.target.value.trim().length > 0) {
            this.makeCurrentField(field)
            await this.setState({titleError: "", titleIsValid: true})
        } else {
            this.makeErrorField(field)
            await this.setState({titleError: "Это поле не должно быть пустым.", titleIsValid: false})
        }
        await this.toggleValidForm()
    }
    handlePriceChange = async (event) => {
        if (!this.state.priceDirty) {
            await this.handleBlur(event)
        }
        await this.setState({price: event.target.value})
        let field = event.target
        if (event.target.value >= 0 && event.target.value !== "") {
            this.makeCurrentField(field)
            await this.setState({priceError: "", priceIsValid: true})
        }
        else if (event.target.value < 0) {
            this.makeErrorField(field)
            await this.setState({priceError: "Цена не может быть отрицательной.", priceIsValid: false})
        } else {
            this.makeErrorField(field)
            await this.setState({priceError: "Это поле не должно быть пустым.", priceIsValid: false})
        }
        await this.toggleValidForm()
    }
    handleDescriptionChange = (event) => {
        this.setState({description: event.target.value})
        let field = event.target
        if (event.target.value !== "") {
            this.makeCurrentField(field)
        } else {
            this.makeDefaultField(field)
        }
    }
    handleBlur = (event) => {
        switch (event.target.name) {
            case 'title':
                this.setState({titleDirty: true})
                if (this.state.title.length === 0){
                    const field = document.querySelector("input[name='title']")
                    this.makeErrorField(field)
                }
                break
            case 'price':
                this.setState({priceDirty: true})
                if (this.state.price === null){
                    const field = document.querySelector("input[name='price']")
                    this.makeErrorField(field)
                }
                break
            default:
                console.error("Incorrect input.")
        }
    }
    makePlaceHolder = (field) => {
        switch (field) {
            case 'title':
                if (this.state.titleDirty) {
                    return ""
                } else {
                    return "Название*"
                }
            case 'price':
                if (this.state.priceDirty) {
                    return ""
                } else {
                    return "Цена*"
                }
            default:
                return ""
        }
    }
    addProduct = (event) => {
        let formData = new FormData()
        formData.append("title", this.state.title)
        formData.append("price", this.state.price)
        if (this.state.file) {
            formData.append("image", this.state.file, this.state.file.name)
        }
        formData.append("description", this.state.description)
        this.context.productsStore.add(formData)
    }
    render() {
        return (
            <div className="app_form">
                <div className="app_form_title">Добавление товара</div>
                <br/>
                <div className="app_form_notation">Заполните все обязательные поля с *</div>
                <br/>
                <form className="app_form_form">
                    <div className="app_form_form_field_container">
                        {(this.state.title.length > 0 || this.state.titleDirty) && <div className="app_form_form_helptext">Название*</div>}
                        <input type="text" name="title" maxLength="50" required placeholder={this.makePlaceHolder("title")} onBlur={event => this.handleBlur(event)} onChange={event => this.handleTitleChange(event)}/>
                        {(this.state.titleDirty && this.state.titleError) && <div className="app_form_form_errortext">{this.state.titleError}</div>}
                    </div>
                    <br/>
                    <div className="app_form_form_field_container">
                        {(this.state.price !== null || this.state.priceDirty) && <div className="app_form_form_helptext">Цена*</div>}
                        <input type="number" name="price" maxLength="30" required placeholder={this.makePlaceHolder("price")} onBlur={event => this.handleBlur(event)} onChange={event => this.handlePriceChange(event)}/>
                        {(this.state.priceDirty && this.state.priceError) && <div className="app_form_form_errortext">{this.state.priceError}</div>}
                    </div>
                    <br/>
                    <div className="app_form_form_field_container">
                        {this.state.fileName !== "Фото" && <div className="app_form_form_helptext">Фото</div>}
                        <div className="app_form_form_file">
                            <input type="file" accept="image/*" name="image" id="id_image" onChange={event => this.handleFIleChange(event)}/>
                            <label className="app_form_form_file_label" htmlFor="id_image">
                                <span className="app_form_form_file_name">{this.state.fileName.length > 35 ? this.state.fileName.substring(0, 35) + "..." : this.state.fileName}</span>
                                <span className="app_form_form_file_logo"><LuFileImage/></span>
                            </label>
                        </div>
                    </div>
                    <br/>
                    <div className="app_form_form_field_container">
                    {this.state.description.length > 0 && <div className="app_form_form_helptext">Описание</div>}
                    <textarea name="description" maxLength="200" placeholder="Описание" onChange={event => this.handleDescriptionChange(event)}/>
                    </div>
                    <br/>
                    <button className="app_form_form_button_confirm" disabled={!this.state.formIsValid} type="button" onClick={event => this.addProduct(event)}>Добавить товар</button>
                </form>
            </div>
        )
    }
}

AddForm.contextType = RootStoreContext

export default AddForm
