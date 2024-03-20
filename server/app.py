#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, request, session, make_response
from flask_restful import Resource

# Local imports
from config import app, api
#) ✅ python -c 'import os; print(os.urandom(16))'
#) Used to hash the session data
# app.secret_key = b'*\x10\x1eI~\n=\xe6\x92\xb4N\xe1\x94\x8b\xea\xb8'
app.secret_key = b'\tG\xfc1\x97\xc1(\xfc\xfb\x17\xf3\xf9T\xff\xeb\xb0'


# Add your model imports
from models import db, User, ClipboardItem, Tag, ClipboardItemTag

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
    else:
        print("User is logged in")
        print(session["user_id"])


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
        logging.debug(f"Received login request: {form_json}")

        username = form_json["username"]
        password = form_json["password"]
        email = form_json["email"]
        
        user = User.query.filter(
            (User.username == username) | (User.email == email)
        ).first()
        
        if user and user.authenticate(password):
            session["user_id"] = user.id
            logging.debug(f"User {username} authenticated successfully.")
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
            return user.to_dict(rules=('-clipboard_items.user',)), 200
        return {}, 401
    
api.add_resource(CheckSession, "/check_session")



class getOneUser(Resource):
    def get(self,id):
        user = User.query.filter(User.id == id).first()
        if(user):
            return user.to_dict(), 200
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
                return user.to_dict(), 202
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
        
api.add_resource(getOneUser, '/users/<id>')


class getAllClipboardItems(Resource):
    def get(self):
        clipboarditems = ClipboardItem.query.all()
        return [clipboarditems.to_dict(rules=('-users',)) for clipboarditem in clipboarditems], 200
    
    def post(self):
        try:
            data= request.get_json()
            new_clipboard_item = ClipboardItem(
                content = data['content'],
                user_id = data['user_id']
            )
            db.session.add(new_clipboard_item)
            db.session.commit()
            return new_clipboard_item.to_dict(rules=("-users", )), 201
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
        
api.add_resource(getOneClipboardItem,'/clipboarditems/<id>')


class getAllTags(Resource):
    def get(self):
        tags = Tag.query.all()
        return [tags.to_dict() for tag in tags], 200
    
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
            return tag.to_dict(), 200
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
        
api.add_resource(getOneTag,'/tags/<id>')




if __name__ == '__main__':
    app.run(debug=True)