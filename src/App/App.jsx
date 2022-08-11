import React from 'react';
import Members from '../pages/Members';
import MembersProgress from '../pages/MemberProgress';
import MembersTasks from '../pages/MemberTasks';
// import {Route, Link} from 'react-router-dom';

function App() {
  return (
    <div className=''>
      <Members />
      <MembersProgress />
      <MembersTasks />
    </div>
  );
}

export default App;
