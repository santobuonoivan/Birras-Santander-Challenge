/**
 *  @swagger
 *  /meetups:
 *    post:
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
 *        - in: body
 *          name: meetup
 *          description: The meetup to create.
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - date
 *              - city
 *              - time
 *            properties:
 *              date:
 *                type: string
 *                example: '09/12/2020'
 *                format: date
 *                pattern: 'DD/MM/YYYY'
 *              name:
 *                type: string
 *                example: Beer day
 *              time:
 *                type: string
 *                example: '20:00'
 *                format: time
 *                pattern: 'HH:mm'
 *              city:
 *                type: string
 *                example: quilmes
 *              description:
 *                type: string
 *                example: Beer day
 *      description: Use to create a new meetups
 *      responses:
 *        '201':
 *          description: A new meetup
 *          schema:
 *            type: object
 *            properties:
 *              meetup_id:
 *                type: integer
 *                example: 1
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
 *        
 */