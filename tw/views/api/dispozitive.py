from pyramid.view import view_config, view_defaults
from ...models.meta import DBSession
from ...models.cafetiera import Cafetiera
from ...models.frigider import Frigider
from ...models.masina_de_spalat import MasinaDeSpalat
from ...models.sistem_de_iluminat import SistemDeIluminat
from ...models.user_camera import UserCamera
from ...models.televizor import Televizor
from ...models.termostat import Termostat
from ...models.camera_dispozitiv import CameraDispozitiv
from pyramid.response import Response
import json
from sqlalchemy.orm import load_only
from sqlalchemy import update
import uuid
from .. import api_session_validation_admin

@view_config(request_method = 'GET', route_name = 'dispozitive', renderer = 'json')
def get(request):
    verify = api_session_validation_admin(request)
    if not verify:
        return Response(status=401, body="Unauthorized for this api. You are not an admin")
        
    list_dispozitive = []
    records = DBSession.query(Cafetiera).all()
    for record in records:
        aux = record.as_dict()
        aux['tip'] = 'cafetiera'
        list_dispozitive.append(aux)

    records = DBSession.query(Frigider).all()
    for record in records:
        aux = record.as_dict()
        aux['tip'] = 'frigider'
        list_dispozitive.append(aux)

    records = DBSession.query(MasinaDeSpalat).all()
    for record in records:
        aux = record.as_dict()
        aux['tip'] = 'masina_de_spalat'
        list_dispozitive.append(aux)

    records = DBSession.query(SistemDeIluminat).all()
    for record in records:
        aux = record.as_dict()
        aux['tip'] = 'sistem_de_iluminat'
        list_dispozitive.append(aux)

    records = DBSession.query(Televizor).all()
    for record in records:
        aux = record.as_dict()
        aux['tip'] = 'televizor'
        list_dispozitive.append(aux)

    records = DBSession.query(Termostat).all()
    for record in records:
        aux = record.as_dict()
        aux['tip'] = 'termostat'
        list_dispozitive.append(aux)

    return list_dispozitive

@view_config(request_method = 'POST', route_name = 'dispozitive', renderer = 'json')
def post(request):
    verify = api_session_validation_admin(request)
    if not verify:
        return Response(status=401, body="Unauthorized for this api. You are not an admin")
        
    request_body = json.loads(request.body.decode("utf8"))

    if 'tip' not in request_body.keys() or 'denumire' not in request_body.keys():
        return Response(status = 400, body = "Tip si denumire sunt obligatorii")
    
    id = str(uuid.uuid4())[:6]
    if request_body['tip'] == 'cafetiera':
        new = Cafetiera(denumire = request_body['denumire'], id_dispozitiv = id)
        DBSession.add(new)

    if request_body['tip'] == 'frigider':
        new = Frigider(denumire = request_body['denumire'], id_dispozitiv = id)
        DBSession.add(new)

    if request_body['tip'] == 'masina_de_spalat':
        new = MasinaDeSpalat(denumire = request_body['denumire'],id_dispozitiv = id)
        DBSession.add(new)

    if request_body['tip'] == 'sistem_de_iluminat':
        new = SistemDeIluminat(denumire = request_body['denumire'], id_dispozitiv = id)
        DBSession.add(new)


    if request_body['tip'] == 'televizor':
        new = Televizor(denumire = request_body['denumire'], id_dispozitiv = id)
        DBSession.add(new)
    
    if request_body['tip'] == 'termostat':
        new = Termostat(denumire = request_body['denumire'], id_dispozitiv = id)
        DBSession.add(new)

    return request_body

@view_config(request_method = 'DELETE', route_name = 'dispozitive_one', renderer = 'json')
def delete_dis(request):
    id = request.matchdict['id']
    tip = request.matchdict['tip']

    if tip == 'cafetiera':
        record = DBSession.query(Cafetiera).filter(Cafetiera.id_dispozitiv == id).first()
        DBSession.delete(record)
    
    if tip == 'frigider':
        record = DBSession.query(Frigider).filter(Frigider.id_dispozitiv == id).first()
        DBSession.delete(record)

    if tip == 'masina_de_spalat':
        record = DBSession.query(MasinaDeSpalat).filter(MasinaDeSpalat.id_dispozitiv == id).first()
        DBSession.delete(record)

    if tip == 'sistem_de_iluminat':
        record = DBSession.query(SistemDeIluminat).filter(SistemDeIluminat.id_dispozitiv == id).first()
        DBSession.delete(record)
    
    if tip == 'televizor':
        record = DBSession.query(Televizor).filter(Televizor.id_dispozitiv == id).first()
        DBSession.delete(record)

    if tip == 'termostat':
        record = DBSession.query(Termostat).filter(Termostat.id_dispozitiv == id).first()
        DBSession.delete(record)

    rec = DBSession.query(CameraDispozitiv).filter(CameraDispozitiv.id_dispozitiv == id).all()
    for i in rec:
        DBSession.delete(i)
    return Response(status = 201)
