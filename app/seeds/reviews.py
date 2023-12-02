from app.models import db, environment, SCHEMA
from app.models.reviews import Review
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_reviews():
    review1 = Review(
        user_id=1, restaurant_id=1, review_text="The chef here makes superb quality of food.", stars=5)
    review2 = Review(
        user_id=2, restaurant_id=2, review_text="The food made my tummy tingle in the best way possible!", stars=5)
    review3 = Review(
        user_id=3, restaurant_id=3, review_text="What's the name of this place again? Drool central?... Yum!", stars=5)

    # Add the initial 3 reviews
    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)

    # Add 12 more reviews
    reviews_to_add = [
        Review(user_id=4, restaurant_id=4,
               review_text="Amazing experience, will definitely come back!", stars=4),
        Review(user_id=5, restaurant_id=5,
               review_text="Delicious food and great atmosphere!", stars=4),
        Review(user_id=6, restaurant_id=6,
               review_text="Lovely place with fantastic service.", stars=4),
        Review(user_id=7, restaurant_id=7,
               review_text="Tried the chef's special, and it was outstanding!", stars=4),
        Review(user_id=8, restaurant_id=8,
               review_text="A hidden gem! The flavors were exceptional.", stars=4),
        Review(user_id=9, restaurant_id=9,
               review_text="Cozy setting, perfect for a romantic dinner.", stars=4),
        Review(user_id=10, restaurant_id=10,
               review_text="Friendly staff and mouth-watering dishes!", stars=4),
        Review(user_id=11, restaurant_id=11,
               review_text="Unique and delicious menu options.", stars=4),
        Review(user_id=12, restaurant_id=12,
               review_text="Impressed by the presentation and taste.", stars=4),
        Review(user_id=13, restaurant_id=13,
               review_text="Great place for a casual meal with friends.", stars=4),
        Review(user_id=14, restaurant_id=14,
               review_text="Enjoyed the variety of flavors in every bite.", stars=4),
        Review(user_id=15, restaurant_id=15,
               review_text="Outstanding service and delightful ambiance.", stars=4),
    ]

    # Add the 12 additional reviews
    db.session.add_all(reviews_to_add)

    # Commit all changes to the database
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
