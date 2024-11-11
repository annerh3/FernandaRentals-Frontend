import { Route, Routes } from 'react-router-dom'
import { WebRouter } from '../features/Website/routes/WebRouter'
import { SecurityRouter } from '../features/security/routes/SecurityRouter'

export const AppRouter = () => {
  return (
    <Routes>
       <Route path="/security/*" element={<SecurityRouter />} />
       <Route path="*" element={<WebRouter />} />
      </Routes>
  )
}