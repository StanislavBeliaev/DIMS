import React from 'react';
import {Route, Link} from 'react-router-dom';
import Members from '../pages/Members';
import MembersProgress from '../pages/MemberProgress';
import MembersTasks from '../pages/MemberTasks';


function App() {
  return (
    <div className='App'>
      <Route exact path="/Members" component={Members} />
      <Route exact path="/MembersProgress" component={MembersProgress} />
      <Route exact path="/MembersTasks" component={MembersTasks} />
  
    </div>
  );
}

export default App;
