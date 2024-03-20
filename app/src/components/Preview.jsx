import React, { useState, useEffect } from "react";

import Controls from "./Controls";
import DisplayPreview from "./DisplayPreview";


function Preview () {
    

    
    return (
        <div className="preview-component">
            <h3>Preview</h3>

            <div className="controls">
                <Controls />
            </div>

            <div className="displaypreview">
                <DisplayPreview />
            </div>
    
        </div>
    )
  }

export default Preview;