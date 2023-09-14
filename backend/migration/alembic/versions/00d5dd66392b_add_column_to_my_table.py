"""add_column_to_my_table

Revision ID: 00d5dd66392b
Revises: 
Create Date: 2023-09-14 05:08:55.176764

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '00d5dd66392b'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('machine', sa.Column('new_column1', sa.String(length=50)))



def downgrade() -> None:
    op.drop_column('machine', "new_column1")
