/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import InitialsIcon from "../SVGs/Initials"
import "./Card.css"
import { useData } from "../../context/dataContext"
import { BackLogIcon, CancelledIcon, DoneIcon, InProgressIcon, NoPriorityIcon, Priority1, Priority2, ToDOIcon } from "../SVGs/icons"

const statusIcons = {
  "Backlog" : <BackLogIcon />,
  "In progress": <InProgressIcon />,
  "Todo": <ToDOIcon />,
  "Done" : <DoneIcon />,
  "Cancelled" : <CancelledIcon />
}

export default function Card({data}) {
  const [usersData, setUsersData] = useState([])
  const {users} = useData()

  function getUserName(userId) {
    const user = usersData.find(user => user.id === userId);
    return user ? user.name : "N A";
  }
  
  useEffect(() => {
    setUsersData(() => {
      return users
    })
  }, [users])
  
  return (
    <div className='card'>
      <div className='card-header'>
        <span className='card-id'>
          {data.id}
        </span>
        <div>
          <InitialsIcon name={getUserName(data.userId)} />
        </div>
      </div>
      <div className='card-title'>
        {data.title.split(" ").slice(0, 7).join(" ") + "..."}
      </div>
      <div className='card-footer gap-1'>
        {statusIcons[data.status]}
        <div className="flex in-btwn gap-0_4 btn">
          <Icon />
          {data.tag.map((t, key) => {
          return  <div key={key}>{t}</div>
        })}</div>
      </div>
    </div>
  )
}

function Icon() {
  return (
    <>
      <div style={{
        width:"12px",
        aspectRatio: "1/1",
        borderRadius: "50%",
        background: "#80808073"
      }}>

      </div>
    </>
  )
}
