/**
 *  @swagger
 *  /meetups/{meetup_id}:
 *    delete:
 *      tags:
 *        - meetups
 *      cosumes: 
 *        - application/json
 *      parameters:
 *        - name: token
 *          in: header
 *          required: true
 *          schema:
 *            type: string
 *          example: eyJhbGciOkpXVCJ9.eyJ1c2VyIjp7I20iLCJuYW.XvUQU_Yd9v3d_JZUDFjs
 *        - in: path
 *          name: meetup_id
 *          required: true
 *          type: integer
 *          minimum: 1
 *          description: Meetup id.          
 *      description: Use to delete a meetup
 *      responses:
 *        '200':
 *          description: A delete successful message
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: meetup delete successful
 *        '401':
 *          description: Token expired
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: El token de seguridad expiró o Unauthorized access
 *        '403':
 *          description: Bad Credentials.
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: Bad Credentials
 *        '404':
 *          description: Ivalid meetup id
 *          schema:
 *            type: object
 *            properties:
 *              error:
 *                type: string
 *                example: meetup not found
 *        
 */