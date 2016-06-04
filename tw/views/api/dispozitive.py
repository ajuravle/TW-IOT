from pyramid.view import view_config, view_defaults
from ...models.meta import DBSession
from ...models.cafetiera import Cafetiera
from ...models.frigider import Frigider
from ...models.masina_de_spalat import MasinaDeSpalat
from ...models.sistem_de_iluminat import SistemDeIluminat
from ...models.user_camera import UserCamera
from ...models.televizor import Televizor
from ...models.termostat import Termostat
from pyramid.response import Response
import json
from sqlalchemy.orm import load_only
from sqlalchemy import update
import uuid

@view_config(request_method = 'GET', route_name = 'dispozitive', renderer = 'json')
def get(request):
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
