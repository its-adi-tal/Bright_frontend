import './Dashboard.css'
import WeeklyBoard from './WeeklyBoard';
import CreateButton from './CreateButton';
import SidebarRangeCalendar from './SidebarRangeCalendar';
export default function Dashboard() {
  
  return (
    <div className="dashboard-container">
      <aside className='dashboard-sidebar'>
        <CreateButton/>
      <div className='sidebar-calendar'>
        <SidebarRangeCalendar
          onChange={()=> {}}
          firstDayOfWeek={0}/>
      </div>
        {/*Categories / statistics*/}
      </aside>
      
      <main className='dashboard-main'>
        <WeeklyBoard />
      </main>
    </div>
  );
}
