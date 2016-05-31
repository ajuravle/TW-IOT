from tw.models.meta import Base
from sqlalchemy import (
    Column,
    String,
    ForeignKey      
    )

from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy.orm import class_mapper

class UserCamera(Base):
    __tablename__ = 'USERI_CAMERE'
    id_uc = Column(String(6), primary_key = True)
    id_user = Column(String(6), ForeignKey("USERI.id_user"))
    id_camera = Column(String(6), ForeignKey("CAMERE.id_camera"))


    def as_dict(self):
        record_dict =  {item.name: getattr(self,item.name) for item in class_mapper(self.__class__).columns}
        return record_dict
