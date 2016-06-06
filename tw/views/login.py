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
      
        

        credentials_db = DBSession.query(User).filter(User.mail == user['email']).first()
        error = {"email_required": False, "password_required": False, "incorrect_credentials": False}

        if credentials_db is None:
            if len(user['email']) == 0:
                error['email_required'] = True
            else:
                error['incorrect_credentials'] = True
            return render_to_response('templates/login.jinja2', error, request = self.request)

        if not sha256_crypt.verify(user['password'],credentials_db.as_dict()['parola']):
            if len(user['password']) == 0:
                error['password_required'] = True
            if (len(user['email']) > 0) and (len(user['password']) > 0):
                error['incorrect_credentials'] = True
            return render_to_response('templates/login.jinja2', error, request = self.request)
        
        credentials=credentials_db.as_dict()
        self.request.session['email'] = user['email']
        self.request.session['tip'] = credentials['tip']
        self.request.session['nume'] = credentials['nume']
        self.request.session['prenume'] = credentials['prenume']
        self.request.session['id_user'] = credentials['id_user']
        token = sha256_crypt.encrypt(self.request.session.get_csrf_token())
        response = HTTPFound(location = self.request.route_url('home'))
        response.set_cookie('XSRF-TOKEN', value=token)
        return response

@view_config(route_name="logout", request_method="GET")
def logout(request):
    print("LOGOUT")
    if 'email' in request.session.keys():
        del request.session['email']
    # for field in ['email', 'id_user']:
    #     if field in request.session.keys():
    #         del request.session[field]
    # for i in request.session.keys():
    #     print("LO",request.session[i])
    return HTTPFound(location = request.route_url("login"))