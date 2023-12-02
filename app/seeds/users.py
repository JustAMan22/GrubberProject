from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    users_to_add = [
        User(username='user4', email='user4@example.com', password='password'),
        User(username='user5', email='user5@example.com', password='password'),
        User(username='user6', email='user6@example.com', password='password'),
        User(username='user7', email='user7@example.com', password='password'),
        User(username='user8', email='user8@example.com', password='password'),
        User(username='user9', email='user9@example.com', password='password'),
        User(username='user10', email='user10@example.com', password='password'),
        User(username='user11', email='user11@example.com', password='password'),
        User(username='user12', email='user12@example.com', password='password'),
        User(username='user13', email='user13@example.com', password='password'),
        User(username='user14', email='user14@example.com', password='password'),
        User(username='user15', email='user15@example.com', password='password')
    ]

    # Add the 12 additional users
    db.session.add_all(users_to_add)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
