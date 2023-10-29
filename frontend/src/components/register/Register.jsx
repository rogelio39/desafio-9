import './Register.css';

const Register = () => {
    return (
        <div>
            <h1 className="login">REGISTER</h1>
            <form id="idForm" method="POST">

                <label htmlFor="first_name">Enter your name</label>
                <input type="text" id="first_name" name="first_name" required />

                <label htmlFor="last_name">Enter your lastname</label>
                <input type="text" id="last_name" name="last_name" required />

                <label htmlFor="age">age</label>
                <input type="number" id="age" name="age" required />

                <label htmlFor="email">Enter your email</label>
                <input type="email" id="email" name="email" required />

                <label htmlFor="password">Enter your password</label>
                <input type="password" id="password" name="password" required />

                <button type="submit" id="buttonLog">REGISTER</button>
            </form>
            <div id="userContainer">

            </div>
            <div id="errorContainer"></div>
        </div>
    )
}


export default Register


/*

const form = document.getElementById('idForm');
const userContainer = document.getElementById('userContainer');
const errorContainer = document.getElementById('errorContainer');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const first_name = formData.get('first_name');
    const last_name = formData.get('last_name');
    const age = formData.get('age');
    const email = formData.get('email');
    const password = formData.get('password');
    try {
        const response = await fetch('/api/sessions/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ first_name, last_name, age, email, password})
        });
        if (response.status === 200) {
            // Redirigir al usuario después del inicio de sesión
            window.location.href = '/static/login';
        } else {
            errorContainer.innerHTML= "<p>Error en alguno de los datos ingresados</p>"
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
});

*/