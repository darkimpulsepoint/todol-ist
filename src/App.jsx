// import { useState } from 'react'
import {TodoAdd} from "./components/TodoAdd.jsx"
import {Header} from "./components/Header.jsx"
import {BasicContainer} from "./components/BasicContainer.jsx"
import './App.css'

function App() {
    return (
        <BasicContainer>
            <Header/>
            <TodoAdd/>
        </BasicContainer>
    )
}

export default App
