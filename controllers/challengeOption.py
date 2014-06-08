# -*- coding: utf-8 -*-
from simple_salesforce import Salesforce
from sf import *

def index():
    sf = Salesforce( username=u, password=p, security_token=k )
    return globals()[ request.env.request_method ]( sf )

def GET( sf ):

    options = sf.query( ''.join( [ \
        "Select ID, Name, Description__c, Image_Link__c, Challenge_type__c, Enrollment_Open__c ",
        "FROM BIH_Challenge_Group__c ",
        "WHERE Enrollment_Open__c = TRUE AND Challenge_Type__c = '100 Point Challenge'" ] ) )['records']

    rv = [ ]
    for option in options:
        rv.append( dict(\
            id = option['Id'],
            name = option['Name'],
            imageUrl = option['Image_Link__c'],
            rules = option['Description__c'] ) )

    return response.json( rv )


