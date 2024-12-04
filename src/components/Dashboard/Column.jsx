/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useData } from "../../context/dataContext";
import Card from "../Card/Card";
import { AddIcon, DotMenu3 } from "../SVGs/icons";

export default function Column({group}){

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