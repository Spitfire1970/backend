const Header = (props) => {
    return (
  <h1>{props.name}</h1>
  )
  }

const Content = (props) => {
  const {parts}=props 
  return (
  <ul>{parts.map(part=><Part key = {part.id}subparts = {part}/>)}</ul>
  )}

const Total = (props) => {
  const {parts}=props
return (
<p>total of {parts.map(part=>part.exercises).reduce((a,b)=>a+b,0)} exercises</p>
)}

const Part = (props) => {
  return (
  <p>{props.subparts.name} {props.subparts.exercises}</p>
  )}

const Course = (props) => {
  const {course}=props
  return (
  <div>
<Header name={course.name} />
  <Content parts={course.parts} />
  <Total parts={course.parts} />
</div>
)}

export default Course