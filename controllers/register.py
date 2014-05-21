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
    errorMsg = ''

    yearGraduated = request.vars.graduated[0:3] if len( request.vars.graduated ) > 3 else '1970'
    birthday = '1970-01-01'
    if request.vars.year:
        birthday[0:3] = request.vars.year[0:3]
    if request.vars.month:
        birthday[5:6] = request.vars.month[0:1]
    if request.vars.day:
        birthday[8:9] = request.vars.day[0:1]

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
    #print sys.exc_info()[0]

    if weCool:
        redirect( URL(a='bih',c='default',f='index') )

    return response.json( dict( error=str(errorMsg) ) )
