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

const initialState = {
  questions: [],
  status: 'loading', //loading, error, ready, active, finished
  index: 0,
  answer: null,
  points: 0,
  highscore: 0
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
        status: 'active'
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
        ...state,
        index: 0,
        answer: null,
        points: 0
      }

    case 'finished':
      return {
        ...state,
        status: 'finished',
        highscore: state.points > state.highscore ? state.points : state.highscore
      }

    default:
      throw new Error('Unknown action')
  }
}

export default function App() {

  const [{ questions, status, index, answer, points }, dispatch] = useReducer(reducer, initialState)

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
            <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions} />
            <button onClick={() => dispatch({ type: "resetQuiz" })}>Reset Quiz</button>
          </>)
        }

        {status === 'finished' && <Finished points={points} maxPoints={maxPoints} highscore={highscore} />}

      </Main>
    </div>
  )
}
