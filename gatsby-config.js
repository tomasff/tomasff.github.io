module.exports = {
  siteMetadata: {
    title: `Tomás`,
    siteUrl: `https://tomff.com`,
    url: `https://tomff.com`,
    description: `Tomás portfolio - Aspiring Computer Scientist`,
    twitterUsername: `@tomasff02`
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-emotion',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-transformer-remark`
  ],
}
