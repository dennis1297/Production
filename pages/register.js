import Head from 'next/head'
import Link from 'next/link'
import {useState, useContext, useEffect} from 'react'
import valid from '../utils/valid'
import {DataContext} from '../store/GlobalState'
import {postData} from '../utils/fetchData'
import { useRouter } from 'next/router'


const Register = () => {
  const initialState = { name: '', email: '', password: '', cf_password: '' }
  const [userData, setUserData] = useState(initialState)
  const { name, email, password, cf_password } = userData

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
    const errMsg = valid(name, email, password, cf_password)
    if(errMsg) return dispatch({ type: 'NOTIFY', payload: {error: errMsg} })

    dispatch({ type: 'NOTIFY', payload: {loading: true} })

    const res = await postData('auth/register', userData)
    
    if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err} })

    return dispatch({ type: 'NOTIFY', payload: {success: res.msg} })
  }

  useEffect(() => {
    if(Object.keys(auth).length !== 0) router.push("/")
  }, [auth])

    return(
      <div>
        <Head>
          <title>Register Page</title>
        </Head>

        <form className="mx-auto my-4" style={{maxWidth: '500px'}} onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" id="name"
            name="name" value={name} onChange={handleChangeInput} />
          </div>

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

          <div className="form-group">
            <label htmlFor="exampleInputPassword2">Confirm Password</label>
            <input type="password" className="form-control" id="exampleInputPassword2"
            name="cf_password" value={cf_password} onChange={handleChangeInput} />
          </div>
          
          <button type="submit" className="btn btn-dark w-100">Register</button>

          <p className="my-2">
            Already have an account? <Link href="/signin"><a style={{color: 'crimson'}}>Login Now</a></Link>
          </p>
        </form>

        <section className="register-sec">
              <div className="register-container">
                {/* <Link to="/" className="back-to-home">Back to Home</Link> */}
                <div className="red-logo"></div>
                <form onSubmit={handleSubmit} >
                  <div className="fields">
               
                    <input
               
                      id="name"
                      type="text"
                      placeholder="Name"  
                      name="name" value={name} onChange={handleChangeInput}
                    
                    />
                    <label htmlFor="name">Name</label>
  
                  </div>
                  <div className="fields">
                    <input
                    
                      id="email"
                      type="text"
                      placeholder="Email"
                      name="email" value={email} onChange={handleChangeInput}
                    
                    />
                    <label htmlFor="email">Email</label>
                
                  </div>
                  <div className="fields">
                    <input
                
                      id="password"
                      type="password"
                      placeholder="password"
                      name="password" value={password} onChange={handleChangeInput}
                     
                    />
                    <label htmlFor="mobile">password</label>
                   
                  </div>
                  <div className="fields">
                    <input
                 
                      id="cf_password"
                      type="cf_password"
                      placeholder="Confirm Password"
                      name="cf_password" value={cf_password} onChange={handleChangeInput}
                   
                    />
                    <label htmlFor="password">Confirm Password</label>
                   
                  </div>
                  
                  <div className="radio-grp">
                    
                      <label className="check-btn">Terms and conditions are applied.
                        <input type="checkbox"  name="checkbox"  id="checkbox"
                      type="checkbox"
                     />
                        
                        <span className="checkboxmark"></span>
                      </label>
                      <p className="dont-account">Already have an acoount <Link href="/signinS" className="login">Login</Link> </p>
                  </div>
                  <div className="reg-btns">
                    <button type="reset" className="cancel">Cancel</button>
                    <button type="submit" className="primary-btn">Sign Up</button>
                  </div>
                </form>
                </div>   
            </section>   
      </div>
    )
  }
  
  export default Register