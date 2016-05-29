from pyramid.view import view_config, view_defaults
from pyramid.httpexceptions import HTTPFound
from pyramid.response import Response
from pyramid.renderers import render_to_response
import json
from passlib.hash import sha256_crypt
from ..models.meta import DBSession
from ..models.user import User
@view_defaults(route_name = 'login')
class Login(object):
    def __init__(self,request):
        self.request = request

    @view_config(request_method = 'GET', renderer = 'templates/login.jinja2')
    def getLoginPage(self):
        error = {"email_required": False, "password_required": False, "incorrect_credentials": False}
        return error

    @view_config(request_method = 'POST', renderer = 'json')
    def postLoginPage(self):
        user = {'email': self.request.params['email'], 'password': self.request.params['password']}
        credentials_db = {}
        try:
            credentials_db = DBSession.query(User).filter(User.mail == user['email'], User.parola == user['password']).first().as_dict()
            print(credentials_db)
        except AttributeError:
            error = {"email_required": False, "password_required": False, "incorrect_credentials": False}
            if len(user['email']) == 0:
                error['email_required'] = True
            if len(user['password']) == 0:
                error['password_required'] = True
            if (len(user['email']) > 0) and (len(user['password']) > 0):
                error['incorrect_credentials'] = True
            return render_to_response('templates/login.jinja2', error, request = self.request)
        
        self.request.session['email'] = user['email']
        self.request.session['id_user'] = credentials_db['id_user']
        token = sha256_crypt.encrypt(self.request.session.get_csrf_token())
        response = HTTPFound(location = self.request.route_url('home'))
        response.set_cookie('XSRF-TOKEN', value=token)
        return response