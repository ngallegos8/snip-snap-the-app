import AppKit
import requests
import time

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
        # Implement file saving logic here
        pass

    def save_image(self):
        # Implement image saving logic here
        pass

    def save_text(self):
        text = self.pasteboard.stringForType_(AppKit.NSStringPboardType)
        data = {'content': text}
        response = requests.post('http://localhost:5000/save_clipboard', json=data)
        if response.status_code == 201:
            print("Text saved successfully.")
        else:
            print("Failed to save text.")

if __name__ == "__main__":
    monitor = ClipboardMonitor()
    monitor.run()
