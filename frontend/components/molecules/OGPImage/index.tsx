import React from "react"
import { OGPData } from "../../../modules/hooks/buildOGP"

type OGPProps = {
    ogp?: OGPData
}

export const OGPImage = (props: OGPProps) => {
  const { ogp } = props
  if (!ogp || !ogp.url) return <></>
  return (
    <a href={ogp.url} target="_blank" rel="noopener noreferrer">
      <img src={ogp.image.url} height={ogp.image.height} width={ogp.image.width} />
    </a>
  )
}