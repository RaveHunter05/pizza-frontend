import React, {useState, useEffect} from 'react';
import '../css/body.css';

const Body = () => {

    const [planets, setPlanets] = useState({});


    function agregar(){
        // localStorage.setItem('user-pizza', 'Paul');
        // localStorage.clear();
        var c = localStorage.getItem("user-pizza"); 
        (c==null)? alert('You cannot buy, please login first'): alert('usted si puede comprar')
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
                        <input placeholder="How many pizzas do you want?" type="number"></input>
                        <div>
                            <button onClick={agregar} className="btn-bleue">
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