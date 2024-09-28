import './App.css';
import {useState} from 'react'
import SectionList from './components/SectionList'
import SectionChart from './components/SectionChart'


function App() {
  const [tab, setTab] = useState();

  
  return (
    <>
      <main>
          

          {tab === 'listblock' && (
            <>
              <SectionList />
            </>
          )}

          {tab === 'chartblock' && (
            <>
              <SectionChart />
            </>
          )}
      </main>
    </>
  );
}

export default App;