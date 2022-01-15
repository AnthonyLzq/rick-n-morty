import { useState, useEffect } from 'react'

const useFetch = <T>({ url }: { url: string }): { response: T | null } => {
  const [response, setResponse] = useState<T | null>(null)

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then((result: T) => setResponse(result))
  }, [url])

  return { response }
}

export { useFetch }
