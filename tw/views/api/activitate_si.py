from pyramid.view import view_config, view_defaults
from pyramid.httpexceptions import HTTPNotFound, HTTPFound
from ...models.meta import DBSession
from ...models.activitate_si import ActivitateSI
from ...models.sistem_de_iluminat import SistemDeIluminat
from pyramid.response import Response
import json
import datetime
from sqlalchemy import func,desc

@view_defaults(route_name = 'activitate_si', renderer = 'json')
class ActivitateSII(object):

    def __init__(self, request):
        self.request = request

    @view_config(request_method = 'GET')
    def get(self):
        params = self.request.GET
        id = self.request.matchdict['id']
        record = DBSession.query(SistemDeIluminat).filter(SistemDeIluminat.id_dispozitiv == id).first()
        if record == None:
            return Response(status=400,body='id incorect')
        
        rez = DBSession.query(ActivitateSI.ora).filter(ActivitateSI.stare == 1,ActivitateSI.id_dispozitiv==id).group_by(ActivitateSI.ora).order_by(func.count(ActivitateSI.ora).desc()).first()
        result = {}
        if not rez is None:
            result["ora_start"] = rez[0]
        else:
             result["ora_start"] = "null"

        rez = DBSession.query(ActivitateSI.ora).filter(ActivitateSI.stare == 0,ActivitateSI.id_dispozitiv==id).group_by(ActivitateSI.ora).order_by(func.count(ActivitateSI.ora).desc()).first()
        if not rez is None:
            result["ora_stop"] = rez[0]
        else:
             result["ora_stop"] = "null"

        if "ora" in params.keys() and params["ora"] == "true":
            ora_curenta = datetime.datetime.now().hour
            rez = DBSession.query(ActivitateSI.intensitate).filter(ActivitateSI.ora == ora_curenta,ActivitateSI.id_dispozitiv==id).group_by(ActivitateSI.intensitate).order_by(func.count(ActivitateSI.intensitate).desc()).first()
            if not rez is None:
                result["intensitate"] = rez[0]
            else:
                 result["intensitate"] = "null"
            
            rez = DBSession.query(ActivitateSI.nr_becuri_aprinse).filter(ActivitateSI.ora == ora_curenta,ActivitateSI.id_dispozitiv==id).group_by(ActivitateSI.nr_becuri_aprinse).order_by(func.count(ActivitateSI.nr_becuri_aprinse).desc()).first()
            if not rez is None:
                result["nr_becuri_aprinse"] = rez[0]
            else:
                 result["nr_becuri_aprinse"] = "null"
            

        return result
