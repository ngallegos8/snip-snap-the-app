from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy import MetaData
#5 )pip install flask_bcrypt and import bcrypt and wrap the app in bcrypt, import hybrid property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from flask_bcrypt import Bcrypt
from datetime import datetime

bcrypt = Bcrypt()
from datetime import datetime

metadata = MetaData(naming_convention={
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_`%(constraint_name)s`",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
    })

db = SQLAlchemy(metadata=metadata)

# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
# db = SQLAlchemy(app)



class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique = True)
    _password_hash = db.Column(db.String)
    email = db.Column(db.String, unique=True, nullable=False)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    #6.1 Create a get method using hybrid property, and bcrypt
    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    #6.2 Create a setter method to set the password using bcrypt
    @password_hash.setter
    def password(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode("utf-8"))
        self._password_hash = password_hash.decode("utf-8")
    
    #6.3 Create an authentication method to check the password using bcrypt
    def authenticate(self, password):
        return bcrypt.check_password_hash(self.password_hash, password.encode("utf-8"))

    # #  VALIDATIONS
    # @validates('username')
    # def validate_username(self, key, value):
    #     if(1 < len(value)):
    #         return value
    #     else:
    #         raise ValueError("Username must be greater than 1 character")

    # Add relationship
    clipboarditems = db.relationship('ClipboardItem', back_populates = "users")
    
    # Add serialization rules
    serialize_rules = ('-clipboarditems.users',)




class ClipboardItem(db.Model, SerializerMixin):
    __tablename__ = 'clipboarditems'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Correct the back_populates attribute to match the relationship name in ClipboardItemTag
    users = db.relationship('User', back_populates='clipboarditems')
    tag_clipboarditems = db.relationship('Tag', secondary='clipboarditemtags', back_populates='clipboarditem_tags')

    # Add serialization rules
    serialize_rules = ('-user.clipboarditems', '-tags.clipboarditems')



class Tag(db.Model, SerializerMixin):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # Correct the back_populates attribute to match the relationship name in ClipboardItemTag
    clipboarditem_tags = db.relationship('ClipboardItem', secondary='clipboarditemtags', back_populates='tag_clipboarditems')

    # Add serialization rules
    serialize_rules = ('-clipboarditems.tags', )




class ClipboardItemTag(db.Model, SerializerMixin):
    __tablename__ = 'clipboarditemtags'

    id = db.Column(db.Integer, primary_key=True)
    clipboard_item_id = db.Column(db.Integer, db.ForeignKey('clipboarditems.id'), nullable=False)
    tag_id = db.Column(db.Integer, db.ForeignKey('tags.id'), nullable=False)

    # Ensure the relationship names are correctly defined
    clipboarditem = db.relationship('ClipboardItem', backref='clipboarditem_tags')
    tag = db.relationship('Tag', backref='tag_clipboarditems')

    # Add serialization rules
    serialize_rules = ('-clipboarditem.tags', '-tag.clipboarditems')
