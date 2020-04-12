import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import { motion } from 'framer-motion'

const container = {
  exit: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: .5
    }
  }
}

const postVariants = {
  exit: { opacity: 0, transform: 'translateY(-100px)' },
  enter: { opacity: 1, transform: 'translateY(0px)' }
}

export default class IndexPage extends React.Component {
  render() {
    const { posts, title } = this.props

    return (
      <section className="flex justify-center items-center w-full py-3 px-6 md:px-20 lg:px-32">
        <div className="container">
          { title ? (
            <div>
              <h1 className="title text-center my-4 has-text-weight-bold is-size-2">{title}</h1>
            </div>
          ) : null}
          <motion.div variants={container} initial='exit' animate='enter'>
            {posts.map(({ node: post }) => (
              <motion.div
                variants={postVariants}
                className="rounded border border-gray-200 p-10 mb-6 md:mb-12"
                key={post.id}
              >
                <div className='flex flex-col md:flex-row text-center md:text-left justify-between items-center'>
                  <Link
                    className="title"
                    to={`/${post.slug}`}
                    dangerouslySetInnerHTML={{
                      __html: post.title
                    }}
                  />
                  <small>
                    <span className='text-gray-500'>{post.date}</span>{' '}
                    <Link to={`/author/${post.author.slug}`}>
                      {post.author.name}
                    </Link>
                  </small>
                </div>
                <div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: post.excerpt.replace(/<p class="link-more.*/, ''),
                    }}
                  />
                  <Link className="font-bold text-sm text-center md:text-left" to={`/${post.slug}`}>
                    Seguir leyendo →
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    )
  }
}

IndexPage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
}

export const pageQuery = graphql`
  fragment PostListFields on wordpress__POST {
    id
    title
    excerpt
    author
    date(formatString: "MMMM DD, YYYY")
    slug
  }
`
