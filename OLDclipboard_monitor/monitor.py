# clipboard_monitor/monitor.py

import objc
from Cocoa import NSPasteboard, NSPasteboardTypeString, NSPasteboardTypeTIFF, NSPasteboardTypeFileURL
from Foundation import NSURL
from AppKit import NSWorkspace
import requests
import base64
import time

# Function to get clipboard content
def get_clipboard_content():
    pasteboard = NSPasteboard.generalPasteboard()
    types = pasteboard.types()

    if NSPasteboardTypeString in types:
        return pasteboard.stringForType_(NSPasteboardTypeString)
    elif NSPasteboardTypeTIFF in types:
        return pasteboard.dataForType_(NSPasteboardTypeTIFF)
    elif NSPasteboardTypeFileURL in types:
        return pasteboard.propertyListForType_(NSPasteboardTypeFileURL)
    else:
        return None

# Function to send clipboard content to Flask backend
def send_clipboard_content(content):
    # Convert content to base64 for secure transmission
    if isinstance(content, bytes):
        content = base64.b64encode(content).decode('utf-8')
    requests.post('http://localhost:5000/save_clipboard', data={'content': content})

# Main loop to monitor clipboard
def monitor_clipboard():
    last_clipboard_content = None
    while True:
        current_clipboard_content = get_clipboard_content()
        if current_clipboard_content != last_clipboard_content:
            last_clipboard_content = current_clipboard_content
            send_clipboard_content(current_clipboard_content)
        time.sleep(1) # Check every second

if __name__ == '__main__':
    monitor_clipboard()