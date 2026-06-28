  import Header from './components/Header'
  import Content from './components/Content'
  import Total from './components/Total'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      <div>
        <Content part={part1} excercise={exercises1}/>
      </div>
      <div>
        <Content part={part2} excercise={exercises2}/>
      </div>
      <div>
        <Content part={part3} excercise={exercises3}/>
      </div>
      <Total total={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App