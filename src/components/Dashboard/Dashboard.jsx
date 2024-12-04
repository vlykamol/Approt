/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import "./Dashboard.css"
import { useData } from "../../context/dataContext"
import { BackLogIcon, CancelledIcon, DoneIcon, HighPriority, InProgressIcon, LowPriority, MediumPriority, Priority1, Priority2, ToDOIcon } from "../SVGs/icons";
import { useEffect, useState } from "react";
import InitialsIcon from "../SVGs/Initials";
import Column from "./Column";

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
  
  const { tickets, setTickets, groupBy, orderBy,  users, status, priorities } = useData()
  
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
    setTickets(() => {
      const sortedTickets = [...tickets]; 
      return sortedTickets.sort((a, b) => {
        if (orderBy === "priority") {
          return a.priority - b.priority
        }
        if (orderBy === "title") {
          return a.title.localeCompare(b.title)
        }
        return 0;
      });
    })
  }, [orderBy])
  
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