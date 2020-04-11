import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import github from '../images/github-icon.svg'
import logo from '../images/logo.png'

const Navbar = () => (
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
          <div className="hidden md:flex w-full justify-end">
            <div className='border border-gray-300 rounded-lg overflow-hidden text-xs'>
              <input className='p-3' type='email' name='email' placeholder='Tu e-mail' />
              <button className='p-3 rounded-l-lg'>
                ¡Quiero enterarme!
              </button>
            </div>
            {/* <a
              className="navbar-item"
              href="https://github.com/GatsbyCentral/gatsby-starter-wordpress"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="icon">
                <img src={github} alt="Github" style={{ maxWidth: '25px' }} />
              </span>
            </a> */}
          </div>
      </nav>
    )}
  />
)

export default Navbar
