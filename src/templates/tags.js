import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Note from '../components/note'
import Seo from "../components/seo"

import Masonry from 'react-masonry-component';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTag } from '@fortawesome/free-solid-svg-icons'

const masonryOptions = {
  fitWidth: true
};

const TagsPage = ({ data, pageContext }) => {
  library.add(faTag)
  const { tag } = pageContext

  return (
    <Layout>
      <Seo title={tag} />
      <header><h1><FontAwesomeIcon icon={faTag} size="xs" /> {tag}</h1></header>
      <Masonry options={masonryOptions} className={'gallery'}>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <Note key={node.frontmatter.slug} props={node} />
      ))}
      </Masonry>
    </Layout>
  );
};

export const query = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } draft: { ne: true } } }
    ) {
      totalCount
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


export default TagsPage
