from app import app 
from models import db, User, ClipboardItem, Tag
# from server.app import app 
# from server.models import db, User, ClipboardItem, Tag

def seed_common_tags():
    common_tags = ["Text", "Image", "Email", "File", "Code"]
    for tag_name in common_tags:
        tag = Tag.query.filter_by(name=tag_name).first()
        if not tag:
            tag = Tag(name=tag_name)
            db.session.add(tag)
    db.session.commit()

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
    # ClipboardItemTag.query.delete()

    # Create new User instances
    stephen = User(username="Stephen", password="Lambert", email="stephen@gmail.com")
    david = User(username="David", password="Doan", email="david@gmail.com")
    nick = User(username="Nick", password="Gallegos", email="nick@gmail.com")

    db.session.add(stephen)
    db.session.add(david)
    db.session.add(nick)

    # Create new ClipboardItem instances
    item1 = ClipboardItem(content="STEPHEN", user_id=1, tag_id=1, is_favorited=True)
    item2 = ClipboardItem(content="DAVID", user_id=2, tag_id=1, is_favorited=True)
    item3 = ClipboardItem(content="NICK", user_id=3, tag_id=1)
    item4 = ClipboardItem(content="ABC", user_id=1, tag_id=3)
    item5 = ClipboardItem(content="Abc", user_id=2, tag_id=3)
    item6 = ClipboardItem(content="abcImage", user_id=3, tag_id=2)

    # item1 = ClipboardItem(content="STEPHEN", contentType="Text", user_id=1, tag_id=1, is_favorited=True)
    # item2 = ClipboardItem(content="DAVID", contentType="Text", user_id=2, tag_id=1, is_favorited=True)
    # item3 = ClipboardItem(content="NICK", contentType="Text", user_id=3, tag_id=1)
    # item4 = ClipboardItem(content="ABC", contentType="File", user_id=1, tag_id=3)
    # item5 = ClipboardItem(content="Abc", contentType="File", user_id=2, tag_id=3)
    # item6 = ClipboardItem(content="abcImage", contentType="Image", user_id=3, tag_id=2)

    db.session.add(item1)
    db.session.add(item2)
    db.session.add(item3)
    db.session.add(item4)
    db.session.add(item5)
    db.session.add(item6)

    # Create new Tag instances


    # name_tag_1 = Tag(name="Name", user_id=1)
    # letters_tag_1 = Tag(name="Letters", user_id=1)
    # image_tag_1 = Tag(name="Image", user_id=1)
    # code_tag_1 = Tag(name="Code", user_id=1)
    # name_tag_2 = Tag(name="Name", user_id=2)
    # letters_tag_2 = Tag(name="Letters", user_id=2)
    # image_tag_2 = Tag(name="Image", user_id=2)
    # code_tag_2 = Tag(name="Code", user_id=2)
    # name_tag_3 = Tag(name="Name", user_id=3)
    # letters_tag_3 = Tag(name="Letters", user_id=3)
    # image_tag_3 = Tag(name="Image", user_id=3)
    # code_tag_3 = Tag(name="Code", user_id=3)

    # db.session.add(name_tag_1)
    # db.session.add(letters_tag_1)
    # db.session.add(image_tag_1)
    # db.session.add(code_tag_1)
    # db.session.add(name_tag_2)
    # db.session.add(letters_tag_2)
    # db.session.add(image_tag_2)
    # db.session.add(code_tag_2)
    # db.session.add(name_tag_3)
    # db.session.add(letters_tag_3)
    # db.session.add(image_tag_3)
    # db.session.add(code_tag_3)

    # # Create ClipboardItemTag instances
    # clipboard_item_tag1 = ClipboardItemTag(clipboard_item_id=1, tag_id=1)
    # clipboard_item_tag2 = ClipboardItemTag(clipboard_item_id=2, tag_id=2)
    # clipboard_item_tag3 = ClipboardItemTag(clipboard_item_id=3, tag_id=3)

    # db.session.add(clipboard_item_tag1)
    # db.session.add(clipboard_item_tag2)
    # db.session.add(clipboard_item_tag3)

    # Commit the changes to the database
    db.session.commit()

    seed_common_tags()

    print("Database seeded successfully.")
