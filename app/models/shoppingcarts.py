from .db import db, environment, SCHEMA, add_prefix_for_prod


class ShoppingCart(db.Model,):
    __tablename__ = 'shoppingcarts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    restaurant_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("restaurants.id")))

    restaurant = db.relationship("Restaurant", back_populates='cart')
    user = db.relationship('User', back_populates='cart')
    cart_item = db.relationship('ShoppingCartItem', back_populates='cart')

    def to_dict(self):
        return {
            'id': self.id,
            'restaurant_id': self.restaurant_id,
            'user_id': self.user_id,
        }