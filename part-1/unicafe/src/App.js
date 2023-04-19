import { useState } from 'react'

const Header = ({name}) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}
const Statistics = ({good, neutral, bad}) => {
  const total = (good + neutral + bad)
  const averageCalc = (good - bad)/total
  const percentCalc = (good)*100/total

  if (total == 0) {
    return <p>No feedback given</p>
  }

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text={'good'} value={good}></StatisticLine>
          <StatisticLine text={'neutral'} value={neutral}></StatisticLine>
          <StatisticLine text={'bad'} value={bad}></StatisticLine>
          <StatisticLine text={'average'} value={averageCalc}></StatisticLine>
          <StatisticLine text={'positive'} value={percentCalc + ' %'}></StatisticLine>
        </tbody>
      </table>



    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (value, setValue) => {
    return () => setValue(value+1)
  }

  return (
    <div>
      <Header name={'give feedback'}></Header>
      <div>
        <button onClick={handleClick(good, setGood)}>good</button>
        <button onClick={handleClick(neutral, setNeutral)}>neutral</button>
        <button onClick={handleClick(bad, setBad)}>bad</button>
      </div>
      <Header name={'statistic'}></Header>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>      
    </div>
  )
}

export default App
