# -*- coding: utf-8 -*-
from simple_salesforce import Salesforce
from sf import *

def index():
    sf = Salesforce( username=u, password=p, security_token=k, sandbox=True )
    return globals()[ request.env.request_method ]( sf, session )

def GET( sf, session ):

    rv = [ ]

    records = sf.query(\
        ''.join( [ "Select BIH_Bus__r.Name, BIH_Challenge__r.ID, BIH_Challenge__r.Name, BIH_Challenge__r.Challenge_Rules__c, ",
                   "BIH_Challenge__r.Challenge_Type__c, BIH_Challenge__r.Active__c, BIH_Challenge__r.Double_points__c, BIH_Challenge__r.End_Date__c, ",
                   "BIH_Challenge__r.Points_per_entry__c, BIH_Challenge__r.Post_Type__c, BIH_Challenge__r.Start_Date__c, ",
                   "BIH_Challenge__r.Type__c, BIH_Challenge__r.Enrollment_Start_Date__c, BIH_Challenge__r.Enrollment_End_Date__c, ",
                   "BIH_Challenge__r.Enrollment_Open__c ",
                   "FROM X100_Point_Challenges_Enrolled__c ",
                   "WHERE BIH_Challenge__r.Active__c = TRUE AND Active__c = TRUE AND BIH_User__r.ID = '",
                   session.userId, "' AND BIH_Challenge_Group__r.ID = '", request.args[0], "'" ] ) )['records']

    for row in records:
        rv.append( dict( id = row['BIH_Challenge__r']['Id'],
                         name = row['BIH_Challenge__r']['Name'],
                         rules = row['BIH_Challenge__r']['forum_desc__c'] if row['BIH_Challenge__r']['forum_desc__c'] else '',
                         type = row['BIH_Challenge__r']['Post_Type__c'],
                         category = row['BIH_Challenge__r']['Category__c'],
                         points = row['BIH_Challenge__r']['Points_per_entry__c'] ) )

    response.headers['Content-Type']='application/json'
    return response.json(rv)
