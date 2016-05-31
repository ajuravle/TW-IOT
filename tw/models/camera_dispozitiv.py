from tw.models.meta import Base
from sqlalchemy import (
    Column,
    String,
    ForeignKey      
    )

from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy.orm import class_mapper

class CameraDispozitiv(Base):
    __tablename__ = 'CAMERE_DISPOZITIVE'
    id_cd = Column(String(6), primary_key = True)
    id_camera = Column(String(6), ForeignKey("CAMERE.id_camera"))
    id_dispozitiv = Column(String(6))

    def as_dict(self):
        record_dict =  {item.name: getattr(self,item.name) for item in class_mapper(self.__class__).columns}
        return record_dict
