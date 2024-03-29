import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
// import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


function Settings({ handleLogout }) {
    

    
    return (
      <div className="settings-component">
        <h5 className="settings-header">Settings</h5>
        <button className='logout-btn' onClick={handleLogout} >Logout        <FontAwesomeIcon icon={faSignOut} /></button>
        {/* <button className='logout-btn' onClick={handleLogout} ><FontAwesomeIcon icon={faSignOutAlt} />Logout</button> */}
      </div>
    )
  }

export default Settings;