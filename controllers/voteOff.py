# -*- coding: utf-8 -*-
from simple_salesforce import Salesforce
from sf import *

def index():
    sf = Salesforce( username=u, password=p, security_token=k )
    return globals()[ request.env.request_method ]( sf, session )


def POST( sf, session ):

    records = sf.query(\
        ''.join( [ "Select ID, ",
                   "(Select ID FROM Team_Members__r) ",
                   "FROM BIH_USER__C ",
                   "WHERE ID = '", request.vars.id, "'" ] ) )['records']

    '''
    import json
    f = open('/tmp/sf', 'w')

    sf.describe()

    f.write( json.dumps( sf.describe(), indent=4 ) )
    '''

    sf.Team_Member__c.update( records[0]['Team_Members__r']['records'][0]['Id'], {\
        'Recommend_Inactive__c': True,
        'User_Who_Recommended_Deactivation__c': session.userId } )

    return response.json(dict())
