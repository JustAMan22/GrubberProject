from .db import db, environment, SCHEMA, add_prefix_for_prod


class Review(db.Model,):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    restaurant_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("restaurants.id")))
    review_text = db.Column(db.String(255), nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    createdAt = db.Column(db.DateTime)

    user = db.relationship('User', back_populates='reviews')
    restaurant = db.relationship('Restaurant', back_populates='reviews')

    def to_dict(self):
        return {
            'id': self.id,
            'restaurant_id': self.restaurant_id,
            "user_id": self.user_id,
            "review_text": self.review_text,
            "stars": self.stars,
            "createdAt": self.createdAt,
            "user": self.user.to_dict()
        }
