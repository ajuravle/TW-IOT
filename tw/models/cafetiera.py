from tw.models.meta import Base
from sqlalchemy import (
    Column,
    String,
    Integer      
    )

from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy.orm import class_mapper

class Cafetiera(Base):
    __tablename__ = 'CAFETIERA'
    id_dispozitiv = Column(String(6), primary_key = True)
    denumire = Column(String(45))
    tip = Column(String(45))
    zahar = Column(Integer, default = 5)
    stare = Column(TINYINT(1), default = 0)

    def as_dict(self):
        record_dict =  {item.name: getattr(self,item.name) for item in class_mapper(self.__class__).columns}
        return record_dict

   