import React, {useState, useEffect} from 'react'
import '../css/header.css'

const Header = () => {

    // Variables for user interface
    const [login, setLogin] = useState(false);
    const [log, setLog] =useState(false);

    // Variables for login 
    const [names, setNames] = useState();
    const [last_names, setLast_names] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [city, setCity] = useState();
    const [address1, setAddress1] = useState();
    const [address2, setAddress2] = useState();

    function loginn(){
        // localStorage.setItem('user-pizza', 'Paul');
        setLog(!log)
    }

    function logout(){
        localStorage.clear();
        setLogin(false)
        window.location.reload(false)
    }



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
        })
        event.preventDefault()
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
                    
                    <i className="fas fa-shopping-cart"></i>
                </div>
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