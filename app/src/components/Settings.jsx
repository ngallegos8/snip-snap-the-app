import React, { useState, useEffect } from "react";


function Settings({ handleLogout }) {
    

    
    return (
      <div className="settings-component">
        <h3>Settings</h3>
        <button className='logout-btn' onClick={handleLogout}>Logout</button>
      </div>
    )
  }

export default Settings;