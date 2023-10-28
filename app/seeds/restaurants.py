from app.models import db, environment, SCHEMA
from  app.models.restaurants import Restaurant
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_restaurants():
    restaurant1 = Restaurant(
        user_id=1, name="Eleven Madison Park", address="11 Madison Ave", city="New York", state="NY", country="USA", description="Upscale American tasting menus from chef Daniel Humm served in a high-ceilinged art deco space", price_range=1, avg_rating=0, preview_image="https://cdn.discordapp.com/attachments/721867989632155649/1167722697141260309/Eleven-Madison-Park-Debuts-An-Abbreviated-Tasting-Menu-FT-3-BLOG0323-dc04cb9a40a84284a9f930031a71d248.jpg" )
    restaurant2 = Restaurant(
        user_id=2, name="The French Laundry", address="6640 Washington St", city="Yountville", state="CA", country="USA", description="Chef Thomas Keller's refined fixed-price meals continually draw food lovers to this stone farmhouse.", price_range=4, avg_rating=0, preview_image="https://cdn.discordapp.com/attachments/721867989632155649/1167723210704441414/tk.com_tfl_2.jpg" )
    restaurant3 = Restaurant(
        user_id=3, name="Le Bernardin", address="155 W 51st St", city="New York", state="NY ", country="USA", description="Elite French restaurant offers chef Eric Ripert's refined seafood, expert service & luxurious decor.", price_range=4, avg_rating=0, preview_image="https://media.timeout.com/images/103139458/750/422/image.jpg" )

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