import Total from './Total'
import { Fragment } from 'react'

const Header = ({ course }) => {
  return <h1>{course}</h1>
}

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  console.log('Destructured parts',parts)
  return (
    <div>
      {
        parts.map(part=>
          <Part key={part.name} name={part.name} exercises={part.exercises}/>
        )
      }
    </div>
  )
}

// New component required for Exercise 2.1
const Course = ({ course }) => {
  console.log('Checking for destructured courses', course)
  return (
    <div>
      {
        course.map(course=>(
         <Fragment key={course.id}>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      </Fragment>
        ))
      }
      
    </div>
  )
}

export default Course;