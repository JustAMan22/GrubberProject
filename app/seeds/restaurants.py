from app.models import db, environment, SCHEMA
from app.models.restaurants import Restaurant
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_restaurants():
    restaurant1 = Restaurant(
        user_id=1, name="Eleven Madison Park", address="11 Madison Ave", city="New York", state="NY", country="USA", description="Upscale American tasting menus from chef Daniel Humm served in a high-ceilinged art deco space", price_range=4, avg_rating=0, preview_image="https://cdn.discordapp.com/attachments/721867989632155649/1167722697141260309/Eleven-Madison-Park-Debuts-An-Abbreviated-Tasting-Menu-FT-3-BLOG0323-dc04cb9a40a84284a9f930031a71d248.jpg")
    restaurant2 = Restaurant(
        user_id=2, name="The French Laundry", address="6640 Washington St", city="Yountville", state="CA", country="USA", description="Chef Thomas Keller's refined fixed-price meals continually draw food lovers to this stone farmhouse.", price_range=4, avg_rating=0, preview_image="https://cdn.discordapp.com/attachments/721867989632155649/1167723210704441414/tk.com_tfl_2.jpg")
    restaurant3 = Restaurant(
        user_id=3, name="Le Bernardin", address="155 W 51st St", city="New York", state="NY", country="USA", description="Elite French restaurant offers chef Eric Ripert's refined seafood, expert service & luxurious decor.", price_range=4, avg_rating=0, preview_image="https://media.timeout.com/images/103139458/750/422/image.jpg")

    # Add the initial 3 restaurants
    db.session.add(restaurant1)
    db.session.add(restaurant2)
    db.session.add(restaurant3)

    # Add 12 more restaurants
    restaurants_to_add = [
        Restaurant(user_id=4, name="Restaurant 4", address="Address 4", city="City 4", state="State 4",
                   country="Country 4", description="Description 4", price_range=3, avg_rating=0, preview_image="https://cdn0.weddingwire.com/vendor/769741/3_2/960/jpg/1_51_1147967-160407651869568.jpeg"),
        Restaurant(user_id=5, name="Restaurant 5", address="Address 5", city="City 5", state="State 5",
                   country="Country 5", description="Description 5", price_range=3, avg_rating=0, preview_image="https://epicureandculture.com/wp-content/uploads/2015/02/Idle-Hour-exterior-Photo-credit-William-Bradford-Copy.jpg"),
        Restaurant(user_id=6, name="Restaurant 6", address="Address 6", city="City 6", state="State 6",
                   country="Country 6", description="Description 6", price_range=3, avg_rating=0, preview_image="https://media-cdn.tripadvisor.com/media/photo-s/1d/d6/f1/41/dining-at-ethos-restaurant.jpg"),
        Restaurant(user_id=7, name="Restaurant 7", address="Address 7", city="City 7", state="State 7",
                   country="Country 7", description="Description 7", price_range=3, avg_rating=0, preview_image="https://media1.metrotimes.com/metrotimes/imager/the-25-most-beautiful-metro-detroit-restaurants-and-bars/u/zoom/31810552/highlands_city_sunset_pc-bureau_detroit.jpg"),
        Restaurant(user_id=8, name="Restaurant 8", address="Address 8", city="City 8", state="State 8",
                   country="Country 8", description="Description 8", price_range=3, avg_rating=0, preview_image="https://www.homebuilderdigest.com/wp-content/uploads/2023/04/1-4.jpg"),
        Restaurant(user_id=9, name="Restaurant 9", address="Address 9", city="City 9", state="State 9",
                   country="Country 9", description="Description 9", price_range=3, avg_rating=0, preview_image="https://images.lifestyleasia.com/wp-content/uploads/sites/3/2021/07/15122021/59955504_2419076708136350_4904393648877076480_n-1349x900.jpg"),
        Restaurant(user_id=10, name="Restaurant 10", address="Address 10", city="City 10", state="State 10",
                   country="Country 10", description="Description 10", price_range=3, avg_rating=0, preview_image="https://cdn.discordapp.com/attachments/1002469777668853850/1180369267795955782/lcs221_An_extremely_gorgeous_restaurant_in_the_night_time_on_th_b26a9878-0836-481a-a80a-2a77971e0104.png"),
        Restaurant(user_id=11, name="Restaurant 11", address="Address 11", city="City 11", state="State 11",
                   country="Country 11", description="Description 11", price_range=3, avg_rating=0, preview_image="https://media.thebostoncalendar.com/images/c_fit,w_768,h_768,q_auto,fl_lossy/v1668017298/oadxbolmnap6uusfxqy9/the-7-best-new-restaurants-in-boston-right-now.jpg"),
        Restaurant(user_id=12, name="Restaurant 12", address="Address 12", city="City 12", state="State 12",
                   country="Country 12", description="Description 12", price_range=3, avg_rating=0, preview_image="https://cdn.discordapp.com/attachments/1002469777668853850/1180365217947983923/lcs221_beautiful_restaurant_building_in_the_night_time_4k_reali_44c92b33-d11c-4387-89ef-fc4f32939dd9.png"),
        Restaurant(user_id=13, name="Restaurant 13", address="Address 13", city="City 13", state="State 13",
                   country="Country 13", description="Description 13", price_range=3, avg_rating=0, preview_image="https://cdn.discordapp.com/attachments/1002469777668853850/1180365635461591110/lcs221_A_very_modern_and_sleek_beautiful_restaurant_building_in_ac114d32-3ba7-48bf-b52e-cb14695e1d10.png"),
        Restaurant(user_id=14, name="Restaurant 14", address="Address 14", city="City 14", state="State 14",
                   country="Country 14", description="Description 14", price_range=3, avg_rating=0, preview_image="https://cdn.discordapp.com/attachments/1002469777668853850/1180366132859916309/lcs221_An_extremely_gorgeous_restaurant_in_the_night_time_on_th_b8ea3cd5-ec54-4219-a755-7d5b8b0841d5.png"),
        Restaurant(user_id=15, name="Restaurant 15", address="Address 15", city="City 15", state="State 15",
                   country="Country 15", description="Description 15", price_range=3, avg_rating=0, preview_image="https://media.timeout.com/images/105858767/750/562/image.jpg")
    ]

    # Add the 12 additional restaurants
    db.session.add_all(restaurants_to_add)

    # Commit all changes to the database
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_restaurants():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.restaurants RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM restaurants"))

    db.session.commit()
