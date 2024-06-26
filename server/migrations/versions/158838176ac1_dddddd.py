"""dddddd

Revision ID: 158838176ac1
Revises: 824644ee418f
Create Date: 2024-03-28 20:05:12.956049

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '158838176ac1'
down_revision = '824644ee418f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('clipboard_items', schema=None) as batch_op:
        batch_op.add_column(sa.Column('is_favorited', sa.Boolean(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('clipboard_items', schema=None) as batch_op:
        batch_op.drop_column('is_favorited')

    # ### end Alembic commands ###
