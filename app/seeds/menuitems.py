from app.models import db, environment, SCHEMA
from app.models.menuitems import MenuItem
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_menuitems():
    menuitem1 = MenuItem(
        restaurant_id=1, name="Yummy Taco", description="Very good trust me", price=2.99, preview_image="https://www.thewholesomedish.com/wp-content/uploads/2019/06/The-Best-Classic-Tacos-550.jpg")
    menuitem2 = MenuItem(
        restaurant_id=2, name="Yummy Burger", description="Very good trust me", price=3.99, preview_image="https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Scrum-Delicious-Burgers_EXPS_CHMZ19_824_B10_30_2b.jpg")
    menuitem3 = MenuItem(
        restaurant_id=3, name="Most Delicious Lasagna", description="The best trust me", price=6.99, preview_image="https://shewearsmanyhats.com/wp-content/uploads/2014/10/lasagna-1.jpg")

    db.session.add(menuitem1)
    db.session.add(menuitem2)
    db.session.add(menuitem3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_menuitems():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.menuitems RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM menuitems"))

    db.session.commit()
