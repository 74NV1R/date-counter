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

const secondPerQuestion = 30

const initialState = {
  questions: [],
  status: 'loading', //loading, error, ready, active, finished
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  timeRemaining: null
}

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready'
      }

    case 'dataFailed':
      return {
        ...state,
        status: 'error'

      }

    case 'start':
      return {
        ...state,
        status: 'active',
        timeRemaining: state.questions.length * secondPerQuestion
      }

    case 'newAnswer':
      const question = state.questions.at(state.index)

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption ? state.points + question.points : state.points
      }

    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null
      }

    case "resetQuiz":
      return {
        ...initialState,
        questions: state.questions,
        status: 'ready'
      }
    /*       return {
            ...state,
            points: 0,
            highscore: 0,
            index: 0,
            answer: null,
            status: 'ready'
          } */

    case 'finished':
      return {
        ...state,
        status: 'finished',
        highscore: state.points > state.highscore ? state.points : state.highscore
      }
    case 'pulse':
      return {
        ...state,
        timeRemaining: state.timeRemaining - 1,
        status: state.timeRemaining === 0 ? 'finished' : state.status
      }

    default:
      throw new Error('Unknown action')
  }
}

export default function App() {

  const [{ questions, status, index, answer, points, highscore, timeRemaining }, dispatch] = useReducer(reducer, initialState)

  const numQuestions = questions.length
  const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0)

  useEffect(function () {
    fetch('http://localhost:8000/questions')
      .then(res => res.json())
      .then(data => dispatch({ type: 'dataReceived', payload: data }))
      .catch(err => dispatch({ type: 'dataFailed' }))

  }, [])

  return (
    <div className="app">
      <Header />
      <Main>


        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
        {status === 'active' && (
          <>
            <Progress index={index} numQuestions={numQuestions} points={points} maxPoints={maxPoints} answer={answer} />
            <Question question={questions[index]} dispatch={dispatch} answer={answer} />
            <Footer>
              <Timer dispatch={dispatch} timeRemaining={timeRemaining} />
              <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions} />
            </Footer>

          </>)
        }

        {status === 'finished' && <Finished points={points} maxPoints={maxPoints} highscore={highscore} dispatch={dispatch} />}

      </Main>
    </div>
  )
}
