"""Initial migration.

Revision ID: c543a0367804
Revises:
Create Date: 2023-10-05 01:44:11.652748

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = 'c543a0367804'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('username', sa.String(
                        length=40), nullable=False),
                    sa.Column('email', sa.String(length=255), nullable=False),
                    sa.Column('hashed_password', sa.String(
                        length=255), nullable=False),
                    sa.PrimaryKeyConstraint('id'),
                    sa.UniqueConstraint('email'),
                    sa.UniqueConstraint('username')
                    )

    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")

    op.create_table('restaurants',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('user_id', sa.Integer(), nullable=True),
                    sa.Column('name', sa.String(length=50), nullable=False),
                    sa.Column('address', sa.String(), nullable=False),
                    sa.Column('city', sa.String(), nullable=False),
                    sa.Column('state', sa.String(), nullable=False),
                    sa.Column('country', sa.String(), nullable=False),
                    sa.Column('price_range', sa.Integer(), nullable=False),
                    sa.Column('avg_rating', sa.Float(), nullable=False),
                    sa.Column('preview_image', sa.String(), nullable=False),
                    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_table('menuitems',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('restaurant_id', sa.Integer(), nullable=True),
                    sa.Column('name', sa.String(length=50), nullable=False),
                    sa.Column('description', sa.String(
                        length=255), nullable=False),
                    sa.Column('price', sa.Integer(), nullable=False),
                    sa.Column('preview_image', sa.String(), nullable=False),
                    sa.ForeignKeyConstraint(
                        ['restaurant_id'], ['restaurants.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_table('reviews',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('user_id', sa.Integer(), nullable=True),
                    sa.Column('restaurant_id', sa.Integer(), nullable=True),
                    sa.Column('review_text', sa.String(
                        length=255), nullable=False),
                    sa.Column('stars', sa.Integer(), nullable=False),
                    sa.Column('createdAt', sa.DateTime(), nullable=True),
                    sa.ForeignKeyConstraint(
                        ['restaurant_id'], ['restaurants.id'], ),
                    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_table('shoppingcarts',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('user_id', sa.Integer(), nullable=True),
                    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_table('shoppingcartitems',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('cart_id', sa.Integer(), nullable=True),
                    sa.Column('menu_item_id', sa.Integer(), nullable=True),
                    sa.Column('quantity', sa.Integer(), nullable=True),
                    sa.ForeignKeyConstraint(
                        ['cart_id'], ['shoppingcarts.id'], ),
                    sa.ForeignKeyConstraint(
                        ['menu_item_id'], ['menuitems.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('shoppingcartitems')
    op.drop_table('shoppingcarts')
    op.drop_table('reviews')
    op.drop_table('menuitems')
    op.drop_table('restaurants')
    op.drop_table('users')
    # ### end Alembic commands ###
