# -*- coding: utf-8 -*-
from simple_salesforce import Salesforce
from sf import *

def index():
    sf = Salesforce( username=u, password=p, security_token=k, sandbox=True )
    return globals()[ request.env.request_method ]( sf )

def GET( sf ):

    options = sf.query( ''.join( [ \
        "Select ID, Name, Challenge_Rules__c, Challenge_Type__c, Active__c, Double_points__c, End_Date__c, Points_per_entry__c, ",
        "Image_Link__c, Post_Type__c, Start_Date__c, Type__c, Enrollment_Start_Date__c, Enrollment_End_Date__c, Enrollment_Open__c  ",
        "FROM BIH_Challenge__c WHERE Enrollment_Open__c = TRUE AND Challenge_Type__c = '100 Point Challenge'" ] ) )['records']

    rv = [ ]
    for option in options:
        print option['Image_Link__c']
        rv.append( dict(\
            id = option['Id'],
            name = option['Name'],
            imageUrl = option['Image_Link__c'],
            rules = option['Challenge_Rules__c'] ) )

    return response.json( rv )
