module.exports = {
  pathPrefix: "/bocado-blog",
  siteMetadata: {
    title: 'Gatsby + WordPress Starter',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        // The base url to your WP site.
        baseUrl: 'bocadoblog.wordpress.com',
        // WP.com sites set to true, WP.org set to false
        hostingWPCOM: true,
        // The protocol. This can be http or https.
        protocol: 'https',
        // Use 'Advanced Custom Fields' Wordpress plugin
        useACF: false,
        auth: {
          wpcom_app_clientSecret: "dROADppsMM5OjPC8qB9xhJDVXfvbDgwvjbI2qDnjNVA4W3fNwpKDw6D4nACQX3uhReset",
          wpcom_app_clientId: "66897",
          wpcom_user: "manelet",
          wpcom_pass: "Wordpresscom123_!"
        },
        // Set to true to debug endpoints on 'gatsby build'
        verboseOutput: true
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      // Removes unused css rules
      resolve:'gatsby-plugin-purgecss',
      options: {
        // Activates purging in gatsby develop
        develop: true,
        // Purge only the main css file
        purgeOnly: ['/all.sass'],
      },
    }, // must be after other CSS plugins
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}
