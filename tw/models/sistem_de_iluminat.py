from tw.models.meta import Base
from sqlalchemy import (
    Column,
    Integer,
    String,      
    )

from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy.orm import class_mapper

class SistemDeIluminat(Base):
    __tablename__ = 'SISTEM_DE_ILUMINAT'
    id_dispozitiv = Column(String(6), primary_key = True)
    denumire = Column(String(45))
    stare = Column(TINYINT(1), default=0)
    intensitate = Column(Integer, default=0)
    nr_becuri_aprinse = Column(Integer, default=0)

    def as_dict(self):
        record_dict =  {item.name: getattr(self,item.name) for item in class_mapper(self.__class__).columns if item.name != 'status'}
        return record_dict

   