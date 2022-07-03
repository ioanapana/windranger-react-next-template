import { Data } from 'pages/api/hello'
import { useEffect, useState } from 'react'
import { FlexContainer } from './styles'

interface HelloWorldProps {
  foo?: string
}

const HelloWorld = ({}: HelloWorldProps) => {

  const [data, setData] = useState<Data>()
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('/api/hello')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No data</p>


  return <FlexContainer>Hey 👋 {data.name}</FlexContainer>
}

export default HelloWorld
