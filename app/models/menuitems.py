from .db import db, environment, SCHEMA, add_prefix_for_prod


class MenuItem(db.Model,):
    __tablename__ = 'menuitems'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("restaurants.id")))
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    preview_image = db.Column(db.String, nullable=False)

    cart_item = db.relationship('ShoppingCartItem', back_populates='menu_item')
    restaurant = db.relationship('Restaurant', back_populates='menu_items')

    def to_dict(self):
        return {
            'id': self.id,
            'restaurant_id': self.restaurant_id,
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "preview_image": self.preview_image
        }
