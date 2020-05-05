import React, {useState, useEffect} from 'react'
import '../css/header.css'

const Header = () => {

    // Variables for user interface
    const [login, setLogin] = useState(false);
    const [log, setLog] =useState(false);
    const [showCarts, setShowCarts]=useState(false);
    const [cartThings, setCartThings]=useState({});

    // Variables for login 
    const [names, setNames] = useState();
    const [last_names, setLast_names] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [city, setCity] = useState();
    const [address1, setAddress1] = useState();
    const [address2, setAddress2] = useState();

    // This is for get in and get out of the login div
    function loginn(){
        // localStorage.setItem('user-pizza', 'Paul');
        setLog(!log)
    }

    // Logout
    function logout(){
        localStorage.clear();
        setLogin(false)
        window.location.reload(false)
    }


    // Here you handle the login, and asign some variables to local storage
    function handleLogin(event){
        let data={
            names, 
            last_names, 
            email, 
            phone, 
            city, 
            address1, 
            address2
        }
        fetch("https://pizza-backend-paul.herokuapp.com/api/client", {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(error =>console.error('Error: ', error))
        .then(response=> {
            localStorage.setItem('user-pizza', response.id)
        })
        .then(()=>{
            var c = localStorage.getItem("user-pizza"); 
            let dataOrder={
                client_id:c
            }
            fetch("https://pizza-backend-paul.herokuapp.com/api/order", {
            method: 'POST',
            body: JSON.stringify(dataOrder),
            headers:{
                'Content-Type': 'application/json'
            }
            })
            .then(res=>res.json())
            .then(response=> localStorage.setItem('order', response.id))
        })
        .then(()=>{
            var c = localStorage.getItem("user-pizza"); 
            let dataCart={
                client_id:c
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
            .then(()=>{
                alert('Successfully registered!')
                setLog(!log)
            })
        })
        event.preventDefault()
    }

    // Validation for open cart
    function cart(){
        let cart=localStorage.getItem("cart");
        (cart)? showCart(cart) :alert("you don't have a cart yet!")
    }

    function fetchCart(cart){
        fetch(`https://pizza-backend-paul.herokuapp.com/api/cart_detail/list/${cart}`)
        .then(res=>res.json())
        .catch(err=>console.error(err))
        .then(response=>setCartThings(response[0]))
    }

    // Open and close cart div
    function showCart(cart){
        setShowCarts(!showCarts);
        fetchCart(cart);
    }

    function buyThings(){
        cartThings.map(x=>{
            let order =localStorage.getItem("order")
            let buy={
                order_id:order,
                product_id: x.product_id,
                quantity: x.quantity,
                subtotal: x.quantity * x.price
            }
            fetch("https://pizza-backend-paul.herokuapp.com/api/order_detail", {
            method: 'POST',
            body: JSON.stringify(buy),
            headers:{
                'Content-Type': 'application/json'
            }
            })
            .then(res=>res.json())
        })
        setShowCarts(!showCarts)
        bill()
    }

    function bill(){
        alert(`We don't have a bill yet :(`)
    }
    return (
        <div >
            <div className="header">
                <div>
                    Yummy Pizza
                </div>
                <div className="right-header">
                {localStorage.getItem("user-pizza") || login ? (
                    <button className="btn-blanc" onClick={logout}>
                        Logout
                    </button>
                    ):(
                        <button className="btn-blanc" onClick={loginn}>
                            Login
                        </button>
                    )
                }
                    
                    <i className="fas fa-shopping-cart" onClick={cart}></i>
                </div>
                { showCarts && 
                <div className="div-cart"> 
                    <h2> Cart </h2>
                    <i className="far fa-window-close" onClick={()=>setShowCarts(!showCarts)}></i>
                    <div className="div-cart-stuff">
                        {Object.keys(cartThings).map(key=>
                        <div className="interior-div-cart" key={cartThings[key].id}> 
                            <img src={cartThings[key].image}></img>
                            <span className="slug">{cartThings[key].slug}</span>
                            <span>Quantity: {cartThings[key].quantity}</span>
                            <span>${(cartThings[key].price * cartThings[key].quantity).toFixed(2)} or €{(cartThings[key].price * cartThings[key].quantity * 0.91).toFixed(2)} </span>
                        </div>
                        )}
                    </div>
                    <button className="btn-bleue" onClick={()=>buyThings()}>Buy</button>
                </div>}
                { log &&
                <div className="form-login">
                    <form onSubmit={handleLogin}>
                    <i className="far fa-window-close" onClick={()=>setLog(!log)}></i>
                        <div>
                            <label>Name: </label>
                            <input 
                            type="text"
                            value={names}
                            onChange={event=>setNames(event.target.value)}
                            required
                             ></input>
                        </div>
                        <div>
                            <label>Surname: </label>
                            <input 
                            type="text"
                            value={last_names}
                            onChange={event=>setLast_names(event.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label>Email: </label>
                            <input 
                            type="email"
                            value={email}
                            onChange={event=>setEmail(event.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label>Phone: </label>
                            <input 
                            type="text"
                            value={phone}
                            onChange={event=>setPhone(event.target.value)}
                            required></input>
                        </div>
                        <div>
                            <label>City: </label>
                            <input 
                            type="text" 
                            value={city}
                            onChange={event=>setCity(event.target.value)}
                            required></input>
                        </div>
                        <div>
                            <label>Address 1: </label>
                            <input 
                            type="text" 
                            value={address1}
                            onChange={event=>setAddress1(event.target.value)}
                            required></input>
                        </div>
                        <div>
                            <label>Address 2: </label>
                            <input 
                            type="text"
                            value={address2}
                            onChange={event=>setAddress2(event.target.value)}
                            ></input>
                        </div>
                        <button type="submit" className="btn-bleue">
                            Login
                        </button>
                    </form>
                </div>
                }
            </div>
      </div>
    );
}
 
export default Header;