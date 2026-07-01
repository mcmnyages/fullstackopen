import Header from './components/Header'
import Content from './components/Content'
import Total from './components/Total'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name:'Fundamentals of react',
    excersises:10
  }
  const part2 ={
    name:'Usings props to pass data',
    excersises:7
  }
  const part3 = {
    name:'State of a component',
    excersises:14
  }
const total= part1.excersises+part2.excersises+part3.excersises;
  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1}
        part2={part2}
        part3={part3}
      />
      <Total total={total}/>
    </div>
  )
}

export default App