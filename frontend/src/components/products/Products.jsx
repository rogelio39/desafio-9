import './Products.css';
import { useEffect, useState } from 'react';



const Products = () => {
    const [products, setProducts]  = useState([])

    useEffect(() => {
        const getProducts = async () => {

            try {
                const response = await fetch('http://localhost:4000/api/products', {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json'
                    }
                });
                if (response.status === 200) {
                    const data = await response.json();
                    setProducts(data.docs);
                } else {
                    console.error(`Error getting productos ${response.status}`);
                }
            } catch (error) {
                console.error(`Error getting products ${error}`);
            }

        };

        getProducts();


    }, []);




    return (
        <div>
            <div id="welcomeMessage">
                <p>Bienvenido:  Has iniciado session correctamente</p>
            </div>
            <div id="showProducts" className="on">
            {products && products.map(prod => (
                    <div className="products" key={prod._id}>
                        <p>Nombre: {prod.title}</p>
                        <p>Descripcion: {prod.description}</p>
                        <p>Precio: {prod.price}</p>
                        <p>Stock disponible: {prod.stock}</p>
                    </div>
                ))}
            </div>

            <button id="logout">CERRAR SESION</button>
        </div>
    )
}


export default Products