# -*- coding: utf-8 -*-
import sys
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
            ''.join( [ "Select ID, Date_of_First_Login__c, First_Name__c, Last_Name__c, Email__c, ",
                       "(Select BIH_BUS__R.ID, BIH_BUS__R.NAME FROM TEAM_Members__r) ",
                       "FROM BIH_USER__C WHERE ID = '", request.vars.id, "'" ] ) )['records'][0]

        if record['Date_of_First_Login__c'] is not None:
            redirect( URL(a='bih',c='default',f='index') )

        session.userId = record['Id']

        if record['Team_Members__r'] is not None:
          session.busId = record['Team_Members__r']['records'][0]['BIH_Bus__r']['Id']

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
    errorMsg = ''
    birthday = ''

    yearGraduated = request.vars.graduated[0:4] if len( request.vars.graduated ) > 3 else '1970'
    birthday += request.vars.year[0:4] if request.vars.year else '1970'
    birthday += '-'
    birthday += request.vars.month[0:2] if request.vars.month else '01'
    birthday += '-'
    birthday += request.vars.day[0:2] if request.vars.day else '01'

    print yearGraduated + '-01-01'
    print birthday

    #try:
    sf.BIH_User__c.update( session.userId, {\
        'Birthdate__c': birthday,
        'Phone__c': request.vars.phone,
        'Location__c': request.vars.location,
        'School__c': request.vars.university,
        'Occupation__c': request.vars.occupation,
        'Date_of_Graduation__c': yearGraduated + '-01-01',
        'BIH_Password__c': request.vars.password,
        'Short_Biography__c': request.vars.biography
    } )
    #except:
        #weCool = False
        #errorMsg = sys.exc_info()[0]
        #print errorMsg

    response.headers['Content-Type']='application/json'

    if weCool:
        return response.json( dict( weCool=True) )

    return response.json( dict( error=True) )
