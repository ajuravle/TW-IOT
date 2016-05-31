from tw.models.meta import Base
from sqlalchemy import (
    Column,
    String,
    Integer,
    ForeignKey,     
    )

from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy.orm import class_mapper

class ActivitateSI(Base):
    __tablename__ = 'ACTIVITATE_SI'
    id_activitate = Column(String(6), primary_key = True)
    id_dispozitiv = Column(String(6), ForeignKey("SISTEM_DE_ILUMINAT.id_dispozitiv"))
    ora = Column(Integer)
    stare = Column(TINYINT)
    intensitate = Column(Integer)
    nr_becuri_aprinse = Column(String(45))

    def as_dict(self):
        record_dict =  {item.name: getattr(self,item.name) for item in class_mapper(self.__class__).columns if item.name != 'status'}
        return record_dict
