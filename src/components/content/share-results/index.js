import React from "react"
import PropTypes from "prop-types"
// eslint-disable-next-line max-len
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton, RedditShareButton, EmailShareButton, FacebookIcon, TwitterIcon, LinkedinIcon, RedditIcon, EmailIcon } from "react-share"
import "./style.css"

export const ShareResults = (props) => {
  const shareUrl = `https://www.glimpse.ninja/?username=${props.input}`
  const title = "Check out my #GitHub contributions via Glimpse"

  return (
    <div name="share-results">
      {props.contributions.length > 0 &&
      <div className="share-results-top-padding">
        <div className="share-results-header">
          <h4>Share your GitHub contributions</h4>
        </div>
        <div className="network">
          <FacebookShareButton url={shareUrl} quote={title} className="network-share-button">
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </div>
        <div className="network">
          <TwitterShareButton url={shareUrl} title={title} className="network-share-button">
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </div>
        <div className="network">
          <LinkedinShareButton url={shareUrl} title={title} windowWidth={750} windowHeight={600} className="network-share-button">
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
        </div>
        <div className="network">
          <RedditShareButton url={shareUrl} title={title} windowWidth={660} windowHeight={460} className="network-share-button">
            <RedditIcon size={32} round />
          </RedditShareButton>
        </div>
        <div className="network">
          <EmailShareButton url={shareUrl} subject={title} body={`${title} \n${shareUrl}`} className="network-share-button">
            <EmailIcon size={32} round />
          </EmailShareButton>
        </div>
      </div>
      }
    </div>
  )
}

ShareResults.propTypes = {
  input: PropTypes.string,
  contributions: PropTypes.array
}
