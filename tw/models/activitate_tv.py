from tw.models.meta import Base
from sqlalchemy import (
    Column,
    String,
    Integer,
    ForeignKey      
    )

from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy.orm import class_mapper

class ActivitateTV(Base):
    __tablename__ = 'ACTIVITATE_TV'
    id_activitate = Column(String(6), primary_key = True)
    id_dispozitiv = Column(String(6), ForeignKey("TELEVIZOR.id_dispozitiv"))
    id_canal = Column(String(6), ForeignKey("CANALE.id_canal"))
    ora = Column(Integer)
    volum = Column(Integer)
    
    def as_dict(self):
        record_dict =  {item.name: getattr(self,item.name) for item in class_mapper(self.__class__).columns if item.name != 'status'}
        return record_dict
