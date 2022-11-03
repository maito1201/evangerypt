import React from "react"
import { TwitterTweetEmbed } from "react-twitter-embed"

type EmbedTwitterProps = {
  text: string;
}

export const EmbedTwitter = (props: EmbedTwitterProps) => {
console.log('debug1', props.text[0])
  const regexpTweet = /(https?:\/\/twitter\.com\/[a-zA-Z0-9.\-_@:/~?%&;=+#',()*!]+\/status\/[0-9]+)/g
  if (typeof props.text[0] !== 'string') return <></>
  const tweet = props.text[0].match(regexpTweet)
  console.log('debug2', tweet)

  if (!tweet) {
    return <></>
  }
  return (
    <TwitterTweetEmbed tweetId={tweet[0].split("/")[5]} />
  )
}
