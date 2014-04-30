# -*- coding: utf-8 -*-
from simple_salesforce import Salesforce
from sf import *

def index():
    sf = Salesforce( username=u, password=p, security_token=k, sandbox=True )
    return globals()[ request.env.request_method ]( sf )

def GET( sf ):

    '''
    records = sf.query(\
        ''.join( [ "Select ID, NAME, WEEK_1_POINT_TOTAL__C, WEEK_2_POINT_TOTAL__C, WEEK_3_POINT_TOTAL__C, WEEK_4_POINT_TOTAL__C, TOTAL_POINTS__C ",
                   "FROM BIH_BUS__C ORDER BY TOTAL_POINTS__C DESC" ] ) )['records']

    rv = [ ]
    #for row in records:
    for idx, row in enumerate( records ):
        rv.append( dict( id = row['Id'],
                         rank = idx + 1,
                         name = row['Name'],
                         weekTotals = [ row['Week_1_Point_Total__c'],
                                        row['Week_2_Point_Total__c'],
                                        row['Week_3_Point_Total__c'],
                                        row['Week_4_Point_Total__c'] ],
                         totalPoints = row['Total_Points__c'] ) )
    '''

    rv = [
        dict( id=1, headline="Pizza Party at Showbiz!!!!1", location="Washington, DC" ),
        dict( id=2, headline="Volunteer at the WIC soup kitchen.", location="Chicago, IL" ),
        dict( id=3, headline="Movie Night! Even Dwarves Started Small.", location="Stutgart, Germany" )
    ]

    return response.json( rv )

