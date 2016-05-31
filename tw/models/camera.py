from tw.models.meta import Base
from sqlalchemy import (
    Column,
    String    
    )

from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy.orm import class_mapper

class Camera(Base):
    __tablename__ = 'CAMERE'
    id_camera = Column(String(6), primary_key = True)
    denumire = Column(String(45))

    def as_dict(self):
        record_dict =  {item.name: getattr(self,item.name) for item in class_mapper(self.__class__).columns}
        return record_dict
