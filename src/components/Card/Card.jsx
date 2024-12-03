import "./Card.css"

export default function Card({data}) {
  return (
    <div className='card'>
      <div className='card-header'>
        <span className='card-id'>
          {data.id}
        </span>
        <div>
          <img src="" alt="avatar" />
        </div>
      </div>
      <div className='card-title'>
        {data.title}
      </div>
      <div className='card-footer'>
        <button className='card-icon'>
          !
        </button>
        <div>
          <div>{data.status}</div>
          <div>{data.tag.map((t, key) => {
            return  <div key={key}>{t}</div>
          })}</div>
        </div>
      </div>
    </div>
  )
}
