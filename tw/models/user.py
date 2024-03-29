from tw.models.meta import Base
from sqlalchemy import (
    Column,
    String     
    )

from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy.orm import class_mapper

class User(Base):
    __tablename__ = 'USERI'
    id_user = Column(String(6), primary_key = True)
    nume = Column(String(45))
    parola = Column(String(500))
    prenume = Column(String(45))
    mail = Column(String(45))
    tip = Column(String(45), default='user')


    def as_dict(self):
        record_dict =  {item.name: getattr(self,item.name) for item in class_mapper(self.__class__).columns}
        return record_dict

   