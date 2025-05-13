'use server'
import { cookies } from 'next/headers'


const getAccessToken = async () => {
  const cookie = cookies()
  const token = await cookie.get("access")
  return token
}
const setAccessToken = async (access, refresh) => {
  const cookie = cookies()
  if (cookie.set("access", access)) {
    console.log("access cookie token done ")
  }
  if (cookie.set('refresh', refresh)) {
    console.log("refresh cookie token done ")
  }
}

export { getAccessToken, setAccessToken }
