# -*- coding: utf-8 -*-
from simple_salesforce import Salesforce
from sf import *

def index():
    sf = Salesforce( username=u, password=p, security_token=k )
    return globals()[ request.env.request_method ]( sf )

def GET( sf ):

    result = sf.query(\
        ''.join( [ "Select ID, First_Name__c, Last_Name__c, Email__c, BIH_Password__c, ",
                   "(Select BIH_BUS__R.ID, BIH_BUS__R.NAME FROM TEAM_Members__r) ",
                   "FROM BIH_USER__C WHERE ID = '", session.userId, "'" ] ) )['records'][0]
