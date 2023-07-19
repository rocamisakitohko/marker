import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import Layout from "../components/layout"
import HeaderImage from '../components/headerImage'
import Tag from '../components/tag'
import Seo from "../components/seo"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'

const PostPage =  ({ data }) => {
  const post = data.markdownRemark
  library.add(faCalendar)

  if(post.frontmatter.background) {
    return (
      <Layout>
        <post key={post.frontmatter.slug}>
          <HeaderImage frontmatter={post.frontmatter} />
          <div className="container"> 
            <h2 style={{ color: `white`, }}>
              {post.frontmatter.title}
            </h2>
            <div className='date'>
              <FontAwesomeIcon icon={faCalendar} size="xs" />
              <time dateTime={post.frontmatter.date}>{post.frontmatter.date}</time>
            </div>
          </div>
          <GatsbyImage image={getImage(post.frontmatter.background)} alt={post.frontmatter.slug} key={post.frontmatter.slug} />
          <div className="container">
            <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
            <Tag tags={post.frontmatter.tags} />
          </div>
        </post>
      </Layout>
    )
  }

  return (
    <Layout>
      <Seo title={post.frontmatter.title} />
      <post>
        <HeaderImage frontmatter={post.frontmatter} />
        <div className="container">
          <h2 style={{ color: `white`, }}>
            {post.frontmatter.title}</h2>
          <div className='date'>
            <FontAwesomeIcon icon={faCalendar} size="xs" />
            <time dateTime={post.frontmatter.date}>{post.frontmatter.date}</time>
          </div>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          <Tag tags={post.frontmatter.tags} />
        </div>
      </post>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "YYYY/MM/DD")
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
    }
  }
`


export default PostPage
