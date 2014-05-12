# -*- coding: utf-8 -*-
from simple_salesforce import Salesforce
from sf import *

def index():
    sf = Salesforce( username=u, password=p, security_token=k, sandbox=True )
    return globals()[ request.env.request_method ]( sf, request.args[0] )

def GET( sf, userId ):

    attributes = sf.query(\
        ''.join( [ "Select ID, First_Name__c, Last_Name__c, Email__c, BIH_Password__c, ",
                   "(Select BIH_BUS__R.ID, BIH_BUS__R.NAME FROM TEAM_Members__r) ",
                   "FROM BIH_USER__C WHERE ID = 'a1CL0000001ukpZMAQ'" ] ) )['records'][0]

    print attributes

    return response.json(\
        dict( id = attributes['Id'],
              firstName = attributes['First_Name__c'],
              lastName = attributes['Last_Name__c'],
              emailAddress = attributes['Email__c'],
              busId = attributes['Team_Members__r']['records'][1]['BIH_Bus__r']['Id'],
              busName = attributes['Team_Members__r']['records'][1]['BIH_Bus__r']['Name'] ) )
