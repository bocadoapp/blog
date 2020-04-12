import React, { useState } from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import logo from '../images/logo.png'
import LoadingIcon from '../images/svg/loading.svg'

function Loading () {
  return (
    <div style={{ maxWidth: '40px' }}>
      <LoadingIcon />
    </div>
  )
}

const Navbar = () => {
  const [mail, setMail] = useState('')
  const [loading, toggleLoading] = useState(false)
  const [btnMsg, setBtnMsg] = useState('¡Quiero enterarme!')

  function handleOnSubmit () {
    toggleLoading(true)
    setBtnMsg(<Loading />)
    window.fetch(`${process.env.GATSBY_SUBSCRIBE_URL}/mailchimp-subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ mail })
    })
      .then(r => {
        toggleLoading(false)
        setBtnMsg(r.status !== 200 ? '❌ Oh, algo ha fallado :(' : '✅ ¡Añadido correctamente!')
        setMail('')
        setTimeout(() => setBtnMsg('¡Quiero enterarme'), 1500)
      })
  }

  return (
    <StaticQuery
      query={graphql`
        query {
          allWordpressPage(sort: { fields: wordpress_id }, limit: 5) {
            edges {
              node {
                title
                slug
              }
            }
          }
        }
      `}
      render={data => (
        <nav className='flex flex-row-reverse md:flex-row justify-start items-center w-full py-3 px-6 md:px-20 lg:px-32 mb-10 md:mb-14'>
            <div className="menu flex w-full justify-end md:justify-start">
              {data.allWordpressPage.edges.map(edge =>
              (
                <Link
                  to={`/${edge.node.slug}`}
                  key={edge.node.slug}
                >
                  {edge.node.title}
                </Link>
              ))}
            </div>
            <div className="flex ml-auto mr-auto w-full justify-center">
              <Link to="/" >
                <figure>
                  <img src={logo} alt="Bocado" style={{ maxWidth: '150px' }} />
                </figure>
              </Link>
            </div>          
            <div className="hidden md:flex md:flex-col w-full justify-end">
              <div className='border border-gray-300 rounded-lg overflow-hidden text-xs flex'>
                <input value={mail} className='p-3 w-full' type='email' name='EMAIL' placeholder='Tu e-mail' onChange={e => setMail(e.target.value)} />
                <button className='p-3 rounded-l-lg w-full flex justify-center' disabled={loading} onClick={handleOnSubmit}>
                  {btnMsg}
                </button>
              </div>
              <p className='text-xs text-gray-400 text-right mt-2'>Sin spam, ni nada raro, prometido 🙏</p>
            </div>
        </nav>
      )}
    />
  )
}

export default Navbar
