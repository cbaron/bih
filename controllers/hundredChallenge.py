# -*- coding: utf-8 -*-
from simple_salesforce import Salesforce
from sf import *

def index():
    sf = Salesforce( username=u, password=p, security_token=k, sandbox=True )
    return globals()[ request.env.request_method ]( sf, session )

def GET( sf, session ):

    rv = [ ]

    '''
    records = sf.query(\
        ''.join( [ "Select ID, Name, forum_desc__c, Double_points__c, End_Date__c, Points_per_entry__c, ",
                   "Post_Type__c, Start_Date__c, Category__c, Enrollment_Start_Date__c, Enrollment_End_Date__c, Enrollment_Open__c  ",
                   "FROM BIH_Challenge__c ",
                   "WHERE Challenge_Type__c = '100 Point Challenge'" ] ) )['records']
    '''

    for row in records:
        rv.append( dict( id = row['Id'],
                         name = row['Name'],
                         rules = row['forum_desc__c'] if row['forum_desc__c'] else '',
                         type = row['Post_Type__c'],
                         category = row['Category__c'],
                         points = row['Points_per_entry__c'] ) )

    response.headers['Content-Type']='application/json'
    return response.json(rv)


"Select ID, X100_Point_Challenge_Total__c FROM BIH_User__c WHERE ID = 'APP STORED USER ID FROM LOGIN'

//Include a variable to set the available Bus_Number__c value

Select BIH_Bus__r.Name, BIH_Challenge__r.ID, BIH_Challenge__r.Name, BIH_Challenge__r.Challenge_Rules__c, BIH_Challenge__r.Challenge_Type__c, BIH_Challenge__r.Active__c, BIH_Challenge__r.Double_points__c, BIH_Challenge__r.End_Date__c, BIH_Challenge__r.Points_per_entry__c, BIH_Challenge__r.Post_Type__c, BIH_Challenge__r.Start_Date__c, BIH_Challenge__r.Type__c, BIH_Challenge__r.Enrollment_Start_Date__c, BIH_Challenge__r.Enrollment_End_Date__c,BIH_Challenge__r.Enrollment_Open__c  FROM Point_Challenges_Enrolled__c WHERE BIH_Challenge__r.Active__c = TRUE AND Active__c = TRUE AND BIH_User__r.ID = 'APP STORED USER ID FROM LOGIN'

//Include a variable to set the available BIH_Challenge__r.ID value once the user clicks on a challenge"
