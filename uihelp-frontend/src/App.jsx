import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ReportForm from './pages/ReportForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ReportForm />
    </>
  )
}

export default App
