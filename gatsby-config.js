

module.exports = {
  pathPrefix: "/",
  siteMetadata: {
    title: 'Gatsby + WordPress Starter',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        baseUrl: 'bocadoblog.wordpress.com',
        hostingWPCOM: true,
        protocol: 'https',
        useACF: false,
        auth: {
          wpcom_app_clientSecret: "dROADppsMM5OjPC8qB9xhJDVXfvbDgwvjbI2qDnjNVA4W3fNwpKDw6D4nACQX3uhReset",
          wpcom_app_clientId: "66897",
          wpcom_user: "manelet",
          wpcom_pass: "Wordpresscom123_!"
        },
        verboseOutput: true,
        includedRoutes: [
          "**/categories",
          "**/posts",
          "**/pages",
          "**/media",
          "**/tags"
        ],        
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-netlify',
    {
      resolve: "gatsby-plugin-postcss",
      options: {
        postCssPlugins: [
          require(`tailwindcss`)(`./tailwind.js`),
          ...(process.env.NODE_ENV === "production"
            ? [require(`autoprefixer`), require(`cssnano`)]
            : []),
        ],
      },
    },    
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        tailwind: true,
        purgeOnly: [`src/styles/main.css`],
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Comfortaa`,
          'Jost',
          'Nanum Gothic Coding\:400,700'
        ],
        display: 'swap'
      }   
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-163445361-1"
      }
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /images\/svg/
        }
      }
    }        
  ],
}
