# -*- coding: utf-8 -*-
from simple_salesforce import Salesforce
from sf import *

def index():
    sf = Salesforce( username=u, password=p, security_token=k )
    return globals()[ request.env.request_method ]( sf, session )

def GET( sf, session ):

    '''
    geh = records = sf.query(\
            ''.join( [ "Select ID, First_Name__c, Last_Name__c, BIH_Username__c, BIH_Password__c, Date_of_First_Login__c, X100_Point_Challenge_Total__c ",
                       "FROM BIH_USER__C " ] ) )['records']
    import json
    print json.dumps(geh,indent=4)
    '''

    if request.vars.e and request.vars.p:
        records = sf.query(\
            ''.join( [ "Select ID, First_Name__c, Last_Name__c, BIH_Username__c, BIH_Password__c, Date_of_First_Login__c, X100_Point_Challenge_Total__c, ",
                       "(Select BIH_BUS__R.ID, BIH_BUS__R.NAME FROM TEAM_Members__r) ",
                       "FROM BIH_USER__C ",
                       "WHERE BIH_Username__c = '", request.vars.e, "' ",
                       "AND BIH_Password__c ='" , request.vars.p, "'" ] ) )['records']

        if len( records ):

            if records[0]['Date_of_First_Login__c'] is None:
                return response.json( dict() )

            if records[0]['Team_Members__r'] is not None:
              session.busId = records[0]['Team_Members__r']['records'][0]['BIH_Bus__r']['Id']

            session.userId = records[0]['Id']
            return getCleanUser( records[0] )

    if( 'userId' not in session ):
        return response.json( dict() )

    return getCleanUser(
        sf.query(\
            ''.join( [ "Select ID, First_Name__c, Last_Name__c, BIH_Username__c, BIH_Password__c, Date_of_First_Login__c, X100_Point_Challenge_Total__c, ",
                       "(Select BIH_BUS__R.ID, BIH_BUS__R.NAME FROM TEAM_Members__r) ",
                       "FROM BIH_USER__C WHERE ID = '", session.userId, "'" ] ) )['records'][0] )

def getCleanUser( record ):

    if record['Date_of_First_Login__c'] is None:
        return response.json( dict() )

    profileImage = db( db.profileImage.userId == record['Id'] ).select()

    profileThumbnailUrl = URL( c='default', f='download', args=[profileImage[0]['image']] ) \
        if len( profileImage ) else None

    rv = dict( id = record['Id'],
      firstName = record['First_Name__c'],
      lastName = record['Last_Name__c'],
      emailAddress = record['BIH_Username__c'],
      points = record['X100_Point_Challenge_Total__c'],
      profileThumbnailUrl = profileThumbnailUrl,
      isLoggedIn = True )

    if record['Team_Members__r'] is not None:
      rv['busId'] = record['Team_Members__r']['records'][0]['BIH_Bus__r']['Id']
      rv['busName'] = record['Team_Members__r']['records'][0]['BIH_Bus__r']['Name']

    return response.json( rv )
