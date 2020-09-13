/**
 *  @swagger
 *  /meetups/{meetup_id}:
 *    put:
 *      tags:
 *          - meetups
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
 *        - in: body
 *          name: meetup
 *          description: The meetup to update.
 *          schema:
 *            type: object            
 *            properties:             
 *              name:
 *                type: string
 *                example: Beer day
 *              city:
 *                type: string
 *                example: quilmes
 *              description:
 *                type: string
 *                example: Beer day
 *              date:
 *                type: string
 *                example: '09/12/2020'
 *                format: date
 *                pattern: 'DD/MM/YYYY'              
 *              time:
 *                type: string
 *                example: '20:00'
 *                format: time
 *                pattern: 'HH:mm'       
 *      description: Use to update a meetup
 *      responses:
 *        '200':
 *          description: A update successful message
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: meetup update successful
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