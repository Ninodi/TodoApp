import React from 'react'

function TodayDate() {
    const currDate = new Date()
    const day = currDate.toLocaleString('en-US', { weekday: 'short' })
    const month = currDate.toLocaleString('en-US', { month: 'short' })
    const date = currDate.getDate()

  return (
    <div className='today-date'><span>Today</span> {day} - {month} {date}</div>
  )
}

export default TodayDate