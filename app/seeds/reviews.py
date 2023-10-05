from app.models import db, environment, SCHEMA
from  app.models.reviews import Review
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_reviews():
    review1 = Review(
        user_id=1, restaurant_id=1, review_text="Hello!", stars=3)
    review2 = Review(
        user_id=2, restaurant_id=2, review_text="Hi!!", stars=4)
    review3 = Review(
        user_id=3, restaurant_id=3, review_text="AMAZING!!!", stars=5)

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))
        
    db.session.commit()