import { useEffect, useReducer } from "react"
import Header from "./Header"
import Loader from "./Loader"
import Main from "./Main"
import Error from "./Error"
import StartScreen from "./StartScreen"
import Question from "./Question"
import NextButton from "./NextButton"
import Progress from "./Progress"
import Finished from "./Finished"
import Timer from "./Timer"
import Footer from "./Footer"
import { useQuestions } from "../contexts/QuestionContext"



export default function App() {

  const { status, numQuestions } = useQuestions()

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen numQuestions={numQuestions} />}
        {status === 'active' && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>

          </>)
        }

        {status === 'finished' && <Finished />}

      </Main>
    </div>
  )
}
