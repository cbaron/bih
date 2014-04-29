# -*- coding: utf-8 -*-
from simple_salesforce import Salesforce
from sf import *

def index():
    sf = Salesforce( username=u, password=p, security_token=k, sandbox=True )
    return globals()[ request.env.request_method ]( sf, request.args[0] )

def GET( sf, userId ):

    attributes = sf.query(\
        ''.join( [ "Select ID, First_Name__c, Last_Name__c, Email__c ",
                   "FROM BIH_USER__C WHERE ID = 'a1CL0000001ukpZMAQ'" ] ) )['records'][0]

    bus = sf.query(\
        ''.join( [ "Select ID, NAME ",
                   "FROM BIH_BUS__C" ] ) )['records'][0]

    return response.json(\
        dict( id = attributes['Id'],
              firstName = attributes['First_Name__c'],
              lastName = attributes['Last_Name__c'],
              emailAddress = attributes['Email__c'],
              busId = bus['Id'],
              busName = bus['Name'] ) )
    
