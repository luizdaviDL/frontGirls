import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Login } from './login/Login'
import { InicialPage } from './pages/InicialPage'
import { App } from './App'
import { QuizzPage } from './pages/QuizzPage'
import { VideoPage } from './pages/VideoPage'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { ScorePage } from './pages/ScorePage'

const text1 = `Preste muita atenção para você se lembrar de tudinho na proxima fase, combinado?`
const imageIntrodution = "./introdutionCharacter.png" 

const router = createBrowserRouter([
  { 
    path: "/",
    element: <App/>,
    children:[
      {
        path: "/",
        element: <Login/>
      },
      {
        path: "/introducao",
        element: <InicialPage image={imageIntrodution}/>,
        
      },
      {
          path: "/quizz",
          element: <QuizzPage/>
      },
      {
          path: "/video",
          element: <VideoPage image={imageIntrodution} text={text1}/>
      },
      {
          path: "/score",
          element: <ScorePage/>
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
