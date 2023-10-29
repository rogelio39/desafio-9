import './Login.css';
import { useRef } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {

    const formRef = useRef(null);
    const navigate = useNavigate();

    const handleSumbit = async (e) => {
        e.preventDefault()
        const datForm = new FormData(formRef.current) //Tranformo un HTML en un objet iterator
        const data = Object.fromEntries(datForm)
        console.log(data)

        const response = await fetch('http://localhost:4000/api/sessions/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (response.status == 200) {
            const data = await response.json()
            document.cookie = `jwtCookie=${data.token}; expires${new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toUTCString()};path=/;httponly=true`
            navigate('/products')
        } else {
            console.log(response)
        }
    }


    return (
        <div>
            <h1 className="login">LOGIN</h1>
            <form id="idForm" onSubmit={handleSumbit} ref={formRef}>

                <label htmlFor="email">Enter your email</label>
                <input type="email" id="email" name="email" autoComplete='userName' required/>

                <label htmlFor="password">Enter your password</label>
                <input type="password" id="password" name="password" autoComplete='currentPassword' required />

                <button type="submit" id="buttonLog">LOGIN</button>
                <button type="button" id="buttonRegister">REGISTER</button>
                <button type="button" id="gitHubButton">Ingresar con github</button>
            </form>
            <div id="userContainer">
                <h1></h1>
            </div>
            <div id="errorContainer">

            </div>
        </div>
    )
}


export default Login