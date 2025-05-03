import React, {useEffect, useState} from 'react'
import "../index.css"

function Profile() {
    const userData = localStorage.getItem("user");
    let user = null;
    const token = localStorage.getItem("token");

  try {
    user = userData ? JSON.parse(userData) : null;
  } catch (e) {
    console.error("Erreur de parsing userData:", e);
  }

  const isAuthenticated = !!token;
  const userRole = user?.role ?? null;
try {
  user = userData ? JSON.parse(userData) : null;
} catch (e) {
  console.error("Erreur de parsing userData:", e);
}
  return (
    <div>
      <div className="">
        {/* <div><img src={Avatar} alt="Profile" className='w-25' /></div> */}
        <div className='px-4 py-1 d-flex flex-column justify-content-center align-items-center navConnexion'>
        <div className='d-flex gap-4'>
        <p className="mb-0 pb-0 fw-bolder">{user?.firstName} {user?.lastName}</p>
        {isAuthenticated && userRole === "admin" && (
          <p className="p-0 m-0">{user?.role}</p>
        )}
        </div>
        <p className="p-0 m-0">{user?.profession}</p>
        </div>
                  </div>
    </div>
  )
}

export default Profile
