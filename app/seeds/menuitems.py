from app.models import db, environment, SCHEMA
from app.models.menuitems import MenuItem
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_menuitems():
    menuitem1 = MenuItem(
        restaurant_id=1, name="Elder Flower & Blueberry", description="dairy-free elderflower semifreddo with coconut yogurt", price=79.99, preview_image="https://i.imgur.com/ZwVKPtU.png")
    menuitem2 = MenuItem(
        restaurant_id=2, name="Nova Scotia Lobster", description="à la Plancha,' Preserved Meyer Lemon, Cauliflower 'Confetti' and Creamy Lobster Broth", price=109.99, preview_image="https://i.imgur.com/IldIHQN.jpeg")
    menuitem3 = MenuItem(
        restaurant_id=3, name="Taragai", description="Thinly Sliced Taragai; Saffron Gelée, Extra Virgin Olive Oil", price=199.99, preview_image="https://imageio.forbes.com/specials-images/imageserve/639330915a1a8f861db13be4/Le-Bernardin-for-Forbes-2022-All-Star-Eateries-In-New-York-/0x0.jpg")

    # Add the initial 3 menu items
    db.session.add(menuitem1)
    db.session.add(menuitem2)
    db.session.add(menuitem3)

    # Add 12 more menu items
    menuitems_to_add = [
        MenuItem(restaurant_id=4, name="Menu Item 4",
                 description="Description 4", price=49.99, preview_image="https://www.foodandwine.com/thmb/cv6eBzRNYj8G_9BJ0-GUatpQ5bc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/201004-ss-mugaritz-158ac5b466da4f11827c955384801412.jpg"),
        MenuItem(restaurant_id=5, name="Menu Item 5",
                 description="Description 5", price=59.99, preview_image="https://static.demilked.com/wp-content/uploads/2020/03/5e74779735304-japanese-mom-egg-food-art-1-5e73634d343e4__880.jpg"),
        MenuItem(restaurant_id=6, name="Menu Item 6",
                 description="Description 6", price=69.99, preview_image="https://assets.lightspeedhq.com/img/2019/07/8aac85b2-blog_foodpresentationtipsfromtopchefs.jpg"),
        MenuItem(restaurant_id=7, name="Menu Item 7",
                 description="Description 7", price=79.99, preview_image="https://previews.123rf.com/images/artman1/artman11908/artman1190800610/128254465-beautiful-served-food-on-plates-in-restaurant.jpg"),
        MenuItem(restaurant_id=8, name="Menu Item 8",
                 description="Description 8", price=89.99, preview_image="https://assets.lightspeedhq.com/img/2019/07/bd804558-martin-widenka-tkfrspt-jdk-unsplash-min.jpg"),
        MenuItem(restaurant_id=9, name="Menu Item 9",
                 description="Description 9", price=99.99, preview_image="https://www.escoffieronline.com/wp-content/uploads/2014/03/plate-food-beautifully-with-the-right-techniques-_1107_560013_1_14097621_500.jpg"),
        MenuItem(restaurant_id=10, name="Menu Item 10",
                 description="Description 10", price=109.99, preview_image="https://i.pinimg.com/236x/6a/71/a7/6a71a724e9bbd564ffa1df2231d8b092.jpg"),
        MenuItem(restaurant_id=11, name="Menu Item 11",
                 description="Description 11", price=119.99, preview_image="https://media.timeout.com/images/105599380/750/422/image.jpg"),
        MenuItem(restaurant_id=12, name="Menu Item 12",
                 description="Description 12", price=129.99, preview_image="https://st.depositphotos.com/1003814/3342/i/450/depositphotos_33426049-stock-photo-fish-dish.jpg"),
        MenuItem(restaurant_id=13, name="Menu Item 13",
                 description="Description 13", price=139.99, preview_image="https://ik.imagekit.io/munchery/blog/tr:w-768/the-beautiful-branzino-3-amazing-recipes-for-the-home-chef.jpeg"),
        MenuItem(restaurant_id=14, name="Menu Item 14",
                 description="Description 14", price=149.99, preview_image="https://www.boredpanda.com/blog/wp-content/uploads/2021/07/60fe992720f4f_nxt63km7pb941__700.jpg"),
        MenuItem(restaurant_id=15, name="Menu Item 15",
                 description="Description 15", price=159.99, preview_image="https://i.pinimg.com/736x/90/73/b7/9073b765cae81267a2b3753acbbaecc9.jpg")
    ]

    # Add the 12 additional menu items
    db.session.add_all(menuitems_to_add)

    # Commit all changes to the database
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
