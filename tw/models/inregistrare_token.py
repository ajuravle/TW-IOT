from tw.models.meta import Base
from sqlalchemy import (
    Column,
    String,      
    )

from sqlalchemy.orm import class_mapper

class InregistrareToken(Base):
    __tablename__ = 'TOKEN_INREGISTRARE'
    id = Column(String(6), primary_key = True)
    email = Column(String(45))
    token = Column(String(45))


    def as_dict(self):
        record_dict =  {item.name: getattr(self,item.name) for item in class_mapper(self.__class__).columns}
        return record_dict

   