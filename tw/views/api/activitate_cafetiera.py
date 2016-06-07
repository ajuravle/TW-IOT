from pyramid.view import view_config, view_defaults
from pyramid.httpexceptions import HTTPNotFound, HTTPFound
from ...models.meta import DBSession
from ...models.activitate_cafetiera import ActivitateCafetiera
from ...models.cafetiera import Cafetiera
from pyramid.response import Response
import json
import datetime
from .. import api_session_validation
from sqlalchemy import func,desc

@view_defaults(route_name = 'activitate_cafetiera', renderer = 'json')
class ActivitateCafetieraa(object):

    def __init__(self, request):
        self.request = request

    @view_config(request_method = 'GET')
    def get(self):
        verify = api_session_validation(self.request)
        if not verify:
            return Response(status=401, body="Unauthorized for this api. Please login")
            
        params = self.request.GET
        id = self.request.matchdict['id']
        record = DBSession.query(Cafetiera).filter(Cafetiera.id_dispozitiv == id).first()
        if record == None:
            return Response(status=400,body='id incorect')
        
        rez = DBSession.query(ActivitateCafetiera.ora).filter(ActivitateCafetiera.stare == 1,ActivitateCafetiera.id_dispozitiv==id).group_by(ActivitateCafetiera.ora).having(func.count(ActivitateCafetiera.ora)>5).order_by(func.count(ActivitateCafetiera.ora).desc())[:3]
        result = {}
        if not rez is None:
            lista = []
            for i in rez:
                lista.append(i[0])
            result["ora_start"] = lista
        else:
             result["ora_start"] = "null"

        if "ora" in params.keys() and params["ora"] == "true":
            ora_curenta = datetime.datetime.now().hour
            rez = DBSession.query(ActivitateCafetiera.tip).filter(ActivitateCafetiera.ora == ora_curenta,ActivitateCafetiera.id_dispozitiv==id).group_by(ActivitateCafetiera.tip).order_by(func.count(ActivitateCafetiera.tip).desc()).first()
            if not rez is None:
                result["tip"] = rez[0]
            else:
                 result["tip"] = "null"
            
            rez = DBSession.query(ActivitateCafetiera.zahar).filter(ActivitateCafetiera.ora == ora_curenta,ActivitateCafetiera.id_dispozitiv==id).group_by(ActivitateCafetiera.zahar).order_by(func.count(ActivitateCafetiera.zahar).desc()).first()
            if not rez is None:
                result["zahar"] = rez[0]
            else:
                 result["zahar"] = "null"

        return result
