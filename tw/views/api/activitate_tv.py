from pyramid.view import view_config, view_defaults
from pyramid.httpexceptions import HTTPNotFound, HTTPFound
from ...models.meta import DBSession
from ...models.activitate_tv import ActivitateTV
from ...models.televizor import Televizor
from pyramid.response import Response
import json
import datetime
from sqlalchemy import func,desc

@view_defaults(route_name = 'activitate_tv', renderer = 'json')
class ActivitateTVV(object):

    def __init__(self, request):
        self.request = request

    @view_config(request_method = 'GET')
    def get(self):
        params = self.request.GET
        id = self.request.matchdict['id']
        record = DBSession.query(Televizor).filter(Televizor.id_dispozitiv == id).first()
        if record == None:
            return Response(status=400,body='id incorect')
        
        rez = DBSession.query(ActivitateTV.ora).filter(ActivitateTV.stare == 1,ActivitateTV.id_dispozitiv==id).group_by(ActivitateTV.ora).order_by(func.count(ActivitateTV.ora).desc()).first()
        result = {}
        if not rez is None:
            result["ora_start"] = rez[0]
        else:
             result["ora_start"] = "null"

        rez = DBSession.query(ActivitateTV.ora).filter(ActivitateTV.stare == 0,ActivitateTV.id_dispozitiv==id).group_by(ActivitateTV.ora).order_by(func.count(ActivitateTV.ora).desc()).first()
        if not rez is None:
            result["ora_stop"] = rez[0]
        else:
             result["ora_stop"] = "null"

        if "ora" in params.keys() and params["ora"] == "true":
            ora_curenta = datetime.datetime.now().hour
            rez = DBSession.query(ActivitateTV.volum).filter(ActivitateTV.ora == ora_curenta,ActivitateTV.id_dispozitiv==id).group_by(ActivitateTV.volum).order_by(func.count(ActivitateTV.volum).desc()).first()
            if not rez is None:
                result["volum"] = rez[0]
            else:
                 result["volum"] = "null"
            
            rez = DBSession.query(ActivitateTV.id_canal).filter(ActivitateTV.ora == ora_curenta,ActivitateTV.id_dispozitiv==id).group_by(ActivitateTV.id_canal).order_by(func.count(ActivitateTV.id_canal).desc()).first()
            if not rez is None:
                result["id_canal"] = rez[0]
            else:
                 result["id_canal"] = "null"
            

        return result
