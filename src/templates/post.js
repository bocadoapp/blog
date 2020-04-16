import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import { motion } from 'framer-motion'

const variants = {
  enter: {
    opacity: 1,
    transition: { when: 'beforeChildren' }
  },
  exit: {
    opacity: 0,
  }
}

const h1Variants = {
  enter: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.6, duration: 1 }
  },
  exit: {
    opacity: 0,
    y: 50
  }
}

const contentVariants = {
  enter: {
    y: 0,
    opacity: 1,
    transition: { delay: 1 }
  },
  exit: {
    opacity: 0,
    y: 50
  }
}

const imageVariants = {
  enter: {
    opacity: 1,
    transition: { delay: 0 }
  },
  exit: {
    opacity: 0
  }
}

export const BlogPostTemplate = ({
  content,
  categories,
  image,
  title,
  date,
  author,
}) => {
  return (
    <section className="flex justify-center items-center w-full py-3 px-6 md:px-32 lg:px-64">
      <motion.div
        variants={variants}
        initial='exit'
        animate='enter'
        className='flex flex-col justify-center items-center'
      >
        <motion.div className='w-full flex flex-col justify-center relative' variants={{ enter: { opacity: 1 }, exit: { opacity: 0 }}}>
          <motion.div variants={h1Variants} className='flex flex-col justify-center items-center mb-8 p-4'>
            {categories && categories.length ?
              categories.map(category => (
                <span key={`${category.slug}cat`} style={{ color: '#e72c50' }}>
                  <Link to={`/categories/${category.slug}/`}>
                    {category.name}
                  </Link>
                </span>
              ))
            : null}            
            <h1
              className="flex text-3xl text-center w-full md:max-w-md"
              dangerouslySetInnerHTML={{ __html: title }}
            />
            {}
            <p className='text-gray-500 text-sm'>
              <Link to={`/author/${author.slug}`}>{author.name}</Link>
              {date}
            </p>              
          </motion.div>
          {image ? (
            <motion.div variants={imageVariants} className='post-image'>
              <img src={image} />
            </motion.div>
          ) : null}
        </motion.div>
        <motion.div
          variants={contentVariants}
          className='post-content'
          dangerouslySetInnerHTML={{ __html: content }} 
        />
      </motion.div>
    </section>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  title: PropTypes.string,
}

const BlogPost = ({ data }) => {
  const { wordpressPost: post } = data  

  return (
    <>
      <Helmet title={`${post.title} | Blog`} />
      <BlogPostTemplate {...post} />
    </>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  fragment PostFields on wordpress__POST {
    id
    slug
    content
    date(formatString: "MMMM DD, YYYY")
    title
  }
  query BlogPostByID($id: String!) {
    wordpressPost(id: { eq: $id }) {
      id
      title
      slug
      content
      date(formatString: "MMMM DD, YYYY")
      categories {
        name
        slug
      }
      author
      image: jetpack_featured_media_url
    }
  }
`
