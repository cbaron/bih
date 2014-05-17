# -*- coding: utf-8 -*-
from simple_salesforce import Salesforce
from sf import *

def index():
    sf = Salesforce( username=u, password=p, security_token=k, sandbox=True )

    if request.vars.id == None:
        redirect( URL(a='bih',c='default',f='index') )

    users = sf.query(\
        ''.join( [ "Select ID, Date_of_First_Login__c ",
                   "FROM BIH_USER__C" ] ) )['records']

    result = [ ]

    try:
        record = sf.query(\
            ''.join( [ "Select ID, Date_of_First_Login__c, First_Name__c, Last_Name__c, Email__c ",
                       "FROM BIH_USER__C WHERE ID = '", request.vars.id, "'" ] ) )['records'][0]

        if record['Date_of_First_Login__c'] is not None:
            redirect( URL(a='bih',c='default',f='index') )

        session.userId = record['Id']

        return dict( user = dict(
            id = record['Id'],
            firstName = record['First_Name__c'],
            lastName = record['Last_Name__c'],
            emailAddress = record['Email__c'] ) )
    except:
        redirect( URL(a='bih',c='default',f='index') )


def post():
    sf = Salesforce( username=u, password=p, security_token=k, sandbox=True )

    weCool = True

    try:
        sf.BIH_User__c.update( session.userId, {\
            'Birthdate__c': request.vars.year[0:3] + '-' + request.vars.month[0:1] + '-' + request.vars.day[0:1],
            'Phone__c': request.vars.phone,
            'Location__c': request.vars.location,
            'School__c': request.vars.university,
            'Occupation__c': request.vars.occupation,
            'Date_of_Graduation__c': request.vars.graduation[0:3] + '-01-01',
            'BIH_Password__c': request.vars.password
        } )
    except:
        weCool = False
        print sys.exc_info()[0]


    return response.json( weCool )
