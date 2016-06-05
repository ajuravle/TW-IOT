from tw.models.meta import Base
from sqlalchemy import (
    Column,
    String     
    )

from sqlalchemy.orm import class_mapper

class Info(Base):
    __tablename__ = 'INFO'
    id = Column(String(6), primary_key = True)
    oras = Column(String(45))


    def as_dict(self):
        record_dict =  {item.name: getattr(self,item.name) for item in class_mapper(self.__class__).columns if item.name != 'parola'}
        return record_dict

   