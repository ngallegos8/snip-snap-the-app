import time
import os
import base64
import AppKit
import requests
# from app import *
# from flask import Flask, session
# # from flask import RequestContext


class ClipboardMonitor:
    def __init__(self):
        self.pasteboard = AppKit.NSPasteboard.generalPasteboard()
        self.last_change_count = self.pasteboard.changeCount()

    def run(self):
        while True:
            if self.pasteboard.changeCount() != self.last_change_count:
                self.last_change_count = self.pasteboard.changeCount()
                self.handle_clipboard_change()
            time.sleep(1) # Check every second

    def handle_clipboard_change(self):
        if self.pasteboard.types().containsObject_(AppKit.NSFilenamesPboardType):
            self.save_file()
        elif self.pasteboard.types().containsObject_(AppKit.NSPasteboardTypeTIFF) or self.pasteboard.types().containsObject_(AppKit.NSPasteboardTypePNG):
            self.save_image()
        else:
            self.save_text()

    def save_file(self):
        file_url = self.pasteboard.propertyListForType_(AppKit.NSFilenamesPboardType)
       
        if file_url:
            file_path = file_url[0] # Assuming the first URL is the one you want to save
            file_name = os.path.basename(file_path)
            
            # Read the file content
            with open(file_path, 'rb') as f:
                file_content = f.read()
            
            # Encode the file content as Base64
            file_content_base64 = base64.b64encode(file_content).decode('utf-8')
            
            # Prepare the data to send
           
            data = {'content': file_content_base64, 'filename': file_name}
            
            # Send the data to the Flask server
            response = requests.post('http://127.0.0.1:5000/save_clipboard', json=data)
            if response.status_code == 201:
                print("File saved successfully.")
            else:
                print("Failed to save file.")
        else:
            print("No file found in clipboard.")

    def save_image(self):
        image_data = self.pasteboard.dataForType_(AppKit.NSPasteboardTypePNG)
        if image_data:
            # Encode the image data as Base64
            image_data_base64 = base64.b64encode(image_data).decode('utf-8')
            
            # Prepare the data to send
            data = {'content': image_data_base64}
            
            # Send the data to the Flask server
            response = requests.post('http://127.0.0.1:5000/save_clipboard', json=data)
            if response.status_code == 201:
                print("Image saved successfully.")
            else:
                print("Failed to save image.")
        else:
            print("No image found in clipboard.")


    def save_text(self):
        text = self.pasteboard.stringForType_(AppKit.NSStringPboardType)
        data = {'content': text}
        # with app.test_request_context():
           
        #     if "user_id" in session:
        #         user_id = session["user_id"]

        #         print("asdf")
        #         print(user_id)
            # else:
            #     print("None")
        response = requests.post('http://127.0.0.1:5000/save_clipboard', json=data)
        if response.status_code == 201:
            print("Text saved successfully.")
        else:
            print("Failed to save text.")

if __name__ == "__main__":
    monitor = ClipboardMonitor()
    monitor.run()