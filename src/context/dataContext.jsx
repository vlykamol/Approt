/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const dataContext = createContext()

export function useData() {
  return useContext(dataContext)
}

export function DataProvider({children}){
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  const [priorities, setPriorities] = useState([]);
  const [status, setStatus] = useState([]);

  const [groupBy, setGroupBy] = useState('users')
  const [groups, setGroups] = useState(["status", "users", "priority"])
  const [orderBy, setOrderBy] = useState('priority')
  const [orders, setOrders] = useState(["priority", "title"])
  
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const url = "https://api.quicksell.co/v1/internal/frontend-assignment";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        setTickets(json.tickets)
        setUsers(json.users)
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    }

    getData();
  }, [])

  useEffect(() => {
    let p = new Set()
    let s = new Set()
    tickets.map(t => {
      p.add(t.priority)
      s.add(t.status)
    })
    setPriorities([...p])
    setStatus([...s])
  }, [tickets])
  
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
  

  const value = {
    users,
    tickets,
    priorities,
    status,
    groupBy,
    setGroupBy,
    groups,
    orderBy,
    setOrderBy,
    orders
  }

  return (<dataContext.Provider value={value}>{!loading && children}</dataContext.Provider>)

}