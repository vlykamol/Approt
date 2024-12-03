import "./Dashboard.css"
import Card from '../Card/Card'
import { useData } from "../../context/dataContext"

export default function Dashboard() {
  const {tickets, status, priorities, users} = useData()
  console.log("tickets :: ", status, priorities, users);
  
  return (
    <div className='container'>
      
      {tickets.map((tick, key) => {
        return <Card key={key} data={tick} />
      })}
    </div>
  )
}
