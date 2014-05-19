# -*- coding: utf-8 -*-
from simple_salesforce import Salesforce
from sf import *

def index():
    sf = Salesforce( username=u, password=p, security_token=k, sandbox=True )
    return globals()[ request.env.request_method ]( sf )

def GET( sf ):

    records = sf.query(\
        ''.join( [ "Select ID, NAME, WEEK_1_POINT_TOTAL__C, WEEK_2_POINT_TOTAL__C, WEEK_3_POINT_TOTAL__C, WEEK_4_POINT_TOTAL__C, TOTAL_POINTS__C ",
                   "FROM BIH_BUS__C ORDER BY TOTAL_POINTS__C DESC" ] ) )['records']

    rv = [ ]
    for idx, row in enumerate( records ):
        rv.append( dict( id = row['Id'],
                         rank = idx + 1,
                         name = row['Name'],
                         description = 'Lorem ipsum dolor sit amet, veritus dissentias neglegentur mei ut, dolor consetetur at vim. Cu nibh oblique qui, vim ut vivendo convenire. Ea cum iudico commodo imperdiet. Nam te movet audire invenire, pro commodo tritani legimus ne, ne nam atqui augue urbanitas. Mei iriure aliquando disputationi ne, sit minim atomorum cu, mea te quem debet. No eam qualisque appellantur.' ) )

    return response.json( rv )
