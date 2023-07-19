import React from "react";
import { Link } from "gatsby";
import _ from "lodash";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTag } from '@fortawesome/free-solid-svg-icons'

const Tag = props => {
  library.add(faTag)

  if(!props.tags) {
   return <></>
 }

  return (
    <tags>
      {props.tags.map((tag, index) => {
        return (
          <tag key={index}>
            <Link to={`/tags/${_.kebabCase(tag)}/`}>
              <FontAwesomeIcon icon={faTag} size="xs" />
              {tag}
            </Link>
          </tag>
        );
      })}
    </tags>
  );
};

export default Tag
