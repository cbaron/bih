# -*- coding: utf-8 -*-
import os
import shutil
import gluon

def index():
    return dict()

def post():
    """
    File upload handler for the ajax form of the plugin jquery-file-upload
    Return the response in JSON required by the plugin
    """
    # Get the file from the form
    fileObj = request.vars['files[]']

    # Store file
    id = db.profileImage.insert( image = db.profileImage.image.store( fileObj.file, fileObj.filename) )

    # Compute size of the file and update the record
    record = db.profileImage[id]
    path_list = []
    path_list.append(request.folder)
    path_list.append('uploads')
    path_list.append(record['image'])
    size =  shutil.os.path.getsize(shutil.os.path.join(*path_list))
    image = db( db.profileImage.id == id ).select()[0]
    db.profileImage[id] = dict(sizeFile=size)
    db.profileImage[id] = dict( userId = session.userId )

    response = dict(\
        files=[ { "name": str(fileObj.filename),
                  "size": size,
                  "url": URL( f='download', args=[image['image']]),
                  "thumbnail_url": URL(f='download', args=[image['thumb']]),
                  "delete_url": URL(f='delete_file', args=[image['image']]),
                  "delete_type": "DELETE" } ] )

    return gluon.contrib.simplejson.dumps(response, separators=(',',':'))

def delete_file():

    return dict()
    """
    Delete an uploaded file
    """
    try:
        name = request.args[0]
        db(db.files.doc==name).delete()
        return dict(message=T('File deleted'))
    except:
        return dict(message=T('Deletion error'))


def upload():
    return dict()
