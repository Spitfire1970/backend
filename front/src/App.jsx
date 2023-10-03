// import Course from './components/Course'

// const App = () => {
// const courses = [
//     {
//       name: 'Half Stack application development',
//       id: 1,
//       parts: [
//         {
//           name: 'Fundamentals of React',
//           exercises: 10,
//           id: 1
//         },
//         {
//           name: 'Using props to pass data',
//           exercises: 7,
//           id: 2
//         },
//         {
//           name: 'State of a component',
//           exercises: 14,
//           id: 3
//         },
//         {
//           name: 'Redux',
//           exercises: 11,
//           id: 4
//         }
//       ]
//     }, 
//     {
//       name: 'Node.js',
//       id: 2,
//       parts: [
//         {
//           name: 'Routing',
//           exercises: 3,
//           id: 1
//         },
//         {
//           name: 'Middlewares',
//           exercises: 7,
//           id: 2
//         }
//       ]
//     }
//   ]


//   return <ul>{courses.map(course=><Course course={course} />)}</ul>
// }

// import { useState } from 'react'
// const Button = (props) => <button onClick = {props.handleClick}> {props.text}</button>
// const Statistics = (props) => {return (<><StatisticLine text = {props.txt} stat = {props.st}/>
// <StatisticLine text = {props.g} stat = {props.gg}/>
// <StatisticLine text = {props.n} stat = {props.nn}/>
// <StatisticLine text = {props.b} stat = {props.bb}/>
// <StatisticLine text = {props.a} stat = {props.aa}/>
// <StatisticLine text = {props.avg} stat = {props.av}/>
// <StatisticLine text = {props.p} stat = {props.pp}/></>)}
// const StatisticLine = (props) => <>{props.text} {props.stat}<br/></>

// const App = () => {
//   // save clicks of each button to its own state
//   const [good, setGood] = useState(0)
//   const [neutral, setNeutral] = useState(0)
//   const [bad, setBad] = useState(0)
  
//   const onGood = () => {
//     setGood(good + 1)
//   }
//   const onNeutral = () => {
//     setNeutral(neutral + 1)
//   }
//   const onBad = () => {
//     setBad(bad + 1)
//   }
//   if (good+neutral+bad === 0){
//     return( <>
//       <h1>give feedback</h1>
//       <button onClick = {onGood}>good</button>
//       <button onClick = {onNeutral}>neutral</button>
//       <button onClick = {onBad}>bad</button>
//       <h1>statistics</h1>
//     <p>No feedback given</p>
//     </>)
//   }
//   return (
//     <div>
//       <h1>give feedback</h1>
//       <button onClick = {onGood}>good</button>
//       <button onClick = {onNeutral}>neutral</button>
//       <button onClick = {onBad}>bad</button>
//       <h1>statistics</h1>
//       <Statistics g="good"n="neutral"b="bad"a="all"avg="average"p="positive"gg={good}nn={neutral}bb={bad}aa={good+neutral+bad}av={(good*1+bad*-1)/10}pp={good*100/(good+neutral+bad)}/>
//    </div>
//   )
// }

// import { useState } from 'react'

// const App = () => {
//   const anecdotes = [
//     'If it hurts, do it more often.',
//     'Adding manpower to a late software project makes it later!',
//     'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//     'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//     'Premature optimization is the root of all evil.',
//     'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
//     'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
//     'The only way to go fast, is to go well.'
//   ]
   
//   const [selected, setSelected] = useState(0)

//   return (
//     <div>
//       {anecdotes[selected]}
//       <br></br>
//       <button onClick ={()=>  {setSelected(Math.round(Math.random()*anecdotes.length))}}>next anecdote</button>
//     </div>
//   )
// }

// import { useState } from 'react'
// import Note from './components/Note'

// const App = (props) => {
//     const [notes, setNotes] = useState(props.notes)
//     const [newNote, setNewNote] = useState(
//       'a new note...'
//     )
//     const [showAll, setShowAll] = useState(true)
    
//     const notesToShow = showAll
//     ? notes
//     : notes.filter(note => note.important)
   
//     const handleNoteChange = (event) => {
//       console.log(event.target.value)
//       setNewNote(event.target.value)
//     }

//     const addNote = (event) => {
//       event.preventDefault()
//       const noteObject = {
//         content: newNote,
//         important: Math.random() < 0.5,
//         id: notes.length + 1,
//       }
    
//       setNotes(notes.concat(noteObject))
//       setNewNote('')
//       console.log(notes)
//     }

//   return (
//     <div>
//       <h1>Notes</h1>
//       <div>
//         <button onClick={() => setShowAll(!showAll)}>
//           show {showAll ? 'important' : 'all' }
//         </button>
//       </div>
//       <ul>
//         {notesToShow.map(note => 
//           <Note key={note.id} note={note} />
//         )}
//       </ul>
//       <form onSubmit={addNote}>
//         <input value={newNote} onChange={handleNoteChange}/>
//         <button type="submit">save</button>
//       </form> 
//     </div>
//   )
// }

import { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    }
  
    noteService
      .create(noteObject)
        .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService
      .update(id, changedNote)
        .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>      
      <ul>
        {notesToShow.map(note => 
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
      <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App


// import { useState } from 'react'

// const App = () => {
//   const [persons, setPersons] = useState([
//     { name: 'Arto Hellas',phone:9787979 }
//   ]) 
//   const [newName, setNewName] = useState('')
//   const [newPhone,setNewPhone] = useState('')
//   const handleFormChange = (event)=>{event.preventDefault()
//   setNewName(event.target.value)}
//   const addPerson = (event)=>{event.preventDefault()
//     let bit = 0
//     for (let i = 0;i<persons.length;i++){
//       if (persons[i].name===newName){bit=1}
//     }
//     if (bit){
//       alert(`${newName} is already added to phonebook`)
//     }
//     else{const n = {name:newName}
//     setPersons(persons.concat(n))
//     setNewName('')
//     console.log('still works')}}
//   return (
//     <div>
//       <h2>Phonebook</h2>
//       <form onSubmit = {addPerson}>
//         <div>
//           name: <input value={newName} onChange={handleFormChange} />
//         </div>
//         <div>number: <input /></div>
//         <div>
//           <button type="submit">add</button>
//         </div>
//       </form>
//       <h2>Numbers</h2>
//       <ul>{persons.map(person=><p key ={person.phone}>{person.name} {person.phone}</p>)}</ul>
//       <p>debug:{newName}</p>
//     </div>
//   )
// }
