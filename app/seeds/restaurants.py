from app.models import db, environment, SCHEMA
from  app.models.restaurants import Restaurant
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_restaurants():
    restaurant1 = Restaurant(
        user_id=1, name="Taco Rain", address="229 Treadway Ct", city="Paris", state="TX", country="USA", description="A lovely taco shop with lovely tacos!", price_range=1, avg_rating=0, preview_image="https://kristineskitchenblog.com/wp-content/uploads/2023/02/tacos-recipe-16-2.jpg" )
    restaurant2 = Restaurant(
        user_id=2, name="Burger Wind", address="300 Burger Sparta", city="Lacedaemon", state="Sparta", country="Greece", description="A lovely burger shop with lovely burger!", price_range=2, avg_rating=0, preview_image="https://4.bp.blogspot.com/_sOq6xu3HQpU/S9XEgvIuR1I/AAAAAAAAAl4/GUmR4YSNzLA/s1600/barley-spartan-gruel.4.26.10-900.jpg" )
    restaurant3 = Restaurant(
        user_id=3, name="Lasagna Palace", address="600 Ricotta Drive", city="Rome", state="Lazio", country="Italy", description="A lovely lasgna shop with lovely lasgna!", price_range=3, avg_rating=0, preview_image="https://www.melskitchencafe.com/wp-content/uploads/2013/04/Lasagna-Close-PSD.jpg" )

    db.session.add(restaurant1)
    db.session.add(restaurant2)
    db.session.add(restaurant3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_restaurants():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.restaurants RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM restaurants"))
        
    db.session.commit()