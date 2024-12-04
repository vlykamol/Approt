import Header from './components/Header/Header'
import Dashboard from './components/Dashboard/Dashboard';
import { DataProvider } from './context/dataContext';

function App() {
  return (
    <>
      <DataProvider>
        <div className='mainContainer'>
          <Header />
          <Dashboard />
        </div>
      </DataProvider>
    </>
  )
}

export default App
