from pyramid.config import Configurator
from sqlalchemy import engine_from_config
from pyramid.response import Response
from pyramid.session import SignedCookieSessionFactory
from pyramid_redis_sessions import session_factory_from_settings
from .models.meta import (
    DBSession,
    Base,
    )




def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    Base.metadata.bind = engine
    config = Configurator(settings=settings)
    my_session_factory = session_factory_from_settings(settings)
    
    config.include("pyramid_jinja2")
    config.set_session_factory(my_session_factory)
    config.add_static_view('static', 'static')
   

    config.add_route("login", '/login')
    config.add_route("logout", "/logout")
    config.add_route("home", '/home')
    config.add_route("frigider", '/api/frigider')
    config.add_route("frigider_one", '/api/frigider/{id}')

    config.add_route("televizor", "/api/televizor")
    config.add_route("televizor_one", "/api/televizor/{id}")
    config.add_route("canal", "/api/canal")
    config.add_route("canal_one", "/api/canal/{id}")

    config.add_route("sistem_de_iluminat", "/api/sistem_de_iluminat")
    config.add_route("sistem_de_iluminat_one", "/api/sistem_de_iluminat/{id}")

    config.add_route("masina_spalat", '/api/masina_spalat')
    config.add_route("masina_spalat_one", "/api/masina_spalat/{id}")

    config.scan()
    return config.make_wsgi_app()
