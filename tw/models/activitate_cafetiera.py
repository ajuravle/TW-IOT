from tw.models.meta import Base
from sqlalchemy import (
    Column,
    String,
    Integer,
    ForeignKey      
    )

from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy.orm import class_mapper

class ActivitateCafetiera(Base):
    __tablename__ = 'ACTIVITATE_CAFETIERA'
    id_activitate = Column(String(6), primary_key = True)
    id_dispozitiv = Column(String(6), ForeignKey("TELEVIZOR.id_dispozitiv"))
    ora = Column(Integer)
    zahar = Column(Integer)
    tip = Column(String(45))

    def as_dict(self):
        record_dict =  {item.name: getattr(self,item.name) for item in class_mapper(self.__class__).columns if item.name != 'status'}
        return record_dict
