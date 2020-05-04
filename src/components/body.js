import React, {useState, useEffect} from 'react';
import '../css/body.css';
import { burlywood } from 'color-name';

const Body = () => {

    const [planets, setPlanets] = useState({});
    const [quantity, setQuantity] = useState()

    function buyCart(){
        var c = localStorage.getItem("cart");
        var d =localStorage.getItem()
        let dataCart={
            cart_id:c
        }
        fetch("https://pizza-backend-paul.herokuapp.com/api/cart", {
        method: 'POST',
        body: JSON.stringify(dataCart),
        headers:{
            'Content-Type': 'application/json'
        }
        })
        .then(res=>res.json())
        .then(response=> localStorage.setItem('cart', response.id))
    }

    function agregar(id){
        // localStorage.setItem('user-pizza', 'Paul');
        // localStorage.clear();
        var c = localStorage.getItem("user-pizza"); 
        (c==null)? alert('You cannot buy, please login first'): carrito(id) ;

    }

    function carrito(id){
        // var c = localStorage.getItem("user-pizza"); 
        // let dataOrder={
        //     client_id:c
        // }
        // fetch("https://pizza-backend-paul.herokuapp.com/api/cart_detail", {
        // method: 'POST',
        // body: JSON.stringify(dataOrder),
        // headers:{
        //     'Content-Type': 'application/json'
        // }
        // })
        // .then(res=>res.json())
        // .then(response=> localStorage.setItem('order', response.id))
    }

    useEffect(()=>{
        fetch('https://pizza-backend-paul.herokuapp.com/api/product')
        .then(response=>response.json())
        .then(res=>{
            setPlanets(res)
        })
    }, [])
    return (
    <div> 
        <div className="container">
            <div className="contenedor-componentes">
                {Object.keys(planets).map(key=>
                    <div key={key} className="componente">
                        <img src={planets[key].image}>
                        </img>
                        <h3>
                            {planets[key].name}
                        </h3>
                        <label class="mb-2">
                            {planets[key].description}
                        </label>
                        <span>
                            {planets[key].slug}
                        </span>
                        <span>
                            Price: ${planets[key].price} or €{planets[key].price * 0.91}
                        </span>
                        <input 
                        placeholder="How many pizzas do you want?" 
                        type="number"
                        onChange={event=>setQuantity(event.target.value)}
                        ></input>
                        <div>
                            <button  className="btn-bleue" onClick={()=>agregar(planets[key].id)}>
                                Add
                            </button>
                        </div>
                    </div>
                    )}
            </div>
        </div>
    </div>);
}
 
export default Body;