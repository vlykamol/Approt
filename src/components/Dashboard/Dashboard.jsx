/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import "./Dashboard.css"
import Card from '../Card/Card'
import { useData } from "../../context/dataContext"
import { AddIcon, BackLogIcon, CancelledIcon, DoneIcon, DotMenu3, HighPriority, InProgressIcon, LowPriority, MediumPriority, Priority1, Priority2, ToDOIcon } from "../SVGs/icons";
import { useEffect, useState } from "react";
import InitialsIcon from "../SVGs/Initials";

const pr = ["No priority", "Low", "Medium", "High", "Urgent"]
const prICon = [<Priority2 />, <LowPriority />, <MediumPriority />, <HighPriority />, <Priority1 />]

const statusIcons = {
  "Backlog" : <BackLogIcon />,
  "In progress": <InProgressIcon />,
  "Todo": <ToDOIcon />,
  "Done" : <DoneIcon />,
  "Cancelled" : <CancelledIcon />
}

export default function Dashboard() {
  const { groupBy, users, status, priorities } = useData()
  const [groups, setGroups] = useState(() => {
    return users.map(user => {
      return {
        type : "user",
        availibility : user.available,
        title : user.name
      }
    })
  })
  
  useEffect(() => {
    setGroups(() => {
      if(groupBy == "users") return users.map(user => {
        return {
          type : "user",
          availibility : user.available,
          title : user.name,
          id: user.id,
          icon : <InitialsIcon name={user.name} />
        
        }
      })
      else if(groupBy == "status") return status.map(status => {
        return {
          type: "status",
          title: status,
          icon: statusIcons[status]
        }
      })
      return priorities.map(priority => {
        return {
          type: "priority",
          title: pr[priority],
          icon : prICon[priority],
          priority : priority
        }
      })
    })
  }, [groupBy])
  
  
  return (
    <div className='container'>
      {groups.map((group, key) => {
        return <Column key={key} group={group} />
      })}
    </div>
  )
}



function Column({group}){

  const { tickets } = useData()
  const [ticks, setTicks] = useState([]);

  useEffect(() => {
    setTicks(() => {
      return tickets.filter(ticket => {
        if(group.type == "user" && ticket.userId == group.id)
            return true
        if(group.type == "status" && ticket.status == group.title)
            return true
        if(group.type == "priority" && ticket.priority == group.priority)
            return true
      })
    })
  }, [group.title, tickets])
  
  
  return(
    <div className="column ">
      <ColumnHeader Icon={group.icon} title={group.title} count={ticks.length} />
      <div>
      {ticks.map((tick, key) => {
        return <Card data={tick} key={key} />
      })}
      </div>
    </div>
  )
}

function ColumnHeader({Icon, title, count}){

  return(
    <>
      <div className="columnHeader">
        <div className="flex in-btwn gap-1">
          <span>
            {Icon}
          </span>
          <div>
            {title}
          </div>
          <div>
            {count}
          </div>
        </div>

        <div className="flex gap-1">
          <AddIcon />
          <DotMenu3 />
        </div>
      </div>
    </>
  )
}