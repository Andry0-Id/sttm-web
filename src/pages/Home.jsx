import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import FileForm from '../components/FileForm/FileForm'

/**
 * * Home definition
 * @returns Navbar
 */
function Home() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <FileForm />
    </div>
  )
}

export default Home