import './App.less';
import 'react-calendar/dist/Calendar.css';
import { AppBase } from './@ccomponents/AppBase';
import { BrowserRouter as Router } from 'react-router-dom';
import DailyPage from './@pages/Daily';

const App = () => {
  
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <AppBase>
        <DailyPage />
      </AppBase>
    </Router>
  )
}

export default App;
