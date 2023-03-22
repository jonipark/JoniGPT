export {}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
// const axios = require('axios')
type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' })

    const key = "sk-xxxxxxxxxxxxxxxxxxxxx"  // your key
    const endPoint = "https:/api.openai.com/v1/completions"

    const _res = await axios.post(endPoint, {
        model: "text-davinci-003",
        prompt: req.body.prompt,
        max_tokens: 100,
        n: 1,
        stop: null,
        temperature: 0.8   // 0(safe) - 1(creative)
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${key}`
        }
    })

    const text = _res.data.choices[0].text;
    res.status(200).json({ result : text });

}
