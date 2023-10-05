from .db import db, environment, SCHEMA, add_prefix_for_prod


class Restaurant(db.Model,):
    __tablename__ = 'restaurants'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    name = db.Column(db.String(50), nullable=False)
    address = db.Column(db.String, nullable=False)
    city = db.Column(db.String, nullable=False)
    state = db.Column(db.String(), nullable=False)
    country = db.Column(db.String, nullable=False)
    price_range = db.Column(db.Integer, nullable=False)
    avg_rating = db.Column(db.Float, nullable=False)
    preview_image = db.Column(db.String, nullable=False)

    user = db.relationship("User", back_populates="restaurants")
    reviews = db.relationship("Review", back_populates="restaurant", cascade='all, delete-orphan')
    cart = db.relationship('ShoppingCart', back_populates='restaurant')
    menu_items = db.relationship('MenuItem', back_populates='restaurant', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            "address": self.address,
            "city": self.city,
            "state": self.state,
            "country": self.country,
            "price_range": self.price_range,
            "avg_rating": self.avg_rating,
            "preview_image": self.preview_image
        }
