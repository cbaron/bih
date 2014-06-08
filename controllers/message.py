# -*- coding: utf-8 -*-
from simple_salesforce import Salesforce
from sf import *
import datetime

def index():
    sf = Salesforce( username=u, password=p, security_token=k )
    #return globals()[ request.env.request_method ]( sf )
    return globals()[ request.env.request_method ]()

def GET():

    return response.json(\
        db( db.messages.toId == session.userId ).select(\
            db.messages.fromName,
            db.messages.subject,
            db.messages.body,
            db.messages.sent ).as_list() )


def POST():

    db.messages.insert(\
        toId = request.vars.toId,
        toName = request.vars.toName,
        fromId = session.userId,
        fromName = request.vars.fromName,
        body = request.vars.body,
        subject = request.vars.subject,
        sent = datetime.datetime.now() )
