import './Login.css';
import { useRef } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {

    const formRef = useRef(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const datForm = new FormData(formRef.current) //Tranformo un HTML en un objet iterator
        const data = Object.fromEntries(datForm)
        console.log(data)
        const response = await fetch('http://localhost:4000/api/sessions/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })


        if (response.status == 200) {
            const datos = await response.json()
            document.cookie = `jwtCookie=${datos.token}; expires=${new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toUTCString()}; path=/; SameSite=None; Secure`;
            navigate('/products')
        } else if (response.status === 401) {
            console.error('Credenciales incorrectas. Por favor, verifica tu email y contraseña.', response);
        } else {
            const datos = response.json()
            console.log("RESPONSE", datos)
        }
    }


    return (
        <div>
            <h1 className="login">LOGIN</h1>
            <form id="idForm" onSubmit={handleSubmit} ref={formRef}>

                <label htmlFor="email">Enter your email</label>
                <input type="email" id="email" name="email" autoComplete='userName' required />

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