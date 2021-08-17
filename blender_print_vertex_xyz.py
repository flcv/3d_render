
# CREDIT TO https://b3d.interplanety.org/en/how-to-save-mesh-data-to-text/

import bpy

vertices = [[vert.co.x, vert.co.y, vert.co.z] for vert in bpy.context.object.data.vertices]
 
faces = [[vert for vert in polygon.vertices] for polygon in bpy.context.object.data.polygons]
 
print('verts = ' + str(vertices) + '\n' + 'faces = ' + str(faces) + '\n')
