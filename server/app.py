#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, Blueprint, request, session, make_response
from flask_restful import Resource
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import base64
import os

bp = Blueprint('clipboard', __name__)

# Local imports
from config import app, api
# from server.config import app, api

CORS(app)
# CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})


#) ✅ python -c 'import os; print(os.urandom(16))'
#) Used to hash the session data
# app.secret_key = b'*\x10\x1eI~\n=\xe6\x92\xb4N\xe1\x94\x8b\xea\xb8'
app.secret_key = b'\tG\xfc1\x97\xc1(\xfc\xfb\x17\xf3\xf9T\xff\xeb\xb0'


# Add your model imports
from models import db, User, ClipboardItem, Tag, ClipboardItemTag
# from server.models import db

import logging
logging.basicConfig(level=logging.DEBUG)
app.debug = True


# Views go here!
@app.route('/')
def index():
    return '<h1>Project Server</h1>'

#) Use @app.before_request, to run a function that checks if the session has the correct user, before every request
    #) Test this route out in client
@app.before_request
def check_session():
    if session.get("user_id") is None:
        session["user_id"] = None
        # print(session["user_id"])
    else:
        print("User is logged in")
        # print(session["user_id"])


class SignUp(Resource):
    def post(self):
        form_json = request.get_json()
        new_user = User(
            username = form_json["username"],
            password = form_json["password"],
            email = form_json["email"]
        )
        db.session.add(new_user)
        db.session.commit()
        session["user_id"] = new_user.id
        print(session["user_id"])
        return new_user.to_dict(), 201
api.add_resource(SignUp, '/signup')


class Login(Resource):
    def post(self):
        form_json = request.get_json()
        # logging.debug(f"Received login request: {form_json}")

        username = form_json["username"]
        password = form_json["password"]
        email = form_json["email"]
        
        user = User.query.filter(
            (User.username == username) | (User.email == email)
        ).first()
        
        if user and user.authenticate(password):
            session["user_id"] = user.id
            # logging.debug(f"Session data after setting user_id: {session.items()}")
            # logging.debug(f"User {username} authenticated successfully.")
            return user.to_dict(rules=("-clipboarditems",)), 200
        else:
            logging.debug(f"Authentication failed for user {username}.")
            return "Invalid Credentials", 401

api.add_resource(Login, "/login")


class LogOut(Resource):
    def delete(self):
        if session.get("user_id"):
            session["user_id"] = None
        return {}, 204
    
api.add_resource(LogOut, "/logout")


class CheckSession(Resource):
    def get(self):
        user_id = session["user_id"]

        if user_id:
            user = User.query.filter(User.id == user_id).first()
            session["user_id"] = user.id
            return user.to_dict(rules=('-clipboard_items.user',)), 200
        return {}, 401
    
api.add_resource(CheckSession, "/check_session")



class getOneUser(Resource):
    def get(self,id):
        user = User.query.filter(User.id == id).first()
        if(user):
            return user.to_dict(rules=("-clipboarditems",)), 200
        else:
            return {
                "error": "User not found"
            }, 404
        
    def patch(self,id):
        user = User.query.filter(User.id == id).first()
        if(user):
            try:
                data = request.get_json()
                for key in data:
                    setattr(user, key, data[key])
                db.session.add(user)
                db.session.commit()
                return user.to_dict(rules=("-clipboarditems",)), 202
            except Exception as e:
                print(e)
                return {"errors": ["validation errors"]}, 400
        else:
            return {
                "error": "User not found"
            }, 404
        
    def delete(self,id):
        user = User.query.filter(User.id == id).first()
        if(user):
            db.session.delete(user)
            db.session.commit()
            return {},204
        else:
            return {
                "error": "User not found"
            }, 404
        
api.add_resource(getOneUser, '/users/<int:id>')


class getAllClipboardItems(Resource):
    def get(self):
        clipboarditems = ClipboardItem.query.all()
        # return [clipboarditem.to_dict(only=("content", "user_id")) for clipboarditem in clipboarditems], 200
        # return [clipboarditem.to_dict(only=("content", )) for clipboarditem in clipboarditems], 200
        return [clipboarditem.to_dict(only=("content", "id", "-tag_clipboarditems")) for clipboarditem in clipboarditems], 200
        # return [clipboarditem.to_dict() for clipboarditem in clipboarditems], 200
        # return [clipboarditem.to_dict(only=("content","-tag_clipboarditems")) for clipboarditem in clipboarditems], 200
        # return [clipboarditem.to_dict(rules=("-tag_clipboarditems", )) for clipboarditem in clipboarditems], 200
    
    def post(self):
        try:
            
            data= request.get_json()
            new_clipboard_item = ClipboardItem(
                content = data['content'],
                user_id = data['user_id']
            )
            db.session.add(new_clipboard_item)
            db.session.commit()
            return new_clipboard_item.to_dict(), 201
        except Exception as e:
            print(e)
            return { "errors": ["validation errors"] }, 400
        
