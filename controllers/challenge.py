# -*- coding: utf-8 -*-
from simple_salesforce import Salesforce
from sf import *

def index():
    sf = Salesforce( username=u, password=p, security_token=k )
    return globals()[ request.env.request_method ]( sf )

def GET( sf ):

    challengeRecords = [ ]

    if len( request.args ):
        challengeRecords = sf.query(\
        ''.join( [ "Select BIH_Bus__r.Name, BIH_Challenge__r.ID, BIH_Challenge__r.Name, BIH_Challenge__r.Challenge_Rules__c, ",
                   "BIH_Challenge__r.Challenge_Type__c, BIH_Challenge__r.Active__c, BIH_Challenge__r.Double_points__c, ",
                   "BIH_Challenge__r.End_Date__c, BIH_Challenge__r.Points_per_entry__c, BIH_Challenge__r.Post_Type__c, ",
                   "BIH_Challenge__r.Start_Date__c, BIH_Challenge__r.Type__c FROM Available_Challenge__c ",
                   "WHERE BIH_Challenge__r.Active__c = TRUE AND BIH_Challenge__r.ID = '",
                   request.args[1], "' AND BIH_Bus__r.Name = '",
                   request.args[0], "'" ] ) )['records']

    elif request.vars.busName:
        challengeRecords = sf.query(\
            ''.join( [ "Select BIH_Bus__r.Name, BIH_Challenge__r.ID, BIH_Challenge__r.Name, BIH_Challenge__r.Challenge_Rules__c, ",
                       "BIH_Challenge__r.Challenge_Type__c, BIH_Challenge__r.Active__c, BIH_Challenge__r.Double_points__c, ",
                       "BIH_Challenge__r.End_Date__c, BIH_Challenge__r.Points_per_entry__c, BIH_Challenge__r.Post_Type__c, ",
                       "BIH_Challenge__r.Start_Date__c, BIH_Challenge__r.Type__c FROM Available_Challenge__c ",
                       "WHERE BIH_Challenge__r.Active__c = TRUE AND BIH_Bus__r.Name = '",
                       request.vars.busName, "' ORDER BY BIH_Challenge__r.Start_Date__c DESC" ] ) )['records']

    rv = [ ]
    for idx, row in enumerate( challengeRecords ):
        rv.append( dict( id = row['BIH_Challenge__r']['Id'],
                         number = idx + 1,
                         name = row['BIH_Challenge__r']['Name'],
                         rules = row['BIH_Challenge__r']['Challenge_Rules__c'],
                         week = row['BIH_Challenge__r']['Challenge_Type__c'],
                         type = row['BIH_Challenge__r']['Post_Type__c'],
                         points = row['BIH_Challenge__r']['Points_per_entry__c'] ) )

    return response.json( rv )

def detail():
    response.view = 'default/index.html'
    return dict()
