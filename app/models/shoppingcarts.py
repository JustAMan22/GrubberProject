from .db import db, environment, SCHEMA, add_prefix_for_prod


class ShoppingCart(db.Model,):
    __tablename__ = 'shoppingcarts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    
    user = db.relationship('User', back_populates='cart')
    cart_item = db.relationship('ShoppingCartItem', back_populates='cart', cascade='all, delete-orphan')

    def to_dict(self):
        cart_items_list = [cart_items.to_dict() for cart_items in self.cart_item]
        return {
            'id': self.id,
            'user_id': self.user_id,
            "cart_items": cart_items_list
        }
