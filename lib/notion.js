import axios from 'axios'

export async function getPage(pageId) {
  try {
    const response = await axios.get(`https://api.notion.com/v1/pages/${pageId}`, {
      headers: {
        Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
        'Notion-Version': '2021-08-16',
      },
    })
    return response.data
  } catch (error) {
    console.error(error.response.data)
    return undefined
  }
}
