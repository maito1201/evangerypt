import React from 'react'
import { OGPData } from 'modules/hooks/buildOGP'

type OGPProps = {
    ogp?: OGPData
}

export const OGPImage = (props: OGPProps) => {
  const { ogp } = props
  if (!ogp || !ogp.url) return <></>
  return (
    <a href={ogp.url} target='_blank' rel='noopener noreferrer'>
      <img
        alt='ogp'
        src={ogp.image.url}
        style={{
          maxWidth: '100%',
          height: '200px',
          objectFit: 'cover',
          borderRadius: '14px'
        }}
      />
    </a>
  )
}
