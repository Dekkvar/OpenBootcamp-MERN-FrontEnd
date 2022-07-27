import { Navigate, Route, Routes } from "react-router-dom"
import { HomePage } from "../pages/HomePage"
import { KatasDetailPage } from "../pages/KatasDetailPage"
import { KatasPage } from "../pages/KatasPage"
import { LoginPage } from "../pages/LoginPage"
import { RegisterPage } from "../pages/RegisterPage"


export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />}></Route>
      <Route path='/login' element={<LoginPage />}></Route>
      <Route path='/register' element={<RegisterPage />}></Route>
      <Route path='/katas' element={<KatasPage />}></Route>
      <Route path='/katas/:id' element={<KatasDetailPage />}></Route>
      {/* Redirect when Page Not Found */}
      <Route path='*' element={<Navigate to='/' replace/>}></Route>
    </Routes>
  )
}