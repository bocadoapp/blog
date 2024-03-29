import React from 'react'
import Layout from './src/components/Layout'
import './src/styles/tailwind.css'

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}