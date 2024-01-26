import { useState, useEffect } from 'react'

export const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data))
  }, [url])

  return { data }
}
