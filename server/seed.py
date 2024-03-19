from app import app 
from models import db, User, ClipboardItem, Tag, ClipboardItemTag
from datetime import datetime

with app.app_context():
    print("Deleting Customers")
    
    # # Explicitly delete ClipboardItem instances associated with each User
    # for user in User.query.all():
    #     for item in user.clipboarditems:
    #         db.session.delete(item)
    
    # Now delete User instances
    User.query.delete()
    ClipboardItem.query.delete()
    Tag.query.delete()
    ClipboardItemTag.query.delete()

    # Create new User instances
    stephen = User(username="Stephen", password="Lambert", email="stephen@gmail.com")
    david = User(username="David", password="Doan", email="david@gmail.com")
    nick = User(username="Nick", password="Gallegos", email="nick@gmail.com")

    db.session.add(stephen)
    db.session.add(david)
    db.session.add(nick)

    # Create new ClipboardItem instances
    item1 = ClipboardItem(content="STEPHEN", user_id=1)
    item2 = ClipboardItem(content="DAVID", user_id=2)
    item3 = ClipboardItem(content="NICK", user_id=3)
    item4 = ClipboardItem(content="ABC", user_id=1)
    item5 = ClipboardItem(content="Abc", user_id=2)
    item6 = ClipboardItem(content="abc", user_id=3)

    db.session.add(item1)
    db.session.add(item2)
    db.session.add(item3)
    db.session.add(item4)
    db.session.add(item5)
    db.session.add(item6)

    # Create new Tag instances
    name_tag = Tag(name="Name", user_id=1)
    letters_tag = Tag(name="Letters", user_id=2)
    image_tag = Tag(name="Image", user_id=2)
    code_tag = Tag(name="Code", user_id=3)

    db.session.add(name_tag)
    db.session.add(letters_tag)
    db.session.add(image_tag)
    db.session.add(code_tag)

    # Create ClipboardItemTag instances
    clipboard_item_tag1 = ClipboardItemTag(clipboard_item_id=1, tag_id=1)
    clipboard_item_tag2 = ClipboardItemTag(clipboard_item_id=2, tag_id=2)
    clipboard_item_tag3 = ClipboardItemTag(clipboard_item_id=3, tag_id=3)

    db.session.add(clipboard_item_tag1)
    db.session.add(clipboard_item_tag2)
    db.session.add(clipboard_item_tag3)

    # Commit the changes to the database
    db.session.commit()

    print("Database seeded successfully.")
