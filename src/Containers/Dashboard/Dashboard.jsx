import React,{useState,useEffect} from 'react'
import styles from "./Dashboard.module.css"
import Cards from '../../components/Cards/Cards'
import projecticon from "../../assets/icons/project.png"
import contacticon from "../../assets/icons/contacts-book.png/"
import axios from 'axios'

const Dashboard = () => {
  const [dashInfo,setDashInfo] = useState({});
  useEffect(()=> {
    axios.get('http://64.227.148.189/api/home')
    .then(function(response){
      setDashInfo(response.data.data)
    })
  },[])
  return (
    <div className={styles.dashboard_center_wrapper}>
       <div className={styles.dashboard_summary}>
            <Cards icon={projecticon} title="Total Projects"  dashInfo={dashInfo.totalProjects} />
            <Cards icon={projecticon} title="Ongoing Projects"  dashInfo={dashInfo.ongoingProjects}/>
            <Cards icon={projecticon} title="Upcoming Projects"  dashInfo={dashInfo.upcomingProjects}/>
            <Cards icon={projecticon} title="Completed Projects"  dashInfo={dashInfo.completedProjects}/>
            <Cards icon={contacticon} title="Overall Outreach"  dashInfo={dashInfo.totalEnquiry}/>
            <Cards icon={contacticon} title="Aggregate Inquiries"  dashInfo={dashInfo.totalContacted}/>
       </div>
    </div>
  )
}

export default Dashboard