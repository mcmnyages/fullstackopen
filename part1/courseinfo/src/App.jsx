import Header from './components/Header'
import Content from './components/Content'
import Total from './components/Total'

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
    name:'Fundamentals of react',
    excersises:10
  },
{
    name:'Usings props to pass data',
    excersises:7
  },
   {
    name:'State of a component',
    excersises:14
   }
  ]
const total= parts[0].excersises+parts[1].excersises+parts[2].excersises;
  return (
    <div>
      <Header course={course} />
      <Content
       parts={parts}
      />
      <Total total={total}/>
    </div>
  )
}

export default App