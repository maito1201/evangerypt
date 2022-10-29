
import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxyMiddleware from 'next-http-proxy-middleware'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  ) {
  const { url } = req.query
  const proxy = httpProxyMiddleware(req, res, {
    target: url as string,
    pathRewrite: {
      '^/api/proxy/.*': '',
    },
    changeOrigin: true
  })
  return proxy
}
