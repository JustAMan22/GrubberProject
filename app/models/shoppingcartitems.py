from .db import db, environment, SCHEMA, add_prefix_for_prod


class ShoppingCartItem(db.Model,):
    __tablename__ = 'shoppingcartitems'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("shoppingcarts.id")))
    menu_item_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("menuitems.id")))
    quantity = db.Column(db.Integer, nullable=True)

    cart = db.relationship('ShoppingCart', back_populates='cart_item')
    menu_item = db.relationship('MenuItem', back_populates='cart_item')

    def to_dict(self):
        return {
            'id': self.id,
            'cart_id': self.cart_id,
            'menu_item_id': self.menu_item_id,
            "quantity": self.quantity
        }
