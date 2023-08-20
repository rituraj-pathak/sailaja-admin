import React from 'react'
import styles from "./Dashboard.module.css"
import Cards from '../../components/Cards/Cards'
import projecticon from "../../assets/icons/project.png"

const Dashboard = () => {
  return (
    <div className={styles.dashboard_center_wrapper}>
       <div className={styles.dashboard_summary}>
            <Cards icon={projecticon} title="Total Projects" value="26"/>
            <Cards icon={projecticon} title="Ongoing Projects" value="10"/>
            <Cards icon={projecticon} title="Upcoming Projects" value="6"/>
            <Cards icon={projecticon} title="Completed Projects" value="10"/>
            <Cards icon={projecticon} title="Overall Outreach" value="10"/>
            <Cards icon={projecticon} title="Aggregate Inquiries" value="10"/>
       </div>
    </div>
  )
}

export default Dashboard