api.add_resource(getAllClipboardItems,'/clipboarditems')


class getOneClipboardItem(Resource):
    def delete(self,id):
        clipboard_item = ClipboardItem.query.filter(ClipboardItem.id == id).first()
        if(clipboard_item):
            db.session.delete(clipboard_item)
            db.session.commit()
            return {}, 204
        else:
            return {
                "error": "Clipboard Item not found"
            }, 404
        
api.add_resource(getOneClipboardItem,'/clipboarditems/<int:id>')


class SaveClipboard(Resource):
    def post(self):
        data = request.get_json()
        # print(data)
        # print(session["user_id"])
        if data is None:
            return 'Bad Request', 400
        content = data.get('content')
        if content is None:
            return 'Bad Request', 400
        # image
        if content.startswith('data:image/png;base64,'):
            image_data = content.split(',')[1]
            image_bytes = base64.b64decode(image_data)
            image_path = 'path/to/save/image.png'
            with open(image_path, 'wb') as f:
                f.write(image_bytes)
        # file
        elif content.startswith('file://'):
            file_url = content[7:]
            file_path = NSURL.URLWithString_(file_url).path()
            os.system(f'cp "{file_path}" /path/to/save/')
        # text
        else:
            new_content = ClipboardItem(content=content)
            db.session.add(new_content)
            db.session.commit()
        return 'Content saved', 201

api.add_resource(SaveClipboard, '/save_clipboard')




# # # TRYING TO AUTO TAG ITEM BASED ON FILE TYPE
# # # NEED TO FIGURE OUT HOW TO PASS SESSION INTO 'clipboard_monitor.py' TO BE ABLE TO SEND USER_ID IN THE JSON RESPONSE TO THIS ROUTE
# class SaveClipboard(Resource):
#     def post(self):
#         data = request.get_json()
#         print(data)
#         if data is None:
#             return 'Bad Request', 400
#         content = data.get('content')
#         filename = data.get('filename')
#         if content is None and filename is None:
#             return 'Bad Request', 400
        
#         if filename:
#             content_type = "File"
#         elif content.startswith('data:image/png;base64,'):
#             content_type = "Image"
#         else:
#             content_type = "Text"
        
#         user_id = session['user_id']
#         logging.debug(f"Session data: {session.items()}")
#         logging.debug(f"User ID: {user_id}")
#         if not user_id:
#             return 'User not logged in', 401
        
#         tag = Tag.query.filter_by(name=content_type, user_id=user_id).first()
#         if not tag:
#             tag = Tag(name=content_type, user_id=user_id)
#             db.session.add(tag)
#             db.session.commit()
        
#         if content_type == "Image":
#             image_data = content.split(',')[1]
#             image_bytes = base64.b64decode(image_data)
#             image_path = 'path/to/save/image.png'
#             with open(image_path, 'wb') as f:
#                 f.write(image_bytes)
#         elif content_type == "File":
#             file_url = content[7:]
#             file_path = NSURL.URLWithString_(file_url).path()
#             os.system(f'cp "{file_path}" /path/to/save/')
#         else:
#             new_content = ClipboardItem(content=content, tag_clipboarditems=[tag])
#             db.session.add(new_content)
#             db.session.commit()

# api.add_resource(SaveClipboard, '/save_clipboard')


# @app.route('/save_clipboard', methods=['POST'])
# def save_clipboard():
#     data = request.get_json()
#     if data is None:
#         return 'Bad Request', 400
#     content = data.get('content')
#     if content is None:
#         return 'Bad Request', 400
#     if content.startswith('data:image/png;base64,'):
#         # Handle image
#         image_data = content.split(',')[1]
#         image_bytes = base64.b64decode(image_data)
#         image_path = 'path/to/save/image.png'
#         with open(image_path, 'wb') as f:
#             f.write(image_bytes)
#     elif content.startswith('file://'):
#         # Handle file
#         file_url = content[7:]
#         file_path = NSURL.URLWithString_(file_url).path()
#         # Copy the file to your desired location
#         # This is a simplified example; you might want to handle errors and permissions
#         os.system(f'cp "{file_path}" /path/to/save/')
#     else:
#         # Handle text
#         new_content = ClipboardItem(content=content)
#         db.session.add(new_content)
#         db.session.commit()
#     return 'Content saved', 201




