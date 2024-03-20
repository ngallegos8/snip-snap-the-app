import React, { useState, useEffect } from "react";

import ClipItemList from "./ClipItemList";

import Preview from "./Preview"



function Explorer({ clipItems, deleteClipItem }) {
    

    
    return (
        <div className="explorer-component">
            <h1>Explorer</h1>

            <div className="clipitemlist">
                <ClipItemList clipItems={clipItems} deleteClipItem={deleteClipItem} />
            </div>

            <div className="preview">
                <Preview />
            </div>

        </div>
    )
  }

export default Explorer;