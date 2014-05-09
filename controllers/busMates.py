# -*- coding: utf-8 -*-
from simple_salesforce import Salesforce
from sf import *

def index():
    sf = Salesforce( username=u, password=p, security_token=k, sandbox=True )
    return globals()[ request.env.request_method ]( sf )

def GET( sf ):

    busMates = sf.query(\
        ''.join( [ "Select Bus_Number__c, First_Name__c, Last_Name__c, BIH_User__r.ID FROM Team_Member__c  ",
                   "WHERE Bus_Number__c = '", request.vars.busName, "' ORDER BY Last_Name__c ASC" ] ) )['records']

    rv = [ ]
    for idx, row in enumerate( busMates ):
        rv.append( dict( id = row['BIH_User__r']['Id'],
                         firstName = row['First_Name__c'],
                         lastName = row['Last_Name__c'] ) )

    return response.json( rv )

