# -*- coding: utf-8 -*-
from simple_salesforce import Salesforce
from sf import *

def index():
    sf = Salesforce( username=u, password=p, security_token=k, sandbox=True )
    return globals()[ request.env.request_method ]( sf, session )

def GET( sf, session ):

    records = [ ]

    if request.vars.busId and request.vars.challengeId is None:
        records = sf.query(\
            ''.join( [ "Select BIH_Challenge__r.ID, BIH_User__r.ID, Image_or_Video_URL__c, Post_Body__c, Post_Title__c ",
                       "FROM BIH_Post__c ",
                       "WHERE Challenge_Completed__c = TRUE AND "
                       "BIH_Bus__r.ID = '", request.vars.busId, "'" ] ) )['records']

        rv = []
        for row in records:
            rv.append( dict(\
                userId = row['BIH_User__r']['Id'],
                url = row['Image_or_Video_URL__c'],
                body = row['Post_Body__c'],
                title = row['Post_Title__c'],
                challengeId = row['BIH_Challenge__r']['Id'] ) )

        return response.json(rv)

    elif request.vars.challengeId:

        records = sf.query(\
            ''.join( [ "Select ID, Image_or_Video_URL__c, Post_Body__c, Post_Title__c, ",
                       "Challenge_Completed_Date__c, Challenge_Completed__c ",
                       "FROM BIH_Post__c ",
                       "WHERE BIH_User__r.ID = '", session.userId, "' AND ",
                       "BIH_Challenge__r.ID = '", request.vars.challengeId, "'  ORDER BY Id DESC" ] ) )['records']

        if len( records ) == 0:
            return response.json(dict(challengeId=request.vars.challengeId))

        return response.json( dict(\
            id = records[0]['Id'],
            url = records[0]['Image_or_Video_URL__c'],
            body = records[0]['Post_Body__c'],
            completedDate = records[0]['Challenge_Completed_Date__c'],
            completed = records[0]['Challenge_Completed__c'],
            title = records[0]['Post_Title__c'] ) )

    else:
        records = sf.query(\
            ''.join( [ "Select ID, Image_or_Video_URL__c, Post_Body__c, Post_Title__c, BIH_Challenge__r.ID ",
                       "FROM BIH_Post__c ",
                       "WHERE BIH_User__r.ID = '", session.userId, "'" ] ) ) ['records']

        rv = []

        for row in records:
            rv.append( dict(\
                id = row['Id'],
                challengeId = row['BIH_Challenge__r']['Id'],
                url = row['Image_or_Video_URL__c'],
                body = row['Post_Body__c'],
                title = row['Post_Title__c'] ) )

        return response.json(rv)


def PUT( sf, session ):
    weCool = True
    errorMsg = ''

    #try:
    sf.BIH_Post__c.update( request.args[0], {\
        'Image_or_Video_URL__c': request.vars.url,
        'Post_Body__c': request.vars.body,
        'Post_Title__c': request.vars.title } )

    #except:
    #weCool = False
    #errorMsg = sys.exc_info()[0]
    #print sys.exc_info()[0]

    if weCool:
        return response.json(dict())

    return response.json( dict( error=str(errorMsg) ) )

def POST( sf, session ):
    weCool = True
    errorMsg = ''

    #try:
    id = sf.BIH_Post__c.create( {\
        'BIH_User__c': session.userId,
        'BIH_Challenge__c': request.vars.challengeId,
        'BIH_Bus__c': request.vars.busId,
        'Image_or_Video_URL__c': request.vars.url,
        'Post_Body__c': request.vars.body,
        'Post_Title__c': request.vars.title } )

    #except:
    #weCool = False
    #errorMsg = sys.exc_info()[0]
    #print sys.exc_info()[0]

    if weCool:
        return response.json(dict(id=id))

    return response.json( dict( error=str(errorMsg) ) )



