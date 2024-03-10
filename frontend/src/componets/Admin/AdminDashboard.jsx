import React from 'react'
import TeachersTable from './TeachersTable'
import StudentsTable from './StudentTable'
import BookingTable from './BookingTable'

export const AdminDashboard = () => {
  return (
    <div className='py-10'>
      <div className='lg:px-72 px-5 space-y-10'>
        <TeachersTable/>

        <StudentsTable/>

        <BookingTable/>
      </div>

    </div>
  )
}
