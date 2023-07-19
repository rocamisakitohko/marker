import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const HeaderImage = props => {

  if(!props.frontmatter.header) {
   return <></>
  }

  return (
    <GatsbyImage image={getImage(props.frontmatter.header)} alt={props.frontmatter.slug} key={props.frontmatter.slug} />
  );
};

export default HeaderImage
