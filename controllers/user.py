# -*- coding: utf-8 -*-
from simple_salesforce import Salesforce
from sf import *

def index():
    sf = Salesforce( username=u, password=p, security_token=k, sandbox=True )
    return globals()[ request.env.request_method ]( sf, session )

def GET( sf, session ):

    if request.vars.e and request.vars.p:
        records = sf.query(\
            ''.join( [ "Select ID, First_Name__c, Last_Name__c, Email__c, BIH_Password__c, ",
                       "(Select BIH_BUS__R.ID, BIH_BUS__R.NAME FROM TEAM_Members__r) ",
                       "FROM BIH_USER__C ",
                       "WHERE BIH_Username__c = '", request.vars.e, "' ",
                       "AND BIH_Password__c ='" , request.vars.p, "'" ] ) )['records']

        if len( records ):
            session.userId = records[0]['Id']
            return getCleanUser( records[0] )

    if( 'userId' not in session ):
        return response.json( dict() )

    return getCleanUser(
        sf.query(\
            ''.join( [ "Select ID, First_Name__c, Last_Name__c, Email__c, BIH_Password__c, ",
                       "(Select BIH_BUS__R.ID, BIH_BUS__R.NAME FROM TEAM_Members__r) ",
                       "FROM BIH_USER__C WHERE ID = '", session.userId, "'" ] ) )['records'][0] )

def getCleanUser( record ):

    profileImage = db( db.profileImage.userId == record['Id'] ).select()

    profileThumbnailUrl = URL( c='default', f='download', args=[profileImage[0]['image']] ) \
        if len( profileImage ) else None

    rv = dict( id = record['Id'],
      firstName = record['First_Name__c'],
      lastName = record['Last_Name__c'],
      emailAddress = record['Email__c'],
      profileThumbnailUrl = profileThumbnailUrl,
      isLoggedIn = True )

    if record['Team_Members__r'] is not None:
      rv['busId'] = record['Team_Members__r']['records'][0]['BIH_Bus__r']['Id']
      rv['busName'] = record['Team_Members__r']['records'][0]['BIH_Bus__r']['Name']

    return response.json( rv )
