import { createContext, useContext, useEffect, useState } from "react";

const dataContext = createContext()

export function useData() {
  return useContext(dataContext)
}

export function DataProvider({children}){
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState([])
  const [users, setUsers] = useState([]);

  const [priorities, setPriorities] = useState([]);
  const [status, setStatus] = useState([])


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

  const value = {
    users,
    tickets,
    priorities,
    status
  }

  return (<dataContext.Provider value={value}>{!loading && children}</dataContext.Provider>)

}