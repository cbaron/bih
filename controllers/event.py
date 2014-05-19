# -*- coding: utf-8 -*-
from simple_salesforce import Salesforce
from sf import *

def index():
    sf = Salesforce( username=u, password=p, security_token=k, sandbox=True )
    return globals()[ request.env.request_method ]( sf )

def GET( sf ):

    if 'userId' not in session:
        return response.json([])

    events = sf.query(\
        ''.join( [ "Select ID, BIH_Opportunity_Name__c, Clicked__c, Date__c, Image_Location__c, ",
                   "Description__c, Interested__c, Link__c, Not_Interested__c, ",
                   "Score__c, Time__c, Type__c FROM BIH_Notification__c Where BIH_User__r.ID='",
                   session.userId, "' ORDER BY Score__c DESC" ] ) )['records']

    rv = [ ]
    for event in events:
        rv.append(\
            dict( id = event['Id'],
                  imageUrl = event['Image_Location__c'],
                  name = event['BIH_Opportunity_Name__c'],
                  description = event['Description__c'],
                  datetime = ' '.join( [ event['Date__c'], event['Time__c'] ] ) ) )


    return response.json( rv )

