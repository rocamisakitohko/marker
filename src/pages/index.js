import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Note from '../components/note'
import Seo from "../components/seo"

import Masonry from 'react-masonry-component';

const masonryOptions = {
  fitWidth: true
};

const IndexPage = ({ data }) => (
  <Layout>
    <Seo title="Home" />
    <Masonry options={masonryOptions} className={'gallery'}>
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <Note key={node.frontmatter.slug} props={node} />
    ))}
    </Masonry>
  </Layout>
)

export const query = graphql`
query {
  allMarkdownRemark(
    sort: { fields: [frontmatter___date], order: DESC }
    filter: { frontmatter: { draft: { ne: true } } }
  ) {
    edges {
      node {
        frontmatter {
          title
          date(formatString: "YYYY/MM/DD")
          slug
          tags
          background {
            publicURL
            childImageSharp {
              gatsbyImageData
            }
          }
          header {
            publicURL
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        excerpt(pruneLength: 280, format: HTML)
      }
    }
  }
}
`

export default IndexPage
