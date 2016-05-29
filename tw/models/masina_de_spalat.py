from tw.models.meta import Base
from sqlalchemy import (
    Column,
    Integer,
    String,      
    )

from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy.orm import class_mapper

class MasinaDeSpalat(Base):
    __tablename__ = 'MASINA_DE_SPALAT'
    id_dispozitiv = Column(String(6), primary_key = True)
    denumire = Column(String(45))
    stare = Column(TINYINT(1))
    temperatura = Column(Integer)
    nr_rotatii = Column(Integer)
    program = Column(String(45))
    timp_ramas = Column(Integer)
    status = Column(TINYINT(1))

    def as_dict(self):
        record_dict =  {item.name: getattr(self,item.name) for item in class_mapper(self.__class__).columns if item.name != 'status'}
        return record_dict

   