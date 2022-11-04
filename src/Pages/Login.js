import React, { useState, useEffect } from 'react'
import { signup, useAuth, updateUsername, login, signinGoogle } from '../Firebase';
import { IconButton, Button, TextField, Box} from '@mui/material';
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import './CSS/Login.css'
import { Link } from 'react-router-dom';

function Login() {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [showPassword, setShowPassword] = useState(false)
    const [errorStr, setErrorStr] = useState('')
    const [errorActive, setErrorActive] = useState(false)

    const [isLogin, setIsLogin] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const currentUser = useAuth();

    useEffect(() => {
      setErrorActive(false)  
    }, [username, email, password])
    

    async function handleSignup() {
        if (!username || username.length === 0){
            failed('')
            return
        }
        const result = await signup(email, password)
        if (result?.user){
            loginSuccess()
            updateUsername(result.user, username)
        } else{
            failed(result)
        }
    }

    async function handleLogin() {
        const result = await login(email, password)
        if (result?.user){
            loginSuccess()
        } else{
            failed(result)
        }
    }

    async function handleGoogleLogin(){
        const result = await signinGoogle()
        if (result?.user){
            loginSuccess()
        } else{
            failed(result)
        }
    }

    function loginSuccess() {
        console.log("success")
        setIsLoggedIn(true)
    }

    function failed(errorString){
        console.log(errorString)
        setErrorStr(errorString)
        setErrorActive(true)
    }

  return (
    <div>
        <Box width={"100%"} display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <h1 style={{fontSize: "3rem", fontWeight: "700", marginTop: "15vh"}}>{isLogin ? "Login" : "Register"}</h1>
            <Box width={"20rem"} marginTop={"10vh"} display={"flex"} flexDirection={"column"} alignItems={"center"}>
                <Box width={"20rem"}>
                    <Box marginBottom={"1rem"}>
                        <p style={{fontSize: "0.8rem", color: "red"}}>{errorStr}</p>
                    </Box>
                    {!isLogin ? <TextField 
                        label="Username"
                        type="text"
                        error={errorActive}
                        
                        fullWidth 
                        helperText={" "}
                        onChange={(e) => setUsername(e.target.value)}
                        /> : null}
                    <TextField 
                        label="Email"
                        type="email"
                        error={errorActive}
                        fullWidth 
                        helperText={" "}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                </Box>
                    <Box width={"20rem"} display={"flex"} justifyContent={"flex-end"} alignItems={"center"}>
                        <TextField 
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            error={errorActive}
                            fullWidth 
                            value={password}
                            helperText=' '
                            onChange={(e) => setPassword(e.target.value)}/>
                            <Box position={"absolute"} marginRight={"1rem"} marginBottom={"1rem"}>
                                <IconButton size='small' onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </IconButton>
                            </Box>
                    </Box>
            </Box>
            <Box width={"25rem"}>
                {isLogin ? 
                <Button size='large' variant="contained" fullWidth onClick={handleLogin}>LOGIN</Button>
                :    
                <Button size='large' variant="contained" fullWidth onClick={handleSignup}>SIGN UP</Button>
                }
                <Box marginTop={"1rem"}>
                    <Button color='info' size='small' onClick={() => setIsLogin(!isLogin)}>{isLogin ? "CREATE ACCOUNT" : "USE EXISTING ACCOUNT"}</Button>
                </Box>
            </Box>
            <Box width="15rem" marginTop={"3rem"}>
                <Button startIcon={<FaGoogle />} size='large' onClick={handleGoogleLogin} variant='contained' color='secondary' fullWidth>Sign in with Google</Button>
            </Box>
        </Box>
        {isLoggedIn ? 
        <div className='login-overlay'>
            <h1>Hi {currentUser?.displayName}</h1>
            <h2>You have successfully logged in with</h2>
            <h2>{currentUser?.email}</h2>
            <Box margin={"3rem 0 1rem 0"} width={"15rem"}>
                <Link to="/"><Button variant='contained' fullWidth>Back to home</Button></Link>
            </Box>
            <Button onClick={() => setIsLoggedIn(false)}>Change account</Button>
        </div> : null}
    </div>
  )
}

export default Login