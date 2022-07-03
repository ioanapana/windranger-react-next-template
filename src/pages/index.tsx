import tw from 'twin.macro'
import Header from 'components/Header'
import ContentInfos from 'components/ContentInfos'

const FlexContainer = tw.div`flex  flex-col`

const Home = () => {
  return (
    <FlexContainer>
      <Header />
      <ContentInfos />
    </FlexContainer>
  )
}

export default Home
