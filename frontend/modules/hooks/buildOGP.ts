import useSWR from 'swr'

export type OGPData = {
  siteName: string
  url: string
  image: {
    width: string
    height: string
    url: string
  }
}

export const useOGP = (url: string) => {
  const fetcher = (url: string) => fetch(url).then(r => r.text())
  const { data: html } = useSWR(`/api/proxy/${encodeURIComponent(url)}`, fetcher)
  
  const data: OGPData | undefined = {
    siteName: '',
    url: '',
    image: {
      width: '',
      height: '',
      url: ''
    }
  }

  html?.split(">").forEach((chunk: string) => {
    if (!chunk.match('og:')) return
    const property = chunk.match(/(?<=property\=\").*?(?=\")/)?.[0]
    const content = chunk.match(/(?<=content\=\").*?(?=\")/)?.[0]
    if (!property || !content) return
    switch (property) {
      case ('og:site_name'):
        data.siteName = content
        break
      case ('og:url'):
        data.url = content
        break
      case ('og:image'):
        data.image.url = content
        break
      case ('og:image:width'):
        data.image.width = content
        break
      case ('og:image:height'):
        data.image.height = content
        break
    }
  })
  return data
} 
