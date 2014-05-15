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

    print users

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
