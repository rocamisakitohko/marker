const path = require(`path`)
const _ = require('lodash')

exports.createPages = async gatsbyNodeHelpers => {
  const { graphql, actions } = gatsbyNodeHelpers
  const { createPage } = actions

  const post = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              slug
              tags
            }
          }
        }
      }
    }
  `)

  post.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: 'post/' + node.frontmatter.slug,
      component: path.resolve(`./src/templates/post.js`),
      context: {
        slug: node.frontmatter.slug
      }
    })
  })

  const tags = await graphql(`
    query {
      allMarkdownRemark {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }
    }
  `)

  tags.data.allMarkdownRemark.group.forEach(tag => {
    createPage({
      path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
      component: path.resolve(`./src/templates/tags.js`),
      context: {
        tag: tag.fieldValue,
      },
    })
  })
}