# # # TRYING TO AUTO TAG ITEM BASED ON FILE TYPE
# @app.route('/save_clipboard', methods=['POST'])
# def save_clipboard():
    
#     data = request.get_json()
#     if data is None:
#         return 'Bad Request', 400
#     content = data.get('content')
#     filename = data.get('filename') # Assuming filename is part of the JSON data
#     if content is None and filename is None:
#         return 'Bad Request', 400
    
#     # Determine the content type
#     if filename:
#         content_type = "File"
#     elif content.startswith('data:image/png;base64,'):
#         content_type = "Image"
#     else:
#         content_type = "Text"
    
#     # Find or create the tag based on the content type
#     logging.debug(f"Session data: {session.items()}")
#     user_id = session.get('user_id')
#     logging.debug(f"User ID: {user_id}")
#     if not user_id:
#         return 'User not logged in', 401
    
#     tag = Tag.query.filter_by(name=content_type, user_id=user_id).first()
#     if not tag:
#         tag = Tag(name=content_type, user_id=user_id)
#         db.session.add(tag)
#         db.session.commit()
    
#     # Handle the content based on its type
#     if content_type == "Image":
#         # Handle image
#         image_data = content.split(',')[1]
#         image_bytes = base64.b64decode(image_data)
#         image_path = 'path/to/save/image.png'
#         with open(image_path, 'wb') as f:
#             f.write(image_bytes)
#     elif content_type == "File":
#         # Handle file
#         file_url = content[7:]
#         file_path = NSURL.URLWithString_(file_url).path()
#         # Copy the file to your desired location
#         # This is a simplified example; you might want to handle errors and permissions
#         os.system(f'cp "{file_path}" /path/to/save/')
#     else:
#         # Handle text
#         new_content = ClipboardItem(content=content, tag_clipboarditems=[tag])
#         db.session.add(new_content)
#         db.session.commit()
    
#     return 'Content saved', 201






class getAllTags(Resource):
    def get(self):
        tags = Tag.query.all()
        # return [tag.to_dict(only=("name", "user_id")) for tag in tags], 200
        return [tag.to_dict(only=("name", "id")) for tag in tags], 200
    
    def post(self):
        try:
            data= request.get_json()
            new_tag = Tag(
                name = data['name'],
                user_id = data['user_id']
            )
            db.session.add(new_tag)
            db.session.commit()
            return new_tag.to_dict(), 201
        except Exception as e:
            print(e)
            return { "errors": ["validation errors"] }, 400
        
api.add_resource(getAllTags,'/tags')


class getOneTag(Resource):

    def get(self,id):
        tag = Tag.query.filter(Tag.id == id).first()
        if(tag):
            return tag.to_dict(only=("name", "user_id")), 200
        else:
            return {
                "error": "Tag not found"
            }, 404
        
    def patch(self,id):
        tag = Tag.query.filter(Tag.id == id).first()
        if(tag):
            try:
                data = request.get_json()
                for key in data:
                    setattr(tag, key, data[key])
                db.session.add(tag)
                db.session.commit()
                return tag.to_dict(), 202
            except Exception as e:
                print(e)
                return {"errors": ["validation errors"]}, 400
        else:
            return {
                "error": "Tag not found"
            }, 404
        

    def delete(self,id):
        tag = Tag.query.filter(Tag.id == id).first()
        if(tag):
            db.session.delete(tag)
            db.session.commit()
            return {}, 204
        else:
            return {
                "error": "Tag not found"
            }, 404
        
api.add_resource(getOneTag,'/tags/<int:id>')

class ClipboardItemsByTag(Resource):
    def get(self, tag_id):
        clipboard_item_tags = ClipboardItemTag.query.filter_by(tag_id=tag_id).all()
        clipboard_item_ids = [clipboard_item_tag.clipboard_item_id for clipboard_item_tag in clipboard_item_tags]
        clipboard_items = ClipboardItem.query.filter(ClipboardItem.id.in_(clipboard_item_ids)).all()
        return [clipboard_item.to_dict() for clipboard_item in clipboard_items], 200

api.add_resource(ClipboardItemsByTag, '/clipboarditems/tag/<int:tag_id>')





if __name__ == '__main__':
    app.run(debug=True)