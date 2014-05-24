# -*- coding: utf-8 -*-
from simple_salesforce import Salesforce
from sf import *

def index():
    sf = Salesforce( username=u, password=p, security_token=k, sandbox=True )
    return globals()[ request.env.request_method ]( sf, session )

def GET( sf, session ):

    if 'userId' not in session:
        return response.json([])

    record = sf.query(\
        ''.join( [ "Select BIH_User__c, BIH_Challenge__c, BIH_Bus__c FROM X100_Point_Challenges_Enrolled__c ",
                   "WHERE BIH_User__c = '", session.userId, "'" ] ) )['records']

    if len( record ) == 0:
        return response.json(dict(challengeId=False))

    response.headers['Content-Type']='application/json'
    return response.json( dict( challengeId = record[0]['BIH_Challenge__c'] ) )


def POST( sf, session ):

    id = sf.X100_Point_Challenges_Enrolled__c.create( {\
        'BIH_User__c': session.userId,
        'BIH_Challenge__c': request.args[0],
        'BIH_Bus__c': request.args[1] } )

    return response.json(dict(id=id))
