import Head from 'next/head'
import Link from 'next/link'
import {useState, useContext, useEffect} from 'react'
import {DataContext} from '../store/GlobalState'
import {postData} from '../utils/fetchData'
import Cookie from 'js-cookie'
import { useRouter } from 'next/router'

const Signin = () => {
  const initialState = { email: '', password: '' }
  const [userData, setUserData] = useState(initialState)
  const { email, password } = userData

  const {state, dispatch} = useContext(DataContext)
  const { auth } = state

  const router = useRouter()

  const handleChangeInput = e => {
    const {name, value} = e.target
    setUserData({...userData, [name]:value})
    dispatch({ type: 'NOTIFY', payload: {} })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    dispatch({ type: 'NOTIFY', payload: {loading: true} })
    const res = await postData('auth/login', userData)
    
    if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err} })
    dispatch({ type: 'NOTIFY', payload: {success: res.msg} })

    dispatch({ type: 'AUTH', payload: {
      token: res.access_token,
      user: res.user
    }})

    Cookie.set('refreshtoken', res.refresh_token, {
      path: 'api/auth/accessToken',
      expires: 7
    })

    localStorage.setItem('firstLogin', true)
  }

  useEffect(() => {
    if(Object.keys(auth).length !== 0) router.push("/")
  }, [auth])

    return(
      <div>
        <Head>
          <title>Sign in Page</title>
        </Head>

        {/* <form className="mx-auto my-4" style={{maxWidth: '500px'}} onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
            name="email" value={email} onChange={handleChangeInput} />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1"
            name="password" value={password} onChange={handleChangeInput} />
          </div>
          
          <button type="submit" className="btn btn-dark w-100">Login</button>

          <p cla,ssName="my-2">
            You don't have an account? <Link href="/register"><a style={{color: 'crimson'}}>Register Now</a></Link>
          </p>
        </form> */}
        <section className="login-sec">
            <div className="login-container">
              {/* <Link to="/" className="back-to-home">Back to home</Link>
              <p className="dont-account">Don't have an account? <Link to="/register" className="register">Register</Link></p> */}
              <div className="red-logo">
                
                <h1>Arowdrops.in</h1>
              </div>
            <form onSubmit={handleSubmit} >
              <div className="fields">
                <input id="email"
                  type="text"
                  placeholder="Email"
                  name="email"
                   value={email} 
                   onChange={handleChangeInput}/>
                <label htmlFor="email">Email</label>
                <span className="red-text">
                  
                </span>
              </div>
              <div className="fields">
                <input id="password"
                  type="password"
                  placeholder="Password"
                  name="password" 
                  value={password} 
                  onChange={handleChangeInput}/>
                <label htmlFor="password">Password</label>
              
              </div>
              <div className="forget">
                <a href="/forgot">Forget Password</a>
                <a href="/register">Don't have account</a>
              </div>
              <div className="signdiv">
                <button type="submit" className="land-btn primary-btn">Sign In</button>
              </div>
            </form>
            </div>
            </section>
      </div>
    )
  }
  
  export default Signin