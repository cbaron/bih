# -*- coding: utf-8 -*-
from simple_salesforce import Salesforce
from sf import *

def index():
    sf = Salesforce( username=u, password=p, security_token=k )
    return globals()[ request.env.request_method ]( sf, session )

def GET( sf, session ):

    rv = [ ]

    records = sf.query(\
        ''.join( [ "Select ID, Name, Challenge_Rules__c, Challenge_Type__c, Active__c, ",
                   "Points_per_entry__c, Post_Type__c, Start_Date__c, Type__c, Category__c "
                   "FROM BIH_Challenge__c ",
                   "WHERE Active__c = TRUE ",
                   " AND BIH_Challenge_Group__r.ID = '", request.args[0], "'" ] ) )['records']

    for row in records:
        rv.append( dict( id = row['Id'],
                         name = row['Name'],
                         rules = row['Challenge_Rules__c'] if 'Challenge_Rules__c' in row else '',
                         #rules = row['forum_desc__c'] if 'forum_desc__c' in row else '',
                         type = row['Post_Type__c'],
                         category = row['Category__c'],
                         points = row['Points_per_entry__c'] ) )

    response.headers['Content-Type']='application/json'
    return response.json(rv)


