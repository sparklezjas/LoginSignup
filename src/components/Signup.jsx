import React from 'react'
import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'
import background from "../imgs/cooking.jpg"

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup (email, password)
        console.log (email, password)
    }

    return (
    <div style={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
    }}>
        <form style={{
            backgroundColor: "white",
            border: "solid black 2px",
            borderRadius: "10px", 
            height: "40vh",
            width: "40vh"
        }}
        className='signup' onSubmit={handleSubmit}>
            <h3 style={{
            textAlign: "center", 
            marginBottom:"10px",
            marginTop: "20px",
            padding: "10px", 
            fontFamily: "Amatic SC",
            fontWeight: "bold",
            fontSize: "40px",
            }}>Sign Up</h3>

            <label style={{
                margin: "15px"
            }}>Email:</label>
            <input style={{border: "solid black 2px", 
            marginLeft: "28px"}}
                type='email' autoComplete='on'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                />
                <br/>
            <label style={{
                margin: "15px"
            }}>Password:</label>
            <input style={{border: "solid black 2px"}}
                type='password'autoComplete='on'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                />
                <br/>
                <button
                style={{margin: "10px",
                textAlign: "center",
                marginTop: "30px",
                marginLeft: "105px",
                fontSize: "18px",
                borderRadius: "5px",
                padding: "5px 20px",
                backgroundColor: "#ffebdd"}}
                disabled={isLoading}>Sign Up</button>
                {error && <div className='error'>{error}</div>}
        </form>
    </div>
)
}

export default Signup