from tw.models.meta import Base
from sqlalchemy import (
    Column,
    Integer,
    String,      
    ForeignKey,
    )

from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy.orm import class_mapper

class Televizor(Base):
    __tablename__ = 'TELEVIZOR'
    id_dispozitiv = Column(String(6), primary_key = True)
    denumire = Column(String(45))
    id_canal = Column(String(6), ForeignKey("CANALE.id_canal"))
    stare = Column(TINYINT(1), default = 0)
    volum = Column(Integer, default = 50)
    luminozitate = Column(Integer, default = 50)

    def as_dict(self):
        record_dict =  {item.name: getattr(self,item.name) for item in class_mapper(self.__class__).columns}
        return record_dict

   