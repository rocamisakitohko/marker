import React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import HeaderImage from '../components/headerImage'
import Tag from '../components/tag'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'

const Note = ({ props }) => {
  library.add(faCalendar)


  if(!props.frontmatter) {
   return <div className="note" />
  }

  if(props.frontmatter.background) {
    return (
      <article key={props.frontmatter.slug}>
        <div className="container-image-overlay" />
        <GatsbyImage image={getImage(props.frontmatter.background)} alt={props.frontmatter.slug} key={props.frontmatter.slug} />
        <div className="container-image-upper">
          <h2>
            <Link to={`/post/${props.frontmatter.slug}`}>
              {props.frontmatter.title}
            </Link>
          </h2>
          <div className='date'>
            <FontAwesomeIcon icon={faCalendar} size="xs" />
            <time dateTime={props.frontmatter.date}>{props.frontmatter.date}</time>
          </div>
        </div>
        <div className="container-image-lower">
          <div dangerouslySetInnerHTML={{ __html: props.excerpt }} />
          <Tag tags={props.frontmatter.tags} />
        </div>
      </article>
    )
  }

  return (
    <article key={props.frontmatter.slug}>
      <HeaderImage frontmatter={props.frontmatter} />
      <div className="container">
        <h2>
          <Link to={`/post/${props.frontmatter.slug}`}>
            {props.frontmatter.title}
          </Link>
        </h2>
        <div className='date'>
          <FontAwesomeIcon icon={faCalendar} size="xs" />
          <time dateTime={props.frontmatter.date}>{props.frontmatter.date}</time>
        </div>
        <div dangerouslySetInnerHTML={{ __html: props.excerpt }} />
        <Tag tags={props.frontmatter.tags} />
      </div>
    </article>
  );
};

export default Note
