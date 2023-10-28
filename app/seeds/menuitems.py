from app.models import db, environment, SCHEMA
from app.models.menuitems import MenuItem
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_menuitems():
    menuitem1 = MenuItem(
        restaurant_id=1, name="Elder Flower & Blueberry", description="dairy-free elderflower semifreddo with coconut yogurt", price=79.99, preview_image="https://cdn.discordapp.com/attachments/721867989632155649/1167729171485691954/1234216114.png")
    menuitem2 = MenuItem(
        restaurant_id=2, name="Nova Scotia Lobster", description="Garden Broccoli 'à la Plancha,' Preserved Meyer Lemon, Cauliflower 'Confetti' and Creamy Lobster Broth", price=109.99, preview_image="https://cdn.discordapp.com/attachments/721867989632155649/1167730312340590662/67245786_2915595885148657_8477558851464331264_n.jpg")
    menuitem3 = MenuItem(
        restaurant_id=3, name="Taragai", description="Thinly Sliced Taragai; Saffron Gelée, Extra Virgin Olive Oil", price=199.99, preview_image="https://imageio.forbes.com/specials-images/imageserve/639330915a1a8f861db13be4/Le-Bernardin-for-Forbes-2022-All-Star-Eateries-In-New-York-/0x0.jpg")

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
