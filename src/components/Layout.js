import React from 'react'
import Helmet from 'react-helmet'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './Navbar'

const duration = 0.5

const variants = {
  initial: {
    opacity: 0,
    transition: { when: 'beforeChildren' }
  },
  exit: {
    opacity: 0,
    transition: { duration }
  },
  enter: {
    opacity: 1,
    transition: {
      duration,
      delay: duration,
      when: 'beforeChildren',
    }    
  }
}

const TemplateWrapper = ({ children, location }) => (
  <div>
    <Helmet title="Home | Gatsby + WordPress" />
    <Navbar />
    <div>
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={`link-${location.pathname}`}
          variants={variants}
          initial='initial'
          exit='exit'
          animate='enter'
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  </div>
)

export default TemplateWrapper
