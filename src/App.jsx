import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Paste from "./components/Paste"
import ViewPaste from './components/ViewPaste'

const router = createBrowserRouter(
  [
    {
      path: "/",
      element:
        <div>
          <Navbar />
          <Home />
        </div>
    },
    {
      path: "/pastes",
      element:
        <div>
          <Navbar />
          <Paste />
        </div>
    },
    {
      path: "/paste/:id",
      element:
        <div>
          <Navbar />
          <ViewPaste />
        </div>
    },
  ]
)

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
