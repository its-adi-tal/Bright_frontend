import './Dashboard.css'
import WeeklyBoard from './WeeklyBoard';
import CreateButton from './CreateButton';
export default function Dashboard() {
  
  return (
    <div className="dashboard-container">

      {/* create button / statistics*/}
      <CreateButton/>
      <WeeklyBoard />

    </div>
  );
}
